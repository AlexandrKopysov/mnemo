import bcrypt from 'bcryptjs'
import { prisma } from '@utils/db'
import type { RegisterBody } from '@shared/types/index'

export default defineEventHandler(async (event) => {
    const body = await readBody<RegisterBody>(event)
    const login = body?.login?.trim()
    const password = body?.password
    const repeatPassword = body?.repeatPassword

    if (!login || !password || !repeatPassword) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Заполните все поля',
        })
    }

    if (password !== repeatPassword) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Пароли не совпадают',
        })
    }

    if (password.length < 6) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Пароль должен быть не короче 6 символов',
        })
    }

    const existingUser = await prisma.user.findUnique({
        where: { login },
        select: { id: true },
    })

    if (existingUser) {
        throw createError({
            statusCode: 409,
            statusMessage: 'Логин уже занят',
        })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const email = `${login}@local.auth`

    const user = await prisma.user.create({
        data: {
            login,
            email,
            name: login,
            passwordHash,
        },
        select: {
            id: true,
            login: true,
        },
    })

    return {
        id: user.id,
        name: user.login ?? 'User',
    }
})
