<template>
    <section class="session-preview">
        <div class="session-preview__calendar">
            <v-icon
                size="50"
                color="rgba(1, 154, 93, 0.75)"
            >
                mdi-calendar-clock
            </v-icon>
        </div>

        <div class="session-preview__info">
            <span class="session-preview__title">
                Сегодня к повторению
            </span>

            <div class="session-preview__total">
                <span class="session-preview__total-value">
                    {{ preview?.totalCards ?? 0 }}
                </span>

                <span class="session-preview__total-label">
                    карточек
                </span>
            </div>

            <span class="session-preview__estimated">
                ~ {{ preview?.estimatedMinutes ?? 0 }} минут
            </span>
        </div>

        <div class="session-preview__decks">
            <span class="session-preview__decks-title">
                По колодам
            </span>

            <div class="session-preview__decks-list">
                <div
                    v-for="deck in preview?.decks ?? []"
                    :key="deck.deckId"
                    class="session-preview__deck"
                >
                    <span class="session-preview__deck-title">
                        {{ deck.title }}
                    </span>

                    <span class="session-preview__deck-count">
                        {{ deck.cardsCount }}
                    </span>
                </div>
            </div>
        </div>

        <div class="session-preview__actions">
            <div class="session-preview__streak">
                <div class="session-preview__streak-value">
                    <v-icon
                        size="24"
                        color="rgba(1, 154, 93, 0.75)"
                    >
                        mdi-fire
                    </v-icon>

                    <span>5</span>
                </div>

                <span class="session-preview__streak-days">
                    дней
                </span>
            </div>

            <span class="session-preview__streak-label">
                Текущая серия
            </span>

            <mnemo-button 
                v-if="preview?.totalCards"
                class="session-preview__button"
                @click="startRepeat()"
            >
                Начать повторение
            </mnemo-button>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useMnemoSessionStore } from "~/entities/review-session/model/mnemo-repeat-store"
import MnemoButton from "@components/ui/mnemo-button.vue"

const sessionStore = useMnemoSessionStore()
const { startSession } = sessionStore

const { preview, activeSession } = storeToRefs(sessionStore)

const startRepeat = async () => {
    await startSession()
    const sessionId = activeSession.value?.id

    return navigateTo({
        name: 'learn-session-sessionId',
        params: {
            sessionId: sessionId
        }
    })
}

onMounted(async () => {
    await sessionStore.loadPreview()
})

</script>

<style scoped lang="scss">
$accent-color: rgba(1, 154, 93, 0.75);
$calendar-bg: rgb(228, 243, 237);
$border-color: rgb(234, 234, 234);
$counter-bg: rgb(255, 255, 255);

.session-preview {
    display: grid;
    grid-template-columns:
        auto
        minmax(220px, 1fr)
        minmax(240px, 1.2fr)
        auto;

    align-items: flex-start;
    gap: 32px;

    padding: 28px;
    border-radius: 24px;

    background: #fff;
    backdrop-filter: blur(10px);

    box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);

    &__calendar {
        display: grid;
        place-items: center;

        width: 100px;
        height: 100px;

        border-radius: 50%;
        background: $calendar-bg;
    }

    &__info {
        display: flex;
        height: 100%;
        flex-direction: column;
    }

    &__title {
        color: $accent-color;
        font-size: 24px;
        font-weight: 500;
    }

    &__total {
        display: flex;
        align-items: baseline;
        gap: 8px;
    }

    &__total-value {
        font-size: 64px;
        font-weight: 600;
        line-height: 1;
    }

    &__total-label {
        font-size: 36px;
        line-height: 1;
    }

    &__estimated {
        margin-top: 12px;

        font-size: 18px;
    }

    &__decks {
        padding-left: 24px;
        height: 100%;
        border-left: 1px solid $border-color;
    }

    &__decks-title {
        font-size: 24px;
        font-weight: 500;
    }

    &__decks-list {
        display: flex;
        flex-direction: column;
        gap: 6px;

        margin-top: 12px;
    }

    &__deck {
        display: grid;
        grid-template-columns: minmax(0, 240px) 24px;
        align-items: center;
        column-gap: 12px;
    }

    &__deck-title {
        overflow: hidden;

        font-size: 16px;
        font-weight: 500;

        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &__deck-count {
        font-size: 16px;
        font-weight: 500;
        text-align: right;
    }

    &__actions {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__streak {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;

        width: 100px;
        height: 100px;

        border: 1px solid $border-color;
        border-radius: 50%;

        background: $counter-bg;
    }

    &__streak-value {
        display: flex;
        align-items: center;
        gap: 4px;

        color: $accent-color;
        font-size: 18px;
        font-weight: 600;
        line-height: 1;
    }

    &__streak-days,
    &__streak-label {
        font-size: 14px;
        font-weight: 500;
    }

    &__streak-days {
        line-height: 1;
    }

    &__streak-label {
        margin-top: 12px;
    }

    &__button {
        margin-top: 12px;
    }
}
</style>
