import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const isProd = process.env.NODE_ENV === 'production'

const resolveDatabaseUrl = () => {
    const rawUrl = process.env.DATABASE_URL?.trim()

    // Local fallback matches docker/docker-compose.yml defaults.
    if (!rawUrl && !isProd) {
        return 'postgresql://postgres:322@localhost:8888/postgres'
    }

    if (!rawUrl) {
        throw new Error(
            'DATABASE_URL is not set. Add it to your environment before starting the server.',
        )
    }

    return rawUrl
}

const prismaClientSingleton = () => {
    const pool = new PrismaPg({ connectionString: resolveDatabaseUrl() })
    return new PrismaClient({ adapter: pool })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

if (!isProd && globalForPrisma.prisma) {
    void globalForPrisma.prisma.$disconnect()
    globalForPrisma.prisma = undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (!isProd) globalForPrisma.prisma = prisma
