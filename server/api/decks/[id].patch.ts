import { prisma } from "@utils/db"
import { getSessionUserId } from "@utils/server-session"
import type { IDeck } from "@shared/types"

export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)
    const id = getRouterParam(event, "id")

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Колода не существует",
        })
    }

    const body = await readBody<Partial<IDeck>>(event)
    const hasTitle = body.title !== undefined
    const hasDescription = body.description !== undefined
    const hasIcon = body.icon !== undefined
    const hasColor = body.color !== undefined

    if (!hasTitle && !hasDescription) {
        throw createError({
            statusCode: 400,
            statusMessage: "Нет данных для обновления",
        })
    }

    const updateResult = await prisma.deck.updateMany({
        where: {
            id,
            userId: sessionUserId,
        },
        data: {
            ...(hasTitle ? { title: body.title ?? "" } : {}),
            ...(hasDescription ? { description: body.description ?? null } : {}),
            ...(hasIcon ? { icon: body.icon ?? "" } : {}),
            ...(hasColor ? { color: body.color ?? "" } : {}),
        },
    })

    if (updateResult.count === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: "Колода не существует",
        })
    }

    const updatedDeck = await prisma.deck.findFirst({
        where: {
            id,
            userId: sessionUserId,
        },
    })

    return updatedDeck
})