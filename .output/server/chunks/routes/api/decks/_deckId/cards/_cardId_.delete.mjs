import { d as defineEventHandler, g as getSessionUserId, a as getRouterParam, c as createError, p as prisma } from '../../../../../nitro/nitro.mjs';
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

const _cardId__delete = defineEventHandler(async (event) => {
  const sessionUserId = await getSessionUserId(event);
  const deckId = getRouterParam(event, "deckId");
  const cardId = getRouterParam(event, "cardId");
  if (!deckId || !cardId) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441"
    });
  }
  const deleteResult = await prisma.card.deleteMany({
    where: {
      id: cardId,
      deckId,
      userId: sessionUserId
    }
  });
  if (deleteResult.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
    });
  }
  return {
    success: true,
    id: cardId
  };
});

export { _cardId__delete as default };
//# sourceMappingURL=_cardId_.delete.mjs.map
