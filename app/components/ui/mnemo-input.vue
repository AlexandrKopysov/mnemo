<template>
  <v-text-field
    v-model="model"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :error="error"
    :type="type"
    :prepend-inner-icon="prependInnerIcon"
    :append-inner-icon="appendInnerIcon"
    :rules="rules"
    variant="outlined"
    density="compact"
    :hide-details="hideDetails"
    class="mnemo-input"
    :max-width="maxWidth"
    @click:append-inner="emit('click:append-inner')"
  />
</template>

<script setup lang="ts">
  interface IProps {
    prependIcon?: string,
    prependInnerIcon?: string,
    appendInnerIcon?: string,
    label?: string,
    placeholder?: string,
    disabled?: boolean,
    error?: boolean,
    type?: string,
    hideDetails?: boolean,
    rules?: any[],
    maxWidth?: string | number
  }

  const props = withDefaults(defineProps<IProps>(), {
    label: "",
    placeholder: "",
    disabeld: false,
    error: false,
    type: "text",
    appendIcon: "",
    prependIcon: "",
    prependInner: "",
    hideDetails: true,
    rules: () => [],
  })

  const emit = defineEmits<{
    (e: 'click:append-inner'): void
  }>()

  const model = defineModel()

</script>

<style scoped lang="scss">
.mnemo-input {
  :deep(.v-field) {
    height: 38px;
    min-height: 38px;
    background: #ffffff;
    background-color: #ffffff;
    border-radius: 4px;
  }

  :deep(.v-field__overlay) {
    background: transparent;
  }

  :deep(.v-field__input) {
    height: 38px;
    min-height: 38px;
    padding-top: 0;
    padding-bottom: 0;
    background: transparent;
    box-shadow: none;
    outline: none;
    appearance: none;
  }

  :deep(input) {
    background: transparent;
    box-shadow: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
  }

  :deep(input:-webkit-autofill),
  :deep(input:-webkit-autofill:hover),
  :deep(input:-webkit-autofill:focus),
  :deep(input:-webkit-autofill:active) {
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
    -webkit-text-fill-color: #334155 !important;
    transition: background-color 9999s ease-in-out 0s;
  }

  :deep(.v-input__details) {
    display: none;
  }

  :deep(.v-field__prepend-inner),
  :deep(.v-field__append-inner) {
    height: 38px;
    padding-top: 0;
    align-items: center;
  }
}
</style>

