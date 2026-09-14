import type { ICardReview } from '@shared/types/card'
import { prisma } from '@utils/db'
import { calculateNextReview } from '@service/card.service'

export default defineEventHandler(async (event) => {
    const deckId = getRouterParam(event, 'deckId')
    const cardId = getRouterParam(event, 'cardId')
    const body = await readBody<ICardReview>(event)

    if (!deckId || !cardId || !body.answer) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Некорректный запрос',
        })
    }

    const card = await prisma.card.findUnique({
        where: {
            id: cardId,
            deckId: deckId,
        },
    })

    if (!card) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Карточка не найдена',
        })
    }

    const nextReviewData = calculateNextReview(card, body.answer)

    const updatedCard = await prisma.card.update({
        where: {
            id: cardId,
            deckId: deckId,
        },
        data: nextReviewData,
    })

    return updatedCard
})
