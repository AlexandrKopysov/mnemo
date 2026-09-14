<template>
    <div
        ref="container"
        class="markdown-editor mnemo-markdown"
    >
        <div
            v-if="!wide"
            class="editor-modes"
            role="group"
            aria-label="Режим Markdown"
        >
            <button
                type="button"
                :aria-pressed="mode === 'edit'"
                @click="mode = 'edit'"
            >
                Редактор
            </button>
            <button
                type="button"
                :aria-pressed="mode === 'preview'"
                @click="mode = 'preview'"
            >
                Просмотр
            </button>
        </div>
        <p
            v-if="wide || mode === 'edit'"
            class="toolbar-hint"
        >
            Инструменты ↔ прокрутите панель
        </p>
        <md-editor
            v-show="wide || mode === 'edit'"
            ref="editor"
            v-model="content"
            :preview="wide"
            :toolbars-exclude="['preview', 'previewOnly', 'htmlPreview', 'catalog']"
            language="en-US"
            @on-save="emit('save')"
        />
        <mnemo-markdown-preview
            v-if="!wide && mode === 'preview'"
            :content="content"
        />
    </div>
</template>

<script lang="ts" setup>
import 'md-editor-v3/lib/style.css'
import { MdEditor, type ExposeParam } from 'md-editor-v3'
import { useElementSize } from '@vueuse/core'
import MnemoMarkdownPreview from './mnemo-markdown-preview.vue'

const content = defineModel<string>({ default: '' })
const emit = defineEmits<{ save: [] }>()
const container = ref<HTMLElement | null>(null)
const editor = ref<ExposeParam | null>(null)
const { width } = useElementSize(container)
// At least 360px per panel, plus padding and the divider.
const wide = computed(() => width.value >= 800)
const mode = ref<'edit' | 'preview'>('edit')
// The library reads the preview prop only at initialization.
watch(wide, (value) => editor.value?.togglePreview(value), { flush: 'post' })
</script>

<style scoped lang="scss">
.markdown-editor {
    width: 100%;
    min-width: 0;
}
.editor-modes {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
}
.editor-modes button {
    flex: 1;
    min-height: $touch-target;
    border: 1px solid $outline-border;
    border-radius: $radius-control;
}
.editor-modes button[aria-pressed='true'] {
    background: $secondary;
    border-color: $primary;
}
.toolbar-hint {
    font-size: 13px;
    margin-bottom: 4px;
}
:deep(.md-editor) {
    width: 100%;
    min-width: 0;
    height: clamp(240px, 55dvh, 560px);
}
:deep(.md-editor-toolbar-wrapper) {
    scrollbar-width: thin;
}
:deep(.md-editor-toolbar-wrapper::-webkit-scrollbar) {
    height: 8px !important;
}
:deep(.md-editor-toolbar-item) {
    min-width: 32px;
    min-height: $touch-target;
    justify-content: center;
}
:deep(.cm-content) {
    overflow-wrap: anywhere;
    word-break: normal;
}
</style>
