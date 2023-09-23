import {Customer} from "~/types";
import {OpenAPI as STSOpenAPI} from "~/packages/api";

type RootState = {
    resolve: Customer,
}

type Getters = {
}

interface Actions {
    setResolve(payload: Customer): boolean
}


const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;

export const resolveStore = defineStore<"resolve", RootState, Getters, Actions>({
    id: "resolve",
    state: () => ({
        resolve: <Customer>{}
    } as RootState),
    getters: {},
    actions: {
         setResolve(payload: Customer){
            this.resolve = payload
            return true
        }
    }
})