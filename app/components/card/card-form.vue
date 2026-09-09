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
                class="form-action-secondary"
            >
                Закрыть
            </mnemo-button> 
        </template>
        <template #default>
            <div class="card-form-content">
                <div class="form-fields flex flex-col gap-4 w-1/2">
                    <mnemo-input
                        v-model="form.front"
                        label="Название карточки"
                        placeholder="Введите название карточки"
                    />
                </div>
                <div class="mt-4 card-back-field">
                    <!-- <mnemo-textarea
                        v-model="form.back"
                        label="Описание карточки"
                        placeholder="Введите описание карточки"
                        full-height
                    /> -->
                    <mnemo-markdown-editor v-model="form.back" />
                </div>
            </div>
        </template>
    </mnemo-form>
</template>

<script lang="ts" setup>
    import MnemoForm from '@components/form/mnemo-form.vue'
    import MnemoButton from '@components/ui/mnemo-button.vue'
    import MnemoInput from '@components/ui/mnemo-input.vue'
    import MnemoTextarea from '@components/ui/mnemo-textarea.vue'
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
.card-form-content {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
}

.card-back-field {
    flex: 1;
    min-height: 0;
    display: flex;
}

.card-back-field :deep(.mnemo-textarea) {
    flex: 1;
}

.form-action-secondary { margin-left: 8px; }

@media (max-width: 1279px) {
    .form-action-secondary { margin-left: 0; }
    .form-fields { width: 75%; min-width: 0; }
    .card-form-content, .card-back-field { min-width: 0; max-width: 100%; }
    // Preserve the editor's panels and existing local scrolling.
    .card-back-field > :deep(.md-editor) { width: 100%; min-width: 0; max-width: 100%; }
}
@media (max-width: 767px) {
    .form-fields { width: 100%; }
}
</style>
