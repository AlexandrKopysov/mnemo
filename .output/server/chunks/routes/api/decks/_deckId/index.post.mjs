import { d as defineEventHandler, a as getRouterParam, r as readBody, c as createError, p as prisma } from '../../../../nitro/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  const deckId = getRouterParam(event, "deckId");
  const body = await readBody(event);
  if (!deckId || !body.front || !body.back) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441"
    });
  }
  const card = await prisma.card.create({
    data: {
      front: body.front,
      back: body.back,
      deckId
    }
  });
  return card;
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
