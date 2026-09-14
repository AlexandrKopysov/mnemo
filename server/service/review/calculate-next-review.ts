import { ANSWER, type CardStatus, type ICard, type ReviewCardInput } from '@shared/types/card'
import { calculateEaseFactor } from './calculate-easy-factor'
import { calculateIntervalDays } from './calculate-interval-days'

type NextReviewResult = Pick<
    ICard,
    'status' | 'dueAt' | 'lastReviewedAt' | 'intervalDays' | 'easeFactor' | 'repetitions' | 'lapses'
>

function addDays(date: Date, days: number): Date {
    const result = new Date(date)

    result.setDate(result.getDate() + days)

    return result
}

function getNextStatus(answer: ANSWER): CardStatus {
    return answer === ANSWER.HARD ? 'LEARNING' : 'REVIEW'
}

function calculateRepetitions(currentRepetitions: number, answer: ANSWER): number {
    return answer === ANSWER.HARD ? 0 : currentRepetitions + 1
}

function calculateLapses(currentLapses: number, answer: ANSWER): number {
    return answer === ANSWER.HARD ? currentLapses + 1 : currentLapses
}

export function calculateNextReview(card: ReviewCardInput, answer: ANSWER): NextReviewResult {
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
