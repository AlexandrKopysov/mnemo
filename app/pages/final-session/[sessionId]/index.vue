<template>
    <mnemo-form-final-session
        :total-cards="totalCards"
        :easy="easyItems"
        :normal="normalItems"
        :hard="hardItems"
    />
</template>

<script lang="ts" setup>
import MnemoFormFinalSession from '@components/form/mnemo-form-final-session/index.vue'
import { getReviewSessionById } from '~/entities/review-session/api'
import { ANSWER } from '@shared/types/card'

// const mnemoSessionStore = useMnemoSessionStore()

const route = useRoute()
const sessionId = computed(() => String(route.params.sessionId))
const session = ref<ISession>()

const easyItems = ref<IReviewSessionItem[]>([])
const normalItems = ref<IReviewSessionItem[]>([])
const hardItems = ref<IReviewSessionItem[]>([])
const totalCards = ref<number>(0)

function prepareData() {
    easyItems.value = session.value?.items.filter((item) => item.answer === ANSWER.EASY) || []
    normalItems.value = session.value?.items.filter((item) => item.answer === ANSWER.NORMAL) || []
    hardItems.value = session.value?.items.filter((item) => item.answer === ANSWER.HARD) || []
    totalCards.value = session.value?.totalCards || 0
}

onMounted(async () => {
    session.value = await getReviewSessionById(sessionId.value)
    prepareData()
})
</script>
