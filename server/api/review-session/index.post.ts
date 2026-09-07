import { interleaveDeckCards } from "@service/deck.service"
import { SESSION_CARDS_PER_DECK_LIMIT } from "@shared/const"
import { prisma } from "@utils/db"
import { getSessionUserId } from "@utils/server-session"
import { REVIEW_SESSION_STATUS } from "@shared/types/session"
import { startOfTomorrow } from "@utils/date-helper"


export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)

    const endOfToday = startOfTomorrow()

    const decks = await prisma.deck.findMany({
        where: {
            userId: sessionUserId,
            isArchived: false
        },

        select: {
            id: true,
            title: true,

            cards: {
                where: {
                    dueAt: {
                        lt: endOfToday
                    }
                },

                select: {
                    id: true,
                    front: true,
                    back: true,
                    dueAt: true
                },

                orderBy: {
                    dueAt: "asc"
                },

                take: SESSION_CARDS_PER_DECK_LIMIT,
            }
        }
    })

    const nonEmptyDecks = decks.filter(({cards}) => cards.length)

    const queue = interleaveDeckCards(nonEmptyDecks)

    if (!queue.length) {
        throw createError({
            statusCode: 409,
            statusMessage: "Нет доступных к изучению карточек"
        })
    }

    // Поиск активной сессии
    const activeSession = await prisma.reviewSession.findFirst({
        where: {
            userId: sessionUserId,
            status: REVIEW_SESSION_STATUS.IN_PROGRESS
        },

        orderBy: {
            startedAt: 'desc'
        },

        include: {
            items: {
                orderBy: {
                    position: 'asc'
                }
            }
        }

    })

    // Создание сессии пользователя
    const session = activeSession 
        ? activeSession
        : await prisma.reviewSession.create({
        data: {
            userId: sessionUserId,
            totalCards: queue.length,
            items: {
                create: queue.map((item) => ({
                    cardId: item.cardId,
                    deckId: item.deckId,
                    position: item.position,
                    cardFront: item.cardFront,
                    cardBack: item.cardBack,
                    deckTitle: item.deckTitle,
                })),
            },
        },

        include: {
            items: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    })

    return {
        startedAt: new Date().toISOString(),
        totalCards: session.totalCards,
        decks: nonEmptyDecks.map(
            ({ id, title, cards }) => ({
                deckId: id,
                title,
                cardsCount: cards.length,
            }),
        ),
        session
    }
})