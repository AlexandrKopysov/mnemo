<template>
    <div class="container">
        <div 
            class="review-card"
            @click="onInvert"
        >
            <div class="review-card__accent" />
            <div class="review-card__content">
                <div class="review-card__label">
                    <v-icon size="24">
                        mdi-help-circle-outline
                    </v-icon>
                    Вопрос
                </div>

                <h2 class="review-card__question">
                    {{ front }}
                </h2>
            </div>

            <div class="review-card__hint">
                Вспомните ответ, затем откройте обратную сторону
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface IProps {
    front: string
}

defineProps<IProps>()
const emit = defineEmits(['click'])

const onInvert = () => {
    emit('click')
}
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        min-height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .review-card {
        position: relative;
        display: grid;
        grid-template-rows: 1fr auto;
        min-height: 520px;
        padding: 48px 64px 32px;
        overflow: hidden;
        cursor: pointer;

        background: #fff;
        border: 1px solid rgba(24, 68, 91, 0.08);
        border-radius: 20px;
        box-shadow:
            0 16px 40px rgba(21, 64, 84, 0.08),
            0 2px 8px rgba(21, 64, 84, 0.04);
    }

    .review-card__accent {
        position: absolute;
        top: 0;
        left: 64px;
        right: 64px;
        height: 3px;

        background: linear-gradient(
            90deg,
            transparent,
            #31a6bf,
            transparent
        );
        opacity: 0.65;
    }

    .review-card__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .review-card__label {
        display: flex;
        align-items: center;
        gap: 6px;

        color: #5a8c9c;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .review-card__question {
        max-width: 760px;
        margin: 0;

        color: #17384b;
        font-size: clamp(24px, 2.2vw, 32px);
        font-weight: 600;
        line-height: 1.4;
        text-align: center;
        text-wrap: balance;
    }

    .review-card__hint {
        color: #91a4ad;
        font-size: 14px;
        text-align: center;
    }
</style>