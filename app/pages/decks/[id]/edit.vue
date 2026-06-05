<template>
    <deck-form 
        mode="edit"
        :deck-id="deckId"
    />
</template>

<script lang="ts" setup>
import DeckForm from '@components/decks/deck-form.vue'

const route = useRoute()
const deckId = computed(() => String(route.params.id))

definePageMeta({
    title: 'Редактирование колоды',
    breadcrumbs: [
        {
            title: 'Колоды',
            to: '/'
        },
        {
            title: 'Редактирование колоды',
        }
    ]
})
</script>
