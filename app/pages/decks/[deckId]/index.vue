<template>
    <deck-main :deck-id="deckId" />
</template>

<script lang="ts" setup>
import DeckMain from '@components/decks/deck-main.vue'

const route = useRoute()
const deckId = computed(() => String(route.params.deckId))

definePageMeta({
    title: 'Колода',
    breadcrumbs: [
        {
            title: 'Главная',
            to: '/'
        },
        {
            title: 'Колода',
        }
    ]
})
</script>