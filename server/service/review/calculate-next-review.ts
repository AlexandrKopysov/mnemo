import { Answer, type CardStatus, type ICard, type ReviewCardInput } from "@shared/types/card"
import { calculateEaseFactor } from "./calculate-easy-factor"
import { calculateIntervalDays } from "./calculate-interval-days"

type NextReviewResult = Pick<
    ICard,
    | "status"
    | "dueAt"
    | "lastReviewedAt"
    | "intervalDays"
    | "easeFactor"
    | "repetitions"
    | "lapses"
>

function addDays(date: Date, days: number): Date {
    const result = new Date(date)

    result.setDate(result.getDate() + days)

    return result
}

function getNextStatus(answer: Answer): CardStatus {
    return answer === Answer.HARD
        ? "LEARNING"
        : "REVIEW"
}

function calculateRepetitions(currentRepetitions: number, answer: Answer): number {
    return answer === Answer.HARD
        ? 0
        : currentRepetitions + 1
}

function calculateLapses(currentLapses: number, answer: Answer): number {
    return answer === Answer.HARD
        ? currentLapses + 1
        : currentLapses
}

export function calculateNextReview(card: ReviewCardInput, answer: Answer): NextReviewResult {
    const now = new Date()

    const easeFactor = calculateEaseFactor(card.easeFactor, answer)

    const intervalDays = calculateIntervalDays({
        currentIntervalDays: card.intervalDays,
        currentRepetitions: card.repetitions,
        currentEaseFactor: card.easeFactor,
        answer,
    })

    return {
        status: getNextStatus(answer),
        dueAt: addDays(now, intervalDays),
        lastReviewedAt: now,
        intervalDays,
        easeFactor,
        repetitions: calculateRepetitions(card.repetitions, answer),
        lapses: calculateLapses(card.lapses, answer),
    }
}
