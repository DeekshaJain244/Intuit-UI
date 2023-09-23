import {ConfigurationService} from "~/packages/api";
import {APIResponse, StoreAPIResponse} from "~/types";

type RootState = {
    storageDetails: []
}

type Actions = {
    getStorageDetails(): Promise<StoreAPIResponse>
    storageDelete(payload: Object): Promise<StoreAPIResponse>
}


export const useSettingStore = defineStore<"settings", RootState, any, Actions>({
    id: "settings",
    state: () => ({
        storageDetails: []
    }),
    actions: {
        async getStorageDetails() {
            try {
                const response = await ConfigurationService.getConfigStorageData()
                const getStorageDetailsResp = response as APIResponse
                if (getStorageDetailsResp.response_code === 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        },
        async storageDelete(payload: Object){
            try {
                const response = await ConfigurationService.postConfigStorageDelete(payload)
                const storageDeleteResp = response as APIResponse
                if (storageDeleteResp.response_code === 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        }
    }
})