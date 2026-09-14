<template>
    <v-container
        fluid
        class="auth-page"
    >
        <v-row class="justify-center align-center fill-height">
            <v-col
                cols="12"
                class="flex justify-center"
            >
                <login-form-new
                    v-if="mode === 'login'"
                    class="auth-page__form"
                    @switch="mode = 'register'"
                />

                <register-form
                    v-else
                    class="auth-page__form"
                    @switch="mode = 'login'"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import RegisterForm from '@components/auth/register-form/ui/index.vue'
import LoginFormNew from '@components/auth/login-form/ui/index.vue'

const mode = ref<'login' | 'register'>('login')

definePageMeta({
    layout: false,
})
</script>

<style scoped lang="scss">
.auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
        to bottom,
        #f5f7fa 0%,
        #e3ecf5 30%,
        #c9dceb 60%,
        #9fc4dc 80%,
        #6eaad0 100%
    );

    &__form {
        width: 300px;
        background-color: rgba(253, 250, 254, 0.75);
        border-radius: $radius-tile;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: $shadow-logo;
        padding: 25px;
    }
}

@media (max-width: ($breakpoint-desktop - 1px)) {
    .auth-page {
        min-height: 100dvh;
        padding: 24px;
    }
    .auth-page > .v-row {
        margin: 0;
        min-width: 0;
    }
    .auth-page .v-col {
        padding: 0;
        min-width: 0;
    }
    .auth-page .auth-page__form {
        width: 100%;
        max-width: 380px;
        min-width: 0;
        padding: 24px;
        overflow-wrap: anywhere;
    }
}
@media (max-width: ($breakpoint-mobile - 1px)) {
    .auth-page {
        padding: 16px;
    }
    .auth-page .auth-page__form {
        padding: 16px;
    }
}
@media (max-width: ($breakpoint-desktop - 1px)) and (max-height: 600px) {
    .auth-page {
        align-items: flex-start;
    }
}
</style>
