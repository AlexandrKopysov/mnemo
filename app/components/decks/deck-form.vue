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
            >
                Закрыть
            </mnemo-button> 
        </template>
        <template #default>
            <div class="form-fields">
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
import { createDeck, updateDeck, getDeck } from "~/entities/decks/api/api"

interface IProps {
    mode?: 'create' | 'edit'
    deckId?: string
}

const props = withDefaults(defineProps<IProps>(), {
    mode: 'create'
})

const { setBreadcrumbs } = useBreadcrumbs()

const form = ref<IDeck>({
    title: '',
    description: '',
})

const buttonName = computed(() => props.mode === 'create' ? 'Создать' : 'Сохранить')

const onSave = async () => {
    if (props.mode === 'create') {
        await createDeck(form.value)
    } else {
        await updateDeck(props.deckId as string, form.value)
    }
    onLeave()
}

const onLeave = () => {
    return navigateTo('/')
}
onMounted(async () => {
    if (props.mode === 'edit') {
        form.value = await getDeck(props.deckId as string)
    }

    if(!form.value.id) {
        setBreadcrumbs([{
            title: 'Ваши колоды',
            to: '/'
            },
            {
                title: 'Создание новой колоды',
            }
        ])
    } else {
        setBreadcrumbs([{
            title: 'Ваши колоды',
            to: '/',
        }, {
            title: `${form.value.title}`
        }])
    }
})

</script>

<style scoped lang="scss">
@use "~/assets/scss/forms" as forms;
@include forms.editor-fields;
</style>
