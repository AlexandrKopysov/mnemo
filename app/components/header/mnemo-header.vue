<template>
    <div class="flex justify-between align-center">
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
</template>

<script setup lang="ts">
import Profile from "./profile.vue"

function OnClickLogin() {
    navigateTo('/')
}

</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 50px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
    padding: 0px 10px;
    gap: 5px;
    cursor: pointer;

    &-text {
        font-size: 24px;
        line-height: 24px;
    }
}
</style>