<template>
    <div class="w-full flex flex-col items-center justify-start">
        <img
            class="logo"
            src="/assets/images/logo.svg"
            alt="Логотип"
        />

        <span class="title mt-2">Регистрация</span>
        <span class="sub-title mt-1">Создайте новый аккаунт</span>

        <div class="w-full flex flex-col gap-2 mt-5">
            <mnemo-input
                v-model="login"
                label="Логин"
                class="w-full"
                prepend-inner-icon="mdi-email-outline"
                :rules="loginRules"
                @keydown.enter="onRegister"
            />

            <mnemo-input
                v-model="password"
                label="Пароль"
                class="w-full"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="visiblePass ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visiblePass ? 'text' : 'password'"
                :rules="passwordRules"
                @click:append-inner="visiblePass = !visiblePass"
                @keydown.enter="onRegister"
            />

            <mnemo-input
                v-model="repeatPassword"
                label="Повторите пароль"
                class="w-full"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="visibleRepeatPass ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleRepeatPass ? 'text' : 'password'"
                :rules="repeatPasswordRules"
                @click:append-inner="visibleRepeatPass = !visibleRepeatPass"
                @keydown.enter="onRegister"
            />
        </div>

        <span class="mt-6 error">{{ error }}</span>

        <mnemo-button
            class="w-full mt-6"
            @click="onRegister"
        >
            Зарегистрироваться
        </mnemo-button>

        <span class="sub-title mt-6">
            Есть аккаунт?
            <a
                class="link"
                @click.stop="emit('switch')"
                >Войти</a
            >
        </span>
    </div>
</template>

<script setup lang="ts">
import MnemoInput from '../../../ui/mnemo-input.vue'
import MnemoButton from '../../../ui/mnemo-button.vue'
import { register } from '../../../../entities/login/api/api'

const visiblePass = ref(false)
const visibleRepeatPass = ref(false)

const emit = defineEmits({
    switch: () => {},
})

const login = ref('')
const password = ref('')
const repeatPassword = ref('')
const error = ref<string | null>(null)
const isLoading = ref(false)

const loginRules = [(v: string) => !!v || 'Введите логин']

const passwordRules = [
    (v: string) => !!v || 'Введите пароль',
    (v: string) => v.length >= 6 || 'Минимум 6 символов',
]

const repeatPasswordRules = [
    (v: string) => !!v || 'Повторите пароль',
    (v: string) => v === password.value || 'Пароли не совпадают',
]

async function onRegister() {
    error.value = null

    isLoading.value = true

    try {
        await register({
            login: login.value,
            password: password.value,
            repeatPassword: repeatPassword.value,
        })

        // success.value = 'Регистрация успешна. Теперь войдите.'
        login.value = ''
        password.value = ''
        repeatPassword.value = ''
        // formRef.value.reset()
        emit('switch')
    } catch (e: any) {
        error.value = e?.data?.statusMessage || 'Ошибка регистрации'
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped lang="scss">
@use '~/assets/scss/auth' as auth;
@include auth.auth-form;
</style>

((v: string) => string | boolean)[]
