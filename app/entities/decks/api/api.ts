import type { IDeck } from '@shared/types'

export async function createDeck(body: IDeck) {
    return await $fetch('/api/decks', {
        method: 'POST',
        body,
    })
}

export async function updateDeck(id: string, body: IDeck) {
    return await $fetch(`/api/decks/${id}`, {
        method: 'PATCH',
        body,
    })
}

export async function deleteDeck(id: string) {
    return await $fetch(`/api/decks/${id}`, {
        method: 'DELETE',
    })
}

export async function getDeck(id: string) {
    return await $fetch<IDeck>(`/api/decks/${id}`, {
        method: 'GET',
    })
}

export async function getDecks() {
    return await $fetch('/api/decks', {
        method: 'GET',
    })
}
