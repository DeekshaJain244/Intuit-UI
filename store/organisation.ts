import {OpenAPI as STSOpenAPI} from "~/packages/api";

type RootState = {
    organization_id: string
}



const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const organizationStore = defineStore<"organization", RootState>({
    id: "organization",
    state: () => ({
        organization_id: "6238ca760e299a83e2dcf5ff",
    } as RootState),
})