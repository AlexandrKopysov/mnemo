import { prisma } from "@utils/db"
import type { ICardUpdate } from "@shared/types/card"

export default defineEventHandler(async (event) => {
    const deckId = getRouterParam(event, "deckId")
    const cardId = getRouterParam(event, "cardId")

    if (!deckId || !cardId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Некорректный запрос",
        })
    }

    const body = await readBody<ICardUpdate>(event)

    if (body.front === undefined && body.back === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: "Нет данных для обновления",
        })
    }

    const updateResult = await prisma.card.updateMany({
        where: {
            id: cardId,
            deckId: deckId,
        },
        data: {
            ...(body.front !== undefined ? { front: body.front } : {}),
            ...(body.back !== undefined ? { back: body.back } : {}),
        },
    })

    if (updateResult.count === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: "Карточка не существует",
        })
    }

    const updatedCard = await prisma.card.findFirst({
        where: {
            id: cardId,
            deckId: deckId,
        },
    })

    return updatedCard
})