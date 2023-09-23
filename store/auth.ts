import {defineStore} from "pinia";
import {APIResponse, StoreAPIResponse, User} from "~/types";
import {
    ApiError,
    AuthService,
    internal_auth_x_login_loginReq,
    OpenAPI as AuthOpenApi,
    sts_internal_auth_api_user_userConfigReq as UserConfigUpdateReq,
    UserService
} from "~/packages/auth";
// import {} from "~/packages/api";

type RootState = {
    user: User
    authenticated: boolean
    loggedInUser: User,
};

type Getters = {}

type Actions = {
    confirmAccount(confirmToken: string): Promise<StoreAPIResponse>
    userRegister(userData: object): Promise<StoreAPIResponse>
    signIn(email: string, password: string): Promise<StoreAPIResponse>
    userInfo(): Promise<StoreAPIResponse>
    updateUserConfig(userData: UserConfigUpdateReq): Promise<StoreAPIResponse>
    userLogout(): Promise<StoreAPIResponse>
    setLoggedInUser(value: User): void
}

const errorHelper = (error: ApiError) => {
    let errorMessage = "";
    if (error?.body?.errors && Object.keys(error?.body?.errors).length > 0) {
        const errorData = error?.body?.errors;
        for (const key in errorData) {
            if (errorData[key].length > 0) {
                errorMessage += `${key}  ${errorData[key]} \n`;
            }
        }
    } else if (error?.body?.error) {
        errorMessage = error?.body?.error;
    } else if (error?.body?.message) {
        errorMessage = error?.body?.message;
    }
    return errorMessage;
};
// $notification.show({message: "Hello", type: "success"})

// const runtimeConfig = useRuntimeConfig();
AuthOpenApi.BASE = useNuxtApp().$config.public.apiAuthURL // runtimeConfig.public.apiAuthURL;
AuthOpenApi.WITH_CREDENTIALS = true;

export const useAuthStore = defineStore<"auth", RootState, Getters, Actions>({
    id: 'auth',
    state: () => ({
        user: <User>{},
        authenticated: <boolean>false,
        loggedInUser: <User>{},
    } as RootState),
    getters: {},
    actions: {
        setLoggedInUser(value: User) {
            this.loggedInUser = value
        },
        async userRegister(userData: object) {
            try {
                // /api/v1/auth/register
                const response = await AuthService.register(userData)
                const userRegisterResp = response as APIResponse
                console.debug(userRegisterResp.response_code, "userRegisterResp")
                if (userRegisterResp.response_code === 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error)
                return {status: "failure", data: null}
            }
        },
        async confirmAccount(confirmToken: string) {
            try {
                // /api/v1/auth/confirm
                const response = await AuthService.confirm(confirmToken)
                const confirmResp = response as APIResponse
                console.debug(confirmResp.response_code, "confirmResp")
                if (confirmResp.response_code === 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error)
                return {status: "failure", data: null}
            }
        },
        async signIn(email: string, password: string) {
            try {
                // /api/v1/auth/login
                const loginReq: internal_auth_x_login_loginReq = {
                    email: email,
                    password: password
                };
                const response = await AuthService.postAuthLogin(loginReq)
                const userLoginResp = response as APIResponse
                // console.debug(userLoginResp.response_code, "userLoginResp")
                if (userLoginResp.response_code === 200) {
                    this.authenticated = true
                    localStorage.setItem("userAuthenticated", "true")
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error: ApiError) {
                const message = errorHelper(error)
                useNuxtApp().$notification.show({
                    message: message,
                    type: "error",
                })
                return {status: "failure", data: null}
            }
            // const user = await response.data
            // this.user = user;
        },
        async userInfo() {
            try {
                // /api/v1/auth/user/info
                AuthOpenApi.WITH_CREDENTIALS = true;
                const response = await UserService.postAuthUserInfo()
                const userInfoResp = response as APIResponse
                if (userInfoResp.response_code == 200) {
                    this.authenticated = true
                    const userInfo = userInfoResp.response as User
                    this.loggedInUser = userInfo
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error)
                return {status: "failure", data: null}
            }
        },
        async updateUserConfig(userConfig) {
            try {
                const data: UserConfigUpdateReq = {
                    user_config: userConfig.user_config,
                    user_id: userConfig.user_id
                }
                const response = await UserService.patchAuthUserConfig(data)
                const userConfigUpdateResp = response as APIResponse
                if (userConfigUpdateResp.response_code == 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error)
                return {status: "success", data: null}
            }
        },
        async userLogout() {
            try {
                // /api/v1/auth/logout"
                const response = await AuthService.deleteAuthLogout()
                const userLogoutResp = response as APIResponse
                if (userLogoutResp.response_code == 200) {
                    this.authenticated = false
                    this.loggedInUser = <User>{}
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error)
                return {status: "failure", data: null}
            }
        },
    },
    // getters: {
    //     loggedInUser: state => state.loggedInUser,
    // },
})
