<template>
    <div class="container">
        <div class="final-session-card">
            <div></div>
            <span class="title">
                Mnemo
            </span>
            <span class="subtitle">
                Сессия повторения завершена
            </span>
            <span class="annotation">
                Отличная работа - вы закрепили знания
            </span>
            <div class="tile-result">
                <div class="row">
                    <span class="row-title">Общее количество карточек:</span>
                    <span class="row-value">{{totalCards}}</span>
                </div>
                <div
                    v-for="(tile, key) in tiles"
                    :key="key"
                    class="row"
                >
                    <span class="row-title">{{tile.label}}</span>
                    <span :class="tile.class">{{tile.value}}</span>
                </div>
            </div>
            <mnemo-button
                class="button"
                @click="onClick"
            >На главную</mnemo-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import mnemoButton from "~/components/ui/mnemo-button.vue"
import { useMnemoSessionStore } from "~/entities/review-session/model/mnemo-repeat-store"
import type { IReviewSessionItem } from "shared/types/session"

interface IProps {
    totalCards: number
    easy: IReviewSessionItem[]
    normal: IReviewSessionItem[]
    hard: IReviewSessionItem[]
}

const tiles = computed(() => {
  return {
    easy: {
      label: 'Легко',
      value: props.easy.length,
      class: 'row-value'
    },
    normal: {
      label: 'Сложно',
      value: props.normal.length,
      class: 'row-value'
    },
    hard: {
      label: 'Не вспомнил',
      value: props.hard.length,
      class: 'row-value-red'
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

        background: #fff;
        border: 1px solid rgba(24, 68, 91, 0.08);
        border-radius: 20px;
        box-shadow:
            0 16px 40px rgba(21, 64, 84, 0.08),
            0 2px 8px rgba(21, 64, 84, 0.04);

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
            color: rgba(21, 64, 84, 0.8);
        }

        .tile-result {
            width: 100%;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            border-radius: 10px;
            margin-top: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
            .row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: rgba(21, 64, 84, 0.8);
                &-title {
                    font-size: 16px;
                };
                &-value {
                    font-size: 16px;
                    font-weight: 500;
                    // TO-DO Изменить цвета на глобальные переменные
                    &-green {
                        color: green
                    }
                    &-red {
                        color: red
                    }
                }
            }
            .title {
                font-size: 18px
            }
        }

        .button {
            width: 100%;
            margin-top: 30px;
        }
    }
</style>