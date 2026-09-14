import type { ICardCreate, ICardUpdate } from '@shared/types/card'

export async function createCard(body: ICardCreate) {
    return await $fetch(`/api/decks/${body.deckId}/cards`, {
        method: 'POST',
        body,
    })
}

export async function updateCard(deckId: string, cardId: string, body: ICardUpdate) {
    const url = `/api/decks/${deckId}/cards/${cardId}` as string

    return await $fetch(url, {
        method: 'PUT',
        body,
    })
}

export async function getCard(deckId: string, cardId: string): Promise<ICardCreate> {
    const url = `/api/decks/${deckId}/cards/${cardId}` as string

    return await $fetch<ICardCreate>(url, {
        method: 'GET',
    })
}

export async function getCardList(deckId: string): Promise<ICardList[]> {
    return await $fetch(`/api/decks/${deckId}/cards`, {
        method: 'GET',
    })
}

export async function deleteCard(deckId: string, cardId: string) {
    return await $fetch(`/api/decks/${deckId}/cards/${cardId}`, {
        method: 'DELETE',
    })
}

export async function reviewCard(deckId: string, cardId: string, answer: ANSWER) {
    return await $fetch(`/api/decks/${deckId}/cards/${cardId}/review`, {
        method: 'POST',
        body: { answer },
    })
}

export async function reviewSessionCard(sessionId: string, itemId: string, answer: ANSWER) {
    return await $fetch(`/api/review-sessions/${sessionId}/items/${itemId}/answer`, {
        method: 'POST',
        body: { answer },
    })
}
