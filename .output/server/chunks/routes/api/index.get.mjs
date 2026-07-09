import { d as defineEventHandler, g as getSessionUserId, p as prisma } from '../../nitro/nitro.mjs';
import { c as calculatePercentForDeck } from '../../_/deck.service.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const sessionUserId = await getSessionUserId(event);
  const decks = await prisma.deck.findMany({
    select: {
      id: true,
      title: true,
      description: true
    },
    where: {
      userId: sessionUserId
    }
  });
  return calculatePercentForDeck(decks);
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
