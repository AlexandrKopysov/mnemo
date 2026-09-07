
export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)
    const sessionId = getRouterParam(event, 'sessionId')

    const activeSession = await prisma.reviewSession.findFirst({
        where: {
            userId: sessionUserId,
            id: sessionId
        },

        orderBy: {
            startedAt: 'desc'
        },

        include: {
            items: {
                orderBy: {
                    position: 'asc'
                }
            }
        }
    })

    return { ...activeSession }
})