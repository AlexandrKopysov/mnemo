import { d as defineEventHandler, p as prisma } from '../../../nitro/nitro.mjs';
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

const user_get = defineEventHandler(async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      login: true,
      name: true,
      email: true
    }
  });
});

export { user_get as default };
//# sourceMappingURL=user.get.mjs.map
