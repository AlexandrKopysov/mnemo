<template>
    <div class="container">
        <div class="final-session-card">
            <div></div>
            <span class="title"> Mnemo </span>
            <span class="subtitle"> Сессия повторения завершена </span>
            <span class="annotation"> Отличная работа - вы закрепили знания </span>
            <div class="tile-result">
                <div class="row">
                    <span class="row-title">Общее количество карточек:</span>
                    <span class="row-value">{{ totalCards }}</span>
                </div>
                <div
                    v-for="(tile, key) in tiles"
                    :key="key"
                    class="row"
                >
                    <span class="row-title">{{ tile.label }}</span>
                    <span :class="tile.class">{{ tile.value }}</span>
                </div>
            </div>
            <mnemo-button
                class="button"
                @click="onClick"
                >На главную</mnemo-button
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import mnemoButton from '~/components/ui/mnemo-button.vue'
import { ANSWER } from '@shared/types/card'
import { ANSWER_LABELS } from '~/entities/review-session/model/answer-labels'
import { useMnemoSessionStore } from '~/entities/review-session/model/mnemo-repeat-store'
import type { IReviewSessionItem } from 'shared/types/session'

interface IProps {
    totalCards: number
    easy: IReviewSessionItem[]
    normal: IReviewSessionItem[]
    hard: IReviewSessionItem[]
}

const tiles = computed(() => {
    return {
        easy: {
            label: ANSWER_LABELS[ANSWER.EASY],
            value: props.easy.length,
            class: 'row-value',
        },
        normal: {
            label: ANSWER_LABELS[ANSWER.NORMAL],
            value: props.normal.length,
            class: 'row-value',
        },
        hard: {
            label: ANSWER_LABELS[ANSWER.HARD],
            value: props.hard.length,
            class: 'row-value-red',
        },
    }
})

const props = defineProps<IProps>()

const mnemoSessionStore = useMnemoSessionStore()

const { isCompleted } = storeToRefs(mnemoSessionStore)

const onClick = () => {
    navigateTo('/')
}

onMounted(() => {
    if (!isCompleted.value) {
        console.log('not completed session')
    }
})
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.final-session-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 500px;
    padding: 25px;
    overflow: hidden;

    background: $surface;
    border: 1px solid $result-border;
    border-radius: $radius-surface;
    box-shadow: $result-shadow;

    .title {
        font-size: 36px;
        font-weight: 500;
    }

    .subtitle {
        font-size: 24px;
        font-weight: 500;
    }

    .annotation {
        font-size: 14px;
        color: $result-text;
    }

    .tile-result {
        width: 100%;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        border-radius: $radius-tile;
        margin-top: 20px;
        box-shadow: $shadow-tile;
        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: $result-text;
            &-title {
                font-size: 16px;
            }
            &-value {
                font-size: 16px;
                font-weight: 500;
                &-green {
                    color: $result-correct;
                }
                &-red {
                    color: $result-incorrect;
                }
            }
        }
        .title {
            font-size: 18px;
        }
    }

    .button {
        width: 100%;
        margin-top: 30px;
    }
}

@media (max-width: ($breakpoint-desktop - 1px)) {
    .container {
        width: 100%;
        min-width: 0;
    }
    .final-session-card {
        min-width: 0;
        width: 500px;
        max-width: 100%;
        overflow-wrap: anywhere;
    }
    .final-session-card .tile-result .row {
        gap: 12px;
    }
    .final-session-card .row-title {
        min-width: 0;
    }
    .final-session-card .row-value,
    .final-session-card .row-value-red {
        flex-shrink: 0;
    }
}
@media (max-width: ($breakpoint-mobile - 1px)) {
    .final-session-card {
        padding: 20px 16px;
        text-align: center;
    }
    .final-session-card .subtitle {
        font-size: 22px;
    }
    .final-session-card .tile-result {
        padding: 12px;
        text-align: left;
    }
}
</style>
