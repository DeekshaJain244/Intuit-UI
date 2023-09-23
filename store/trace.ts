import {OpenAPI as STSOpenAPI, TraceService} from "~/packages/api";
import {APIResponse, StoreAPIResponse} from "~/types";

type RootState = {}

type Actions = {
    transactionByUUID(uuid: string): Promise<StoreAPIResponse>
}

const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const useTraceStore = defineStore<"trace", RootState, any, Actions>({
    id: "trace",
    state: () => ({}),
    actions: {
        async transactionByUUID(uuid: string) {
            try {
                const response = await TraceService.getTraceTransactionId(uuid)
                const transactionByUUIDResp = response as APIResponse
                if (transactionByUUIDResp.response_code == 200) {
                    const transaction = transactionByUUIDResp.response
                    return {status: "success", data: transaction}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        }
    }
})