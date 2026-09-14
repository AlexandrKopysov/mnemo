import { prisma } from '../../utils/db'

export default defineEventHandler(async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            login: true,
            name: true,
            email: true,
        },
    })
})
