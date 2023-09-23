/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_nimble_licenseResp } from './internal_api_nimble_licenseResp';
import type { internal_api_nimble_nimbleRetryConfig } from './internal_api_nimble_nimbleRetryConfig';

export type internal_api_nimble_nimbleResp = {
    license?: internal_api_nimble_licenseResp;
    nimble_address?: string;
    nimble_api_version?: string;
    nimble_created_at?: string;
    nimble_device_types?: Array<string>;
    nimble_hash?: string;
    nimble_host_name?: string;
    nimble_id?: string;
    nimble_is_active?: boolean;
    nimble_is_override?: boolean;
    nimble_is_secure?: boolean;
    nimble_is_statistics?: boolean;
    nimble_key?: string;
    nimble_name?: string;
    nimble_port?: number;
    nimble_retry?: internal_api_nimble_nimbleRetryConfig;
    nimble_routes?: any;
    nimble_status?: number;
    nimble_timeout?: string;
    nimble_updated_at?: string;
    nimble_version?: string;
    site_ids?: Array<string>;
    transaction_id?: string;
};
