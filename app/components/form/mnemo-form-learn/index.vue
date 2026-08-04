<template>
    <template v-if="!inverted">
        <front-form 
            :front="front"
            @click="() => inverted = !inverted"
        />
    </template>
    <template v-else>
        <back-form
            :front
            :back
            :title
            :total-cards
            :completed-count
            :progress-percent
            @click="onClick"
        />
    </template>
</template>

<script lang="ts" setup>
import type { Answer } from "@shared/types/card";
import BackForm from "./back.vue";
import FrontForm from "./front.vue";

interface IProps {
    front?: string,
    title?: string,
    back?: string,
    completedCount?: number,
    totalCards?: number,
    progressPercent?: number
}

const props = withDefaults(defineProps<IProps>(), {
    title: "",
    front: "",
    back: "",
    completedCount: 0,
    totalCards: 0,
    progressPercent: 0
})

const emit = defineEmits<{
    (e: "click", variant: Answer): void
}>()

const inverted = ref(false)

const onClick = (variant: Answer) => {
    emit('click', variant)
    inverted.value = !inverted.value
}

</script>

<style lang="scss" scoped>
    

</style>
