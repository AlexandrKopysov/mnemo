globalThis.__timing__.logStart('Load chunks/routes/api/decks/_deckId/index.get');import { c as defineEventHandler, e as getRouterParam, p as prisma } from '../../../../_/nitro.mjs';
import { c as calculateKnowledgeScore } from '../../../../_/calculate-knowledge-score.mjs';
import '@prisma/adapter-pg';
import '@prisma/client';
import 'next-auth/core';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';

function calculateCardKnowledgeLevel(cards) {
  let newCardList = [];
  newCardList = cards.map((card) => {
    return {
      id: card.id,
      front: card.front,
      back: card.back,
      createdAt: card.createdAt.toISOString(),
      dueAt: card.dueAt.toISOString(),
      status: card.status,
      knowledgeScore: calculateKnowledgeScore(card)
    };
  });
  return newCardList;
}

const index_get = defineEventHandler(async (event) => {
  const deckId = getRouterParam(event, "deckId");
  const cards = await prisma.card.findMany({
    select: {
      id: true,
      front: true,
      dueAt: true,
      createdAt: true,
      back: true,
      status: true,
      intervalDays: true,
      easeFactor: true,
      repetitions: true,
      lapses: true
    },
    where: {
      deckId
    }
  });
  return calculateCardKnowledgeLevel(cards);
});

export { index_get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/decks/_deckId/index.get');
//# sourceMappingURL=index.get.mjs.map
