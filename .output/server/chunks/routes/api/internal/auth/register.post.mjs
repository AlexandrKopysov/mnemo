import { d as defineEventHandler, r as readBody, c as createError, p as prisma } from '../../../../nitro/nitro.mjs';
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

const register_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  const login = (_a = body == null ? void 0 : body.login) == null ? void 0 : _a.trim();
  const password = body == null ? void 0 : body.password;
  const repeatPassword = body == null ? void 0 : body.repeatPassword;
  if (!login || !password || !repeatPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F"
    });
  }
  if (password !== repeatPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041F\u0430\u0440\u043E\u043B\u0438 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442"
    });
  }
  if (password.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043A\u043E\u0440\u043E\u0447\u0435 6 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
    });
  }
  const existingUser = await prisma.user.findUnique({
    where: { login },
    select: { id: true }
  });
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "\u041B\u043E\u0433\u0438\u043D \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442"
    });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const email = `${login}@local.auth`;
  const user = await prisma.user.create({
    data: {
      login,
      email,
      name: login,
      passwordHash
    },
    select: {
      id: true,
      login: true
    }
  });
  return {
    id: user.id,
    name: (_b = user.login) != null ? _b : "User"
  };
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
