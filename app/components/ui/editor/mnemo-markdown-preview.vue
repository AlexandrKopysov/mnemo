<template>
    <md-preview
        class="mnemo-markdown"
        language="en-US"
        :model-value="content"
    />
</template>

<script lang="ts" setup>
import 'md-editor-v3/lib/style.css';
import { MdPreview } from "md-editor-v3"

defineProps<{ content: string }>()

</script>

<style scoped>
.mnemo-markdown {
    min-height: 0;
    max-height: 100%;
    overflow-y: auto;
}
</style>
