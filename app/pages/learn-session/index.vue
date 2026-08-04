<template>
    <mnemo-form :use-toolbar="false">
        <template v-if="inverted">
            <div class="form-session__inverted">
                {{  currentCard?.front }}
            </div>
        </template>
        <template v-else>
            <div class="flex justify-between align-center">
                <div class="flex align-center">
                    <v-icon
                        size="24"
                    >
                        mdi-arrow-left
                    </v-icon>
                    <span>Выйти</span>
                </div>
                <span>{{ currentCard?.deckTitle }}</span>
                <span>{{ completedCount + 1 }} из {{ totalCards }}</span>
            </div>
            <div class="flex justify-center">
                <span>{{ currentCard?.front }}</span>
            </div>
            <div>
                <p>{{  currentCard?.back }}</p>
            </div>
        </template>
    </mnemo-form>
</template>

<script lang="ts" setup>
    import MnemoForm from "@components/form/mnemo-form.vue"
    import { useMnemoSessionStore } from "~/entities/review-session/model/mnemo-repeat-store"

    const { currentCard, startSession, completedCount, totalCards, resetSession } = useMnemoSessionStore()

    const { setBreadcrumbs } = useBreadcrumbs()

    const inverted = ref(false)

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