globalThis.__timing__.logStart('Load chunks/build/api-D9ph_P1-');import { $ as $fetch$1 } from '../virtual/entry.mjs';

//#region app/entities/cards/api/api.ts
async function createCard(body) {
	return await $fetch$1(`/api/decks/${body.deckId}/cards`, {
		method: "POST",
		body
	});
}
async function updateCard(deckId, cardId, body) {
	return await $fetch$1(`/api/decks/${deckId}/cards/${cardId}`, {
		method: "PUT",
		body
	});
}
async function getCardList(deckId) {
	return await $fetch$1(`/api/decks/${deckId}/cards`, { method: "GET" });
}
async function deleteCard(deckId, cardId) {
	return await $fetch$1(`/api/decks/${deckId}/cards/${cardId}`, { method: "DELETE" });
}
async function reviewCard(deckId, cardId, answer) {
	return await $fetch$1(`/api/decks/${deckId}/cards/${cardId}/review`, {
		method: "POST",
		body: { answer }
	});
}

export { createCard as c, deleteCard as d, getCardList as g, reviewCard as r, updateCard as u };;globalThis.__timing__.logEnd('Load chunks/build/api-D9ph_P1-');
//# sourceMappingURL=api-D9ph_P1-.mjs.map
