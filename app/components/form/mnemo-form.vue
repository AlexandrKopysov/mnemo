<template>
    <div>
        <mnemo-form-header/>
        <div class="form">
            <div class="flex justify-between">
                <div>
                    <slot name="toolbar-left"></slot>
                </div>
                <div>
                    <slot name="toolbar-right"></slot>
                </div>
            </div>
            <div class="mt-10">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MnemoFormHeader from './mnemo-form-header.vue'
</script>

<style scoped lang="scss">
.form {
    width: 100%;
    min-height: 520px;
    height: calc(100vh - 302px);
    padding: 28px;
    border-radius: 8px;

    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);

    box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
}


</style>
