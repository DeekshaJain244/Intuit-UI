/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api_nimble_nimbleRetryConfig } from './sts_internal_api_nimble_nimbleRetryConfig';

export type sts_internal_api_nimble_nimbleCreateReq = {
    license_id: string;
    nimble_address: string;
    nimble_is_secure: boolean;
    nimble_key?: string;
    nimble_name: string;
    nimble_port: number;
    nimble_retry: sts_internal_api_nimble_nimbleRetryConfig;
    nimble_timeout: string;
    site_ids?: Array<string>;
};
