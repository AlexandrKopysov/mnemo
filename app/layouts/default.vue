<template>
    <div class="app-layout">
        <mnemo-header />
        <mnemo-breadcrumbs class="mb-6"/>
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
</script>

<style scoped lang="scss">
.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    background-image: url('~/assets/images/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &__main {
        display: flex;
        flex: 1;
        min-height: 0;
    }

    &__container {
        display: flex;
        flex: 1;
        flex-direction: column;

        width: 100%;
        max-width: $container-max-width;
        margin: 0 auto;
        padding-bottom: 40px;

        min-height: 0;
    }
}

@media (max-width: 1279px) {
    .app-layout__main, .app-layout__container { min-width: 0; }
    .app-layout__container { padding-inline: $container-padding-tablet; }
    .app-layout__container > :deep(*) { min-width: 0; max-width: 100%; }
}
@media (max-width: 767px) {
    .app-layout__container { padding-inline: $container-padding-mobile; }
}
</style>
