import { defineStore } from "pinia"
import type { 
    IReviewSession, 
    IReviewSessionCard , 
    IReviewSessionPreview, 
    IReviewSessionDeckSummary } from "shared/types/session"
import { getReviewSession, createReviewSession } from "~/entities/review-session/api"
import { Answer } from "@shared/types/card"

import { reviewCard } from "~/entities/cards/api/api"

export const useMnemoSessionStore = defineStore("mnemo-session", () => {
    const reviewSession = ref<IReviewSessionPreview | null>(null)
    const startedAt = ref<string | null>(null)
    
    const queue = ref<IReviewSessionCard[]>([])
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

        return Math.round(
            (completedCount.value / totalCards.value) * 100
        )
    })

    const isCompleted = computed(() => {
        return (
            totalCards.value > 0 && completedCount.value >= totalCards.value
        )
    })

    async function startSession() {
        const session = await createReviewSession()

        if (!session) return

        applySession(session)
    }

    function applySession(session: IReviewSession) {
        startedAt.value = session.startedAt
        
        queue.value = session.queue
        decks.value = session.decks

        totalCards.value = session.totalCards
        
        completedCount.value = 0
        hardCount.value = 0
        normalCount.value = 0
        easyCount.value = 0
    }

    async function completeCurrentCard(
        answer: Answer
    ) {
        if(!currentCard.value) return

        if (answer === Answer.HARD) hardCount.value++
        if (answer === Answer.EASY) easyCount.value++
        if (answer === Answer.NORMAL) normalCount.value++

        try {
            await reviewCard(currentCard.value.deckId, currentCard.value.id, answer)
        } catch {
            // TO-Do надо добавить всплывашку с ошибкой
            return
        }

        completedCount.value++
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