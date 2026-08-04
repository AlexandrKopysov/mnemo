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
            <div class="card-form-content">
                <div class="flex flex-col gap-4 w-1/2">
                    <mnemo-input
                        v-model="form.front"
                        label="Название карточки"
                        placeholder="Введите название карточки"
                    />
                </div>
                <div class="mt-4 card-back-field">
                    <mnemo-textarea
                        v-model="form.back"
                        label="Описание карточки"
                        placeholder="Введите описание карточки"
                        full-height
                    />
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

    import type { ICardCreate } from "shared/types/card"
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
</style>
