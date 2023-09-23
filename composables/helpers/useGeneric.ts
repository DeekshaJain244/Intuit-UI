import {BreadCrumbItems} from "~/types";
import {useMainStore} from "~/store";


export const useGeneric = () => {
    const config = useRuntimeConfig()
    return {
        getURL() {
            const env = config;
            const protocol = window.location.protocol;
            const hostname = window.location.hostname;
            const port = window.location.port;
            let url = `${protocol}//${hostname}:${port}`;
            if (port === "80" || port === "443") {
                url = `${protocol}//${hostname}`;
            } else if (config.public.isDebug) {
                url = config.public.baseURL;
            }
            return url;
        },
        getStringRoundOff(str: string): string {
            if (str.length > 20) {
                return str.substring(0, 20) + "...";
            } else {
                return str;
            }
        },
        getPortalURL() {
            const protocol = window.location.protocol;
            const hostname = window.location.hostname;
            const port = window.location.port;
            let url = `${protocol}//${hostname}:${port}`;
            if (port === "80" || port === "443" || port === "") {
                url = `${protocol}//${hostname}`;
            }
            return url;
        },
        getPortalHost() {
            return window.location.hostname;
        },
        getColor(status: string): string {
            if (status === "healthy") return "success";
            else if (status === "needs attention") return "warning";
            else return "error";
        },
        formatBytes(bytes: number, decimals = 2) {
            if (bytes === 0) return "0 B";
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
        },
        tsToDate() {
            return new Date().toDateString();
        },
        gHeight(height: number, type: string): number {
            switch (type) {
                case "area":
                    if (height > 230) {
                        return height - 200;
                    }
                    return 140;
                default:
                    if (height > 230) {
                        return height - 90;
                    }
                    return 140;
            }
        },
        setPageInfoData(pageInfo, tourData) {
            const indexStore = useMainStore()
            if (pageInfo) {
                indexStore.setPageInfo(pageInfo)
                indexStore.setDisplayInfo(true);
            }
            if (tourData) {
                indexStore.updateTours(tourData);
            }
        },
        // clearStoreBeforePageLeave() {
        //     this.$store.commit("SET_DISPLAY_INFO", false);
        //     this.$store.commit("SET_PAGE_INFO", {});
        //     this.$store.commit("TOURS_UPDATE", []);
        // },
        constructBreadcrumbs(routeQuery, breadCrumbItems: BreadCrumbItems[]) {
            const indexStore = useMainStore()
            if (Object.keys(routeQuery).length > 0) {
                const bci = breadCrumbItems.map((bc) => {
                    if (bc.queryItem) {
                        // const site = this.$store.state.site.site;
                        // const device = this.$store.state.device.device;
                        // switch (bc.queryItem) {
                        //     case "sid": {
                        //         bc.text = site.site_name;
                        //         bc.href = bc.href + `?sid=${site.site_id}`;
                        //         break;
                        //     }
                        //     case "did": {
                        //         bc.text = device.device_name;
                        //         bc.href = bc.href + `?sid=${site.site_id}&did=${device.device_id}`;
                        //         break;
                        //     }
                        //     case "cid": {
                        //         const usecase = this.$store.state.usecase.usecase;
                        //         const channel = this.$store.state.usecase.channel;
                        //         if (bc.href.includes("?")) {
                        //             bc.href =
                        //                 bc.href +
                        //                 `&sid=${site.site_id}&did=${device.device_id}&uid=${usecase.usecase_id}&cid=${channel.channel_id}`;
                        //         } else {
                        //             bc.href =
                        //                 bc.href +
                        //                 `?sid=${site.site_id}&did=${device.device_id}&uid=${usecase.usecase_id}&cid=${channel.channel_id}`;
                        //         }
                        //         break;
                        //     }
                        //     case "tid": {
                        //         bc.href = bc.href + `?tid=${routeQuery.tid}`;
                        //         break;
                        //     }
                        // }
                        return {...bc};
                    } else {
                        return {...bc};
                    }
                });
                indexStore.navItemsUpdate(bci);
            } else {
                indexStore.navItemsUpdate(breadCrumbItems);
            }
        },
    };
};