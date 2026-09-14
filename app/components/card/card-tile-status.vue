<template>
    <div class="card-tile-status">
        <div>
            <v-icon
                v-for="icon in iconCircle"
                :key="icon.icon"
                :icon="icon.icon"
                :color="icon.color"
                size="20"
            />
        </div>
        <div>Следующее повторение: {{ formatReviewDate(card.dueAt) }}</div>
    </div>
</template>

<script setup lang="ts">
import type { ICardList } from '@shared/types/card'
import { formatReviewDate } from '@composables/use-date-time'

type iconCircleType = {
    icon: string
    color: string
}

interface IProps {
    card: ICardList
}

const iconVariant = {
    base: 'mdi-circle',
    outline: 'mdi-circle-outline',
}

const color = {
    base: '#5fa391',
    red: '#E74C3C',
    orange: '#F39C12',
    yellow: '#F1C40F',
    green: '#27AE60',
}

const props = defineProps<IProps>()

// TODO: Потенциальное место для рефакторинга
const iconCircle: ComputedRef<iconCircleType[]> = computed(() => {
    switch (props.card.knowledgeScore) {
        case 1:
            return [
                { icon: iconVariant.base, color: color.red },
                { icon: iconVariant.outline, color: color.red },
                { icon: iconVariant.outline, color: color.red },
                { icon: iconVariant.outline, color: color.red },
            ]
        case 2:
            return [
                { icon: iconVariant.base, color: color.orange },
                { icon: iconVariant.base, color: color.orange },
                { icon: iconVariant.outline, color: color.orange },
                { icon: iconVariant.outline, color: color.orange },
            ]
        case 3:
            return [
                { icon: iconVariant.base, color: color.yellow },
                { icon: iconVariant.base, color: color.yellow },
                { icon: iconVariant.base, color: color.yellow },
                { icon: iconVariant.outline, color: color.yellow },
            ]
        case 4:
            return [
                { icon: iconVariant.base, color: color.green },
                { icon: iconVariant.base, color: color.green },
                { icon: iconVariant.base, color: color.green },
                { icon: iconVariant.base, color: color.green },
            ]
        default:
            return [
                { icon: iconVariant.outline, color: color.base },
                { icon: iconVariant.outline, color: color.base },
                { icon: iconVariant.outline, color: color.base },
                { icon: iconVariant.outline, color: color.base },
            ]
    }
})
</script>

<style lang="scss" scoped>
.card-tile-status {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 300px;
}

@media (max-width: ($breakpoint-desktop - 1px)) {
    .card-tile-status {
        min-width: 0;
        gap: 4px;
        overflow-wrap: anywhere;
    }
    .card-tile-status > div:first-child {
        display: flex;
        flex-wrap: nowrap;
    }
}
</style>
