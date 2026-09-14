<template>
    <v-textarea
        v-model="model"
        :label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="error"
        :rows="rows"
        :auto-grow="effectiveAutoGrow"
        variant="outlined"
        density="compact"
        :hide-details="hideDetails"
        class="mnemo-textarea"
        :class="{ 'mnemo-textarea--full-height': fullHeight }"
    />
</template>

<script setup lang="ts">
interface Props {
    label?: string
    placeholder?: string
    disabled?: boolean
    error?: boolean
    rows?: number
    autoGrow?: boolean
    hideDetails?: boolean
    fullHeight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    placeholder: '',
    disabled: false,
    error: false,
    rows: 5,
    autoGrow: true,
    hideDetails: true,
    fullHeight: false,
})

const model = defineModel<string>()
const effectiveAutoGrow = computed(() => (props.fullHeight ? false : props.autoGrow))
</script>

<style scoped lang="scss">
.mnemo-textarea {
    width: 100%;

    :deep(.v-field) {
        background: $surface;
        border-radius: $radius-control;
    }

    :deep(.v-field__input) {
        min-height: 120px;
        font-size: 14px;
        line-height: 1.5;
    }

    :deep(textarea) {
        resize: vertical;
    }

    &--full-height {
        height: 100%;
        min-height: 0;

        :deep(.v-input__control),
        :deep(.v-field),
        :deep(.v-field__field),
        :deep(.v-field__input) {
            height: 100%;
            min-height: 0;
        }

        :deep(textarea) {
            height: 100%;
            min-height: 0;
            resize: none;
        }
    }
}
</style>
