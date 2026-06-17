export interface IDeck {
    id?: string
    title: string
    description: string | null
    icon?: string
    color?: string
    percentCompleet?: number
    total?: number
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
