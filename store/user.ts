import {defineStore} from "pinia";
import {APIResponse, StoreAPIResponse} from "~/types";
import {OpenAPI as STSOpenAPI, UserService, sts_internal_auth_api_user_userResp as User} from "~/packages/auth";

type RootState = {
    user: User,
    users: User[],
    editUser: User,
    manage: User
}

type Actions = {
    getUsers(): Promise<StoreAPIResponse>,
    getUserEmailLookup():Promise<StoreAPIResponse>,
    deleteUser(user_id: string):Promise<StoreAPIResponse>,
    setUserEdit(payload: User): boolean,
    setUserManage(payload: User): boolean
}

const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const useUserStore = defineStore<"user", RootState, any, Actions>({
    id: "user",
    state: (): RootState => ({
        user: <User>{},
        users: [],
        editUser: {},
        manage: {}
    }),
    actions: {
        async getUsers() {
            try {
                // /api/v1/user/list
                const response = await UserService.postAuthUserList()
                const userListResp = response as APIResponse
                if (userListResp.response_code == 200) {
                    this.users = userListResp.response as User[]
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        async getUserEmailLookup() {
            try {
                //auth/user/email_lookup
                const response = await UserService.postAuthUserEmailLookup()
                const userEmailLookupResp = response as APIResponse
                if (userEmailLookupResp.response_code == 200) {
                    this.users = userEmailLookupResp.response as User[]
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        async deleteUser(user_id: string) {
            try {
                // /auth/user/delete
                const response = await UserService.deleteAuthUserDelete(user_id)
                const userDeleteResp = response as APIResponse
                if (userDeleteResp.response_code == 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        setUserEdit(user: User): boolean {
            this.editUser = user
            return true
        },
        setUserManage(user: User): boolean {
            this.manage = user
            return true
        },
    }
})