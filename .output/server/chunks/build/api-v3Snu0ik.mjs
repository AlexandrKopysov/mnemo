async function createDeck(body) {
  return await $fetch("/api/decks", {
    method: "POST",
    body
  });
}
async function updateDeck(id, body) {
  return await $fetch(`/api/decks/${id}`, {
    method: "PATCH",
    body
  });
}
async function deleteDeck(id) {
  return await $fetch(`/api/decks/${id}`, {
    method: "DELETE"
  });
}
async function getDecks() {
  return await $fetch("/api/decks", {
    method: "GET"
  });
}

export { createDeck as c, deleteDeck as d, getDecks as g, updateDeck as u };
//# sourceMappingURL=api-v3Snu0ik.mjs.map
