import type { ICardList, ICard , CardKnowledgeLevel} from "@shared/types/card"

function calculateKnowledgeScore(card: ICard): number {
    if (card.status === 'NEW') {
        return 0
    }

    if (card.lapses >= 3) {
    return 1
    }

    if (card.intervalDays >= 30 && card.repetitions >= 4) {
    return 4
    }

    if (card.intervalDays >= 7 && card.repetitions >= 3) {
    return 3
    }

    if (card.intervalDays >= 1 && card.repetitions >= 1) {
    return 2
    }

    return 1
}

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