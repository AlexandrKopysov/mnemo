<template>
    <md-preview :content="content" />
</template>

<script lang="ts" setup>
import 'md-editor-v3/lib/style.css';
import { MdPreview } from "md-editor-v3"

const content = defineModel<string>("")

</script>
