import { prisma } from '@utils/db'
import { getSessionUserId } from '@utils/server-session'
import { SESSION_CARDS_PER_DECK_LIMIT, AVERAGE_CARD_REVIEW_SECONDS } from '@shared/const'
import { startOfTomorrow } from '@utils/date-helper'

// Функция для расчета предполагаемой продолжительности сессии
export function calculateEstimatedSessionMinutes(cardsCount: number): number {
    if (cardsCount === 0) {
        return 0
    }

    return Math.ceil((cardsCount * AVERAGE_CARD_REVIEW_SECONDS) / 60)
}

export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)

    const endOfToday = startOfTomorrow()

    const decks = await prisma.deck.findMany({
        where: {
            userId: sessionUserId,
            isArchived: false,
        },

        select: {
            id: true,
            title: true,

            cards: {
                where: {
                    dueAt: {
                        lt: endOfToday,
                    },
                },

                select: {
                    id: true,
                },

                orderBy: {
                    dueAt: 'asc',
                },

                take: SESSION_CARDS_PER_DECK_LIMIT,
            },
        },
    })

    const previewDecks = decks
        .filter(({ cards }) => cards.length > 0)
        .map(({ id, title, cards }) => ({
            deckId: id,
            title,
            cardsCount: cards.length,
        }))

    const totalCards = previewDecks.reduce((total, { cardsCount }) => total + cardsCount, 0)

    return {
        totalCards,
        estimatedMinutes: calculateEstimatedSessionMinutes(totalCards),
        decks: previewDecks,
    }
})
