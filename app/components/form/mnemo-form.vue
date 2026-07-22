<template>
    <div>
        <!-- <mnemo-form-header
            :breadcrumbs="breadcrumbs"
            :title="title"
        /> -->
        <div class="form">
            <div class="flex justify-between mb-10">
                <div>
                    <slot name="toolbar-left"></slot>
                </div>
                <div>
                    <slot name="toolbar-right"></slot>
                </div>
            </div>
            <div class="form-content">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IBreadcrumb } from './mnemo-breadcrumbs.vue';
import MnemoFormHeader from './mnemo-form-header.vue'

interface IPropsHeader {
    title?: string,
    breadcrumbs?: IBreadcrumb[]
}

const props = defineProps<IPropsHeader>()

</script>

<style scoped lang="scss">
.form {
    width: 100%;
    min-height: 520px;
    height: calc(100vh - 370px);
    display: flex;
    flex-direction: column;
    padding: 28px;
    border-radius: 8px;

    background: rgba(247, 250, 251);
    backdrop-filter: blur(10px);

    box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
}

.form-content {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
}


</style>
