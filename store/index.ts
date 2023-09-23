import {BreadCrumbItems} from "~/types";

type RootState = {
    items: BreadCrumbItems[]
    tours: Object[]
    display_info: boolean
    page_info: Object
    overlay: boolean
}

type Actions = {
    navItemsUpdate(items: BreadCrumbItems[]): boolean
    setPageInfo(pageInfo: Object): boolean
    setDisplayInfo(value: boolean): boolean
    updateTours(value: Object[]): boolean
    setPageOverlay(value: boolean): boolean
}

export const useMainStore = defineStore<"index", RootState, any, Actions>({
    id: "index",
    state: (): RootState => ({
        items: <BreadCrumbItems[]>[],
        tours: [],
        display_info: false,
        page_info: {},
        overlay: false
    }),
    actions: {
        navItemsUpdate(items: BreadCrumbItems[]): boolean {
            this.items = items
            return true
        },
        setPageInfo(pageInfo: Object): boolean {
            this.page_info = pageInfo
            return true
        },
        setDisplayInfo(value: boolean): boolean {
            this.display_info = value
            return true
        },
        updateTours(value: Object[]): boolean {
            this.tours = value
            return true
        },
        setPageOverlay(value: boolean): boolean{
            this.overlay = value
            return true
        }
    }
})