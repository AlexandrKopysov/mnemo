import type {
    IReviewSessionPreview
} from "@shared/types/session"
import { defineStore } from "pinia"
import { reviewSessionCard } from "../../cards/api/api"
import { createReviewSession, getReviewSession } from "../api"


export const useMnemoSessionStore = defineStore("mnemo-session", () => {

    const preview = ref<IReviewSessionPreview | null>(null)
    const activeSession = ref<ISession | null>(null)

    const currentCard = computed(() => {
        return activeSession.value?.items.find(item => !item.answeredAt) ?? null
    })

    const totalCards = computed(() => {
        return activeSession.value?.totalCards ?? 0
    })

    const isCompleted = computed(() => {
        return activeSession.value?.status === REVIEW_SESSION_STATUS.COMPLETED
    })

    const completedCount = computed(() => {
        return activeSession.value?.completedCount ?? 0
    })

    const progressPercent = computed(() => {
        if (!totalCards.value) return 0

        return Math.round(
            completedCount.value / totalCards.value * 100
        )
    })

    async function startSession() {
        const result = await createReviewSession()
        activeSession.value = result.session
    }

    async function loadPreview() {
        preview.value = await getReviewSession()
    }

    async function completeCurrentCard(answer: ANSWER) {
        const card = currentCard.value

        if (!card) return

        const result = await reviewSessionCard(
            card.sessionId,
            card.id,
            answer
        ) as any

        activeSession.value = result.session
    }

    return {
        totalCards,
        completedCount,
        preview,
        activeSession,
        currentCard,
        progressPercent,
        isCompleted,
        
        loadPreview,
        startSession,
        completeCurrentCard,
    }
})