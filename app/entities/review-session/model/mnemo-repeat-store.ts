import { defineStore } from "pinia"
import type { IReviewSessionPreview } from "shared/types/session"
import { getReviewSession } from "~/entities/review-session/api"

export const useMnemoSessionStore = defineStore("mnemo-session", () => {
    const reviewSession = ref<IReviewSessionPreview | null>(null)

    async function getSessionData() {
        const res = await getReviewSession()
        if (!res) return
        reviewSession.value = res
    }

    return {
        reviewSession,
        getSessionData,
    }
})