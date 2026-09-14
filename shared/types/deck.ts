import type { CardStatus } from './card'

export interface IDeck {
    id?: string
    title: string
    description: string | null
    icon?: string
    color?: string
    percentCompleet?: number
    total?: number
    dueCardsCount?: number
}

export type ICardCalculate = {
    status: CardStatus
    lapses: number
    intervalDays: number
    repetitions: number
    dueAt: Date
}

export interface IDeckCalculate {
    id: string
    title: string
    description: string | null
    cards: ICardCalculate[]
    _count: {
        cards: number
    }
}

export interface IDeckResponse {
    id: string
    title: string
    description: string
    icon?: string
    color?: string
    isPublic: boolean
    isArchived: boolean
    createdAt: string
    updatedAt: string
}
