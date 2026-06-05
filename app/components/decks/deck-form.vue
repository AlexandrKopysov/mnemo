<template>
    <mnemo-form>
        <template v-slot:toolbar-left>
            <mnemo-button 
                @click="onSave"
                width="150"
            >
                {{ buttonName }}
            </mnemo-button>
            <mnemo-button 
                @click="onLeave"
                width="150"
                variant="secondary"
                class="ml-2"
            >
                Закрыть
            </mnemo-button> 
        </template>
        <template #default>
            <div class="flex flex-col gap-4 w-1/2">
                <mnemo-input
                    v-model="form.title"
                    label="Название колоды"
                    placeholder="Введите название колоды"
                />
                <mnemo-input
                    v-model="form.description"
                    label="Описание колоды"
                    placeholder="Введите описание колоды"
                />
            </div>
        </template>
    </mnemo-form>
</template>

<script lang="ts" setup>
import MnemoForm from '@components/form/mnemo-form.vue'
import MnemoButton from '@components/ui/mnemo-button.vue'
import MnemoInput from '@components/ui/mnemo-input.vue'
import type { IDeck } from "@shared/types"
import { createDeck } from "~/entities/decks/api/api"

interface IProps {
    mode?: 'create' | 'edit'
    deckId?: string
}

const props = withDefaults(defineProps<IProps>(), {
    mode: 'create'
})

const form = ref<IDeck>({
    title: '',
    description: '',
})

const buttonName = computed(() => props.mode === 'create' ? 'Создать' : 'Сохранить')

const onSave = async () => {

    await createDeck(form.value)
    // console.log('onSave', form.value)
    // const deck = await $fetch('/api/decks', {
    //     method: 'POST',
    //     body: form.value
    // })
    // console.log('deck', deck)
}

const onLeave = () => {
    return navigateTo('/')
}
</script>