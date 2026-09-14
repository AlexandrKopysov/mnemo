<template>
    <div
        class="tile-container"
        @click="onTileClick"
    >
        <div class="tile-info">
            <div class="tile-title">
                {{ deck.title }}
            </div>
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
        <div class="tile-content">
            <div>
                <p class="m-0">Всего: {{ deck.total }}</p>
                <div class="tile-due">{{ deck.dueCardsCount }} на сегодня</div>
            </div>
            <deck-tile-circle-compleet :value="deck.percentCompleet" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IDeck } from '@shared/types/deck'
import DeckTileCircleCompleet from './deck-tile-circle-compleet.vue'

interface IProps {
    deck: IDeck
}

const props = defineProps<IProps>()
const emit = defineEmits<{
    (e: 'click', id: string | undefined): void
    (e: 'edit', deck: string | undefined): void
    (e: 'delete', deck: string | undefined): void
}>()

const onTileClick = () => {
    emit('click', props.deck.id)
}

const onEditClick = () => {
    emit('edit', props.deck.id)
}

const onDeleteClick = () => {
    emit('delete', props.deck.id)
}
</script>

<style lang="scss" scoped>
@use '~/assets/scss/tiles' as tiles;
@include tiles.tile;
.tile-container {
    min-height: 160px;
}

.tile-info {
    margin-top: 10px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

.tile-content {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.tile-due {
    border-radius: $radius-tile;

    background-color: $deck-due;
    color: $deck-due-color;
    padding: 5px 25px;
    margin-top: 10px;
}
.dot-menu-btn {
    @media (min-width: $breakpoint-desktop) {
        width: 16px;
    }
}

@media (max-width: ($breakpoint-desktop - 1px)) {
    .tile-container {
        min-width: 0;
        padding: 0 12px 16px;
    }
    .tile-info {
        align-items: flex-start;
    }
    .tile-title {
        min-width: 0;
        overflow-wrap: anywhere;
        font-size: 22px;
    }
    .tile-content {
        gap: 12px;
        align-items: center;
    }
    .tile-content > div:first-child {
        min-width: 0;
        overflow-wrap: anywhere;
    }
    .tile-content > :deep(.progress-circle) {
        flex-shrink: 0;
    }
    .tile-due {
        padding: 5px 10px;
    }
}
</style>
