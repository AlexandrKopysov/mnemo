globalThis.__timing__.logStart('Load chunks/routes/api/index.get');import { c as defineEventHandler, g as getSessionUserId, p as prisma } from '../../_/nitro.mjs';
import { c as calculatePercentForDeck } from '../../_/deck.service.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const sessionUserId = await getSessionUserId(event);
  const decks = await prisma.deck.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      cards: {
        select: {
          status: true,
          lapses: true,
          intervalDays: true,
          repetitions: true,
          dueAt: true
        }
      },
      _count: {
        select: {
          cards: true
        }
      }
    },
    where: {
      userId: sessionUserId
    }
  });
  return calculatePercentForDeck(decks);
});

export { index_get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/index.get');
//# sourceMappingURL=index.get.mjs.map
