<template>
    <mnemo-form
        class="learn-form"
        :use-toolbar="false"
    >
        <div class="toolbar">
            <div class="arrow-back">
                <v-icon
                    size="24"
                    class="mr-1"
                >
                    mdi-arrow-left
                </v-icon>
                <span class="text">Выйти</span>
            </div>
            <span class="title">{{ title }}</span>
            <span class="propgress">{{ totalProgress }}</span>
        </div>
        <mnemo-progress 
            class="mt-4"
            :value="progressPercent"
        />
        <div class="body">
            <div class="front">
                <span>{{ front }}</span>
            </div>
            <div>
                <p>{{  back }}</p>
            </div>
        </div>
        <div class="button-toolbar">
            <mnemo-button 
                variant="danger"
                width="120"
                @click="emit('click', ANSWER.HARD)"
            >Повторить</mnemo-button>
            <mnemo-button 
                variant="dark"
                width="120"
                @click="emit('click', ANSWER.NORMAL)"
            >Трудно</mnemo-button>
            <mnemo-button 
                variant="primary"
                width="120"
                @click="emit('click', ANSWER.EASY)"
            >Легко</mnemo-button>
        </div>
    </mnemo-form>
</template>

<script lang="ts" setup>
import MnemoForm from "@components/form/mnemo-form.vue"
import MnemoButton from "@components/ui/mnemo-button.vue"
import MnemoProgress from "@components/ui/mnemo-progress.vue"
import { ANSWER } from "@shared/types/card"

interface IProps {
    front: string,
    title: string,
    back: string,
    completedCount: number,
    totalCards: number
    progressPercent: number
}

const props = defineProps<IProps>()

const emit = defineEmits<{
    (e: "click", variant: ANSWER): void
}>()

const totalProgress = computed(() => `${props?.completedCount + 1} из ${props.totalCards}`)

</script>

<style lang="scss" scoped>
    .learn-form :deep(.mnemo-form__content) {
        display: flex;
        flex-direction: column;
    }

    .toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .arrow-back {
            display: flex;
            align-items: center;

            .text {
                font-size: 18px;
            }
        }

        .title {
            font-size: 24px;
        }

        .propgress {
            font-size: 18px;
        }
    }

    .body {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        margin-top: 32px;

        .front {
            display: flex;
            justify-content: center;
    
            span {
                font-size: 24px;
                font-weight: 500;
            }
        }
    }

    .button-toolbar {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }


</style>
