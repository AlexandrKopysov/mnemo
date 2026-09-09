<template>
    <section class="mnemo-form">
        <header 
            v-if="props.useToolbar"
            class="mnemo-form__toolbar"
        >
            <div class="mnemo-form__toolbar-left">
                <slot name="toolbar-left"></slot>
            </div>
            <div class="mnemo-form__toolbar-right">
                <slot name="toolbar-right"></slot>
            </div>
        </header>
        <div class="mnemo-form__content">
            <slot />
        </div>
    </section>
</template>

<script setup lang="ts">

interface IPropsForm {
    title?: string,
    useToolbar?: boolean
}

const props = withDefaults(defineProps<IPropsForm>(), {
    useToolbar: true
})

</script>

<style scoped lang="scss">
    .mnemo-form {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;

        min-height: 0;

        overflow: hidden;

        background: #fff;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
        border-radius: 20px;

        &__toolbar {
            display: flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: space-between;

            padding: 20px;
        }

        &__content {
            flex: 1 1 auto;
            min-height: 0;

            overflow-y: auto;
            overflow-x: hidden;

            padding: 24px;

            scrollbar-gutter: stable;
        }
    }

@media (max-width: 1279px) {
    .mnemo-form, .mnemo-form__content, .mnemo-form__toolbar,
    .mnemo-form__toolbar-left, .mnemo-form__toolbar-right { min-width: 0; }
    .mnemo-form__toolbar { gap: 12px; }
    .mnemo-form__toolbar-left, .mnemo-form__toolbar-right {
        display: flex;
        gap: 8px;
        max-width: 100%;
    }
}
@media (max-width: 767px) {
    .mnemo-form__toolbar { flex-direction: column; align-items: stretch; padding: 16px; }
    .mnemo-form__toolbar-left, .mnemo-form__toolbar-right { width: 100%; }
    .mnemo-form__toolbar-left:empty, .mnemo-form__toolbar-right:empty { display: none; }
    // Flex basis allows controls with inline presentation widths to shrink.
    .mnemo-form__toolbar :deep(.mnemo-btn), .mnemo-form__toolbar :deep(.mnemo-input) {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
    }
    .mnemo-form__content { padding: 16px; }
}
</style>
