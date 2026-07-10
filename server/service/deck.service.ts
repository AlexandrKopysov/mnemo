import type { IDeck, IDeckCalculate } from "@shared/types"
import { calculateKnowledgeScore } from "@service/review/calculate-knowledge-score"

export function calculatePercentForDeck(decks: IDeckCalculate[]) {
  const newDeckList: IDeck[] = decks.map((deck) => {
    const knowledgeScoreSum = deck.cards.reduce((acc, card) => {
      return acc + calculateKnowledgeScore(card)
    }, 0)

    const total = deck._count.cards
    const maxKnowledgeScore = total * 4

    return {
      id: deck.id,
      title: deck.title,
      description: deck.description,
      percentCompleet: maxKnowledgeScore === 0
        ? 0
        : Math.round((knowledgeScoreSum / maxKnowledgeScore) * 100),
      total,
    }
  })

  return newDeckList
}
