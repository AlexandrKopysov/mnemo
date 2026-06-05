import { prisma } from '@utils/db'
import { getSessionUserId } from '@utils/server-session'


export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)

    const decks = await prisma.deck.findMany({
        select: {
            id: true,
            title: true,
            description: true,
        },
        where: {
            userId: sessionUserId,
        },
    })

    return decks
})