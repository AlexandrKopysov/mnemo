<template>
    <div 
        class="tile-container"
        @click="onTileClick"
    >
        <div class="tile-info">
            <div class="tile-title">
                {{ card.front }}
            </div>
        </div>
        <div class="tile-left-container">
            <card-tile-status :card="card" />
            <v-menu location="bottom end">
                <template #activator="{ props: menuProps }">
                    <v-btn
                    icon
                    variant="text"
                    class="dot-menu-btn"
                    :ripple="false"
                    v-bind="menuProps"
                    @click.stop
                    >
                    <v-icon
                        size="24"
                        color="rgba(22, 38, 55, 0.75)"
                    >
                        mdi-dots-vertical
                    </v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        prepend-icon="mdi-pencil"
                        title="Редактировать"
                        @click.stop="onEditClick"
                    />
                    <v-list-item
                        prepend-icon="mdi-trash-can-outline"
                        title="Удалить"
                        @click.stop="onDeleteClick"
                    />
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ICardList } from '@shared/types/card';

interface IProps {
    card: ICardList
}

const props = defineProps<IProps>()
const emit = defineEmits<{
    (e: "click", id: string | undefined): void
    (e: "edit", deck: string | undefined): void
    (e: "delete", deck: string | undefined): void
}>()

const onTileClick = () => {
    emit("click", props.card.id)
}

const onEditClick = () => {
    emit("edit", props.card.id)
}

const onDeleteClick = () => {
    emit("delete", props.card.id)
}
</script>

<style lang="scss" scoped>

    $deck-bg: rgba(255, 255, 255, 0.35);
    $deck-bg-hover: rgba(255, 255, 255, 0.55);
    $deck-border: rgba(255, 255, 255, 0.25);
    $deck-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    $deck-shadow-hover: 0 0 15px rgba(0, 0, 0, 0.35);
    $deck-font-color: rgba(22, 38, 55, 0.75);

    .tile-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 100px;
        padding: 0px 20px;
        border-radius: 10px;
        background-color: $deck-bg;
        box-shadow: $deck-shadow;
        border: 1px solid $deck-border;
        cursor: pointer;
        
        &:hover {
        transition: all 0.2s ease;
        background-color: $deck-bg-hover;
        box-shadow: $deck-shadow-hover;
        }
    }

    .tile-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        color: $deck-font-color;
    }

    .tile-title {
        font-size: 24px;
        font-weight: 500;
        line-height: 24px;
    }

    .tile-subtitle {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
    }

    .tile-left-container {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
    }

    .dot-menu-btn {
        &:deep(.v-btn__overlay),
        &:deep(.v-btn__underlay),
        &:deep(.v-ripple__container) {
        display: none;
        }
    }
</style>