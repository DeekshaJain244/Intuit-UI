type RootState = {
    site_id: string
}

type Actions = {
    setSiteID(siteID: string): boolean
}


export const useDeviceStore = defineStore<"device", RootState, any, Actions>({
    id: "device",
    state: (): RootState => ({
        site_id: ""
    }),
    actions: {
        setSiteID(siteID: string): boolean {
            this.site_id = siteID
            return true
        }
    }
})