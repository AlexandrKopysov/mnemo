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
        className: 'mnemo-btn--danger',
      }

    case BUTTON_VARIANT.DARK:
      return {
        vuetifyVariant: 'flat' as const,
        className: 'mnemo-btn--dark',
      }

    case BUTTON_VARIANT.OUTLINE:
      return {
        vuetifyVariant: 'outlined' as const,
        className: 'mnemo-btn--outline',
      }

    case BUTTON_VARIANT.SECONDARY:
      return {
        vuetifyVariant: 'flat' as const,
        className: 'mnemo-btn--secondary',
      }

    case BUTTON_VARIANT.SUCCESS:
      return {
        vuetifyVariant: 'flat' as const,
        className: 'mnemo-btn--success',
      }

    case BUTTON_VARIANT.PRIMARY:
    default:
      return {
        vuetifyVariant: 'flat' as const,
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
    :class="buttonClass"
    @click="handleClick"
  >
    <slot />
  </v-btn>
</template>

<style scoped lang="scss">
.mnemo-btn {
    min-height: $control-height;
    max-height: $control-height;
    border-radius: $radius-control;
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

@each $name, $normal, $hover, $active,
    $text
        in (
            primary $primary $primary-hover $primary-active $text-light,
            secondary $secondary $secondary-hover $secondary-active $text-dark,
            danger $danger $danger-hover $danger-active $text-light,
            dark $dark $dark-hover $dark-active $text-light,
            success $success $success-hover $success-active $text-light,
            outline transparent $outline-hover $outline-active $text-dark
        )
{
    .mnemo-btn--#{$name} {
        background: $normal;
        color: $text;
        &:hover {
            background: $hover;
        }
        &:active {
            background: $active;
        }
    }
}
.mnemo-btn--outline {
    border: 1px solid $outline-border;
}

@media (max-width: ($breakpoint-desktop - 1px)) {
    .mnemo-btn {
        min-height: $touch-target;
        max-height: none;
        height: auto;
        max-width: 100%;
        white-space: normal;
    }
    .mnemo-btn :deep(.v-btn__content) {
        min-width: 0;
        white-space: normal;
        overflow-wrap: anywhere;
    }
}
</style>
