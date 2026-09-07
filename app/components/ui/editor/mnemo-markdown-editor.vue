<template>
    <md-editor 
        v-model="content"
        language="en-US"
    />
</template>

<script lang="ts" setup>
import 'md-editor-v3/lib/style.css';
import { MdEditor } from "md-editor-v3"

const content = defineModel<string>("")

</script>