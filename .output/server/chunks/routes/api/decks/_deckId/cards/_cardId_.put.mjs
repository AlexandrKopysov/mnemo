globalThis.__timing__.logStart('Load chunks/routes/api/decks/_deckId/cards/_cardId_.put');import { c as defineEventHandler, e as getRouterParam, f as createError, r as readBody, p as prisma } from '../../../../../_/nitro.mjs';
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

const _cardId__put = defineEventHandler(async (event) => {
  const deckId = getRouterParam(event, "deckId");
  const cardId = getRouterParam(event, "cardId");
  if (!deckId || !cardId) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441"
    });
  }
  const body = await readBody(event);
  if (body.front === void 0 && body.back === void 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F"
    });
  }
  const updateResult = await prisma.card.updateMany({
    where: {
      id: cardId,
      deckId
    },
    data: {
      ...body.front !== void 0 ? { front: body.front } : {},
      ...body.back !== void 0 ? { back: body.back } : {}
    }
  });
  if (updateResult.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
    });
  }
  const updatedCard = await prisma.card.findFirst({
    where: {
      id: cardId,
      deckId
    }
  });
  return updatedCard;
});

export { _cardId__put as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/decks/_deckId/cards/_cardId_.put');
//# sourceMappingURL=_cardId_.put.mjs.map
