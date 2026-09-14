import { prisma } from '@utils/db'
import { calculateCardKnowledgeLevel } from '../../../../service/card.service'

export default defineEventHandler(async (event) => {
    const deckId = getRouterParam(event, 'deckId')

    const cards = await prisma.card.findMany({
        select: {
            id: true,
            front: true,
            dueAt: true,
            createdAt: true,
            back: true,
            status: true,
            intervalDays: true,
            easeFactor: true,
            repetitions: true,
            lapses: true,
        },
        where: {
            deckId: deckId,
        },
    })

    return calculateCardKnowledgeLevel(cards)
})
