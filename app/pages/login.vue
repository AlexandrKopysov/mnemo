<script setup lang="ts">
import RegisterForm from "@components/auth/register-form/ui/index.vue"
import LoginFormNew from "@components/auth/login-form/ui/index.vue"

const mode = ref<'login' | 'register'>('login')

definePageMeta({
  layout: false
})
</script>

<template>
  <v-container fluid class="auth-page">
    <v-row
        class="
            justify-center 
            align-center 
            fill-height"
    >
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

<style scoped>
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
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.10);
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
      padding: 25px;
    }
  }
</style>
