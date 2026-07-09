import { prisma } from "@utils/db"
import { getSessionUserId } from "@utils/server-session"
import { calculatePercentForDeck } from "../../service/deck.service"

export default defineEventHandler(async (event) => {
    const sessionUserId = await getSessionUserId(event)
    const deckId = getRouterParam(event, "deckId")

    if (!deckId) {
        throw createError({
        statusCode: 400,
        statusMessage: "Колода не существует",
        })
    }

    const deck = await prisma.deck.findFirst({
        where: {
            id: deckId,
            userId: sessionUserId, // защита: можно получить только свою колоду
        },
        select: {
            id: true,
            title: true,
            description: true,
        },
    })

    if (!deck) {
        throw createError({
        statusCode: 404,
        statusMessage: "",
        })
    }

    // чтобы формат совпадал с index.get.ts (percentCompleet/total)
    return calculatePercentForDeck([deck])[0]
})