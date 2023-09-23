import useAuth from "~/composables/auth/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const isLoggedIn = await useAuth()
    if (!isLoggedIn) {
        return navigateTo("/login")
    }
})