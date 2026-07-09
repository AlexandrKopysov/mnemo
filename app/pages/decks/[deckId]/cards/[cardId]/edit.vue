<template>
    <card-form
        mode="edit"
        :deck-id="deckId"
        :card-id="cardId"
    />
</template>

<script lang="ts" setup>
    const route = useRoute()
    const deckId = computed(() => String(route.params.deckId))
    const cardId = computed(() => String((route.params as Record<string, string>).cardId))
</script>
