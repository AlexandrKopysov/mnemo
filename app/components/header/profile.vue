<template>
    <v-container class="p-0 m-0 profile">
        <v-row class="justify-center">
        <v-menu min-width="200px" max-width="calc(100vw - 32px)">
            <template 
                v-slot:activator="{ props }">
            <v-btn
                icon
                v-bind="props"
            >
                <v-avatar
                    color="brown"
                    size="large"
                >
                    <span class="text-headline-small">{{ data?.user?.name }}</span>
                    <!-- TODO: тут должна быть иконка профиля, либо инициалы -->
                </v-avatar>
            </v-btn>
            </template>
            <v-card class="mt-2">
                <v-card-text>
                    <!-- TODO: Скрыто до реализации профиля -->
                    <!-- <v-btn
                        variant="text"
                        rounded
                    >
                        Профиль
                    </v-btn>
                    <v-divider class="my-3"></v-divider> -->
                    <v-btn
                        variant="text"
                        rounded
                        @click.stop="onExit"
                    >
                        Выйти
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-menu>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>

const { data, signOut } = useAuth()

function onExit() {
    console.log(data.value?.user)
    signOut().then(() => {
        navigateTo('/login')
    })
}

</script>
<style scoped lang="scss">
@media (max-width: 1279px) {
    .profile :deep(.v-row) { margin: 0; }
}
</style>
