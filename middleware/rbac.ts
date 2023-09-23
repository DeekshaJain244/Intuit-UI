import {
    AddConfiguration,
    AddSite,
    Configurations,
    Dashboard,
    EditConfiguration,
    EditSite,
    License,
    Site,
    SiteID,
    User,
    AddUser,
    EditUser,
    UserManage,
    UserProfile
} from "~/service/utils/constants";

import {storeToRefs} from "pinia";
import {useRBACStore} from "~/store/rbac";
import {useAuthStore} from "~/store/auth";
import {useStatusStore} from "~/store/status";
import {useConfigurationStore} from "~/store/configurations"
import {useLicenseStore} from "~/store/license";
import {useCustomerStore} from "~/store/customer";
import {useMainStore} from "~/store";
import {useSiteStore} from "~/store/site"
import {useDeviceStore} from "~/store/device"
import {useRuleStore} from "~/store/rule"
import {useSettingStore} from "~/store/settings";
import {Route} from "~/composables/router/router";
import {useUserStore} from "~/store/user";
import {StoreAPIResponse} from "~/types";


const rbacStore = useRBACStore()
const authStore = useAuthStore()
const statusStore = useStatusStore()
const configurationStore = useConfigurationStore()
const indexStore = useMainStore()
const licenseStore = useLicenseStore()
const customerStore = useCustomerStore()
const siteStore = useSiteStore()
const deviceStore = useDeviceStore()
const ruleStore = useRuleStore()
const settingStore = useSettingStore()
const userStore = useUserStore()

const {loggedInUser} = storeToRefs(authStore)
const {modules} = storeToRefs(rbacStore)


