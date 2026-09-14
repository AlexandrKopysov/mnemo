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
@use "~/assets/scss/tiles" as tiles;
@include tiles.tile;
.tile-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 100px;
}

.tile-info {
    flex-direction: column;
}

@media (max-width: ($breakpoint-desktop - 1px)) {
    .tile-container {
        min-width: 0;
        gap: 16px;
        padding: 12px 16px;
    }
    .tile-info {
        min-width: 0;
        flex: 1;
    }
    .tile-title {
        overflow-wrap: anywhere;
    }
    .tile-left-container {
        min-width: 0;
        flex: 0 1 280px;
    }
}
@media (max-width: ($breakpoint-mobile - 1px)) {
    .tile-container {
        display: grid;
        grid-template-columns: minmax(0, 1fr) $touch-target;
        align-items: start;
        gap: 12px 8px;
        padding: 12px;
    }
    .tile-title {
        font-size: 20px;
        line-height: 1.3;
    }
    .tile-left-container {
        display: contents;
    }
    .tile-left-container > :deep(.card-tile-status) {
        grid-column: 1 / -1;
        grid-row: 2;
    }
    .dot-menu-btn {
        grid-column: 2;
        grid-row: 1;
    }
}
</style>
