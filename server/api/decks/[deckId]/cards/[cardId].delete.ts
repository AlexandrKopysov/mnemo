import { prisma } from '@utils/db'
import { getSessionUserId } from '@utils/server-session'

export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)
    const deckId = getRouterParam(event, 'deckId')
    const cardId = getRouterParam(event, 'cardId')

    if (!deckId || !cardId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Некорректный запрос',
        })
    }

    const deleteResult = await prisma.card.deleteMany({
        where: {
            id: cardId,
            deckId: deckId,
        },
    })

    if (deleteResult.count === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Карточка не существует',
        })
    }

    return {
        success: true,
        id: cardId,
    }
})
