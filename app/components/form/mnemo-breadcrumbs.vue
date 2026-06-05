<template>
    <div>
        {{ breadcrumbs }}
    </div>
</template>

<script lang="ts" setup>

interface IProps {
    breadcrumbs?: {
        title: string,
        to: string
    }[]
}

const props = withDefaults(defineProps<IProps>(), {
    breadcrumbs: () => []
})
</script>