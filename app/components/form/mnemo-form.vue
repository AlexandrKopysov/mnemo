<template>
    <section class="mnemo-form">
        <header class="mnemo-form__toolbar">
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

interface IPropsHeader {
    title?: string,
    breadcrumbs?: IBreadcrumb[]
}

const props = defineProps<IPropsHeader>()

</script>

<style scoped lang="scss">
    .mnemo-form {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        min-height: 0;
        background: rgba(247, 250, 251);
        backdrop-filter: blur(10px);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);

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
            padding: 20px 20px;
            overflow-y: auto;
        }
    }
</style>
