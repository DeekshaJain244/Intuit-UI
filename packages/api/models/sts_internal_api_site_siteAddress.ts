/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api_site_geoLocation } from './sts_internal_api_site_geoLocation';

export type sts_internal_api_site_siteAddress = {
    site_area?: string;
    site_city: string;
    site_country: string;
    site_geolocation: sts_internal_api_site_geoLocation;
    site_state: string;
    site_street?: string;
    site_timezone: string;
    site_unit?: string;
    site_zip: string;
};
