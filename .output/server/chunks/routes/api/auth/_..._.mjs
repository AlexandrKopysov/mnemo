globalThis.__timing__.logStart('Load chunks/routes/api/auth/_..._');import { N as NuxtAuthHandler, u as useRuntimeConfig } from '../../../_/nitro.mjs';
import CredentialsProvider from 'next-auth/providers/credentials';
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

const _____ = NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const login = credentials == null ? void 0 : credentials.login;
        const password = credentials == null ? void 0 : credentials.password;
        if (!login || !password) return null;
        const user = await $fetch("/api/internal/auth/login", {
          method: "POST",
          body: { login, password }
        });
        return user != null ? user : null;
      }
    })
  ],
  // (опционально) чтобы прокинуть id в session.user
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  }
});

export { _____ as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/auth/_..._');
//# sourceMappingURL=_..._.mjs.map
