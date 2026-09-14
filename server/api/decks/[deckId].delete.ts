import { prisma } from '@utils/db'
import { getSessionUserId } from '@utils/server-session'

export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)
    const deckId = getRouterParam(event, 'deckId')

    if (!deckId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Колода не существует',
        })
    }

    const deleteResult = await prisma.deck.deleteMany({
        where: {
            id: deckId,
            userId: sessionUserId,
        },
    })

    if (deleteResult.count === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Колода не существует',
        })
    }

    return {
        success: true,
        id: deckId,
    }
})
