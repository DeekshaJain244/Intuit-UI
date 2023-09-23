import {APIResponse, StoreAPIResponse} from "~/types";
import {
    CustomerService,
    OpenAPI as STSOpenAPI,
    sts_internal_api_customer_customerIDReq as CustomerIDReq,
    sts_internal_api_customer_customerResp as Customer
} from "~/packages/api";

type RootState = {
    organization_id: "deaf0deaf0deaf00999cf5ff",
    customer_id: string
    customer: Customer,
    customers: Customer[]
    editCustomer: Customer,
    resolve: Customer,
    openResolveDialog: boolean,
    selectedResolveCustomer: Customer
}

type Getters = {}

type Actions = {
    getCustomers(): Promise<StoreAPIResponse>;
    createCustomer(customer: Customer): Promise<StoreAPIResponse>;
    updateCustomer(customer: Customer): Promise<StoreAPIResponse>;
    deleteCustomer(customerID: string): Promise<StoreAPIResponse>;
    setResolve(customer: Customer): boolean
    setEditCustomer(customer: Customer): boolean
    addSiteIDToCustomer(siteID: string): boolean
}

const runtimeConfig = useRuntimeConfig();

STSOpenAPI.BASE = runtimeConfig.public.baseURL;
STSOpenAPI.WITH_CREDENTIALS = true;


export const useCustomerStore = defineStore<"customer", RootState, Getters, Actions>({
    id: "customer",
    state: (): RootState => ({
        organization_id: "deaf0deaf0deaf00999cf5ff",
        customer_id: "",
        customer: <Customer>{},
        customers: [],
        resolve: <Customer>{},
        openResolveDialog: false,
        selectedResolveCustomer: <Customer>{},
        editCustomer: <Customer>{}
    }),
    getters: {},
    actions: {
        async getCustomers() {
            try {
                // api/v1/customer/list
                const response = await CustomerService.getCustomerList(this.organization_id, false)
                const customerListResp = response as APIResponse
                if (customerListResp.response_code == 200) {
                    this.customers = customerListResp.response as Customer[]
                    // this.authenticated = true
                    // localStorage.setItem("userAuthenticated", "true")
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        async createCustomer(customer) {
            try {
                // api/v1/customer/create
                customer.organization_id = this.organization_id
                const response = await CustomerService.putCustomerCreate(customer)
                const customerCreateResp = response as APIResponse
                if (customerCreateResp.response_code == 201) {
                    this.openResolveDialog = true
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        async updateCustomer(customer) {
            try {
                const response = await CustomerService.patchCustomerUpdate(customer)
                const customerUpdateResp = response as APIResponse
                if (customerUpdateResp.response_code == 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        async deleteCustomer(customerID: string) {
            try {
                const payload: CustomerIDReq = {
                    customer_id: customerID
                }
                console.debug(payload, "payload")
                const response = await CustomerService.deleteCustomerDelete(payload)
                const customerDeleteResp = response as APIResponse
                if (customerDeleteResp.response_code == 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        setResolve(payload: Customer) {
            this.selectedResolveCustomer = payload
            return true
        },
        setEditCustomer(payload: Customer) {
            this.editCustomer = payload
            return true
        },
        addSiteIDToCustomer(siteID: string) {
            this.selectedResolveCustomer.customer_sites ? this.selectedResolveCustomer.customer_sites.push(siteID) : (this.selectedResolveCustomer.customer_sites = [siteID]);
            return true
        }
    }
})