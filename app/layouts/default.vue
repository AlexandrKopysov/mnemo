<template>
    <div class="layout">
        <div class="layout__container">
            <mnemo-header />
            <main class="layout__content">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import MnemoHeader from '~/components/header/mnemo-header.vue'
</script>

<style scoped lang="scss">
.layout {
    min-height: 100vh;
    background-image: url('~/assets/images/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.layout__container {
    width: 100%;
    max-width: $container-max-width;
    margin: 0 auto;
    padding: 32px $container-padding-mobile;

    @media (min-width: 768px) {
        padding-inline: $container-padding-tablet;
    }

    @media (min-width: 1280px) {
        padding-inline: $container-padding-desktop;
    }
}

.layout__content {
    // margin-top: 96px;
}
</style>