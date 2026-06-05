<template>
    <mnemo-form>
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
            <div v-for="deck in decks" :key="deck.id">
                {{ deck }}
            </div>
        </template>
    </mnemo-form>
</template>

<script lang="ts" setup>
import MnemoForm from "@components/form/mnemo-form.vue" 
import MnemoButton from "@components/ui/mnemo-button.vue"
import MnemoInput from "@components/ui/mnemo-input.vue"
import { getDecks } from "~/entities/decks/api/api"

definePageMeta({
    title: 'Ваши колоды',
    breadcrumbs: [
        {
            title: 'Главная',
            to: '/'
        }
        
    ]
})

const decks = ref<IDeckResponse[]>([])

onMounted(async () => {
    decks.value = await getDecks()
})

function addDeck() {
    return navigateTo('/decks/new')
}

</script>
