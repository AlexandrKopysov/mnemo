import { getServerSession } from '#auth'

export async function getSessionUserId(event: H3Event) {
    const session = await getServerSession(event)
    const sessionUserId = Number((session?.user as { id?: unknown } | undefined)?.id)

    if (!Number.isInteger(sessionUserId) || sessionUserId <= 0) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        })
    }

    return sessionUserId
}
