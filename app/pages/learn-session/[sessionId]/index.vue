<template>
    <mnemo-form-learn
        :card-id="currentCard?.id"
        :busy="busy"
        :error="error"
        :title="currentCard?.deckTitle"
        :front="currentCard?.cardFront"
        :back="currentCard?.cardBack"
        :completed-count
        :total-cards
        :progress-percent
        @click="onClick"
    />
</template>

<script lang="ts" setup>
import MnemoFormLearn from '@components/form/mnemo-form-learn/index.vue'
import type { ANSWER } from '@shared/types/card'
import { useMnemoSessionStore } from '~/entities/review-session/model/mnemo-repeat-store'

definePageMeta({ contained: true })

const sessionStore = useMnemoSessionStore()

const { completeCurrentCard } = sessionStore

const { currentCard, completedCount, totalCards, progressPercent } = storeToRefs(sessionStore)

const { setBreadcrumbs } = useBreadcrumbs()

const busy = ref(false)
const error = ref('')
const onClick = async (variant: ANSWER) => {
    if (busy.value) return
    busy.value = true
    error.value = ''
    try {
        await completeCurrentCard(variant)
    } catch {
        error.value = 'Не удалось сохранить оценку. Попробуйте ещё раз.'
    } finally {
        busy.value = false
    }
}

onMounted(async () => {
    setBreadcrumbs([
        {
            title: 'Ваши колоды',
            to: '/',
        },
        {
            title: 'Текущая сессия',
        },
    ])
})
</script>
