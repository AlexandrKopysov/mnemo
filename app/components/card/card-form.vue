<template>
    <mnemo-form page-scroll sticky-toolbar>
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
            <div class="card-form-content">
                <div class="form-fields">
                    <mnemo-input
                        v-model="form.front"
                        label="Название карточки"
                        placeholder="Введите название карточки"
                    />
                </div>
                <div class="mt-4 card-back-field">
                    <mnemo-markdown-editor v-model="form.back" @save="onSave" />
                </div>
            </div>
        </template>
    </mnemo-form>
</template>

<script lang="ts" setup>
    import MnemoForm from '@components/form/mnemo-form.vue'
    import MnemoButton from '@components/ui/mnemo-button.vue'
    import MnemoInput from '@components/ui/mnemo-input.vue'
    import MnemoMarkdownEditor from '@components/ui/editor/mnemo-markdown-editor.vue'

    import type { ICardCreate } from "@shared/types/card"
    import { createCard, updateCard, getCard } from '~/entities/cards/api/api'

    const { setLastBreadcrumbs } = useBreadcrumbs() 

    interface IProps {
        mode?: 'create' | 'edit'
        cardId?: string
        deckId: string
    }

    const props = withDefaults(defineProps<IProps>(), {
        mode: 'create'
    })

    const form = ref<ICardCreate>({
        front: '',
        back: '',
        deckId: props.deckId
    })

    const buttonName = computed(() => props.mode === 'create' ? 'Создать' : 'Сохранить')

    const onSave = async () => {
        try {
            if (props.mode === 'create') {
                await createCard(form.value)
            } else {
                if (!props.cardId) return

                await updateCard(props.deckId, props.cardId, form.value)
            }
            navigateTo({
                name: 'decks-deckId-cards',
                params: {
                    deckId: props.deckId,
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const onLeave = () => {
        return navigateTo({
            name: 'decks-deckId-cards',
            params: {
                deckId: props.deckId,
            },
        }) 
    }

    onMounted(async () => {
        if (props.deckId) {
            setLastBreadcrumbs(
                `/decks/${props.deckId}/cards`,
                {
                    title: props.mode !== 'edit'
                        ? 'Создание карточки'
                        : 'Редактирование карточки'
                }
            )
        }

        if (props.mode !== 'edit' || !props.cardId) return

        form.value = await getCard(props.deckId, props.cardId)
    })

</script>

<style scoped lang="scss">
@use "~/assets/scss/forms" as forms;
@include forms.editor-fields;
.card-form-content {
    display: flex;
    flex-direction: column;
    min-width: 0;
}
.card-back-field {
    flex: 0 0 auto;
    display: flex;
    min-width: 0;
}
</style>
