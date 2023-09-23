/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_site_geoLocation } from './internal_api_site_geoLocation';

export type internal_api_site_siteAddress = {
    site_area?: string;
    site_city: string;
    site_country: string;
    site_geolocation: internal_api_site_geoLocation;
    site_state: string;
    site_street?: string;
    site_timezone: string;
    site_unit?: string;
    site_zip: string;
};
