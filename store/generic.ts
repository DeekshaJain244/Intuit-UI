import {APIResponse, StoreAPIResponse} from "~/types";
import {OpenAPI as STSOpenAPI} from "~/packages/api";
import {useApiFetch} from "~/composables/fetch/apiFetch";

type RootState = {}

type Getters = {}

type Actions = {
    fileUpload(formData: any): Promise<StoreAPIResponse>;
}

const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const useGenericStore = defineStore<"generic", RootState, Getters, Actions>({
    id: "generic",
    state: (): RootState => ({}),
    getters: {},
    actions: {
        async fileUpload(formData: any) {
            try {
                const response = await useApiFetch("/generic/upload", {
                    method: "POST",
                    body: formData,
                })
                const fileUploadResp = response.data.value as APIResponse
                if (fileUploadResp.response_code == 200) {
                    return {status: "success", data: fileUploadResp.response}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        }
    }
})