globalThis.__timing__.logStart('Load chunks/routes/api/internal/auth/login.post');import { c as defineEventHandler, r as readBody, p as prisma } from '../../../../_/nitro.mjs';
import bcrypt from 'bcryptjs';
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

const login_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const body = await readBody(event);
  const login = (_a = body == null ? void 0 : body.login) == null ? void 0 : _a.trim();
  const password = body == null ? void 0 : body.password;
  if (!login || !password) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { login },
    select: {
      id: true,
      login: true,
      email: true,
      passwordHash: true
    }
  });
  if (!user || !user.passwordHash) {
    return null;
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return null;
  }
  return {
    id: user.id,
    name: (_c = (_b = user.login) != null ? _b : user.email) != null ? _c : "User",
    email: (_d = user.email) != null ? _d : void 0
  };
});

export { login_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/internal/auth/login.post');
//# sourceMappingURL=login.post.mjs.map
