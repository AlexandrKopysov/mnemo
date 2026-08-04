globalThis.__timing__.logStart('Load chunks/routes/api/decks/_deckId_.patch');import { c as defineEventHandler, g as getSessionUserId, e as getRouterParam, f as createError, r as readBody, p as prisma } from '../../../_/nitro.mjs';
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

const _deckId__patch = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const sessionUserId = await getSessionUserId(event);
  const deckId = getRouterParam(event, "deckId");
  if (!deckId) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041A\u043E\u043B\u043E\u0434\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
    });
  }
  const body = await readBody(event);
  const hasTitle = body.title !== void 0;
  const hasDescription = body.description !== void 0;
  const hasIcon = body.icon !== void 0;
  const hasColor = body.color !== void 0;
  if (!hasTitle && !hasDescription) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F"
    });
  }
  const updateResult = await prisma.deck.updateMany({
    where: {
      id: deckId,
      userId: sessionUserId
    },
    data: {
      ...hasTitle ? { title: (_a = body.title) != null ? _a : "" } : {},
      ...hasDescription ? { description: (_b = body.description) != null ? _b : null } : {},
      ...hasIcon ? { icon: (_c = body.icon) != null ? _c : "" } : {},
      ...hasColor ? { color: (_d = body.color) != null ? _d : "" } : {}
    }
  });
  if (updateResult.count === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "\u041A\u043E\u043B\u043E\u0434\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
    });
  }
  const updatedDeck = await prisma.deck.findFirst({
    where: {
      id: deckId,
      userId: sessionUserId
    }
  });
  return updatedDeck;
});

export { _deckId__patch as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/decks/_deckId_.patch');
//# sourceMappingURL=_deckId_.patch.mjs.map
