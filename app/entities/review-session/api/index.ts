import type { IReviewSessionPreview, IReviewSession } from "@shared/types/session"

export async function getReviewSession(): Promise<IReviewSessionPreview> {
    return await $fetch('/api/review-session/preview', {
        method:'GET'
    })
}

export async function createReviewSession(): Promise<IReviewSession> {
    return await $fetch('/api/review-session', {
        method: 'POST'
    })
}