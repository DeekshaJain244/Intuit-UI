// export type UseFetchAPIResponse = {
//     data
//     pending
//     error
//     refresh
// }

export type BreadCrumbItems = {
    text: String,
    disabled: Boolean,
    href: String,
    queryItem: null | String,
}

export type APIResponse = {
    response_code: number,
    response: string | object | null
    message?: string
    error?: string
}

export type StoreAPIResponse = {
    status: String,
    data: String | Object | null | Number
}

export type Status = {
    version: string
    desc: string
    brand_name: string
    nis_module: boolean
    smtp_module: boolean
    sms_module: boolean
    is_onboarding: boolean
    sts_service: string[]
    auth_providers: Object[]
    license_count: Number
}

export type UserConfig = {
    user_id: string;
    role_id: string;
    channel_ids: string[];
    usecase_ids: string[];
    customer_ids: string[];
    site_ids: string[];
    ui_config: Object;
}

export type User = {
    user_id: string;
    role_id: string;
    ui_config: UserConfig;
    role_key: string;
    first_name: string;
    last_name: string;
    user_name: string;
    avatar: string;
    email: string;
    image: string;
    is_active: boolean;
    is_verified: boolean;
    last_logged_in_at: string;
};

export type Role = {
    role_id: string
    role_key: string
    role_name: string
}

export type CustomerAddress = {
    customer_unit: string
    customer_street: string
    customer_area: string
    customer_city: string
    customer_state: string
    customer_country: string
    customer_zip: string
}

export type Customer = {
    customer_id: string
    organization_id: string
    customer_name: string
    customer_key: string
    customer_icon: string
    customer_image: string
    customer_description: string
    customer_contact: string[]
    customer_type: string
    customer_address: CustomerAddress
    customer_sites: string[]
}