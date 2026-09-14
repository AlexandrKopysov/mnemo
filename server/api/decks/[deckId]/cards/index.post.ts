import type { ICardCreate } from '@shared/types/card'
import { prisma } from '@utils/db'

export default defineEventHandler(async (event) => {
    const deckId = getRouterParam(event, 'deckId')
    const body = await readBody<ICardCreate>(event)

    if (!deckId || !body.front || !body.back) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Некорректный запрос',
        })
    }

    const card = await prisma.card.create({
        data: {
            front: body.front,
            back: body.back,
            deckId: deckId,
        },
    })
    return card
})
