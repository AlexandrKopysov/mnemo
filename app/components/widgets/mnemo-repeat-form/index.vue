<template>
    <section class="session-preview" aria-label="Сегодня к повторению">
        <template v-if="preview && preview.totalCards > 0">
            <img class="session-preview__illustration" src="~/assets/images/review-cards.svg" alt="" >
            <h2 class="session-preview__title">Сегодня к повторению</h2>
            <div class="session-preview__stats">
                <p class="session-preview__total">
                    <strong>{{ preview.totalCards }}</strong>
                    <span>{{ pluralRu(preview.totalCards, ['карточка', 'карточки', 'карточек']) }}</span>
                </p>
                <p v-if="preview.estimatedMinutes > 0" class="session-preview__estimated">
                    <span class="session-preview__icon session-preview__icon--clock" aria-hidden="true" />
                    {{ estimatedTime }}
                </p>
            </div>
            <div v-if="preview.decks.length" class="session-preview__decks">
                <span class="session-preview__decks-label">{{ decksLabel }}</span>
                <button
                    class="session-preview__decks-toggle"
                    type="button"
                    :aria-expanded="decksExpanded"
                    :aria-controls="decksId"
                    @click="decksExpanded = !decksExpanded"
                >
                    {{ decksLabel }}
                    <span class="session-preview__icon session-preview__icon--chevron" aria-hidden="true" :class="{ 'is-expanded': decksExpanded }" />
                </button>
                <ul :id="decksId" class="session-preview__decks-list" :class="{ 'is-expanded': decksExpanded }">
                    <li v-for="deck in preview.decks" :key="deck.deckId" class="session-preview__deck">
                        <span>{{ deck.title }}</span><span>· {{ deck.cardsCount }}</span>
                    </li>
                </ul>
            </div>
            <button class="session-preview__button" type="button" :disabled="isStarting" :aria-busy="isStarting" @click="startRepeat">
                {{ isStarting ? 'Запускаем…' : 'Начать повторение' }}
                <span class="session-preview__icon session-preview__icon--arrow" aria-hidden="true" />
            </button>
        </template>
        <p v-else-if="preview" class="session-preview__message">На сегодня повторений нет</p>
        <p v-else-if="!error" class="session-preview__message" role="status">Загружаем очередь повторения…</p>
        <p v-if="error" class="session-preview__message session-preview__error" role="alert">{{ error }}</p>
    </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMnemoSessionStore } from '~/entities/review-session/model/mnemo-repeat-store'
import { pluralRu } from '~/utils/plural-ru'

const sessionStore = useMnemoSessionStore()
const { preview, activeSession } = storeToRefs(sessionStore)
const decksExpanded = ref(false)
const decksId = useId()
const isStarting = ref(false)
const error = ref('')
const decksLabel = computed(() => {
    const count = preview.value?.decks.length ?? 0
    return `Из ${count} ${pluralRu(count, ['колоды', 'колод', 'колод'])}`
})
const estimatedTime = computed(() => {
    const minutes = preview.value?.estimatedMinutes ?? 0
    return minutes === 1 ? 'Около минуты' : `Около ${minutes} ${pluralRu(minutes, ['минуты', 'минут', 'минут'])}`
})

const startRepeat = async () => {
    if (isStarting.value) return
    isStarting.value = true
    error.value = ''
    try {
        await sessionStore.startSession()
        const sessionId = activeSession.value?.id
        if (!sessionId) throw new Error('Missing session')
        await navigateTo({ name: 'learn-session-sessionId', params: { sessionId } })
    } catch {
        error.value = 'Не удалось начать повторение. Попробуйте ещё раз.'
    } finally {
        isStarting.value = false
    }
}

onMounted(async () => {
    try {
        await sessionStore.loadPreview()
    } catch {
        error.value = 'Не удалось загрузить очередь повторения. Обновите страницу.'
    }
})
</script>

