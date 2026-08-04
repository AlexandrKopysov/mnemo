<template>
    <mnemo-form-learn
        :title="currentCard?.deckTitle"
        :front="currentCard?.front"
        :back="currentCard?.back"
        :completed-count
        :total-cards
        :progress-percent
        @click="onClick"
    />
</template>

<script lang="ts" setup>
    import MnemoFormLearn from "@components/form/mnemo-form-learn/index.vue"
import type { Answer } from "@shared/types/card"
import { useMnemoSessionStore } from "~/entities/review-session/model/mnemo-repeat-store"

    const mnemoSessionStore = useMnemoSessionStore()

    const { startSession, resetSession, completeCurrentCard } =  mnemoSessionStore

    const { currentCard, completedCount, totalCards, progressPercent } = storeToRefs(mnemoSessionStore)

    const { setBreadcrumbs } = useBreadcrumbs()

    const onClick = (variant: Answer) => {
        completeCurrentCard(variant)
    }

    onMounted(async () => {
        await startSession()
    })

    watchEffect(() => {
        setBreadcrumbs([{
            title: 'Ваши колоды',
            to: '/',
        }, {
            title: 'Дневная сессия'
        }])
    })
</script>
