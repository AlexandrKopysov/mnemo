<template>
    <section class="mnemo-form" :class="{ 'mnemo-form--page-scroll': pageScroll, 'mnemo-form--sticky-toolbar': stickyToolbar }">
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
    useToolbar?: boolean,
    pageScroll?: boolean,
    stickyToolbar?: boolean
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

    min-width: 0;
    min-height: 0;

    overflow: hidden;

    background: $surface;
    box-shadow: $shadow-surface;
    border-radius: $radius-surface;

    &--page-scroll {
        flex: 1 0 auto;
        min-height: auto;
        overflow: visible;
        .mnemo-form__content {
            flex: 1 0 auto;
            min-height: auto;
            overflow: visible;
        }
    }
    &--sticky-toolbar .mnemo-form__toolbar {
        position: sticky;
        top: 0;
        z-index: 20;
        background: $surface;
        border-radius: $radius-surface $radius-surface 0 0;
    }
    &__toolbar-left,
    &__toolbar-right {
        display: flex;
        gap: 8px;
        min-width: 0;
        max-width: 100%;
    }
    &__toolbar {
        display: flex;
        min-width: 0;
        flex: 0 0 auto;
        align-items: center;
        justify-content: space-between;

        padding: 20px;
    }

    &__content {
        flex: 1 1 auto;
        min-width: 0;
        min-height: 0;

        overflow-y: auto;
        overflow-x: hidden;

        padding: 24px 20px;
    }
}

@media (max-width: ($breakpoint-desktop - 1px)) {
    .mnemo-form__toolbar {
        gap: 12px;
    }
}
@media (max-width: ($breakpoint-mobile - 1px)) {
    .mnemo-form__toolbar {
        flex-direction: column;
        align-items: stretch;
        padding: 16px;
    }
    .mnemo-form__toolbar-left,
    .mnemo-form__toolbar-right {
        width: 100%;
    }
    .mnemo-form__toolbar-left:empty,
    .mnemo-form__toolbar-right:empty {
        display: none;
    }
    // Flex basis allows controls with inline presentation widths to shrink.
    .mnemo-form__toolbar :deep(.mnemo-btn),
    .mnemo-form__toolbar :deep(.mnemo-input) {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
    }
    .mnemo-form__content {
        padding: 16px;
    }
}
</style>
