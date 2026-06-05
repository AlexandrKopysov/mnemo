// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "node:path"

const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  alias: {
    '@components': resolve(__dirname, './app/components/'),
    // '@composables': resolve(__dirname, './app/composables/'),
    // '@types': resolve(__dirname, './app/types/'),
    '@shared': resolve(__dirname, './shared/'),
    '@utils': resolve(__dirname, './server/utils/'),
    // '@api': resolve(__dirname, './server/api/'),
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxt/image",
    "@pinia/nuxt",
    "dayjs-nuxt",
    "nuxt-typed-router",
    "nuxt-file-storage",
    '@nuxtjs/google-fonts',
    '@sidebase/nuxt-auth',
    "vuetify-nuxt-module",
    "@nuxtjs/tailwindcss"
  ],
  googleFonts: {
    families: {
      Roboto: [100, 200, 300, 400, 500, 700],
      Montserrat: [400, 500]
    },
    display: 'swap'
  },
  auth: {
    provider: { type: 'authjs' },
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: `${process.env.AUTH_ORIGIN || 'http://localhost:3000'}/api/auth`,
  },
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET || (!isProd ? 'dev-auth-secret-local' : undefined),
  },
  css: ["~/assets/scss/global.scss"],
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#4CAF50',
              'mnemo-primary': '#2563EB',
              'mnemo-secondary': '#64748B',
              'mnemo-outline': '#CBD5E1'
            },
          },
        },
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/scss/_vars.scss" as *;
          @use "~/assets/scss/_mixins.scss" as *;
        `
        }
      }
    }
  },
})
