import type { IReviewSessionPreview } from "@shared/types/session"

export async function getReviewSession(): Promise<IReviewSessionPreview> {
    return await $fetch('/api/review-session/preview', {
        method:'GET'
    })
}