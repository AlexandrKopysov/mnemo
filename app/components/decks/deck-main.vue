<template>
    <mnemo-form>
        <template v-slot:toolbar-left>
            <mnemo-button @click="addCard">Добавить карточку</mnemo-button>
        </template>
        <template v-slot:toolbar-right>
            <mnemo-input
                width="380"
                placeholder="Поиск"
                prepend-inner-icon="mdi-magnify"
            />
        </template>
        <span>DeckMain: {{ deckId }}</span>
    </mnemo-form>
</template>

<script lang="ts" setup>
import MnemoForm from '@components/form/mnemo-form.vue'
import MnemoButton from '@components/ui/mnemo-button.vue'
import MnemoInput from '@components/ui/mnemo-input.vue'

interface IProps {
    deckId: string
}

const props = defineProps<IProps>()

function addCard() {
    console.log('addCard')
}
</script>