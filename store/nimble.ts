import {defineStore} from "pinia";
import {APIResponse} from "~/types";
import {internal_api_nimble_nimbleLicenseUpsertReq, NimbleService, OpenAPI as STSOpenAPI,} from "~/packages/api";

type RootState = {
    license_id: string
}

type Actions = {
    nimbleLicenceUpsert(license_id: string): Promise<boolean>
}

const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const useNimbleStore = defineStore<"nimble", RootState, any, Actions>({
    id: "nimble",
    state: (): RootState => ({
        license_id: ""
    }),
    actions: {
        async nimbleLicenceUpsert(license_id: string): Promise<boolean> {
            const nimbleLicenceUpsertReq: internal_api_nimble_nimbleLicenseUpsertReq = {
                license_id: license_id,
            };
            try {
                // /api/v1/nimble/license/upsert
                const response = await NimbleService.patchNimbleLicenceUpsert(nimbleLicenceUpsertReq)
                const NimbleUpsertResp = response as APIResponse
                if (NimbleUpsertResp.response_code == 200) {
                    return true
                }
                return false
            } catch (error) {
                return false
            }
        }
    }
    })