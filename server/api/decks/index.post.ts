import type { IDeck } from '@shared/types'
import { prisma } from '@utils/db'
import { getSessionUserId } from '@utils/server-session'

export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)

    const body = await readBody<IDeck>(event)
    const deck = await prisma.deck.create({
        data: {
            title: body.title,
            description: body.description,
            icon: body.icon ?? '',
            color: body.color ?? '',
            userId: sessionUserId,
        },
    })
    return deck
})
