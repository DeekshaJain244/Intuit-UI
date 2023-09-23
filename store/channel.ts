import {APIResponse, StoreAPIResponse} from "~/types";
import {
    ChannelService,
    internal_api_channel_channelListReq as ChannelListReq,
    OpenAPI as STSOpenAPI
} from "~/packages/api";

type RootState = {}

type Actions = {
    channelList(payload: Object): Promise<StoreAPIResponse>
}

const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const useChannelStore = defineStore<"channel", RootState, any, Actions>({
    id: "channel",
    state: () => ({}),
    actions: {
        async channelList(data: Object) {
            try {
                console.debug(data, "payload")
                const payload: ChannelListReq = {
                    nimble_id: data.nimble_id
                }
                const response = await ChannelService.postChannelList(payload)
                const channelListResp = response as APIResponse
                if (channelListResp.response_code == 200) {
                    return {status: "success", data: channelListResp.response ? channelListResp.response : []}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        }
    }
})