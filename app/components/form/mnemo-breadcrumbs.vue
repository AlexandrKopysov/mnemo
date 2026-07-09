<template>
    <div>
        {{ breadcrumbs }}
    </div>
</template>

<script lang="ts" setup>

export interface IBreadcrumb {
    title: string,
    to: string
}

interface IProps {
    breadcrumbs?: IBreadcrumb[]
}

const props = withDefaults(defineProps<IProps>(), {
    breadcrumbs: () => []
})
</script>