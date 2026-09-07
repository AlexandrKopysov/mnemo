import type { IReviewSession, IReviewSessionPreview } from "@shared/types/session"

export async function getPreviewSession(): Promise<IReviewSessionPreview> {
    return await $fetch('/api/review-session/preview', {
        method:'GET'
    })
}

export async function createReviewSession(): Promise<IReviewSession> {
    return await $fetch('/api/review-session', {
        method: 'POST'
    })
}

export async function getReviewSessionById(sessionId: string): Promise<ISession> {
    return await $fetch(`/api/review-session/${sessionId}`, {
        method: 'GET'
    })
}