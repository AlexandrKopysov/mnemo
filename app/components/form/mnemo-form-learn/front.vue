<template>
    <section
        class="question-form"
        aria-label="Вопрос для повторения"
    >
        <div class="review-card">
            <div class="review-card__content">
                <p class="review-card__label">
                    <span
                        class="review-card__icon"
                        aria-hidden="true"
                    />
                    Вопрос
                </p>
                <h2
                    ref="question"
                    tabindex="-1"
                    class="review-card__question"
                >
                    {{ front }}
                </h2>
            </div>
            <div class="review-card__footer">
                <p class="review-card__hint">Вспомните ответ, затем откройте обратную сторону</p>
                <mnemo-button
                    :disabled="disabled"
                    @click="emit('click')"
                    >Показать ответ</mnemo-button
                >
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import MnemoButton from '~/components/ui/mnemo-button.vue'

defineProps<{ front: string; disabled: boolean }>()
const emit = defineEmits<{ click: [] }>()
const question = ref<HTMLElement | null>(null)
onMounted(() => question.value?.focus({ preventScroll: true }))
</script>

<style scoped lang="scss">
.question-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 960px;
    min-height: 0;
    margin-inline: auto;
    overflow-y: auto;
}
.question-form__exit {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    min-height: $touch-target;
    margin-bottom: 12px;
    color: $text-dark;
}
.review-card {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    min-height: min(520px, 60dvh);
    padding: 48px 64px 32px;
    background: $surface;
    border: 1px solid $result-border;
    border-radius: $radius-surface;
    box-shadow: $result-shadow;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        inset-inline: 12%;
        height: 3px;
        background: linear-gradient(90deg, transparent, $primary, transparent);
    }
    &__content {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        padding-block: 16px 40px;
    }
    &__label {
        display: flex;
        align-items: center;
        gap: 8px;
        color: $primary-active;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }
    &__icon {
        width: 24px;
        height: 24px;
        background: currentColor;
        mask: url('~/assets/icons/help-circle-outline.svg') center / contain no-repeat;
    }
    &__question {
        max-width: 760px;
        color: $text-dark;
        font-size: clamp(24px, 2.2vw, 32px);
        font-weight: 500;
        line-height: 1.4;
        text-align: center;
        text-wrap: balance;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
    }
    &__footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
    &__hint {
        color: $text-dark;
        font-size: 14px;
        text-align: center;
    }
    &__footer :deep(.mnemo-btn) {
        min-height: $touch-target;
        max-height: none;
        height: auto;
    }
}
@media (max-width: ($breakpoint-mobile - 1px)) {
    .review-card {
        padding: 28px 20px 24px;
    }
}
</style>
