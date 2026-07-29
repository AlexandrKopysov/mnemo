<template>
    <mnemo-form>
        <template v-slot:default>
            <div class="learn-card" :class="{ 'learn-card--front': variant === 'front' }">
                <template v-if="variant === 'front'">
                    <h2 class="learn-card__title">
                        {{ card.front }}
                    </h2>
                    <mnemo-button
                        width="180"
                        @click="variant = 'back'"
                    >
                        Показать ответ
                    </mnemo-button>
                </template>
                <template v-else>
                    <h2 class="learn-card__title">
                        {{ card.front }}
                    </h2>
                    <div class="learn-card__answer">
                        <mnemo-textarea
                            v-model="card.back"
                            full-height
                        />
                    </div>
                    <div class="learn-card__actions">
                        <mnemo-button
                            width="110"
                            variant="danger"
                            @click="onAnswer(Answer.HARD)"
                        >
                            Не вспомнил
                        </mnemo-button>
                        <mnemo-button
                            width="110"
                            variant="dark"
                            @click="onAnswer(Answer.NORMAL)"
                        >
                            Нормально
                        </mnemo-button>
                        <mnemo-button
                            width="110"
                            variant="success"
                            @click="onAnswer(Answer.EASY)"
                        >
                            Легко
                        </mnemo-button>
                    </div>
                </template>
            </div>
        </template> 
    </mnemo-form>
</template>

<script lang="ts" setup>
import mnemoForm from '~/components/form/mnemo-form.vue';
import mnemoButton from '~/components/ui/mnemo-button.vue';
import MnemoTextarea from '~/components/ui/mnemo-textarea.vue';
import { getCard } from '~/entities/cards/api/api';
import type { Answer } from '@shared/types/card';
import { reviewCard } from '~/entities/cards/api/api';

const route = useRoute()
const deckId = computed(() => String(route.params.deckId))
const cardId = computed(() => String((route.params as Record<string, string>).cardId))

const { setLastBreadcrumbs } = useBreadcrumbs()

const card = ref<ICardCreate>({
    front: '',
    back: '',
    deckId: '',
})
const variant = ref<'front' | 'back'>('front')

async function getData() {
    card.value = await getCard(deckId.value, cardId.value)
}

async function onAnswer(answer: Answer) {
    await reviewCard(deckId.value, cardId.value, answer)
}

onMounted(async () => {
    await getData()
})

watchEffect(() => {
    if (!deckId.value || !card.value?.id) return

    setLastBreadcrumbs(
        `/decks/${deckId.value}/cards`,
        {
            title: `Изучение - ${card.value.front}`
        }
    )

})
</script>

<style scoped lang="scss">
.learn-card {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
}

.learn-card--front {
    align-items: center;
    justify-content: center;
    gap: 28px;
}

.learn-card__title {
    margin: 0 0 28px;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.2;
}

.learn-card--front .learn-card__title {
    margin-bottom: 0;
}

.learn-card__answer {
    flex: 1;
    min-height: 0;
    display: flex;
    width: 100%;
}

.learn-card__answer :deep(.mnemo-textarea) {
    flex: 1;
}

.learn-card__actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 28px;
}
</style>
