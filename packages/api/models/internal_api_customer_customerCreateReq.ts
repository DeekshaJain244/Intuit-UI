/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_customer_customerAddress } from './internal_api_customer_customerAddress';

export type internal_api_customer_customerCreateReq = {
    customer_address: internal_api_customer_customerAddress;
    customer_contact?: Array<string>;
    customer_description?: string;
    customer_icon: string;
    customer_image: string;
    customer_key: string;
    customer_name: string;
    customer_sites?: Array<string>;
    customer_type?: string;
    organization_id: string;
};
