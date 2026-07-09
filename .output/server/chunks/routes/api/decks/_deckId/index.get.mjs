import { d as defineEventHandler, a as getRouterParam, p as prisma } from '../../../../nitro/nitro.mjs';
import '@prisma/adapter-pg';
import '@prisma/client';
import 'next-auth/core';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';

function calculateKnowledgeScore(card) {
  if (card.status === "NEW") {
    return 0;
  }
  if (card.lapses >= 3) {
    return 1;
  }
  if (card.intervalDays >= 30 && card.repetitions >= 4) {
    return 4;
  }
  if (card.intervalDays >= 7 && card.repetitions >= 3) {
    return 3;
  }
  if (card.intervalDays >= 1 && card.repetitions >= 1) {
    return 2;
  }
  return 1;
}
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

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
