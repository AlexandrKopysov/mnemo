<template>
    <mnemo-form
        class="learn-form"
        :use-toolbar="false"
    >
        <header class="session-toolbar">
            <NuxtLink
                to="/"
                class="session-exit"
                >← Выйти</NuxtLink
            >
            <span class="session-title">{{ title }}</span>
            <span class="session-count"
                >{{ Math.min(completedCount + 1, totalCards) }} из {{ totalCards }}</span
            >
        </header>
        <mnemo-progress
            :value="progressPercent"
            class="mt-4"
        />
        <div class="session-body">
            <p class="session-label">Вопрос</p>
            <h2 class="session-question">{{ front }}</h2>
            <section
                aria-label="Ответ"
                class="session-answer"
            >
                <h3
                    ref="answerHeading"
                    tabindex="-1"
                    class="session-label"
                >
                    Ответ
                </h3>
                <mnemo-markdown-preview
                    v-if="back.trim()"
                    :key="cardId"
                    :content="back"
                />
                <p v-else>Ответ не добавлен. Вы можете дополнить карточку в колоде.</p>
            </section>
        </div>
        <p
            v-if="error"
            role="alert"
            class="session-error"
        >
            {{ error }}
        </p>
        <div class="session-actions">
            <mnemo-button
                v-for="rating in ratings"
                :key="rating.value"
                :variant="rating.variant"
                :disabled="busy"
                @click="emit('click', rating.value)"
            >
                {{ ANSWER_LABELS[rating.value] }}
            </mnemo-button>
        </div>
    </mnemo-form>
</template>

<script lang="ts" setup>
import { ANSWER } from '@shared/types/card'
import { ANSWER_LABELS } from '~/entities/review-session/model/answer-labels'
import MnemoForm from '../mnemo-form.vue'
import MnemoButton from '~/components/ui/mnemo-button.vue'
import MnemoProgress from '~/components/ui/mnemo-progress.vue'
import MnemoMarkdownPreview from '~/components/ui/editor/mnemo-markdown-preview.vue'

withDefaults(
    defineProps<{
        cardId?: string
        front?: string
        back?: string
        title?: string
        completedCount?: number
        totalCards?: number
        progressPercent?: number
        busy?: boolean
        error?: string
    }>(),
    {
        front: '',
        back: '',
        title: '',
        completedCount: 0,
        totalCards: 0,
        progressPercent: 0,
        busy: false,
        error: '',
    },
)
const emit = defineEmits<{ click: [variant: ANSWER] }>()
const answerHeading = ref<HTMLElement | null>(null)
const ratings = [
    { value: ANSWER.HARD, variant: 'danger' },
    { value: ANSWER.NORMAL, variant: 'dark' },
    { value: ANSWER.EASY, variant: 'primary' },
] as const
onMounted(() => {
    answerHeading.value?.focus({ preventScroll: true })
})
</script>

<style scoped lang="scss">
.learn-form {
    width: 100%;
    max-width: 960px;
    margin-inline: auto;
    flex: 1 1 0;
}
.learn-form :deep(.mnemo-form__content) {
    display: flex;
    flex-direction: column;
}
.learn-form :deep(.mnemo-form__content) > :not(.session-body) {
    flex-shrink: 0;
}
.session-toolbar {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 16px;
}
.session-exit {
    display: inline-flex;
    align-items: center;
    min-height: $touch-target;
    color: $text-dark;
}
.session-title {
    text-align: center;
    font-size: 20px;
    overflow-wrap: anywhere;
}
.session-count {
    white-space: nowrap;
}
.session-body {
    flex: 1 1 0;
    min-height: 0;
    width: 100%;
    margin: 24px auto;
    overflow-wrap: anywhere;
    overflow-y: auto;
}
.session-label {
    color: $primary-active;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
}
.session-question {
    font-size: clamp(22px, 2.2vw, 28px);
    line-height: 1.4;
    white-space: pre-wrap;
}
.session-answer {
    margin-top: 24px;
}
.session-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    padding-bottom: env(safe-area-inset-bottom, 0px);
}
.session-actions :deep(.mnemo-btn) {
    flex: 1 1 140px;
    max-width: 240px;
    min-height: $touch-target;
    height: auto;
    max-height: none;
}
.session-error {
    color: $error;
    margin-bottom: 12px;
}
@media (max-width: ($breakpoint-small - 1px)) {
    .session-toolbar {
        gap: 8px;
    }
    .session-title {
        font-size: 16px;
    }
    .session-actions {
        flex-direction: column;
    }
    .session-actions :deep(.mnemo-btn) {
        flex: none;
        width: 100%;
        max-width: none;
    }
}
</style>
