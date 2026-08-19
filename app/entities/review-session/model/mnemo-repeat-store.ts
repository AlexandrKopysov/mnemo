import { ANSWER } from "@shared/types/card"
import { defineStore } from "pinia"
import type {
    IReviewSession,
    IReviewSessionCard,
    IReviewSessionItem,
    IReviewSessionDeckSummary,
    IReviewSessionPreview
} from "@shared/types/session"
import { createReviewSession, getReviewSession } from "~/entities/review-session/api"

import { reviewCard, reviewSessionCard } from "~/entities/cards/api/api"

export const useMnemoSessionStore = defineStore("mnemo-session", () => {
    const reviewSession = ref<IReviewSessionPreview | null>(null)
    const startedAt = ref<string | null>(null)
    
    const queue = ref<IReviewSessionItem[]>([])
    const decks = ref<IReviewSessionDeckSummary[]>([])

    const totalCards = ref(0)
    const completedCount = ref(0)
    
    const hardCount = ref(0)
    const normalCount = ref(0)
    const easyCount = ref(0)

    const currentCard = computed(() => {
        return queue.value[completedCount.value] ?? null
    })

    const remainingCount = computed(() => {
        return Math.max(
            totalCards.value - completedCount.value, 0
        )
    })

    const progressPercent = computed(() => {
        if (!totalCards.value) return 0

        // To-Do вопросики к рассчету
        return Math.round(
            (completedCount.value / totalCards.value) * 100
        )
    })

    const isCompleted = computed(() => {
        if (!totalCards.value) return true

        return (
            completedCount.value >= totalCards.value
        )
    })

    async function startSession() {
        const session = await createReviewSession()

        if (!session) return

        applySession(session)
    }

    function applySession(session: IReviewSession) {
        startedAt.value = session.startedAt
        
        queue.value = session.session.items
        decks.value = session.decks

        totalCards.value = session.totalCards
        
        completedCount.value = 0
        hardCount.value = 0
        normalCount.value = 0
        easyCount.value = 0
    }

    async function completeCurrentCard(
        answer: ANSWER
    ) {
        if(!currentCard.value) return

        if (answer === ANSWER.HARD) hardCount.value++
        if (answer === ANSWER.EASY) easyCount.value++
        if (answer === ANSWER.NORMAL) normalCount.value++

        try {
            const result = await reviewSessionCard(currentCard.value.sessionId, currentCard.value.id, answer)
            completedCount.value++
        } catch {
            // TO-Do надо добавить всплывашку с ошибкой
            return
        }

    }

    function resetSession(){
        startedAt.value = null

        queue.value = []
        decks.value = []

        totalCards.value = 0
        completedCount.value = 0

        hardCount.value = 0
        easyCount.value = 0
        normalCount.value = 0
    }

    async function getSessionData() {
        const res = await getReviewSession()
        if (!res) return
        reviewSession.value = res
    }

    return {
        startedAt,

        queue,
        decks,

        totalCards,
        completedCount,

        hardCount,
        normalCount,
        easyCount,

        currentCard,
        remainingCount,
        progressPercent,
        isCompleted,

        startSession,
        completeCurrentCard,
        resetSession,

        reviewSession,
        getSessionData,
    }
})