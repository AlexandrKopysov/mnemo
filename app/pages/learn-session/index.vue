<template>
    <mnemo-form-learn
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
    import MnemoFormLearn from "@components/form/mnemo-form-learn/index.vue"
import type { ANSWER } from "@shared/types/card"
import { useMnemoSessionStore } from "~/entities/review-session/model/mnemo-repeat-store"

    const mnemoSessionStore = useMnemoSessionStore()

    const { startSession, completeCurrentCard } =  mnemoSessionStore

    const { currentCard, completedCount, totalCards, progressPercent } = storeToRefs(mnemoSessionStore )

    const { setBreadcrumbs } = useBreadcrumbs()

    const onClick = (variant: ANSWER) => {
        completeCurrentCard(variant)
    }

    onMounted(async () => {
        setBreadcrumbs([{
            title: 'Ваши колоды',
            to: '/',
        }, {
            title: 'Дневная сессия'
        }])

        await startSession()
    })
</script>
