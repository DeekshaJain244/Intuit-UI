export const Router: typeof useRouter = () => {
    return useRouter()
}

export const RouterPush = (data: string = "/") => {
    const localePath = useLocalePath()
    return useRouter().push(localePath(data))
}

export const RouteQuery = () => {
    return useRoute().query
}

export const Route: typeof useRoute = () => {
    return useRoute()
}
