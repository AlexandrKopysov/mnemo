import { ANSWER } from '@shared/types/card'

const EASE_FACTOR_CHANGE = {
    [ANSWER.EASY]: 0.15,
    [ANSWER.NORMAL]: 0,
    [ANSWER.HARD]: -0.2,
} as const

const MIN_EASE_FACTOR = 1.3
const MAX_EASE_FACTOR = 3.5

export function calculateEaseFactor(currentEaseFactor: number, answer: ANSWER): number {
    return Math.min(
        MAX_EASE_FACTOR,
        Math.max(MIN_EASE_FACTOR, currentEaseFactor + EASE_FACTOR_CHANGE[answer]),
    )
}
