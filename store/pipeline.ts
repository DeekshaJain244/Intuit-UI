import {
    internal_api_pipeline_pipelineCatalogRefreshReq as CatalogRefreshReq,
    OpenAPI as STSOpenAPI,
    PipelineService
} from "~/packages/api";
import {APIResponse, StoreAPIResponse} from "~/types";

type RootState = {}

type Actions = {
    refreshNimbleCatalog(nimbleID: string): Promise<StoreAPIResponse>
}

const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const usePipelineStore = defineStore<"pipeline", RootState, any, Actions>({
    id: "pipeline",
    state: () => ({}),
    actions: {
        async refreshNimbleCatalog(nimbleID: string) {
            try {
                const payload: CatalogRefreshReq = {
                    nimble_id: nimbleID
                }
                const response = await PipelineService.postPipelineCatalogRefresh(payload)
                const refreshNimbleCatalogResp = response as APIResponse
                if (refreshNimbleCatalogResp.response_code == 200) {
                    const nimble = refreshNimbleCatalogResp.response
                    return {status: "success", data: nimble}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        }
    }
})