export default defineNuxtRouteMiddleware(async (to, from) => {
    const {$i18n} = useNuxtApp();
    const locale = $i18n.locale;
    const locales = $i18n.locales
    let langCode

    const resolveConfigurations = async (isStatus: boolean) => {
        const response = await configurationStore.getNimbleConfigurations(isStatus)
        if (response.status !== "success") {
            return {configResolve: false, configFallback: "/dashboard"};
        } else {
            return {configResolve: true, configFallback: null};
        }
    };
    const resolveLicense = async () => {
        const response = await licenseStore.getLicenses(false)
        if (response.status !== "success") {
            return {licenseResolve: false, licenseFallback: "/dashboard"};
        } else {
            return {licenseResolve: true, licenseFallback: null};
        }
    };
    const getStatus = async () => {
        await statusStore.getStatus()
    };
    const checkCustomer = async () => {
        if (Object.keys(customerStore.selectedResolveCustomer).length === 0) {
            const response = await customerStore.getCustomers() //store.dispatch("customer/getAllCustomers", { showNotification: true });
            if (response.status === "success") {
                const customers = customerStore.customers;
                if (customers && customers.length > 0) {
                    const customerFormStorage = JSON.parse(localStorage.getItem("customer"));
                    if (!customerFormStorage) {
                        // return { customerResolve: false, customerFallback: "/dashboard" };
                        const resolve = customers[0];
                        customerStore.setResolve(resolve)
                        localStorage.setItem("customer", JSON.stringify(resolve));
                        return {customerResolve: true, customerFallback: null};
                    } else {
                        const customerCheck = customers.find((c) => {
                            return c.customer_id === customerFormStorage.customer_id && c;
                        });
                        if (customerCheck && customerCheck.customer_id) {
                            customerStore.setResolve(customerCheck)
                            return {customerResolve: true, customerFallback: null};
                        } else {
                            return {customerResolve: false, customerFallback: "/dashboard"};
                        }
                    }
                } else {
                    return {customerResolve: false, customerFallback: "/dashboard"};
                }
            } else {
                return {customerResolve: false, customerFallback: "/dashboard"};
            }
        } else {
            return {customerResolve: true, customerFallback: null};
        }
    };
    // const channelLevelCommon = async (query) => {
    //     if (query.cid && query.uid && query.did) {
    //         const payload = {
    //             usecase_id: query.uid,
    //             channel_id: query.cid,
    //         };
    //         let response;
    //         if (
    //             store.state.usecase.channel.channel_id !== query.cid ||
    //             store.state.usecase.usecase.usecase_id !== query.uid
    //         ) {
    //             response = await store.dispatch("usecase/getUseCaseChannelID", payload);
    //         } else {
    //             response = true;
    //         }
    //         if (response) {
    //             if (store.state.device.device.device_id !== query.did) {
    //                 response = await store.dispatch("device/getDeviceByID", query.did);
    //             } else {
    //                 response = true;
    //             }
    //             if (response) {
    //                 const device = store.state.device.device;
    //                 // await store.dispatch("usecase/updateDeviceIDtoChannel", device.device_id);
    //                 if (store.state.site.site.site_id !== device.site_id) {
    //                     response = await store.dispatch("site/getSiteByID", device.site_id);
    //                 } else {
    //                     response = true;
    //                 }
    //                 if (!response) {
    //                     return { channelResolve: false, channelFallback: "/site" };
    //                 } else {
    //                     return { channelResolve: true, channelFallback: null };
    //                 }
    //             } else {
    //                 return { channelResolve: false, channelFallback: "/site" };
    //             }
    //         } else {
    //             return { channelResolve: false, channelFallback: "/site" };
    //         }
    //     } else {
    //         return { channelResolve: false, channelFallback: "/site" };
    //     }
    // };

    // TODO:: navigateTo() is not working resolve this.
    const pageRedirect = async (path) => {
        if (langCode) {
            return navigateTo(`/${langCode}${path}`);
        } else {
            console.debug(langCode, path, "pageRedirect")
            return navigateTo(path);
        }
    };

    const setPageOverlay = () => {
        indexStore.setPageOverlay(!indexStore.overlay)
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const resolveComponents = async (module, path, query) => {
        const roleKey = loggedInUser.value.role_key;
        switch (module.module_name) {
            case Dashboard: {
                // eslint-disable-next-line
                const {licenseResolve, licenseFallback} = await resolveLicense();
                if (!licenseResolve) {
                    break;
                }
                // eslint-disable-next-line
                const {configResolve, configFallback} = await resolveConfigurations(false);
                if (!configResolve) {
                    break;
                }
                // store.dispatch("setResolve", {});
                // eslint-disable-next-line
                const {customerResolve, customerFallback} = await checkCustomer();
                if (!customerResolve) {
                    break;
                }
                break;
            }
            // case Customer: {
            //     setPageOverlay();
            //     // await delay(5000);
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     await getStatus();
            //     // const status = store.state.status;
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         let response = await store.dispatch("site/setCustomerID", customerId);
            //         if (response) {
            //             const data = {
            //                 loading: true,
            //             };
            //             response = await store.dispatch("site/getAllSiteDevices", data);
            //             if (response.status === "success") {
            //                 // if (store.state.site.sites.length == 0) {
            //                 //   redirect("/deployment");
            //                 // }
            //             }
            //         } else {
            //             pageRedirect("/dashboard");
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            case Site: {
                setPageOverlay();
                // await delay(5000);
                const {customerResolve, customerFallback} = await checkCustomer();
                if (!customerResolve) {
                    setPageOverlay();
                    pageRedirect(customerFallback);
                    break;
                }
                await getStatus();
                // const status = store.state.status;
                if (customerStore.selectedResolveCustomer && customerStore.selectedResolveCustomer.customer_id) {
                    const customerId = customerStore.selectedResolveCustomer.customer_id
                    // store.state.site.intermediate_customer_id
                    // ? store.state.site.intermediate_customer_id
                    // : customerStore.selectedResolveCustomer.customer_id;
                    let response = siteStore.setCustomerID(customerId)
                    if (response) {
                        const data = {
                            loading: true,
                        };
                        response = await siteStore.getAllSiteDevices(data)
                        if (response.status === "success") {
                            // if (store.state.site.sites.length == 0) {
                            //   redirect("/deployment");
                            // }
                            // console.debug(status, "stautus");
                            if (roleKey === "super_admin" || roleKey === "admin") {
                                response = await settingStore.getStorageDetails()
                                if (response.status === "failure") {
                                    pageRedirect("/dashboard");
                                }
                            }
                        } else {
                            pageRedirect("/dashboard");
                        }
                    } else {
                        pageRedirect("/dashboard");
                    }
                }
                setPageOverlay();
                break;
            }
            case AddSite: {
                setPageOverlay();
                const {customerResolve, customerFallback} = await checkCustomer();
                if (!customerResolve) {
                    setPageOverlay();
                    pageRedirect(customerFallback);
                    break;
                }
                setPageOverlay();
                break;
            }
            case EditSite: {
                setPageOverlay();
                const {customerResolve, customerFallback} = await checkCustomer();
                if (!customerResolve) {
                    setPageOverlay();
                    pageRedirect(customerFallback);
                    break;
                }
                if (query.sid) {
                    if (customerStore.selectedResolveCustomer && customerStore.selectedResolveCustomer.customer_id) {
                        const customerId = customerStore.selectedResolveCustomer.customer_id;
                        siteStore.setCustomerID(customerId)
                        const response = await siteStore.getSiteByID(query.sid);
                        if (response.status === "failure") {
                            return pageRedirect("/site");
                        }
                        siteStore.setEditSite(response.data)
                    }
                } else {
                    return pageRedirect("/site");
                }
                setPageOverlay();
                break;
            }
            // case CameraView: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.resolve.customer_id;
            //         let response = store.dispatch("site/setCustomerID", customerId);
            //         if (response) {
            //             if (query.sid) {
            //                 const payload = query.sid;
            //                 response = await store.dispatch("site/getSiteDevices", payload);
            //                 if (!response) {
            //                     pageRedirect("/site");
            //                 }
            //             } else {
            //                 response = await store.dispatch("site/getAllSites", customerId);
            //                 // if (store.state.site.sites.length == 0) {
            //                 //   redirect("/deployment");
            //                 // }
            //                 // response = await store.dispatch("site/getAllSiteDevices");
            //                 if (!response) {
            //                     pageRedirect("/site");
            //                 }
            //             }
            //         } else {
            //             pageRedirect("/site");
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case AnalyticView: {
            //     setPageOverlay();
            //     // eslint-disable-next-line
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect("/dashboard");
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const response = await store.dispatch("usecase/getAnalyticViewUseCase", store.state.resolve.customer_id);
            //         if (!response) {
            //             pageRedirect("/dashboard");
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case MapView: {
            //     setPageOverlay();
            //     // eslint-disable-next-line
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect("/dashboard");
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         let response = await store.dispatch("site/setCustomerID", customerId);
            //         if (response) {
            //             response = await store.dispatch("site/getAllSites", customerId);
            //             // if (store.state.site.sites.length == 0) {
            //             //   redirect("/deployment");
            //             // }
            //             if (!response) {
            //                 pageRedirect("/dashboard");
            //             }
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case SiteView: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.resolve.customer_id;
            //         let response = store.dispatch("site/setCustomerID", customerId);
            //         if (response) {
            //             if (query.sid) {
            //                 const payload = query.sid;
            //                 response = await store.dispatch("site/getSiteDevices", payload);
            //                 if (!response) {
            //                     pageRedirect("/site");
            //                 }
            //             } else {
            //                 response = await store.dispatch("site/getAllSites", customerId);
            //                 // if (store.state.site.sites.length == 0) {
            //                 //   redirect("/deployment");
            //                 // }
            //                 // response = await store.dispatch("site/getAllSiteDevices");
            //                 if (!response) {
            //                     pageRedirect("/site");
            //                 }
            //             }
            //         } else {
            //             pageRedirect("/site");
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            case SiteID: {
                setPageOverlay();
                const {customerResolve, customerFallback} = await checkCustomer();
                if (!customerResolve) {
                    setPageOverlay();
                    pageRedirect(customerFallback);
                    break;
                }
                await getStatus();
                // eslint-disable-next-line
                const {configResolve, configFallback} = await resolveConfigurations(false);
                if (!configResolve) {
                    setPageOverlay();
                    pageRedirect("/site");
                    break;
                }
                // const status = store.state.status;
                if (query.sid) {
                    // if (!store.state.device.site_id) {
                    // let response = await store.dispatch(
                    //   "site/getSiteByID",
                    //   query.sid
                    // );
                    let response = await siteStore.getSiteDevices(query.sid)
                    if (response.status === "success") {
                        response = deviceStore.setSiteID(query.sid)
                        if (response) {
                            // ruleStore
                            response = await ruleStore.getAllRules(query.sid)
                            if (response.status === "success") {
                                if (roleKey === "super_admin" || roleKey === "admin") {
                                    response = await store.dispatch("settings/getStorageDetails");
                                    if (!response) {
                                        pageRedirect("/site");
                                    }
                                }
                            } else {
                                pageRedirect("/site");
                            }
                        } else {
                            pageRedirect("/site");
                        }
                    } else {
                        pageRedirect("/site");
                    }
                    // }
                } else {
                    pageRedirect("/site");
                }
                setPageOverlay();
                break;
            }
            // case AddDevice: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (query.sid) {
            //         const response = await store.dispatch("site/getSiteByID", query.sid);
            //         if (response) {
            //             // eslint-disable-next-line
            //             const { configResolve, configFallback } = await resolveConfigurations(true, true, true);
            //             if (!configResolve) {
            //                 setPageOverlay();
            //                 pageRedirect("/site");
            //                 break;
            //             }
            //         } else {
            //             pageRedirect("/site");
            //         }
            //     } else {
            //         pageRedirect("/site");
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case EditDevice: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (Object.keys(store.state.device.edit_device).length > 0) {
            //         if (query.sid) {
            //             let response = await store.dispatch("site/getSiteByID", query.sid);
            //             if (response) {
            //                 response = await store.dispatch("device/setSiteID", query.sid);
            //                 if (response) {
            //                     // eslint-disable-next-line
            //                     const { configResolve, configFallback } = await resolveConfigurations(true, true, true);
            //                     if (!configResolve) {
            //                         setPageOverlay();
            //                         pageRedirect("/site");
            //                         break;
            //                     }
            //                 } else {
            //                     pageRedirect("/site");
            //                 }
            //             } else {
            //                 pageRedirect("/site");
            //             }
            //         } else {
            //             pageRedirect("/site");
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case DeviceID: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (query.sid && query.did) {
            //         let response;
            //         if (store.state.site.site.site_id !== query.sid) {
            //             response = await store.dispatch("site/getSiteByID", query.sid);
            //         } else {
            //             response = true;
            //         }
            //         if (response) {
            //             if (store.state.device.device.device_id !== query.did) {
            //                 response = await store.dispatch("device/getDeviceByID", query.did);
            //             } else {
            //                 response = true;
            //             }
            //             if (response) {
            //                 response = await store.dispatch("device/setSiteID", query.sid);
            //                 // eslint-disable-next-line
            //                 const { configResolve, configFallback } = await resolveConfigurations(false, true, true);
            //                 if (!configResolve) {
            //                     pageRedirect("/site");
            //                 }
            //             } else {
            //                 pageRedirect("/site");
            //             }
            //         } else {
            //             pageRedirect("/site");
            //         }
            //     } else {
            //         pageRedirect("/site");
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case ChannelList: {
            //     break;
            // }
            // case AddChannel: {
            //     setPageOverlay();
            //     let response;
            //     if (store.state.device.device.device_id !== query.did) {
            //         response = await store.dispatch("device/getDeviceByID", query.did);
            //     } else {
            //         response = true;
            //     }
            //     if (response) {
            //         const device = store.state.device.device;
            //         if (store.state.site.site.site_id !== device.site_id) {
            //             response = await store.dispatch("site/getSiteByID", device.site_id);
            //         } else {
            //             response = true;
            //         }
            //         if (response) {
            //             if (store.state.configuration.configuration.nimble_id !== device.nimble_id) {
            //                 response = await store.dispatch("configuration/getNimbleByID", device.nimble_id);
            //                 if (!response) {
            //                     pageRedirect("/site");
            //                 }
            //             }
            //         } else {
            //             pageRedirect("/site");
            //         }
            //     } else {
            //         pageRedirect("/site");
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case EditChannel: {
            //     setPageOverlay();
            //     let response;
            //     if (store.state.usecase.usecases.length === 0) {
            //         response = await store.dispatch("usecase/getUseCases");
            //     } else {
            //         response = true;
            //     }
            //     if (response) {
            //         if (store.state.device.device.device_id !== query.did) {
            //             response = await store.dispatch("device/getDeviceByID", query.did);
            //         } else {
            //             response = true;
            //         }
            //         if (response) {
            //             const device = store.state.device.device;
            //             if (store.state.site.site.site_id !== device.site_id) {
            //                 response = await store.dispatch("site/getSiteByID", device.site_id);
            //             } else {
            //                 response = true;
            //             }
            //             if (response) {
            //                 if (store.state.configuration.configuration.nimble_id !== device.nimble_id) {
            //                     response = await store.dispatch("configuration/getNimbleByID", device.nimble_id);
            //                 }
            //                 if (!response) {
            //                     pageRedirect("/site");
            //                 }
            //             } else {
            //                 pageRedirect("/site");
            //             }
            //         } else {
            //             pageRedirect("/site");
            //         }
            //     } else {
            //         pageRedirect("/site");
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case ChannelID: {
            //     setPageOverlay();
            //     const { channelResolve, channelFallback } = await channelLevelCommon(query);
            //     if (!channelResolve) {
            //         pageRedirect(channelFallback);
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case ChannelDiagnostic: {
            //     setPageOverlay();
            //     const { channelResolve, channelFallback } = await channelLevelCommon(query);
            //     if (!channelResolve) {
            //         pageRedirect(channelFallback);
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case Alert: {
            //     setPageOverlay();
            //     const { channelResolve, channelFallback } = await channelLevelCommon(query);
            //     if (!channelResolve) {
            //         setPageOverlay();
            //         pageRedirect(channelFallback);
            //         break;
            //     }
            //     const usecase = store.state.usecase.usecase;
            //     const channel = store.state.usecase.channel;
            //     if (usecase.usecase_key != null) {
            //         const payload = {
            //             channel_id: channel.channel_id,
            //         };
            //         const response = await store.dispatch("usecase/getAllAlerts", payload);
            //         if (response.status !== "success") {
            //             pageRedirect("/site");
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case AddAlert: {
            //     setPageOverlay();
            //     const { channelResolve, channelFallback } = await channelLevelCommon(query);
            //     if (!channelResolve) {
            //         setPageOverlay();
            //         pageRedirect(channelFallback);
            //         break;
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case EditAlert: {
            //     break;
            // }
            // case EventsList: {
            //     setPageOverlay();
            //     const { channelResolve, channelFallback } = await channelLevelCommon(query);
            //     if (!channelResolve) {
            //         setPageOverlay();
            //         pageRedirect(channelFallback);
            //         break;
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case EventID: {
            //     setPageOverlay();
            //     const { channelResolve, channelFallback } = await channelLevelCommon(query);
            //     if (!channelResolve) {
            //         setPageOverlay();
            //         pageRedirect(channelFallback);
            //         break;
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case NotificationsList: {
            //     setPageOverlay();
            //     const { channelResolve, channelFallback } = await channelLevelCommon(query);
            //     if (!channelResolve) {
            //         setPageOverlay();
            //         pageRedirect(channelFallback);
            //         break;
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case ChannelSchedules: {
            //     setPageOverlay();
            //     const { channelResolve, channelFallback } = await channelLevelCommon(query);
            //     if (!channelResolve) {
            //         setPageOverlay();
            //         pageRedirect(channelFallback);
            //         break;
            //     }
            //     const channel = store.state.usecase.channel;
            //     const payload = {
            //         channel_id: channel.channel_id,
            //         timezone: store.state.site.site.site_address.site_timezone,
            //     };
            //     let response = await store.dispatch("usecase/getAllAlerts", payload);
            //     if (response.status === "success") {
            //         response = await store.dispatch("scheduler/getAllSchedules", payload);
            //         if (!response) {
            //             pageRedirect("/site");
            //         }
            //     } else {
            //         pageRedirect("/site");
            //     }
            //     setPageOverlay();
            //     break;
            // }
            case Configurations: {
                // await checkCustomer()
                setPageOverlay();
                const response = true
                // const response = await store.dispatch("license/getLicenses");
                if (response) {
                    const {configResolve, configFallback} = await resolveConfigurations(true);
                    if (!configResolve) {
                        setPageOverlay();
                        pageRedirect(configFallback);
                        break;
                    }
                } else {
                    setPageOverlay();
                    pageRedirect("/dashboard");
                    break;
                }
                setPageOverlay();
                break;
            }
            case AddConfiguration: {
                setPageOverlay();
                if (configurationStore.configurations.length === 0) {
                    const {configResolve, configFallback} = await resolveConfigurations(false);
                    if (!configResolve) {
                        setPageOverlay();
                        pageRedirect(configFallback);
                        break;
                    }
                }
                const response = await licenseStore.getLicenses(false)
                if (response.status !== "success") {
                    setPageOverlay();
                    pageRedirect("/dashboard");
                    break;
                }
                setPageOverlay();
                break;
            }
            case EditConfiguration: {
                setPageOverlay();
                if (configurationStore.configurations.length === 0) {
                    const {configResolve, configFallback} = await resolveConfigurations(false);
                    if (!configResolve) {
                        setPageOverlay();
                        pageRedirect(configFallback);
                        break;
                    }
                }
                const response = await licenseStore.getLicenses(false)
                if (!response) {
                    setPageOverlay();
                    pageRedirect("/configuration");
                    break;
                }
                setPageOverlay();
                break;
            }
            // case Deployment: {
            //     setPageOverlay();
            //     // eslint-disable-next-line
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect("/dashboard");
            //         break;
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case Settings: {
            //     setPageOverlay();
            //     const response = await store.dispatch("getStatus", false, true);
            //     if (!response) {
            //         setPageOverlay();
            //         pageRedirect("/dashboard");
            //         break;
            //     }
            //     setPageOverlay();
            //     break;
            // }
            case User: {
                setPageOverlay();
                const response = await userStore.getUsers() ;
                if (!response) {
                    setPageOverlay();
                    pageRedirect("/dashboard");
                    break;
                }
                setPageOverlay();
                break;
            }
            case AddUser: {
                setPageOverlay();
                const response = await userStore.getUserEmailLookup();
                if (!response) {
                    setPageOverlay();
                    pageRedirect("/dashboard");
                    break;
                }
                setPageOverlay();
                break;
            }
            case EditUser: {
                setPageOverlay();
                const response = await userStore.getUserEmailLookup();
                if (!response) {
                    setPageOverlay();
                    pageRedirect("/dashboard");
                    break;
                }
                setPageOverlay();
                break;
            }
            case UserManage: {
                setPageOverlay();
                const customerListResp = await customerStore.getCustomers() //store.dispatch("customer/getAllCustomers", { showNotification: true });
                if (customerListResp) {
                    const response = await userStore.getUsers();
                    if (!response) {
                        setPageOverlay();
                        pageRedirect("/dashboard");
                        break;
                    }
                } else {
                    setPageOverlay();
                    pageRedirect("/dashboard");
                    break;
                }
                setPageOverlay();
                break;
            }
            case UserProfile: {
                break;
            }
            // case Reports: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         store.dispatch("site/setCustomerID", customerId);
            //         let response = await store.dispatch("site/getAllSites", customerId);
            //         // if (store.state.site.sites.length == 0) {
            //         //   redirect("/deployment");
            //         // }
            //         if (!response) {
            //             setPageOverlay();
            //             pageRedirect("/dashboard");
            //             break;
            //         }
            //         if (store.state.usecase.usecases.length === 0) {
            //             response = await store.dispatch("usecase/getUseCases");
            //             if (!response) {
            //                 setPageOverlay();
            //                 pageRedirect("/dashboard");
            //                 break;
            //             }
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case RuleReports: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         store.dispatch("site/setCustomerID", customerId);
            //         let response = await store.dispatch("site/getAllSites", customerId);
            //         // if (store.state.site.sites.length == 0) {
            //         //   redirect("/deployment");
            //         // }
            //         if (!response) {
            //             setPageOverlay();
            //             pageRedirect("/dashboard");
            //             break;
            //         }
            //         if (store.state.usecase.usecases.length === 0) {
            //             response = await store.dispatch("usecase/getUseCases");
            //             if (!response) {
            //                 setPageOverlay();
            //                 pageRedirect("/dashboard");
            //                 break;
            //             }
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case SiteAlerts: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         store.dispatch("site/setCustomerID", customerId);
            //         let response = await store.dispatch("site/getAllSites", customerId);
            //         if (response) {
            //             if (store.state.usecase.usecases.length === 0) {
            //                 response = await store.dispatch("usecase/getUseCases");
            //                 if (!response) {
            //                     setPageOverlay();
            //                     pageRedirect("/dashboard");
            //                     break;
            //                 }
            //             } else {
            //                 setPageOverlay();
            //                 break;
            //             }
            //         }
            //         // if (store.state.site.sites.length == 0) {
            //         //   redirect("/deployment");
            //         // }
            //         if (!response) {
            //             setPageOverlay();
            //             pageRedirect("/dashboard");
            //             break;
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case SiteAlertCreate: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         store.dispatch("site/setCustomerID", customerId);
            //         let response = await store.dispatch("site/getAllSites", customerId);
            //         if (response) {
            //             if (store.state.usecase.usecases.length === 0) {
            //                 response = await store.dispatch("usecase/getUseCases");
            //                 if (!response) {
            //                     setPageOverlay();
            //                     pageRedirect("/dashboard");
            //                     break;
            //                 }
            //             } else {
            //                 setPageOverlay();
            //                 break;
            //             }
            //         }
            //         // if (store.state.site.sites.length == 0) {
            //         //   redirect("/deployment");
            //         // }
            //         if (!response) {
            //             setPageOverlay();
            //             pageRedirect("/dashboard");
            //             break;
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case SiteNotifications: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         store.dispatch("site/setCustomerID", customerId);
            //         let response = await store.dispatch("site/getAllSites", customerId);
            //         // if (store.state.site.sites.length == 0) {
            //         //   redirect("/deployment");
            //         // }
            //         if (!response) {
            //             setPageOverlay();
            //             pageRedirect("/dashboard");
            //             break;
            //         }
            //         if (store.state.usecase.usecases.length === 0) {
            //             response = await store.dispatch("usecase/getUseCases");
            //             if (!response) {
            //                 setPageOverlay();
            //                 pageRedirect("/dashboard");
            //                 break;
            //             }
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case TraceLogs: {
            //     setPageOverlay();
            //     let response = await store.dispatch("user/getUsers");
            //     if (response) {
            //         response = await store.dispatch("trace/getTraceCodes");
            //         if (!response) {
            //             setPageOverlay();
            //             pageRedirect("/dashboard");
            //             break;
            //         }
            //     } else {
            //         setPageOverlay();
            //         pageRedirect("/dashboard");
            //         break;
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case SiteContextualRules: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         store.dispatch("site/setCustomerID", customerId);
            //         let response = await store.dispatch("site/getAllSites", customerId);
            //         // if (store.state.site.sites.length == 0) {
            //         //   redirect("/deployment");
            //         // }
            //         if (!response) {
            //             setPageOverlay();
            //             pageRedirect("/dashboard");
            //             break;
            //         }
            //         if (store.state.usecase.usecases.length === 0) {
            //             response = await store.dispatch("usecase/getUseCases");
            //             if (!response) {
            //                 setPageOverlay();
            //                 pageRedirect("/dashboard");
            //                 break;
            //             }
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case SiteContextualRuleCreate: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         store.dispatch("site/setCustomerID", customerId);
            //         let response = await store.dispatch("site/getAllSites", customerId);
            //         // if (store.state.site.sites.length == 0) {
            //         //   redirect("/deployment");
            //         // }
            //         if (!response) {
            //             setPageOverlay();
            //             pageRedirect("/dashboard");
            //             break;
            //         }
            //         if (store.state.usecase.usecases.length === 0) {
            //             response = await store.dispatch("usecase/getUseCases");
            //             if (!response) {
            //                 setPageOverlay();
            //                 pageRedirect("/dashboard");
            //                 break;
            //             }
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case SiteContextualRuleUpdate: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         store.dispatch("site/setCustomerID", customerId);
            //         let response = await store.dispatch("site/getAllSites", customerId);
            //         if (!response) {
            //             setPageOverlay();
            //             pageRedirect("/dashboard");
            //             break;
            //         } else {
            //             response = await store.dispatch("rule/getRuleByID", query.rid);
            //             if (!response) {
            //                 setPageOverlay();
            //                 pageRedirect("/dashboard");
            //                 break;
            //             }
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case SiteSchedulerRuleList: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     let response = await store.dispatch("site/getSiteByID", query.sid);
            //     if (response) {
            //         const site = store.state.site.site;
            //         const payload = {
            //             site_id: site.site_id,
            //         };
            //         response = await store.dispatch("scheduler/getRuleSchedules", payload);
            //         if (response) {
            //             response = await store.dispatch("rule/getAllRules", site.site_id);
            //             if (response.status !== "success") {
            //                 setPageOverlay();
            //                 pageRedirect("/site");
            //                 break;
            //             }
            //         } else {
            //             setPageOverlay();
            //             pageRedirect("/site");
            //             break;
            //         }
            //     } else {
            //         setPageOverlay();
            //         pageRedirect("/site");
            //         break;
            //     }
            //     setPageOverlay();
            //     break;
            // }
            // case RuleNotifications: {
            //     setPageOverlay();
            //     const { customerResolve, customerFallback } = await checkCustomer();
            //     if (!customerResolve) {
            //         setPageOverlay();
            //         pageRedirect(customerFallback);
            //         break;
            //     }
            //     if (store.state.resolve && store.state.resolve.customer_id) {
            //         const customerId = store.state.site.intermediate_customer_id
            //             ? store.state.site.intermediate_customer_id
            //             : store.state.resolve.customer_id;
            //         store.dispatch("site/setCustomerID", customerId);
            //         const response = await store.dispatch("site/getAllSites", customerId);
            //         if (!response) {
            //             setPageOverlay();
            //             pageRedirect("/dashboard");
            //             break;
            //         }
            //     }
            //     setPageOverlay();
            //     break;
            // }
            case License: {
                setPageOverlay();
                const response = await licenseStore.getLicenses(false)
                if (response.status !== "success") {
                    setPageOverlay();
                    pageRedirect("/dashboard");
                    break;
                }
                setPageOverlay();
                break;
            }
            default: {
                pageRedirect("/dashboard");
            }
        }
    };

    // Module check
    const getEachModule = async () => {
        let path = Route().path;
        const locales = $i18n.locales.value.map((locale) => {
            return locale.code;
        });
        console.debug(locales, "locales")
        const _path = path.split("/");
        if (locales.includes(_path[1])) {
            langCode = _path[1];
            _path.splice(1, 1);
            path = _path.join("/");
        }
        const query = Route().query;
        if (path[path.length - 1] === "/") {
            path = path.slice(0, path.length - 1);
        }
        console.debug(path, to, "path")
        const module = modules.value.find((mod) => {
            return mod.module_path === to.path;
        });

        if (module) {
            const response = rbacStore.setModules(module)
            if (response) {
                await resolveComponents(module, path, query);
            }
        } else if (langCode) {
            navigateTo(`/${langCode}/`);
        } else {
            navigateTo("/");
        }
    };

    if (modules.value && modules.value.length > 0) {
        console.debug("mod1")
        await getEachModule()
    } else {
        console.debug("mod2")
        const _modules = JSON.parse(localStorage.getItem("uiModules"));
        if (_modules && _modules.length > 0) {
            console.debug("mod3")
            const response = rbacStore.setModules(_modules)
            if (response) {
                await getEachModule();
            }
        } else {
            console.debug("mod4")
            const response = await rbacStore.getAllModules()
            if (response.status === "success") {
                localStorage.setItem("uiModules", JSON.stringify(modules.value));
                await getEachModule();
            }
        }
    }
})