import {useAuthStore} from "~/store/auth";

const authStore = useAuthStore()

const useAuth = async () => {
    if (authStore.authenticated) {
        return true
    } else {
        const response = await authStore.userInfo()
        console.debug(response, "response")
        if (response.status === "success") {
            return true
        } else {
            return false
        }
    }
};

export default useAuth