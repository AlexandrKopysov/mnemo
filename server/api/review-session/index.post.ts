import { prisma } from "@utils/db"
import { getSessionUserId } from "@utils/server-session"
import { SESSION_CARDS_PER_DECK_LIMIT } from "@shared/const"
import { interleaveDeckCards } from "@service/deck.service"


export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)

    const startedAt = new Date()

    const decks = await prisma.deck.findMany({
        where: {
            userId: sessionUserId,
            isArchived: false
        },

        select: {
            id: true,
            title: true,

            cards: {
                where: {
                    dueAt: {
                        lte: startedAt
                    }
                },

                select: {
                    id: true,
                    front: true,
                    back: true,
                },

                orderBy: {
                    dueAt: "asc"
                },

                take: SESSION_CARDS_PER_DECK_LIMIT,
            }
        }
    })

    const nonEmptyDecks = decks.filter(({cards}) => cards.length)

    const queue = interleaveDeckCards(nonEmptyDecks)

    return {
        startedAd: startedAt.toISOString(),
        totalCards: queue.length,
        decks: nonEmptyDecks.map(
            ({ id, title, cards }) => ({
                deckId: id,
                title,
                cardsCount: cards.length,
            }),
        ),
        queue
    }
})