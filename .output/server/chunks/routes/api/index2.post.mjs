globalThis.__timing__.logStart('Load chunks/routes/api/index2.post');import { c as defineEventHandler, g as getSessionUserId, p as prisma } from '../../_/nitro.mjs';
import { S as SESSION_CARDS_PER_DECK_LIMIT } from '../../_/const.mjs';
import { i as interleaveDeckCards } from '../../_/deck.service.mjs';
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
import '../../_/calculate-knowledge-score.mjs';

const index_post = defineEventHandler(async (event) => {
  const sessionUserId = await getSessionUserId(event);
  const startedAt = /* @__PURE__ */ new Date();
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
            lte: startedAt
          }
        },
        select: {
          id: true,
          front: true,
          back: true
        },
        orderBy: {
          dueAt: "asc"
        },
        take: SESSION_CARDS_PER_DECK_LIMIT
      }
    }
  });
  const nonEmptyDecks = decks.filter(({ cards }) => cards.length);
  const queue = interleaveDeckCards(nonEmptyDecks);
  return {
    startedAd: startedAt.toISOString(),
    totalCards: queue.length,
    decks: nonEmptyDecks.map(
      ({ id, title, cards }) => ({
        deckId: id,
        title,
        cardsCount: cards.length
      })
    ),
    queue
  };
});

export { index_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/index2.post');
//# sourceMappingURL=index2.post.mjs.map
