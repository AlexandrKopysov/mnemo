import { prisma } from "@utils/db"

export default defineEventHandler(async (event) => {
    const deckId = getRouterParam(event, "deckId")
    const cardId = getRouterParam(event, "cardId")

    if (!deckId || !cardId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Некорректный запрос",
        })
    }

    const card = await prisma.card.findFirst({
        where: {
            id: cardId,
            deckId: deckId,
        },
    })

    if (!card) {
        throw createError({
            statusCode: 404,
            statusMessage: "Карточка не существует",
        })
    }

    return card
})