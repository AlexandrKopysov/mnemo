<template>
    <div class="deck-page">
        <mnemo-repeat-form class="deck-page__review"/>
        <mnemo-form class="deck-page__list">
            <template v-slot:toolbar-left>
                <mnemo-button 
                    @click="addDeck"
                    width="150"
                >
                    Добавить колоду
                </mnemo-button>
            </template>
            <template v-slot:toolbar-right>
                <mnemo-input
                    width="380"
                    placeholder="Поиск"
                    prepend-inner-icon="mdi-magnify"
                />
            </template>
            <template v-slot:default>
                <div class="decks-grid">
                    <div v-for="deck in decks" :key="deck.id">
                        <deck-tile 
                            :deck="deck"
                            @click="onDeckClick(deck.id)"
                            @edit="onDeckEdit(deck.id)"
                            @delete="onDeckDelete(deck.id)"
                        />
                    </div>
                </div>
            </template>
        </mnemo-form>
    </div>
</template>

<script lang="ts" setup>
import MnemoRepeatForm from "@components/widgets/mnemo-repeat-form/index.vue"
import MnemoForm from "@components/form/mnemo-form.vue" 
import MnemoButton from "@components/ui/mnemo-button.vue"
import MnemoInput from "@components/ui/mnemo-input.vue"
import DeckTile from "@components/decks/deck-tile.vue"
import { deleteDeck, getDecks } from "~/entities/decks/api/api"
import { useMnemoSessionStore } from "~/entities/review-session/model/mnemo-repeat-store"

const { getSessionData } = useMnemoSessionStore()
const { setBreadcrumbs } = useBreadcrumbs()

setBreadcrumbs([{
    title: 'Ваши колоды',
    to: '/'
}])

const decks = ref<IDeck[]>([])

async function getAllDecks() {
    decks.value = await getDecks()
    await getSessionData()
}

onMounted(async () => {
    await getAllDecks()
})

function addDeck() {
    return navigateTo('/decks/new')
}

function onDeckClick(deckId: string | undefined) {
    if (!deckId) {
        return
    }

    return navigateTo({
        name: 'decks-deckId-cards',
        params: {
            deckId,
        },
    })
}

function onDeckEdit(deckId: string | undefined) {
    if (!deckId) {
        return
    }

    return navigateTo({
        name: 'decks-deckId-edit',
        params: {
            deckId,
        },
    })
}

async function onDeckDelete(id: string | undefined) {
    await deleteDeck(id as string)
    await getAllDecks()
}

</script>

<style lang="scss" scoped>
    .decks-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 20px;
    }

    .deck-page {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 16px;
        min-height: 0px;

        &__review {
            flex: 0 0 auto;
        }

        &__list {
            flex: 1 1 0;
            min-height: 400px;
        }
    }
</style>
