<script setup lang="ts">
import { computed } from 'vue'
import {
  BUTTON_NATIVE_TYPE,
  BUTTON_VARIANT,
  type ButtonNativeType,
  type ButtonVariant,
} from '~/types/ui/button'

interface Props {
  width?: string
  loading?: boolean
  disabled?: boolean
  prependIcon?: string
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
  nativeType?: ButtonNativeType
  variant?: ButtonVariant
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  prependIcon: '',
  size: 'large',
  nativeType: BUTTON_NATIVE_TYPE.BUTTON,
  variant: BUTTON_VARIANT.PRIMARY,
  block: false,
  width: ""
})

const emit = defineEmits<{
  click: []
}>()

function handleClick() {
  emit('click')
}

const variantConfig = computed(() => {
  switch (props.variant) {
    case BUTTON_VARIANT.DANGER:
      return {
        vuetifyVariant: 'flat' as const,
        color: 'mnemo-danger',
        className: 'mnemo-btn--danger',
      }

    case BUTTON_VARIANT.DARK:
      return {
        vuetifyVariant: 'flat' as const,
        color: 'mnemo-dark',
        className: 'mnemo-btn--dark',
      }

    case BUTTON_VARIANT.OUTLINE:
      return {
        vuetifyVariant: 'outlined' as const,
        color: 'mnemo-outline',
        className: 'mnemo-btn--outline',
      }

    case BUTTON_VARIANT.SECONDARY:
      return {
        vuetifyVariant: 'flat' as const,
        color: 'mnemo-secondary',
        className: 'mnemo-btn--secondary',
      }

    case BUTTON_VARIANT.SUCCESS:
      return {
        vuetifyVariant: 'flat' as const,
        color: 'mnemo-success',
        className: 'mnemo-btn--success',
      }

    case BUTTON_VARIANT.PRIMARY:
    default:
      return {
        vuetifyVariant: 'flat' as const,
        color: 'mnemo-primary',
        className: 'mnemo-btn--primary',
      }
  }
})

const buttonClass = computed(() => [
  'mnemo-btn',
  variantConfig.value.className,
  {
    'mnemo-btn--block': props.block,
  },
])
</script>

<template>
  <v-btn
    :width="width"
    :type="nativeType"
    :loading="loading"
    :disabled="disabled"
    :prepend-icon="prependIcon || undefined"
    :size="size"
    :variant="variantConfig.vuetifyVariant"
    :color="variantConfig.color"
    :class="buttonClass"
    @click="handleClick"
  >
    <slot />
  </v-btn>
</template>

<style scoped lang="scss">
.mnemo-btn {
  min-height: 38px;
  max-height: 38px;
  border-radius: 8px;
  padding: 0 16px;

  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0;

  text-transform: none;

  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.mnemo-btn--block {
  width: 100%;
}

/* =========================
   PRIMARY
========================= */

.mnemo-btn--primary {
  background: $primary;
  color: $text-light;

  &:hover {
    background: $primary-hover;
  }

  &:active {
    background: $primary-active;
  }
}

/* =========================
   SECONDARY
========================= */

.mnemo-btn--secondary {
  background: $secondary;
  color: $text-dark;

  &:hover {
    background: $secondary-hover;
  }

  &:active {
    background: $secondary-active;
  }
}

/* =========================
   DANGER
========================= */

.mnemo-btn--danger {
  background: $danger;
  color: $text-light;

  &:hover {
    background: $danger-hover;
  }

  &:active {
    background: $danger-active;
  }
}

/* =========================
   DARK
========================= */

.mnemo-btn--dark {
  background: $dark;
  color: $text-light;

  &:hover {
    background: $dark-hover;
  }

  &:active {
    background: $dark-active;
  }
}

/* =========================
   OUTLINE
========================= */

.mnemo-btn--outline {
  background: transparent;
  border: 1px solid $outline-border;
  color: $text-dark;

  &:hover {
    background: $outline-hover;
  }

  &:active {
    background: #e8eef3;
  }
}

/* =========================
   SUCCESS
========================= */

.mnemo-btn--success {
  background: $success;
  color: $text-light;

  &:hover {
    background: $success-hover;
  }

  &:active {
    background: $success-active;
  }
}
</style>
