<template>
    <deck-form mode="create" />
</template>

<script lang="ts" setup>
import DeckForm from '@components/decks/deck-form.vue'

definePageMeta({
    title: 'Создание колоды',
    breadcrumbs: [
        {
            title: 'Колоды',
            to: '/'
        },
        {
            title: 'Создание колоды',
        }
    ]
})
</script>