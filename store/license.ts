import {defineStore} from "pinia";
import {APIResponse, StoreAPIResponse} from "~/types";
import {
    LicenseService,
    OpenAPI as STSOpenAPI,
    internal_api_license_licenseCreateReq as LicenseCreateReq,
    internal_api_license_licenseResp as License
} from "~/packages/api";

type RootState = {
    licenses: License[]
    license: License
}

type Actions = {
    getLicenses(status: boolean): Promise<StoreAPIResponse>
    createLicense(payload: Object): Promise<StoreAPIResponse>
}

const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const useLicenseStore = defineStore<"license", RootState, any, Actions>({
    id: "license",
    state: (): RootState => ({
        licenses: [],
        license: <License>{}
    }),
    actions: {
        async getLicenses(status: boolean): Promise<StoreAPIResponse> {
            try {
                // /api/v1/license/list
                const response = await LicenseService.getLicenseList(status)
                const licenseListResp = response as APIResponse
                if (licenseListResp.response_code == 200) {
                    this.licenses = licenseListResp.response as License[]
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        },
        async createLicense(payload): Promise<StoreAPIResponse> {
            try {
                // /api/v1/license/create
                // const createLicenseReq: internal_api_license_licenseCreateReq  = {
                //     license_customer: license_customer,
                //     license_name: license_name ,
                // };
                const response = await LicenseService.putLicenseCreate(payload as LicenseCreateReq)
                const licenseCreateResp = response as APIResponse
                if (licenseCreateResp.response_code == 201) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                return {status: "failure", data: null}
            }
        }
    }
})