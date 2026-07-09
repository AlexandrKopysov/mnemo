import { type ICardList, type ICard } from "@shared/types/card"
import { calculateKnowledgeScore } from "./review/calculate-knowledge-score"

export { calculateNextReview } from "./review/calculate-next-review"

export function calculateCardKnowledgeLevel(cards: ICard[]): ICardList[] {
    let newCardList: ICardList[] = []

    newCardList = cards.map((card) => {
        return  {
            id: card.id,
            front: card.front,
            back: card.back,
            createdAt: card.createdAt.toISOString(),
            dueAt: card.dueAt.toISOString(),
            status: card.status,
            knowledgeScore: calculateKnowledgeScore(card),
        }
    })

    return newCardList
}