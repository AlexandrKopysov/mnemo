<template>
    <card-form
        mode="create"
        :deck-id="deckId"
    />
</template>

<script lang="ts" setup>
const route = useRoute()
const deckId = computed(() => String(route.params.deckId))
</script>
