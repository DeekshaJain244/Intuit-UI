/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_api__common_ChannelResp } from '../models/sts_internal_api__common_ChannelResp';
import type { sts_internal_api__common_DeviceResp } from '../models/sts_internal_api__common_DeviceResp';
import type { sts_internal_api__common_GeoLocation } from '../models/sts_internal_api__common_GeoLocation';
import type { sts_internal_api__common_SiteAddress } from '../models/sts_internal_api__common_SiteAddress';
import type { sts_internal_api__common_SiteResp } from '../models/sts_internal_api__common_SiteResp';
import type { sts_internal_api__common_SourceResp } from '../models/sts_internal_api__common_SourceResp';
import type { sts_internal_api_site_siteAssignReq } from '../models/sts_internal_api_site_siteAssignReq';
import type { sts_internal_api_site_siteCreateReq } from '../models/sts_internal_api_site_siteCreateReq';
import type { sts_internal_api_site_siteDeleteReq } from '../models/sts_internal_api_site_siteDeleteReq';
import type { sts_internal_api_site_siteUnAssignReq } from '../models/sts_internal_api_site_siteUnAssignReq';
import type { sts_internal_api_site_siteUpdateReq } from '../models/sts_internal_api_site_siteUpdateReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SiteService {

    /**
     * Site Assign
     * ### Site Assign API.
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "site_id":  [
         * "string"
         * ],
         * "user_id": "string"
         * }
         * ```
         *
         * *Sample OUTPUT*
         *
         * ```json
         * {
             * "message": "Site(s) assigned to user",
             * "response": null,
             * "response_code": 200
             * }
             * ```
     * @param payload Site Assign Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postSiteAssign(
payload: sts_internal_api_site_siteAssignReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/site/assign',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Site Create
     * ### Site Create API
             *
             * *Sample INPUT*
             *
             * ```json
             * {
                 * "customer_id": "string",
                 * "organization_id": "string",
                 * "site_address": {
                     * "site_area": "string",
                     * "site_city": "string",
                     * "site_country": "string",
                     * "site_geolocation": {
                         * "lat": 0,
                         * "long": 0
                         * },
                         * "site_state": "string",
                         * "site_street": "string",
                         * "site_timezone": "string",
                         * "site_unit": "string",
                         * "site_zip": "string"
                         * },
                         * "site_description": "string",
                         * "site_icon": "string",
                         * "site_image": "string",
                         * "site_key": "string",
                         * "site_name": "string",
                         * "site_type": "string"
                         * }
                         * ```
                         *
                         * *Sample OUTPUT*
                         *
                         * ```json
                         * {
                             * "message": "Site Created",
                             * "response": {
                                 * "site_id": "string"
                                 * },
                                 * "response_code": 201
                                 * }
                                 * ```
                                 * 
     * @param payload Site Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putSiteCreate(
payload: sts_internal_api_site_siteCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api__common_SiteResp & {
site_address?: (sts_internal_api__common_SiteAddress & {
site_geolocation?: sts_internal_api__common_GeoLocation;
});
});
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/site/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Site Delete
     * ### Site Delete API
                                 *
                                 * *Sample INPUT*
                                 *
                                 * ```json
                                 * {
                                     * "site_id": "string"
                                     * }
                                     * ```
                                     *
                                     * *Sample OUTPUT*
                                     *
                                     * ```json
                                     * {
                                         * "message": "Site Deleted",
                                         * "response": null,
                                         * "response_code": 200
                                         * }
                                         * ```
                                         * 
     * @param payload Site Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteSiteDelete(
payload: sts_internal_api_site_siteDeleteReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/site/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Site ID
     * ### Site ID API
                                         *
                                         * *Sample INPUT*
                                         *
                                         * // Query params
                                         *
                                         * ```json
                                         * {
                                             * "site_id": "string"
                                             * }
                                             * ```
                                             *
                                             * *Sample OUTPUT*
                                             *
                                             * ```json
                                             * {
                                                 * "message": "Site ID",
                                                 * "response": {
                                                     * "site_address": {
                                                         * "site_area": "string",
                                                         * "site_city": "string",
                                                         * "site_country": "string",
                                                         * "site_geolocation": {
                                                             * "lat": 0,
                                                             * "long": 0
                                                             * },
                                                             * "site_state": "string",
                                                             * "site_street": "string",
                                                             * "site_timezone": "string",
                                                             * "site_unit": "string",
                                                             * "site_zip": "string"
                                                             * },
                                                             * "site_description": "string",
                                                             * "site_icon": "string",
                                                             * "site_id": "string",
                                                             * "site_image": "string",
                                                             * "site_key": "string",
                                                             * "site_name": "string",
                                                             * "site_total_devices": 0,
                                                             * "site_type": "string"
                                                             * },
                                                             * "response_code": 200
                                                             * }
                                                             * ```
                                                             * 
     * @param siteId Site ID
     * @returns any OK
     * @throws ApiError
     */
    public static getSiteId(
siteId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api__common_SiteResp & {
site_address?: (sts_internal_api__common_SiteAddress & {
site_geolocation?: sts_internal_api__common_GeoLocation;
});
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/site/id',
            query: {
                'site_id': siteId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Sites List
     * ### Site List API
                                                             *
                                                             * *Sample INPUT*
                                                             *
                                                             * // Query params
                                                             * ```json
                                                             * {
                                                                 * "customer_id": "string"
                                                                 * }
                                                                 * ```
                                                                 *
                                                                 * *Sample OUTPUT*
                                                                 *
                                                                 * ```json
                                                                 * {
                                                                     * "message": "Site List",
                                                                     * "response": [
                                                                         * {
                                                                             * "site_address": {
                                                                                 * "site_area": "string",
                                                                                 * "site_city": "string",
                                                                                 * "site_country": "string",
                                                                                 * "site_geolocation": {
                                                                                     * "lat": 0,
                                                                                     * "long": 0
                                                                                     * },
                                                                                     * "site_state": "string",
                                                                                     * "site_street": "string",
                                                                                     * "site_timezone": "string",
                                                                                     * "site_unit": "string",
                                                                                     * "site_zip": "string"
                                                                                     * },
                                                                                     * "site_description": "string",
                                                                                     * "site_devices": [
                                                                                         * {
                                                                                             * "device_alerts": 0,
                                                                                             * "device_id": "string",
                                                                                             * "device_identifier": "string",
                                                                                             * "device_image": "string",
                                                                                             * "device_name": "string",
                                                                                             * "device_notifications": 0,
                                                                                             * "device_source": [
                                                                                                 * {
                                                                                                     * "source_address": "string",
                                                                                                     * "source_fps": 0,
                                                                                                     * "source_id": "string",
                                                                                                     * "source_name": "string",
                                                                                                     * "source_sid": 0,
                                                                                                     * "source_type": "string"
                                                                                                     * }
                                                                                                     * ],
                                                                                                     * "device_state": true,
                                                                                                     * "device_status": "string",
                                                                                                     * "device_tags": {
                                                                                                         * "additionalProp1": "string",
                                                                                                         * "additionalProp2": "string",
                                                                                                         * "additionalProp3": "string"
                                                                                                         * },
                                                                                                         * "device_type": "string",
                                                                                                         * "device_uuid": "string",
                                                                                                         * "device_value": "string",
                                                                                                         * "nimble_id": "string",
                                                                                                         * "source_channels": [
                                                                                                             * {
                                                                                                                 * "channel_alerts": 0,
                                                                                                                 * "channel_favorite": true,
                                                                                                                 * "channel_id": "string",
                                                                                                                 * "channel_key": "string",
                                                                                                                 * "channel_name": "string",
                                                                                                                 * "channel_notifications": 0,
                                                                                                                 * "channel_sid": "string",
                                                                                                                 * "customer_id": "string",
                                                                                                                 * "device_id": "string",
                                                                                                                 * "is_active": true,
                                                                                                                 * "is_auto_recovery": true,
                                                                                                                 * "is_purge": true,
                                                                                                                 * "is_storage": true,
                                                                                                                 * "is_verified": true,
                                                                                                                 * "nimble_id": "string",
                                                                                                                 * "pipeline_id": "string",
                                                                                                                 * "site_id": "string",
                                                                                                                 * "source_id": "string",
                                                                                                                 * "transaction_id": "string",
                                                                                                                 * "usecase_icon": "string",
                                                                                                                 * "usecase_id": "string",
                                                                                                                 * "usecase_key": "string",
                                                                                                                 * "usecase_meta_key": [
                                                                                                                     * {
                                                                                                                         * "additionalProp1": "string",
                                                                                                                         * "additionalProp2": "string",
                                                                                                                         * "additionalProp3": "string"
                                                                                                                         * }
                                                                                                                         * ],
                                                                                                                         * "usecase_name": "string"
                                                                                                                         * }
                                                                                                                         * ]
                                                                                                                         * }
                                                                                                                         * ],
                                                                                                                         * "site_icon": "string",
                                                                                                                         * "site_id": "string",
                                                                                                                         * "site_image": "string",
                                                                                                                         * "site_key": "string",
                                                                                                                         * "site_name": "string",
                                                                                                                         * "site_notifications": 0,
                                                                                                                         * "site_total_devices": 0,
                                                                                                                         * "site_type": "string"
                                                                                                                         * }
                                                                                                                         * ],
                                                                                                                         * "response_code": 200
                                                                                                                         * }
                                                                                                                         * ```
                                                                                                                         * 
     * @param customerId Customer ID
     * @returns any OK
     * @throws ApiError
     */
    public static getSiteList(
customerId: string,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(sts_internal_api__common_SiteResp & {
site_address?: (sts_internal_api__common_SiteAddress & {
site_geolocation?: sts_internal_api__common_GeoLocation;
});
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/site/list',
            query: {
                'customer_id': customerId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Site Unassign
     * ### Site Unassign API.
                                                                                                                         *
                                                                                                                         * *Sample INPUT*
                                                                                                                         *
                                                                                                                         * ```json
                                                                                                                         * {
                                                                                                                             * "site_id":  [
                                                                                                                                 * "string"
                                                                                                                                 * ],
                                                                                                                                 * "user_id": "string"
                                                                                                                                 * }
                                                                                                                                 * ```
                                                                                                                                 *
                                                                                                                                 * *Sample OUTPUT*
                                                                                                                                 *
                                                                                                                                 * ```json
                                                                                                                                 * {
                                                                                                                                     * "message": "Site(s) un-assigned to user",
                                                                                                                                     * "response": null,
                                                                                                                                     * "response_code": 200
                                                                                                                                     * }
                                                                                                                                     * ```
     * @param payload Site Assign Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postSiteUnassign(
payload: sts_internal_api_site_siteUnAssignReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/site/unassign',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Site Update
     * ### Site Update API
                                                                                                                                     *
                                                                                                                                     * *Sample INPUT*
                                                                                                                                     *
                                                                                                                                     * ```json
                                                                                                                                     * {
                                                                                                                                         * "customer_id": "string",
                                                                                                                                         * "organization_id": "string",
                                                                                                                                         * "site_address": {
                                                                                                                                             * "site_area": "string",
                                                                                                                                             * "site_city": "string",
                                                                                                                                             * "site_country": "string",
                                                                                                                                             * "site_geolocation": {
                                                                                                                                                 * "lat": 0,
                                                                                                                                                 * "long": 0
                                                                                                                                                 * },
                                                                                                                                                 * "site_state": "string",
                                                                                                                                                 * "site_street": "string",
                                                                                                                                                 * "site_timezone": "string",
                                                                                                                                                 * "site_unit": "string",
                                                                                                                                                 * "site_zip": "string"
                                                                                                                                                 * },
                                                                                                                                                 * "site_description": "string",
                                                                                                                                                 * "site_icon": "string",
                                                                                                                                                 * "site_id": "string",
                                                                                                                                                 * "site_image": "string",
                                                                                                                                                 * "site_key": "string",
                                                                                                                                                 * "site_name": "string",
                                                                                                                                                 * "site_type": "string"
                                                                                                                                                 * }
                                                                                                                                                 * ```
                                                                                                                                                 *
                                                                                                                                                 * *Sample OUTPUT*
                                                                                                                                                 *
                                                                                                                                                 * ```json
                                                                                                                                                 * {
                                                                                                                                                     * "message": "Site Updated",
                                                                                                                                                     * "response": null,
                                                                                                                                                     * "response_code": 200
                                                                                                                                                     * }
                                                                                                                                                     * ```
                                                                                                                                                     * 
     * @param payload Site Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchSiteUpdate(
payload: sts_internal_api_site_siteUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/site/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Site ID
     * ### Site View API
                                                                                                                                                     *
                                                                                                                                                     * *Sample INPUT*
                                                                                                                                                     *
                                                                                                                                                     * // Query params
                                                                                                                                                     * ```json
                                                                                                                                                     * {
                                                                                                                                                         * "site_id": "string"
                                                                                                                                                         * }
                                                                                                                                                         * ```
                                                                                                                                                         *
                                                                                                                                                         * *Sample OUTPUT*
                                                                                                                                                         *
                                                                                                                                                         * ```json
                                                                                                                                                         * {
                                                                                                                                                             * "message": "Site view",
                                                                                                                                                             * "response": {
                                                                                                                                                                 * "site_address": {
                                                                                                                                                                     * "site_area": "string",
                                                                                                                                                                     * "site_city": "string",
                                                                                                                                                                     * "site_country": "string",
                                                                                                                                                                     * "site_geolocation": {
                                                                                                                                                                         * "lat": 0,
                                                                                                                                                                         * "long": 0
                                                                                                                                                                         * },
                                                                                                                                                                         * "site_state": "string",
                                                                                                                                                                         * "site_street": "string",
                                                                                                                                                                         * "site_timezone": "string",
                                                                                                                                                                         * "site_unit": "string",
                                                                                                                                                                         * "site_zip": "string"
                                                                                                                                                                         * },
                                                                                                                                                                         * "site_description": "string",
                                                                                                                                                                         * "site_devices": [
                                                                                                                                                                             * {
                                                                                                                                                                                 * "device_alerts": 0,
                                                                                                                                                                                 * "device_icon": "string",
                                                                                                                                                                                 * "device_id": "string",
                                                                                                                                                                                 * "device_identifier": "string",
                                                                                                                                                                                 * "device_image": "string",
                                                                                                                                                                                 * "device_name": "string",
                                                                                                                                                                                 * "device_notifications": 0,
                                                                                                                                                                                 * "device_source": [
                                                                                                                                                                                     * {
                                                                                                                                                                                         * "source_address": "string",
                                                                                                                                                                                         * "source_fps": 0,
                                                                                                                                                                                         * "source_id": "string",
                                                                                                                                                                                         * "source_name": "string",
                                                                                                                                                                                         * "source_sid": 0,
                                                                                                                                                                                         * "source_type": "string"
                                                                                                                                                                                         * }
                                                                                                                                                                                         * ],
                                                                                                                                                                                         * "device_state": true,
                                                                                                                                                                                         * "device_status": "string",
                                                                                                                                                                                         * "device_tags": {
                                                                                                                                                                                             * "additionalProp1": "string",
                                                                                                                                                                                             * "additionalProp2": "string",
                                                                                                                                                                                             * "additionalProp3": "string"
                                                                                                                                                                                             * },
                                                                                                                                                                                             * "device_type": "string",
                                                                                                                                                                                             * "device_uuid": "string",
                                                                                                                                                                                             * "device_value": "string",
                                                                                                                                                                                             * "nimble_id": "string",
                                                                                                                                                                                             * "site_id": "string",
                                                                                                                                                                                             * "source_channels": [
                                                                                                                                                                                                 * {
                                                                                                                                                                                                     * "channel_favorite": true,
                                                                                                                                                                                                     * "channel_id": "string",
                                                                                                                                                                                                     * "channel_key": "string",
                                                                                                                                                                                                     * "channel_name": "string",
                                                                                                                                                                                                     * "channel_notifications": 0,
                                                                                                                                                                                                     * "channel_sid": "string",
                                                                                                                                                                                                     * "channel_type": "string",
                                                                                                                                                                                                     * "customer_id": "string",
                                                                                                                                                                                                     * "device_icon": "string",
                                                                                                                                                                                                     * "device_id": "string",
                                                                                                                                                                                                     * "device_name": "string",
                                                                                                                                                                                                     * "is_active": true,
                                                                                                                                                                                                     * "is_auto_recovery": true,
                                                                                                                                                                                                     * "is_purge": true,
                                                                                                                                                                                                     * "is_storage": true,
                                                                                                                                                                                                     * "is_verified": true,
                                                                                                                                                                                                     * "nimble_id": "string",
                                                                                                                                                                                                     * "pipeline_id": "string",
                                                                                                                                                                                                     * "site_id": "string",
                                                                                                                                                                                                     * "site_name": "string",
                                                                                                                                                                                                     * "source_id": "string",
                                                                                                                                                                                                     * "transaction_id": "string",
                                                                                                                                                                                                     * "usecase_icon": "string",
                                                                                                                                                                                                     * "usecase_id": "string",
                                                                                                                                                                                                     * "usecase_key": "string",
                                                                                                                                                                                                     * "usecase_meta_key": [
                                                                                                                                                                                                         * {
                                                                                                                                                                                                             * "additionalProp1": "string",
                                                                                                                                                                                                             * "additionalProp2": "string",
                                                                                                                                                                                                             * "additionalProp3": "string"
                                                                                                                                                                                                             * }
                                                                                                                                                                                                             * ],
                                                                                                                                                                                                             * "usecase_name": "string"
                                                                                                                                                                                                             * }
                                                                                                                                                                                                             * ],
                                                                                                                                                                                                             * "transaction_id": "string"
                                                                                                                                                                                                             * }
                                                                                                                                                                                                             * ],
                                                                                                                                                                                                             * "site_icon": "string",
                                                                                                                                                                                                             * "site_id": "string",
                                                                                                                                                                                                             * "site_image": "string",
                                                                                                                                                                                                             * "site_key": "string",
                                                                                                                                                                                                             * "site_name": "string",
                                                                                                                                                                                                             * "site_notifications": 0,
                                                                                                                                                                                                             * "site_total_devices": 0,
                                                                                                                                                                                                             * "site_type": "string"
                                                                                                                                                                                                             * },
                                                                                                                                                                                                             * "response_code": 200
                                                                                                                                                                                                             * }
                                                                                                                                                                                                             * ```
                                                                                                                                                                                                             * 
     * @param siteId Site ID
     * @returns any OK
     * @throws ApiError
     */
    public static getSiteView(
siteId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api__common_SiteResp & {
site_address?: (sts_internal_api__common_SiteAddress & {
site_geolocation?: sts_internal_api__common_GeoLocation;
});
site_devices?: Array<(sts_internal_api__common_DeviceResp & {
device_source?: Array<sts_internal_api__common_SourceResp>;
source_channels?: Array<sts_internal_api__common_ChannelResp>;
})>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/site/view',
            query: {
                'site_id': siteId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
