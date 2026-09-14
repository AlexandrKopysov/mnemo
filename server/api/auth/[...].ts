import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'

type credentialsType = {
    login: string
    password: string
}

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,

    providers: [
        // @ts-expect-error
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                login: { label: 'Login', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials: credentialsType) {
                const login = credentials?.login
                const password = credentials?.password
                if (!login || !password) return null

                const user = await $fetch('/api/internal/auth/login', {
                    method: 'POST',
                    body: { login, password },
                })

                return user ?? null
            },
        }),
    ],

    // (опционально) чтобы прокинуть id в session.user
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = (user as any).id
            return token
        },
        async session({ session, token }) {
            ;(session.user as any).id = token.id
            return session
        },
    },
})
