<template>
    <div
        class="app-layout"
        :class="{ 'app-layout--contained': route.meta.contained }"
    >
        <mnemo-header />
        <mnemo-breadcrumbs class="mb-6" />
        <main class="app-layout__main">
            <div class="app-layout__container">
                <slot />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import MnemoHeader from '~/components/header/mnemo-header.vue'
import MnemoBreadcrumbs from '~/components/breadcrumbs/mnemo-breadcrumbs.vue'

const route = useRoute()
</script>

<style scoped lang="scss">
@use '~/assets/scss/layout' as layout;
.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    background-image: url('~/assets/images/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &--contained {
        height: 100dvh;
    }

    &__main {
        display: flex;
        flex: 1;
        min-height: 0;
        min-width: 0;
    }

    &__container {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;

        @include layout.page-container;
        padding-bottom: 40px;
        min-width: 0;

        min-height: 0;
    }
}

.app-layout__container > :deep(*) {
    min-width: 0;
    max-width: 100%;
}
</style>
