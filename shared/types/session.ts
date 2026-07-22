export interface ReviewSessionStateType {
    deckId: string | null

    cardIds: string[]

    initialTotal: number
    completedCount: number

    currentCardIndex: number

    hardCount: number
    normalCount: number
    easyCount: number

    startedAt: string | null
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