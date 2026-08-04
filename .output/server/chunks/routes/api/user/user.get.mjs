globalThis.__timing__.logStart('Load chunks/routes/api/user/user.get');import { c as defineEventHandler, p as prisma } from '../../../_/nitro.mjs';
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

export { user_get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/user/user.get');
//# sourceMappingURL=user.get.mjs.map
