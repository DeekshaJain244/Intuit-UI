import {APIResponse, Status, StoreAPIResponse} from "~/types";
import {OpenAPI as STSOpenAPI, StatusService} from "~/packages/api";

type RootState = {
    status: Status
    license_count: 0,
}

type Actions = {
    getStatus(): Promise<StoreAPIResponse>
}


const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const useStatusStore = defineStore<"status", RootState, any, Actions>({
    id: "status",
    state: (): RootState => ({
        status: <Status>{},
        license_count: 0
    }),
    actions: {
        async getStatus() {
            try {
                // /api/v1/status
                const response = await StatusService.getStatus()
                const statusResp = response as APIResponse
                if (statusResp.response_code == 200) {
                    this.status = statusResp.response as Status
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        }
    }
})