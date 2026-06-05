const publicPage = ['/login']

export default defineNuxtRouteMiddleware((to) => {
    const { status } = useAuth()

    const isPublicPage = publicPage.includes(to.path)

    if (status.value === "unauthenticated" && !isPublicPage) {
        return navigateTo('/login')
    }

    if (status.value === "authenticated" && isPublicPage) {
        return navigateTo('/')
    }
})