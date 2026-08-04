globalThis.__timing__.logStart('Load chunks/_/deck.service');import { c as calculateKnowledgeScore } from './calculate-knowledge-score.mjs';

function calculatePercentForDeck(decks) {
  const newDeckList = decks.map((deck) => {
    const knowledgeScoreSum = deck.cards.reduce((acc, card) => {
      return acc + calculateKnowledgeScore(card);
    }, 0);
    const total = deck._count.cards;
    const maxKnowledgeScore = total * 4;
    const nowDate = /* @__PURE__ */ new Date();
    return {
      id: deck.id,
      title: deck.title,
      description: deck.description,
      percentCompleet: maxKnowledgeScore === 0 ? 0 : Math.round(knowledgeScoreSum / maxKnowledgeScore * 100),
      total,
      dueCardsCount: deck.cards.filter((card) => card.dueAt <= nowDate).length
    };
  });
  return newDeckList;
}
function interleaveDeckCards(decks) {
  const queue = [];
  const maxCardsCount = Math.max(
    0,
    ...decks.map(({ cards }) => cards.length)
  );
  for (let index = 0; index < maxCardsCount; index++) {
    for (const deck of decks) {
      const card = deck.cards[index];
      if (!card) {
        continue;
      }
      queue.push({
        id: card.id,
        deckId: deck.id,
        deckTitle: deck.title,
        front: card.front,
        back: card.back
      });
    }
  }
  return queue;
}

export { calculatePercentForDeck as c, interleaveDeckCards as i };;globalThis.__timing__.logEnd('Load chunks/_/deck.service');
//# sourceMappingURL=deck.service.mjs.map
