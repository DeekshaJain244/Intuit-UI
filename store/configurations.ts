import {APIResponse, StoreAPIResponse} from "~/types";
import {
    internal_api_nimble_nimbleCreateReq as NimbleCreateReq,
    internal_api_nimble_nimbleStatusReq as NimbleStatusReq,
    internal_api_nimble_nimbleUpdateReq as NimbleUpdateReq,
    NimbleService,
    OpenAPI as STSOpenAPI,
    sts_internal_api_nimble_nimbleResp as Nimble
} from "~/packages/api";

type RootState = {
    configurations: Nimble[]
    configuration: Nimble,
    editConfiguration: Nimble
    configuration_licence_status: false,
}

type Actions = {
    getNimbleConfigurations(status: boolean): Promise<StoreAPIResponse>
    getNimbleStatus(nimbleID: string): Promise<StoreAPIResponse>
    addNimbleConfiguration(payload: NimbleCreateReq): Promise<StoreAPIResponse>
    editNimbleConfiguration(payload: NimbleUpdateReq): Promise<StoreAPIResponse>
    deleteNimbleConfiguration(nimbleID: string): Promise<StoreAPIResponse>
    overrideNimbleConfiguration(nimbleID: string, nimbleOverride: boolean): Promise<StoreAPIResponse>
    setEditConfiguration(configuration: Nimble): boolean
}

const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const useConfigurationStore = defineStore<"configurations", RootState, any, Actions>({
    id: "configurations",
    state: (): RootState => ({
        configurations: [],
        configuration: {},
        editConfiguration: {},
        configuration_licence_status: false
    }),
    actions: {
        async getNimbleConfigurations(status: boolean): Promise<StoreAPIResponse> {
            try {
                // /api/v1/nimble/list
                const response = await NimbleService.getNimbleList([], status)
                const configurationsListResp = response as APIResponse
                if (configurationsListResp.response_code == 200) {
                    this.configurations = configurationsListResp.response ? configurationsListResp.response : []
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        },
        async getNimbleStatus(nimbleID: string): Promise<StoreAPIResponse> {
            try {
                // /api/v1/nimble/list
                const response = await NimbleService.getNimbleStatus(nimbleID)
                const nimbleStatusResp = response as APIResponse
                if (nimbleStatusResp.response_code == 200) {
                    const configuration = nimbleStatusResp.response
                    return {status: "success", data: configuration}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        },
        async addNimbleConfiguration(payload: NimbleCreateReq): Promise<StoreAPIResponse> {
            try {
                // /api/v1/nimble/config
                const response = await NimbleService.putNimbleConfig(payload)
                const createNimbleResp = response as APIResponse
                if (createNimbleResp.response_code == 201) {
                    return {status: "success", data: createNimbleResp.response}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        },
        async editNimbleConfiguration(payload: NimbleUpdateReq): Promise<StoreAPIResponse> {
            try {
                // /api/v1/nimble/config
                const response = await NimbleService.patchNimbleConfig(payload)
                const createNimbleResp = response as APIResponse
                if (createNimbleResp.response_code == 200) {
                    return {status: "success", data: createNimbleResp.response}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        },
        async deleteNimbleConfiguration(nimbleID: string): Promise<StoreAPIResponse> {
            try {
                // /api/v1/nimble/config
                const payload: NimbleStatusReq = {
                    nimble_id: nimbleID
                }
                const response = await NimbleService.deleteNimbleConfig(payload)
                const deleteNimbleResp = response as APIResponse
                if (deleteNimbleResp.response_code == 200) {
                    return {status: "success", data: deleteNimbleResp.response}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        },
        async overrideNimbleConfiguration(nimbleID: string, nimbleOverride: boolean): Promise<StoreAPIResponse> {
            try {
                // /api/v1/nimble/config
                const payload: NimbleStatusReq = {
                    nimble_id: nimbleID,
                    nimble_is_override: nimbleOverride
                }
                const response = await NimbleService.postNimbleConfigOverride(payload)
                const overrideNimbleResp = response as APIResponse
                if (overrideNimbleResp.response_code === 200) {
                    return {status: "success", data: overrideNimbleResp.response}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        },
        setEditConfiguration(configuration: Nimble) {
            this.editConfiguration = configuration
            return true
        }
    }
})