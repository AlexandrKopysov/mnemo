import { calculateNextReview } from "@service/review/calculate-next-review"
import { REVIEW_SESSION_STATUS } from "@shared/types/session"
import { prisma } from "@utils/db"
import { getSessionUserId } from "@utils/server-session"
import { ANSWER } from "@shared/types"

export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)

    const sessionId = getRouterParam(event, 'sessionId')
    const itemId = getRouterParam(event, 'itemId')

    const body = await readBody(event)

    const result = await prisma.$transaction(
        async (tx) => {
            const item =
                await tx.reviewSessionItem.findFirst({
                    where: {
                        id: itemId,
                        sessionId,
                        answeredAt: null,

                        session: {
                            userId: sessionUserId,
                            status: REVIEW_SESSION_STATUS.IN_PROGRESS
                        },
                    },

                    include: {
                        card: true,
                        session: true,
                    },
                })

            if (!item) {
                throw createError({
                    statusCode: 404,
                    statusMessage: "Сессия не найдена",
                })
            }

            if (!item.card) {
                throw createError({
                    statusCode: 409,
                    statusMessage: "Сессия не содержит карточек",
                })
            }

            const nextReview = calculateNextReview(
                item.card,
                body.answer,
            )

            await tx.card.update({
                where: {
                    id: item.card.id,
                },

                data: {
                    status: nextReview.status,
                    dueAt: nextReview.dueAt,
                    lastReviewedAt:
                        nextReview.lastReviewedAt,
                    intervalDays:
                        nextReview.intervalDays,
                    easeFactor:
                        nextReview.easeFactor,
                    repetitions:
                        nextReview.repetitions,
                    lapses: nextReview.lapses,
                },
            })

            await tx.reviewSessionItem.update({
                where: {
                    id: item.id,
                },

                data: {
                    answer: body.answer,
                    answeredAt: new Date(),
                },
            })

            const nextCompletedCount =
                item.session.completedCount + 1

            const sessionCompleted =
                nextCompletedCount >=
                item.session.totalCards

            const updatedSession =
                await tx.reviewSession.update({
                    where: {
                        id: sessionId,
                    },

                    data: {
                        completedCount:
                            nextCompletedCount,

                        hardCount:
                            body.answer === ANSWER.HARD
                                ? item.session.hardCount + 1
                                : item.session.hardCount,

                        normalCount:
                            body.answer === ANSWER.NORMAL
                                ? item.session.normalCount + 1
                                : item.session.normalCount,

                        easyCount:
                            body.answer === ANSWER.EASY
                                ? item.session.easyCount + 1
                                : item.session.easyCount,

                        status: sessionCompleted
                            ? REVIEW_SESSION_STATUS.COMPLETED
                            : REVIEW_SESSION_STATUS.IN_PROGRESS,

                        completedAt: sessionCompleted
                            ? new Date()
                            : null,
                    },

                    include: {
                        items: {
                            orderBy: {
                                position: 'asc'
                            }
                        }
                    }
                })

            return {
                session: updatedSession,
                sessionCompleted,
            }
        },
    )

    return {
        sessionId,
        itemId,
        ...result
    }
})