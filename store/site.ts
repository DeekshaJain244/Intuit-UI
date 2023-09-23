import {
    CustomerService,
    OpenAPI as STSOpenAPI,
    SiteService,
    sts_internal_api__common_ChannelResp as Channel,
    sts_internal_api__common_DeviceResp as Device,
    sts_internal_api__common_SiteResp as Site,
    sts_internal_api_site_siteCreateReq as SiteCreateReq,
    sts_internal_api_site_siteDeleteReq as SiteDeleteReq,
    sts_internal_api_site_siteUpdateReq as SiteUpdateReq
} from "~/packages/api";
import {APIResponse, StoreAPIResponse} from "~/types";
import {Passthru} from "~/service/utils/constants";


type RootState = {
    organization_id: string
    customer_id: string
    site_id: "",
    sites: Site[],
    site: Site,
    siteSources: Channel[],
    editSite: Site,
    siteView: Site,
    siteDevices: []
}

type Actions = {
    getCustomerSites(): boolean
    getAllSiteDevices(payload: Object): Promise<StoreAPIResponse>
    createSite(payload: SiteCreateReq): Promise<StoreAPIResponse>
    updateSite(payload: SiteUpdateReq): Promise<StoreAPIResponse>
    deleteSite(payload: SiteDeleteReq): Promise<StoreAPIResponse>
    getSiteByID(siteID: string): Promise<StoreAPIResponse>
    getSiteDevices(siteID: string): Promise<StoreAPIResponse>
    setCustomerID(customerID: string): boolean
    setEditSite(payload: Site): boolean
    setSite(site: Site): boolean
    setSiteID(siteID: string): boolean
}


const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const useSiteStore = defineStore<"site", RootState, any, Actions>({
    id: "site",
    state: (): RootState => ({
        organization_id: "deaf0deaf0deaf00999cf5ff",
        customer_id: "",
        site_id: "",
        sites: [],
        site: {},
        siteSources: [],
        editSite: {},
        siteView: {},
        siteDevices: []
    }),
    actions: {
        getCustomerSites() {
            return true
        },
        async createSite(payload: SiteCreateReq): Promise<StoreAPIResponse> {
            try {
                payload.customer_id = this.customer_id
                payload.organization_id = this.organization_id
                // api/v1/customer/list
                const response = await SiteService.putSiteCreate(payload)
                const createSiteResp = response as APIResponse
                if (createSiteResp.response_code == 201) {
                    return {status: "success", data: createSiteResp.response}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        async getAllSiteDevices(payload): Promise<StoreAPIResponse> {
            try {
                // /api/v1/customer/view
                const customerID = payload.customer_id ? payload.customer_id : this.customer_id
                const type = 1
                const response = await CustomerService.getCustomerView(customerID, type)
                const customerViewResp = response as APIResponse
                if (customerViewResp.response_code === 200) {
                    // sites
                    const customerSites = customerViewResp.response as Site[];
                    if (customerSites == null) {
                        this.sites = []
                        return {status: "success", data: {sites: [], channels: []}};
                    }
                    this.sites = customerSites

                    const sourceChannels: Device[] = [];
                    customerSites.map((cs) => {
                        if (cs.site_devices && cs.site_devices.length > 0) {
                            cs.site_devices.map((sd) => {
                                if (sd.device_source && sd.device_source.length > 0) {
                                    sd.site_id = cs.site_id;
                                    sourceChannels.push({...sd});
                                }
                                return sd.device_source && sd.device_source.length > 0;
                            });
                        }
                        return cs.site_devices && cs.site_devices.length > 0;
                    });

                    const _sourceChannels = sourceChannels.map((sc) => {
                        if (sc.source_channels && sc.source_channels.length > 1) {
                            sc.source_channels = sc.source_channels.filter((ssc) => {
                                return ssc.usecase_key !== "passthru";
                            });
                        }
                        return {...sc};
                    });
                    this.siteSources = _sourceChannels
                    return {status: "success", data: {sites: customerSites, channels: _sourceChannels}};
                }
                return {status: "failure", data: null};
            } catch (error) {
                // this.$notification.show({
                //   message: "Error while fetching customer site map",
                //   type: "error",
                // });
                console.debug("error", error);
                return {status: "failure", data: null};
            }
        },
        async updateSite(payload: SiteUpdateReq): Promise<StoreAPIResponse> {
            try {
                // api/v1/customer/list
                payload.customer_id = this.customer_id
                payload.organization_id = this.organization_id
                const response = await SiteService.patchSiteUpdate(payload)
                const updateSiteResp = response as APIResponse
                if (updateSiteResp.response_code == 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        async deleteSite(payload: SiteDeleteReq): Promise<StoreAPIResponse> {
            try {
                // api/v1/customer/list
                const response = await SiteService.deleteSiteDelete(payload)
                const deleteSiteResp = response as APIResponse
                if (deleteSiteResp.response_code == 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        async getSiteByID(siteID: string): Promise<StoreAPIResponse> {
            try {
                const response = await SiteService.getSiteId(siteID)
                const siteByIDResp = response as APIResponse
                if (siteByIDResp.response_code == 200) {
                    return {status: "success", data: siteByIDResp.response}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        async getSiteDevices(siteID: string        ) {
            // console.debug(payload, 'payload')
            try {
                // const response = await this.$axios.get(`/api/v1/site/view?site_id=${payload}`)
                const response = await SiteService.getSiteView(siteID);
                const getSiteViewResp = response as APIResponse
                // if (response.message) {
                //     this.$notification.show({
                //         message: response.message.msg,
                //         type: response.message.code,
                //     });
                // }
                if (getSiteViewResp.response_code === 200) {
                    const sites = [];
                    const data = getSiteViewResp.response as Site;
                    this.siteView = {}
                    this.siteDevices = []
                    if (data == null) {
                        // commit("SET_SITE_VIEW_SOURCES", []);
                        return {status: "success", data: null};
                    }
                    sites.push(data);
                    const siteDevices: Device[] = [];
                    sites.map((cs) => {
                        if (cs.site_devices && cs.site_devices.length > 0) {
                            cs.site_devices.map((sd) => {
                                if (sd.device_source && sd.device_source.length > 0) {
                                    // sd.device_source.map((ds) => {
                                    sd.site_id = cs.site_id;
                                    siteDevices.push({...sd});
                                    // })
                                }
                                return sd.device_source && sd.device_source.length > 0;
                            });
                            return cs.site_devices && cs.site_devices.length > 0;
                        }
                        return cs;
                    });
                    this.siteSources = siteDevices.map((sd) => {
                        if (sd.source_channels && sd.source_channels.length > 1) {
                            sd.source_channels = sd.source_channels.filter((sc) => {
                                return sc.usecase_key !== Passthru;
                            });
                        }
                        return {...sd};
                    })
                    // console.log(_sourceChannels, "_sourceChannels")
                    // commit("SET_SITE_VIEW_SOURCES", _sourceChannels);
                    return {status: "success", data: null};
                }
                return {status: "failure", data: null};
            } catch (error) {
                useNuxtApp().$notification.show({
                    message: "Error while fetching customer site map",
                    type: "error",
                });
                return {status: "failure", data: null};
            }
        },
        setEditSite(site: Site): boolean {
            this.editSite = site
            return true
        },
        setSite(site: Site): boolean {
            this.site = site
            return true
        },
        setSiteID(siteID: string): boolean {
            this.site_id = siteID
            return true
        },
        setCustomerID(customerID: string): boolean {
            this.customer_id = customerID
            return true
        },
    }
})