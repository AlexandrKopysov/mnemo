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
    queue: IReviewSessionCard[]
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