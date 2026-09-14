<template>
    <v-progress-linear
        :model-value="progressValue"
        :height="10"
        color="#5fa391"
    />
</template>

<script lang="ts" setup>
interface IProps {
    value: number
}

const props = defineProps<IProps>()

const progressValue = computed(() => props.value)

watch(
    () => props.value,
    (value) => {
        console.log(value)
    },
)
</script>
