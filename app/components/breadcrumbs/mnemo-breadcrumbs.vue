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

<style lang="scss" scoped>
@use "~/assets/scss/layout" as layout;
.mnemo-breadcrumbs {
    flex: 0 0 auto;
    width: 100%;

    &__container {
        display: flex;
        align-items: center;
        min-height: 24px;
        flex-wrap: wrap;
        gap: 4px;
        @include layout.page-container;
        overflow-wrap: anywhere;

        a {
            font-size: 18px;
            font-weight: 300;
            color: $breadcrumb-link;
        }

        &-current {
            font-size: 18px;
            font-weight: 300;
            color: $breadcrumb-current;
        }
    }
}

@media (max-width: ($breakpoint-desktop - 1px)) {
    .mnemo-breadcrumbs__container {
        min-width: 0;
    }
    .mnemo-breadcrumbs__container-link,
    .mnemo-breadcrumbs__container-current {
        min-width: 0;
        max-width: 100%;
        overflow-wrap: anywhere;
    }
}
@media (max-width: ($breakpoint-mobile - 1px)) {
    .mnemo-breadcrumbs__container a,
    .mnemo-breadcrumbs__container-current {
        font-size: 16px;
    }
}
</style>
