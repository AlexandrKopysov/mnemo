<template>
    <div class="mnemo-breadcrumbs">
        <nav
            class="mnemo-breadcrumbs__container"
            aria-label="Навигационная цепочка"
        >
            <template
                v-for="(item, index) in breadcrumbs"
                :key="index"
            >
                <NuxtLink
                    v-if="item.to"
                    :to="item.to"
                    class="mnemo-breadcrumbs__container-link"
                >
                    {{ item.title }}
                </NuxtLink>
    
                <span
                    v-else
                    class="mnemo-breadcrumbs__container-current"
                >
                    {{ item.title }}
                </span>
    
                <v-icon
                    v-if="index < breadcrumbs.length - 1"
                    size="20"
                    class="mt-1"
                >
                    mdi-chevron-right
                </v-icon>
            </template>
        </nav>
    </div>
</template>

<script lang="ts" setup>
    const { breadcrumbs } = useBreadcrumbs()
</script>

<style lang='scss' scope>
    .mnemo-breadcrumbs {
        flex: 0 0 auto;
        width: 100%;

        &__container {
            display: flex;
            align-items: center;
            height: 24px;
            max-width: $container-max-width;
            margin: 0 auto;

            a {
                font-size: 18px;
                font-weight: 300;
                color: rgb(56, 75, 139);
            }

            &-current {
                font-size: 18px;
                font-weight: 300;
                color: black;
            }
        }
    }

@media (max-width: 1279px) {
    .mnemo-breadcrumbs__container {
        height: auto;
        min-height: 24px;
        min-width: 0;
        flex-wrap: wrap;
        gap: 4px;
        padding-inline: $container-padding-tablet;
    }
    .mnemo-breadcrumbs__container-link, .mnemo-breadcrumbs__container-current {
        min-width: 0;
        max-width: 100%;
        overflow-wrap: anywhere;
    }
}
@media (max-width: 767px) {
    .mnemo-breadcrumbs__container { padding-inline: $container-padding-mobile; }
    .mnemo-breadcrumbs__container a, .mnemo-breadcrumbs__container-current { font-size: 16px; }
}
</style>