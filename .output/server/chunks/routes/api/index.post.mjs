import { d as defineEventHandler, g as getSessionUserId, r as readBody, p as prisma } from '../../nitro/nitro.mjs';
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
  var _a, _b;
  const sessionUserId = await getSessionUserId(event);
  const body = await readBody(event);
  const deck = await prisma.deck.create({
    data: {
      title: body.title,
      description: body.description,
      icon: (_a = body.icon) != null ? _a : "",
      color: (_b = body.color) != null ? _b : "",
      userId: sessionUserId
    }
  });
  return deck;
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
