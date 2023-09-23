/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api_site_siteAddress } from './sts_internal_api_site_siteAddress';

export type sts_internal_api_site_siteUpdateReq = {
    customer_id: string;
    organization_id: string;
    site_address: sts_internal_api_site_siteAddress;
    site_description?: string;
    site_icon: string;
    site_id: string;
    site_image: string;
    site_key: string;
    site_name: string;
    site_type: string;
};
