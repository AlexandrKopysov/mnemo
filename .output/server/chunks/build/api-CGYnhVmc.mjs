globalThis.__timing__.logStart('Load chunks/build/api-CGYnhVmc');import { $ as $fetch$1 } from '../virtual/entry.mjs';

//#region app/entities/decks/api/api.ts
async function createDeck(body) {
	return await $fetch$1("/api/decks", {
		method: "POST",
		body
	});
}
async function updateDeck(id, body) {
	return await $fetch$1(`/api/decks/${id}`, {
		method: "PATCH",
		body
	});
}
async function deleteDeck(id) {
	return await $fetch$1(`/api/decks/${id}`, { method: "DELETE" });
}
async function getDeck(id) {
	return await $fetch$1(`/api/decks/${id}`, { method: "GET" });
}
async function getDecks() {
	return await $fetch$1("/api/decks", { method: "GET" });
}

export { getDecks as a, createDeck as c, deleteDeck as d, getDeck as g, updateDeck as u };;globalThis.__timing__.logEnd('Load chunks/build/api-CGYnhVmc');
//# sourceMappingURL=api-CGYnhVmc.mjs.map
