import { d as defineEventHandler, g as getSessionUserId, a as getRouterParam, c as createError, p as prisma } from '../../../nitro/nitro.mjs';
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

const _deckId__delete = defineEventHandler(async (event) => {
  const sessionUserId = await getSessionUserId(event);
  const deckId = getRouterParam(event, "deckId");
  if (!deckId) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041A\u043E\u043B\u043E\u0434\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
    });
  }
  const deleteResult = await prisma.deck.deleteMany({
    where: {
      id: deckId,
      userId: sessionUserId
    }
  });
  if (deleteResult.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "\u041A\u043E\u043B\u043E\u0434\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
    });
  }
  return {
    success: true,
    id: deckId
  };
});

export { _deckId__delete as default };
//# sourceMappingURL=_deckId_.delete.mjs.map
