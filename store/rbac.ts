import {APIResponse, StoreAPIResponse} from "~/types";
import {AclService, internal_api_acl_moduleResp as Module, OpenAPI as STSOpenAPI,} from "~/packages/api";

type RootState = {
    modules: Module[],
    module: Module
}

type Actions = {
    getAllModules(): Promise<StoreAPIResponse>
    setModules(modules: Module[]): boolean
    setModule(module: Module): boolean
}

const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const useRBACStore = defineStore<"rbac", RootState, any, Actions>({
    id: "rbac",
    state: (): RootState => ({
        modules: <Module[]>[],
        module: <Module>{}
    }),
    actions: {
        async getAllModules() {
            try {
                const response = await AclService.getAclList()
                const aclModuleResp = response as APIResponse
                if (aclModuleResp.response_code === 200) {
                    this.modules = aclModuleResp.response
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                useNuxtApp().$notification.show({
                    message: "",
                    type: "error",
                })
                return {status: "failure", data: null}
            }
        },
        setModules(modules: Module[]) {
            this.modules = modules
            return true
        },
        setModule(module: Module) {
            this.module = module
            return true
        },
    }
})