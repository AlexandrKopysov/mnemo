<template>
    <mnemo-form :title="title">
        <template #toolbar-left>
            <mnemo-button
                width="150"
                @click="onAddCard"
            >
                Добавить карточку
            </mnemo-button>
        </template>
        <template #toolbar-right>
            <mnemo-input
                v-model="search"
                width="380"
                placeholder="Поиск"
                prepend-inner-icon="mdi-magnify"
            />
        </template>
        <template #default>
            <div class="decks-grid">
                <card-tile
                    v-for="card in cards"
                    :key="card.id"
                    class="mb-4"
                    :card="card"
                    @click="onCardEdit(card.id)"
                    @edit="onCardEdit(card.id)"
                    @delete="onCardDelete(card.id)"
                />
            </div>
        </template>
    </mnemo-form>
</template>

<script lang="ts" setup>
import MnemoForm from '@components/form/mnemo-form.vue'
import MnemoButton from '@components/ui/mnemo-button.vue'
import MnemoInput from '@components/ui/mnemo-input.vue'
import { getDeck } from '~/entities/decks/api/api'
import { getCardList, deleteCard } from '~/entities/cards/api/api'
import type { ICardList } from '@shared/types'

const title = computed(() => deck.value?.title)

const route = useRoute()
const deckId = computed(() => String(route.params.deckId))
const deck = ref<IDeck>()
const cards = ref<ICardList[]>([])
const search = ref('')

const { setBreadcrumbs } = useBreadcrumbs()

const onAddCard = async () => {
    return navigateTo({
        name: 'decks-deckId-cards-new',
        params: {
            deckId: deckId.value,
        },
    })
}

function onCardEdit(cardId: string) {
    return navigateTo({
        name: 'decks-deckId-cards-cardId-edit',
        params: {
            deckId: deckId.value,
            cardId,
        },
    })
}

async function onCardDelete(cardId: string) {
    await deleteCard(deckId.value, cardId)
    await getData()
}

async function getData() {
    deck.value = await getDeck(deckId.value)
    cards.value = await getCardList(deckId.value)
}

onMounted(async () => {
    await getData()
    if (!deck.value?.id) return

    setBreadcrumbs([
        {
            title: 'Ваши колоды',
            to: '/',
        },
        {
            title: `${deck.value.title}`,
        },
    ])
})
</script>
