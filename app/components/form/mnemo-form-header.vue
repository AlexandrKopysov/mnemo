<template>
    <div><h1>{{ title }}</h1></div>
    <mnemo-breadcrumbs
        :breadcrumbs="breadcrumbs"
    />
</template>

<script lang="ts" setup>
import MnemoBreadcrumbs from './mnemo-breadcrumbs.vue';
const route = useRoute()

const title = computed(() => route.meta.title ?? "")
const breadcrumbs = computed(() => route.meta.breadcrumbs as [] ?? []) 

</script>