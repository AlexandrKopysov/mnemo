<template>
    <h1>{{ title }}</h1>
    <mnemo-breadcrumbs
        :breadcrumbs="breadcrumbs"
    />
</template>

<script lang="ts" setup>
import MnemoBreadcrumbs from './mnemo-breadcrumbs.vue';
import type { IBreadcrumb } from './mnemo-breadcrumbs.vue'

export interface IPropsHeader {
    title?: string,
    breadcrumbs?: IBreadcrumb[]
}

const props = withDefaults(defineProps<IPropsHeader>(), {
    title: '',
    breadcrumbs: () => [],
})
</script>

<style lang="scss" scoped>
    h1 {
        min-height: 48px;
    }
</style>