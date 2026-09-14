<template>
    <front-form v-if="!inverted" :key="cardId" class="session-stage" :front="front" :disabled="!cardId || busy" @click="inverted = true" />
    <back-form v-else v-bind="props" class="session-stage" @click="emit('click', $event)" />
</template>

<script lang="ts" setup>
import type { ANSWER } from '@shared/types/card'
import FrontForm from './front.vue'
import BackForm from './back.vue'

const props = withDefaults(defineProps<{
    cardId?: string; front?: string; back?: string; title?: string;
    completedCount?: number; totalCards?: number; progressPercent?: number;
    busy?: boolean; error?: string;
}>(), { front: '', back: '', title: '', completedCount: 0, totalCards: 0, progressPercent: 0, busy: false, error: '' })
const emit = defineEmits<{ click: [variant: ANSWER] }>()
const inverted = ref(false)

watch(() => props.cardId, () => {
    inverted.value = false
})
</script>

<style scoped lang="scss">
.session-stage {
    min-width: 0;
}
</style>
