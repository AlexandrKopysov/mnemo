<template>
    <md-preview class="mnemo-markdown" :model-value="content" language="en-US" />
</template>

<script lang="ts" setup>
import 'md-editor-v3/lib/style.css';
import { MdPreview } from "md-editor-v3"

defineProps<{ content: string }>()

</script>
