globalThis.__timing__.logStart('Load chunks/routes/api/review-session/index.get');import { c as defineEventHandler, g as getSessionUserId, p as prisma } from '../../../_/nitro.mjs';
import { A as AVERAGE_CARD_REVIEW_SECONDS, S as SESSION_CARDS_PER_DECK_LIMIT } from '../../../_/const.mjs';
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

function calculateEstimatedSessionMinutes(cardsCount) {
  if (cardsCount === 0) {
    return 0;
  }
  return Math.ceil(
    cardsCount * AVERAGE_CARD_REVIEW_SECONDS / 60
  );
}
const index_get = defineEventHandler(async (event) => {
  const sessionUserId = await getSessionUserId(event);
  const now = /* @__PURE__ */ new Date();
  const decks = await prisma.deck.findMany({
    where: {
      userId: sessionUserId,
      isArchived: false
    },
    select: {
      id: true,
      title: true,
      cards: {
        where: {
          dueAt: {
            lte: now
          }
        },
        select: {
          id: true
        },
        orderBy: {
          dueAt: "asc"
        },
        take: SESSION_CARDS_PER_DECK_LIMIT
      }
    }
  });
  const previewDecks = decks.filter(({ cards }) => cards.length > 0).map(({ id, title, cards }) => ({
    deckId: id,
    title,
    cardsCount: cards.length
  }));
  const totalCards = previewDecks.reduce((total, { cardsCount }) => total + cardsCount, 0);
  return {
    totalCards,
    estimatedMinutes: calculateEstimatedSessionMinutes(totalCards),
    decks: previewDecks
  };
});

export { calculateEstimatedSessionMinutes, index_get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/review-session/index.get');
//# sourceMappingURL=index.get.mjs.map
