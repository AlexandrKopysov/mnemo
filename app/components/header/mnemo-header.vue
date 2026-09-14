<template>
    <div class="mnemo-header">
        <div class="mnemo-header__container">
            <div class="logo" @click.stop="OnClickLogin">
                <v-img
                    src="/assets/images/logo_2.svg"
                    width="30"
                    height="30"
                />
                <span class="logo-text">Mnemo</span>
            </div>
            <div class="flex">
                <!-- TODO. Уведомления не реализованы -->
                <!-- <div>Уведомления</div> -->
                <profile />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Profile from "./profile.vue"

function OnClickLogin() {
    navigateTo('/')
}

</script>

<style lang="scss" scoped>
@use "~/assets/scss/layout" as layout;
.mnemo-header {
    flex: 0 0 auto;
    width: 100%;

    &__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        @include layout.page-container;
        padding-block: 24px;
    }
}

.logo {
    display: flex;
    align-items: center;
    background-color: $surface;
    border-radius: 50px;
    height: 48px;
    box-shadow: $shadow-logo;
    padding: 0px 10px;
    gap: 5px;
    cursor: pointer;

    &-text {
        font-size: 24px;
        line-height: 24px;
    }
}

@media (max-width: ($breakpoint-desktop - 1px)) {
    .mnemo-header__container {
        gap: 16px;
        min-width: 0;
    }
    .logo {
        flex-shrink: 0;
    }
}
@media (max-width: ($breakpoint-mobile - 1px)) {
    .mnemo-header__container {
        padding-block: 12px;
    }
}
</style>
