<template>
  <div class="w-full flex flex-col items-center justify-start">
    <img class="logo" src="/assets/images/logo.svg" alt="Логотип">

    <span class="title mt-2">Вход</span>
    <span class="sub-title mt-1">Войдите в свою учетную запись</span>

    <div class="w-full flex flex-col gap-2 mt-5">
      <mnemo-input
        v-model="login"
        label="Логин"
        class="w-full"
        :rules="loginRules"
        prepend-inner-icon="mdi-email-outline"
        @keydown.enter="onLogin"
      />

      <mnemo-input
        v-model="password"
        label="Пароль"
        class="w-full"
        prepend-inner-icon="mdi-lock-outline"
        :rules="passwordRules"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        type="visible ? 'text' : 'password'"
        @click:append-inner="visible = !visible"
        @keydown.enter="onLogin"
      />
    </div>

    <!-- <div class="w-full flex justify-end mt-2">
      <a class="sub-title link">Забыли пароль?</a>
    </div> -->

    <span class="mt-6 error">{{ error }}</span>

    <mnemo-button class="w-full mt-6" @click="onLogin">
      Войти
    </mnemo-button>

    <span class="sub-title mt-6">
      Нет аккаунта? <a class="link" @click.stop="emit('switch')">Зарегистрируйтесь</a>
    </span>
  </div>
</template>

<script setup lang="ts">
  import MnemoInput from "../../../ui/mnemo-input.vue"
  import MnemoButton from "../../../ui/mnemo-button.vue"

  const visible = ref(false)
  const { signIn } = useAuth()

const emit = defineEmits({
  switch: () => {}
})

const login = ref('')
const password = ref('')
const error = ref<string | null>(null)
const isLoading = ref(false)
const formRef = ref()

const loginRules = [
  (v: string) => !!v || 'Введите логин',
]

const passwordRules = [
  (v: string) => !!v || 'Введите пароль',
]

async function onLogin() {
  error.value = null

  isLoading.value = true

  try {
    const res = await signIn('credentials', {
      login: login.value,
      password: password.value,
      redirect: false,
    })

    if (res?.error) {
      error.value = 'Неверный логин или пароль'
      return
    }

    await navigateTo('/')
  } catch {
    error.value = 'Ошибка входа. Попробуйте снова.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
@use "~/assets/scss/auth" as auth;
@include auth.auth-form;
</style>
