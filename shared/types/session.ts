import type { ANSWER } from '@shared/types'
export interface IReviewSessionStateType {
    startedAt: string | null

    queue: IReviewSessionCard[]
    decks: IReviewSessionDeckSummary[]

    totalCards: number
    completedCount: number

    hardCount: number
    normalCount: number
    easyCount: number
}

export interface IReviewSessionDeckSummary {
    id: string
    title: string
    cardsCount: number
}

export interface IReviewSessionCard {
    id: string
    deckId: string
    deckTitle: string
    front: string
    back: string
}

export interface IReviewSession {
    startedAt: string
    totalCards: number
    decks: IReviewSessionDeckSummary[]
    session: ISession
}

export interface ISession {
    id: string
    userId: number
    totalCards: number
    completedCount: number
    hardCount: number
    normalCount: number
    easyCount: number
    status: REVIEW_SESSION_STATUS
    startedAt: string
    completedAt: string
    items: IReviewSessionItem[]
}
export interface IReviewSessionItem {
    id: string
    sessionId: string
    cardId: string
    deckId: string
    position: number
    answer: ANSWER
    answeredAt: string
    cardFront: string
    cardBack: string
    deckTitle: string
}

export interface IReviewSessionPreview {
    /**
     * Общее количество карточек,
     * которые войдут в сессию при запуске прямо сейчас.
     */
    totalCards: number

    /**
     * Примерное время прохождения сессии в минутах.
     */
    estimatedMinutes: number

    /**
     * Распределение карточек будущей сессии по колодам.
     */
    decks: IReviewSessionPreviewDeck[]
}

export interface IReviewSessionPreviewDeck {
    deckId: string

    title: string

    /**
     * Количество карточек этой колоды,
     * которые попадут в текущую сессию.
     *
     * Максимум SESSION_CARDS_PER_DECK_LIMIT.
     */
    cardsCount: number
}

export enum REVIEW_SESSION_STATUS {
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    ABANDONED = 'ABANDONED',
}
