import bcrypt from 'bcryptjs'
import { prisma } from '../../../utils/db'

type LoginBody = {
  login?: string
  password?: string
}

type AuthUser = {
  id: number
  name: string
  email?: string
}

export default defineEventHandler(async (event): Promise<AuthUser | null> => {
  const body = await readBody<LoginBody>(event)
  const login = body?.login?.trim()
  const password = body?.password

  if (!login || !password) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { login },
    select: {
      id: true,
      login: true,
      email: true,
      passwordHash: true,
    },
  })

  if (!user || !user.passwordHash) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
  if (!isPasswordValid) {
    return null
  }

  return {
    id: user.id,
    name: user.login ?? user.email ?? 'User',
    email: user.email ?? undefined,
  }
})
