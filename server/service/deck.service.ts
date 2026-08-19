import { calculateKnowledgeScore } from "@service/review/calculate-knowledge-score"
import type { IDeck, IDeckCalculate } from "@shared/types"

export function calculatePercentForDeck(decks: IDeckCalculate[]) {
  const newDeckList: IDeck[] = decks.map((deck) => {
    const knowledgeScoreSum = deck.cards.reduce((acc, card) => {
        return acc + calculateKnowledgeScore(card)
    }, 0)

    const total = deck._count.cards
    const maxKnowledgeScore = total * 4
    const nowDate = new Date()

    return {
        id: deck.id,
        title: deck.title,
        description: deck.description,
        percentCompleet: maxKnowledgeScore === 0
            ? 0
            : Math.round((knowledgeScoreSum / maxKnowledgeScore) * 100),
        total,
        dueCardsCount: deck.cards.filter((card) => card.dueAt <= nowDate).length,
        }
    })

    return newDeckList
}

export function interleaveDeckCards(
    decks: Array<{
        id: string
        title: string
        cards: Array<{
            id: string
            front: string
            back: string
        }>
    }>,
) {
    const queue: Array<{
        cardId: string
        deckId: string
        cardFront: string
        cardBack: string
        deckTitle: string
        position: number
    }> = []

    const maxCardsCount = Math.max(
        0,
        ...decks.map(({ cards }) => cards.length),
    )

    for (
        let cardIndex = 0;
        cardIndex < maxCardsCount;
        cardIndex++
    ) {
        for (const deck of decks) {
            const card = deck.cards[cardIndex]

            if (!card) {
                continue
            }

            queue.push({
                cardId: card.id,
                deckId: deck.id,
                cardFront: card.front,
                cardBack: card.back,
                deckTitle: deck.title,
                position: queue.length,
            })
        }
    }

    return queue
}
