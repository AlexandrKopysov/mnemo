import { Answer } from "@shared/types/card"

type CalculateIntervalDaysParams = {
    currentIntervalDays: number
    currentRepetitions: number
    currentEaseFactor: number
    answer: Answer
}

const HARD_INTERVAL_DAYS = 1
const FIRST_NORMAL_INTERVAL_DAYS = 1
const FIRST_EASY_INTERVAL_DAYS = 3
const EASY_INTERVAL_BONUS = 0.3

export function calculateIntervalDays(params: CalculateIntervalDaysParams): number {
    const {
        currentIntervalDays,
        currentRepetitions,
        currentEaseFactor,
        answer,
    } = params

    if (answer === Answer.HARD) {
        return HARD_INTERVAL_DAYS
    }

    if (answer === Answer.NORMAL) {
        if (currentRepetitions === 0) {
            return FIRST_NORMAL_INTERVAL_DAYS
        }

        return Math.max(
            FIRST_NORMAL_INTERVAL_DAYS,
            Math.round(currentIntervalDays * currentEaseFactor)
        )
    }

    if (currentRepetitions === 0) {
        return FIRST_EASY_INTERVAL_DAYS
    }

    return Math.max(
        FIRST_EASY_INTERVAL_DAYS,
        Math.round(currentIntervalDays * (currentEaseFactor + EASY_INTERVAL_BONUS))
    )
}
