/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_source_sourceResp } from './internal_api_source_sourceResp';

export type internal_api_source_sourceMappingResp = {
    is_default?: boolean;
    nimble_address?: string;
    nimble_hostname?: string;
    nimble_id?: string;
    site_id?: string;
    site_name?: string;
    sources?: Array<internal_api_source_sourceResp>;
};
