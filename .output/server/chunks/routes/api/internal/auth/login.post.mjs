import { d as defineEventHandler, r as readBody, p as prisma } from '../../../../nitro/nitro.mjs';
import bcrypt from 'bcryptjs';
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

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
