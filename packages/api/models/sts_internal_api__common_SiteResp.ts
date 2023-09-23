/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api__common_DeviceResp } from './sts_internal_api__common_DeviceResp';
import type { sts_internal_api__common_SiteAddress } from './sts_internal_api__common_SiteAddress';

export type sts_internal_api__common_SiteResp = {
    site_address?: sts_internal_api__common_SiteAddress;
    site_description?: string;
    site_devices?: Array<sts_internal_api__common_DeviceResp>;
    site_icon?: string;
    site_id?: string;
    site_image?: string;
    site_key?: string;
    site_name?: string;
    site_notifications?: number;
    site_total_devices?: number;
    site_type?: string;
};
