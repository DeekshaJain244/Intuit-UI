import {useSettingStore} from "~/store/settings";



export const useSite = () => {
    return {
        storageInformation() {
            const settingStore = useSettingStore()
            const storage_server_info = settingStore.storageDetails.storage_server_info;
            const storage_account_info = settingStore.storageDetails.storage_account_info;
            const buckets = storage_account_info.account_info.Buckets;
            return {storage_server_info, storage_account_info, buckets}
        },
        storageTreeView(sites, buckets) {
            // selectable = false;
            const storageModuleStats = {
                totalStorage: 0,
                totalObjects: 0,
            };
            // console.debug(treeView);
            const treeView = sites.map((site) => {
                let siteStorageSize = 0;
                const sv = {
                    id: site.site_id,
                    name: site.site_name,
                    children: [],
                    locked: false,
                };
                const devices = site.site_devices;
                if (devices && devices.length > 0) {
                    devices.map((device) => {
                        const dv = {
                            id: device.device_id,
                            name: device.device_name,
                            children: [],
                            locked: false,
                        };
                        let channels = device.source_channels;
                        if (channels && channels.length > 0) {
                            channels = channels.filter((channel) => {
                                return channel.usecase_key !== "passthru";
                            });
                            if (channels && channels.length > 0) {
                                // selectable = true;
                                let devSize = 0;
                                channels.map((channel) => {
                                    const key = `${channel.usecase_key}-${channel.channel_key}`;
                                    const cv = {
                                        id: channel.channel_id,
                                        site_id: site.site_id,
                                        name: channel.channel_name,
                                        locked: channel.is_purge,
                                    };
                                    if (buckets) {
                                        buckets.map((bucket) => {
                                            if (bucket.name === key) {
                                                devSize += bucket.size;
                                                cv.name += "  -  " + formatBytes(bucket.size);
                                            }
                                            return bucket;
                                        });
                                    } else {
                                        cv.name += "  -  0B";
                                    }
                                    dv.children.push(cv);
                                    return channel;
                                });
                                siteStorageSize += devSize;
                                dv.name += "  -  " + formatBytes(devSize);
                            }
                            if (dv.children.length > 0) {
                                sv.children.push(dv);
                            } else {
                                dv.locked = true;
                            }
                        }
                        return device;
                    });
                }
                sv.name += "  -  " + formatBytes(siteStorageSize);
                // console.debug(sv.name, "sv.name");
                storageModuleStats.totalStorage += siteStorageSize;
                return sv;
            });
            // console.debug(this.storageModuleStats, this.treeView, "stats");
            // storageModuleStats = storageModuleStats;
            return {storageModuleStats, treeView}
        },
        formatBytes(bytes, decimals = 2) {
            if (bytes === 0) return "0 B";
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
        },
        async purgeStorage(selectedChannels) {
            const settingStore = useSettingStore()
            let data = [];
            selectedChannels.map((channel) => {
                if (data.length === 0) {
                    data.push({channel_ids: [channel.id], site_id: channel.site_id});
                } else if (data.length > 0) {
                    const eachData = data.find((d) => {
                        // if (d.site_id === channel.site_id) {
                        // 	return d
                        // }
                        return d.site_id === channel.site_id && d;
                    });
                    if (eachData) {
                        data = data.map((d) => {
                            if (d.site_id === channel.site_id) {
                                d.channel_ids.push(channel.id);
                                return {...d};
                            } else {
                                return {...d};
                            }
                        });
                    } else {
                        data.push({
                            channel_ids: [channel.id],
                            site_id: channel.site_id,
                        });
                    }
                }
                return channel;
            });

            const response = await settingStore.storageDelete(data);
            return response.status === "success";
        },
    }
}