import type { IDeck } from "@shared/types"

export async function createDeck(body: IDeck) {
    return await $fetch('/api/decks', {
        method: 'POST',
        body
    })
}

export async function getDecks() {
    return await $fetch('/api/decks', {
        method: 'GET',
    })
}