<style scoped lang="scss">
@use "~/assets/scss/review" as review;
.session-preview {
    display: grid;
    grid-template-columns: 2$touch-target minmax(0, 1fr) auto;
    grid-template-areas: "art title title" "art stats stats" "art decks action";
    align-items: center;
    column-gap: 32px;
    row-gap: 16px;
    padding: 30px 28px 32px;
    border: 1px solid review.$border;
    border-radius: $radius-surface;
    background: $surface;
    color: review.$text;
    box-shadow: review.$shadow;

    &__icon {
        display: inline-block;
        background-color: currentColor;
        mask-position: center;
        mask-repeat: no-repeat;
        mask-size: contain;
    }
    &__icon--clock {
        mask-image: url("~/assets/icons/clock-outline.svg");
    }
    &__icon--chevron {
        mask-image: url("~/assets/icons/chevron-down.svg");
    }
    &__icon--arrow {
        mask-image: url("~/assets/icons/arrow-right.svg");
    }
    &__illustration {
        grid-area: art;
        width: 210px;
        max-width: 100%;
        justify-self: center;
    }
    &__title {
        grid-area: title;
        margin: 0;
        font-size: 30px;
        line-height: 1.25;
        font-weight: 700;
    }
    &__stats {
        grid-area: stats;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px 36px;
        min-width: 0;
    }
    &__total {
        display: flex;
        align-items: baseline;
        gap: 16px;
        margin: 0;
        font-size: 24px;
        font-weight: 500;
    }
    &__total strong {
        font-size: 80px;
        line-height: 1;
        font-weight: 700;
        letter-spacing: -2px;
    }
    &__estimated {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 0;
        font-size: 18px;
    }
    &__estimated .session-preview__icon {
        width: 24px;
        height: 24px;
        flex: none;
        color: review.$muted;
    }
    &__decks {
        grid-area: decks;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px 16px;
        min-width: 0;
        font-size: 18px;
    }
    &__decks-label {
        flex-shrink: 0;
    }
    &__decks-toggle {
        display: none;
        border: 0;
        background: transparent;
    }
    &__decks-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 0;
        margin: 0;
        list-style: none;
        min-width: 0;
    }
    &__deck {
        display: flex;
        align-items: baseline;
        gap: 5px;
        max-width: 100%;
        padding: 9px 16px;
        border-radius: 18px;
        background: review.$badge-bg;
        color: review.$badge-text;
        font-size: 16px;
        line-height: 1.4;
        font-weight: 700;
    }
    &__deck span:first-child {
        overflow-wrap: anywhere;
        min-width: 0;
    }
    &__deck span:last-child {
        white-space: nowrap;
    }
    &__button {
        grid-area: action;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 18px;
        min-height: 60px;
        padding: 14px 28px;
        border: 0;
        border-radius: 11px;
        background: review.$action;
        color: $surface;
        font-size: 20px;
        line-height: 1.4;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.15s ease;
    }
    &__button:hover {
        background: review.$action-hover;
    }
    &__button:active {
        background: review.$action-active;
    }
    &__button:disabled {
        opacity: 0.7;
        cursor: wait;
    }
    &__button .session-preview__icon {
        width: 26px;
        height: 26px;
        flex: none;
    }
    &__message {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 18px;
    }
    &__error {
        color: $error;
    }
}

@media (max-width: ($breakpoint-preview - 1px)) {
    .session-preview {
        grid-template-columns: minmax(0, 1fr) auto;
        grid-template-areas: "title art" "stats art" "decks action";
        column-gap: 24px;
        padding: 28px 30px 24px;
        &__illustration {
            width: 165px;
            justify-self: end;
        }
        &__title {
            font-size: 26px;
        }
        &__stats {
            column-gap: 28px;
        }
        &__total {
            font-size: 22px;
            gap: 12px;
        }
        &__decks {
            display: block;
        }
        &__decks-list {
            margin-top: 4px;
        }
        &__button {
            align-self: end;
            padding-inline: 24px;
        }
    }
}

@media (max-width: ($breakpoint-mobile - 1px)) {
    .session-preview {
        grid-template-columns: minmax(0, 1fr) 90px;
        grid-template-areas: "title title" "stats art" "action action" "decks decks";
        gap: 16px 8px;
        padding: 20px;
        border-radius: 14px;
        &__title {
            font-size: 23px;
        }
        &__illustration {
            width: 100px;
            max-width: none;
        }
        &__stats {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
        }
        &__total {
            font-size: 20px;
        }
        &__total strong {
            font-size: 60px;
        }
        &__estimated {
            font-size: 16px;
        }
        &__estimated .session-preview__icon {
            width: 22px;
            height: 22px;
        }
        &__button {
            width: 100%;
            min-height: 56px;
            padding-inline: 12px;
            font-size: 18px;
        }
        &__decks {
            font-size: 16px;
        }
        &__decks-label {
            display: none;
        }
        &__decks-toggle {
            display: flex;
            align-items: center;
            gap: 12px;
            min-height: 28px;
            color: inherit;
            cursor: pointer;
        }
        &__decks-toggle .session-preview__icon {
            width: 20px;
            height: 20px;
            color: review.$toggle;
        }
        &__decks-toggle .is-expanded {
            transform: rotate(180deg);
        }
        &__decks-list {
            display: none;
            margin-top: 12px;
        }
        &__decks-list.is-expanded {
            display: flex;
        }
    }
}
</style>
