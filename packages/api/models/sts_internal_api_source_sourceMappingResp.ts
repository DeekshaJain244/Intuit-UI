/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api_source_sourceResp } from './sts_internal_api_source_sourceResp';

export type sts_internal_api_source_sourceMappingResp = {
    is_default?: boolean;
    nimble_address?: string;
    nimble_hostname?: string;
    nimble_id?: string;
    site_id?: string;
    site_name?: string;
    sources?: Array<sts_internal_api_source_sourceResp>;
};
