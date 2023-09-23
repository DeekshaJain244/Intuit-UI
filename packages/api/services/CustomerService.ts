/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_api__common_BundleResp } from '../models/sts_internal_api__common_BundleResp';
import type { sts_internal_api__common_ChannelResp } from '../models/sts_internal_api__common_ChannelResp';
import type { sts_internal_api__common_DeviceResp } from '../models/sts_internal_api__common_DeviceResp';
import type { sts_internal_api__common_GeoLocation } from '../models/sts_internal_api__common_GeoLocation';
import type { sts_internal_api__common_SiteAddress } from '../models/sts_internal_api__common_SiteAddress';
import type { sts_internal_api__common_SiteResp } from '../models/sts_internal_api__common_SiteResp';
import type { sts_internal_api__common_UsecaseResp } from '../models/sts_internal_api__common_UsecaseResp';
import type { sts_internal_api_customer_customerAddress } from '../models/sts_internal_api_customer_customerAddress';
import type { sts_internal_api_customer_customerAssignReq } from '../models/sts_internal_api_customer_customerAssignReq';
import type { sts_internal_api_customer_customerCreateReq } from '../models/sts_internal_api_customer_customerCreateReq';
import type { sts_internal_api_customer_customerIDReq } from '../models/sts_internal_api_customer_customerIDReq';
import type { sts_internal_api_customer_customerResp } from '../models/sts_internal_api_customer_customerResp';
import type { sts_internal_api_customer_customerSiteAssignReq } from '../models/sts_internal_api_customer_customerSiteAssignReq';
import type { sts_internal_api_customer_customerUpdateReq } from '../models/sts_internal_api_customer_customerUpdateReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CustomerService {

    /**
     * Customer Assign
     * ### Customer Site Assign API.
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "customer_id": "string",
     * "site_ids": [
         * "string"
         * ]
         * }
         * ```
         *
         * *Sample OUTPUT*
         *
         * ```json
         * {
             * "message": "Assigned site(s) to customer",
             * "response": null,
             * "response_code": 200
             * }
             * ```
     * @param payload Customer Assign Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postCustomerAssign(
payload: sts_internal_api_customer_customerAssignReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/customer/assign',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Customer Bundle View
     * ### Customer View API
             *
             * *Sample Input*
             *
             * ```json
             * {
                 * "customer_id": "string"
                 * }
                 * ```
                 *
                 * *Sample OUTPUT Type 1*
                 *
                 * ```json
                 * {
                     * "message": "string",
                     * "response": {
                         * "message": "string",
                         * "response": [
                             * {
                                 * "bundle_id": "string",
                                 * "bundle_key": "string",
                                 * "bundle_name": "string",
                                 * "bundle_usecases": [
                                     * {
                                         * "bundle_key": "string",
                                         * "is_available": true,
                                         * "usecase_background_color": "string",
                                         * "usecase_channels": [
                                             * {
                                                 * "channel_favorite": true,
                                                 * "channel_id": "string",
                                                 * "channel_key": "string",
                                                 * "channel_name": "string",
                                                 * "channel_sid": "string",
                                                 * "channel_threshold_duration": 0,
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
                                                         * "usecase_component_key": "string",
                                                         * "usecase_desc": "string",
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
                                                                 * ]
                                                                 * },
                                                                 * "response_code": 200
                                                                 * }
                                                                 * ```
     * @param customerId Customer ID
     * @returns any OK
     * @throws ApiError
     */
    public static getCustomerBundle(
customerId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (structs_HTTPResp & {
response?: Array<(sts_internal_api__common_BundleResp & {
bundle_usecases?: Array<(sts_internal_api__common_UsecaseResp & {
usecase_channels?: Array<sts_internal_api__common_ChannelResp>;
})>;
})>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/bundle',
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
     * Customer Create
     * ### Customer Create API.
                                                                 *
                                                                 * At create customer `customer_sites` is an empty array, or it has to have a valid list of `site_id`s
                                                                 *
                                                                 * *Sample INPUT*
                                                                 *
                                                                 * ```json
                                                                 * {
                                                                     * "customer_address": {
                                                                         * "customer_area": "string",
                                                                         * "customer_city": "string",
                                                                         * "customer_country": "string",
                                                                         * "customer_state": "string",
                                                                         * "customer_street": "string",
                                                                         * "customer_unit": "string",
                                                                         * "customer_zip": "string"
                                                                         * },
                                                                         * "customer_contact": [
                                                                             * "string"
                                                                             * ],
                                                                             * "customer_description": "string",
                                                                             * "customer_icon": "string",
                                                                             * "customer_image": "string",
                                                                             * "customer_key": "string",
                                                                             * "customer_name": "string",
                                                                             * "customer_type": "string",
                                                                             * "organization_id": "string"
                                                                             * }
                                                                             * ```
                                                                             *
                                                                             * *Sample OUTPUT*
                                                                             *
                                                                             * ```json
                                                                             * {
                                                                                 * "message": "Customer Created",
                                                                                 * "response": null,
                                                                                 * "response_code": 201
                                                                                 * }
                                                                                 * ```
     * @param payload Customer Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putCustomerCreate(
payload: sts_internal_api_customer_customerCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/customer/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Customer Delete
     * ### Customer Delete API.
                                                                                 *
                                                                                 * *Sample INPUT*
                                                                                 *
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
                                                                                         * "message": "Customer deleted",
                                                                                         * "response": null,
                                                                                         * "response_code": 200
                                                                                         * }
                                                                                         * ```
     * @param payload Customer Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteCustomerDelete(
payload: sts_internal_api_customer_customerIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/customer/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Customer ID
     * ### Customer ID API.
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
                                                                                                 * "message": "Customer ID",
                                                                                                 * "response":  {
                                                                                                     * "customer_address": {
                                                                                                         * "customer_area": "string",
                                                                                                         * "customer_city": "string",
                                                                                                         * "customer_country": "string",
                                                                                                         * "customer_state": "string",
                                                                                                         * "customer_street": "string",
                                                                                                         * "customer_unit": "string",
                                                                                                         * "customer_zip": "string"
                                                                                                         * },
                                                                                                         * "customer_contact": [
                                                                                                             * "string"
                                                                                                             * ],
                                                                                                             * "customer_description": "string",
                                                                                                             * "customer_icon": "string",
                                                                                                             * "customer_id": "string",
                                                                                                             * "customer_image": "string",
                                                                                                             * "customer_key": "string",
                                                                                                             * "customer_name": "string",
                                                                                                             * "customer_type": "string",
                                                                                                             * "organization_id": "string"
                                                                                                             * },
                                                                                                             * "response_code": 200
                                                                                                             * }
                                                                                                             * ```
     * @param customerId Customer ID
     * @returns any OK
     * @throws ApiError
     */
    public static getCustomerId(
customerId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api_customer_customerResp & {
customer_address?: sts_internal_api_customer_customerAddress;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/id',
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
     * Customer List
     * ### Customer List API.
                                                                                                             *
                                                                                                             * *Sample INPUT*
                                                                                                             *
                                                                                                             * // Query params
                                                                                                             *
                                                                                                             * ```json
                                                                                                             * {
                                                                                                                 * "organization_id": "string",
                                                                                                                 * "is_default": true
                                                                                                                 * }
                                                                                                                 * ```
                                                                                                                 *
                                                                                                                 * *Sample OUTPUT*
                                                                                                                 *
                                                                                                                 * ```json
                                                                                                                 * {
                                                                                                                     * "message": "Customer List",
                                                                                                                     * "response": [
                                                                                                                         * {
                                                                                                                             * "customer_address": {
                                                                                                                                 * "customer_area": "string",
                                                                                                                                 * "customer_city": "string",
                                                                                                                                 * "customer_country": "string",
                                                                                                                                 * "customer_state": "string",
                                                                                                                                 * "customer_street": "string",
                                                                                                                                 * "customer_unit": "string",
                                                                                                                                 * "customer_zip": "string"
                                                                                                                                 * },
                                                                                                                                 * "customer_contact": [
                                                                                                                                     * "string"
                                                                                                                                     * ],
                                                                                                                                     * "customer_description": "string",
                                                                                                                                     * "customer_icon": "string",
                                                                                                                                     * "customer_id": "string",
                                                                                                                                     * "customer_image": "string",
                                                                                                                                     * "customer_key": "string",
                                                                                                                                     * "customer_name": "string",
                                                                                                                                     * "customer_type": "string",
                                                                                                                                     * "organization_id": "string"
                                                                                                                                     * }
                                                                                                                                     * ],
                                                                                                                                     * "response_code": 200
                                                                                                                                     * }
                                                                                                                                     * ```
     * @param organizationId Organization ID
     * @param isDefault Includes Default Customer
     * @returns any OK
     * @throws ApiError
     */
    public static getCustomerList(
organizationId: string,
isDefault?: string,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(sts_internal_api_customer_customerResp & {
customer_address?: sts_internal_api_customer_customerAddress;
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/list',
            query: {
                'organization_id': organizationId,
                'is_default': isDefault,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Customer Site Assign
     * ### Customer Site Assign API.
                                                                                                                                     *
                                                                                                                                     * *Sample INPUT*
                                                                                                                                     *
                                                                                                                                     * ```json
                                                                                                                                     * {
                                                                                                                                         * "customer_id": "string",
                                                                                                                                         * "site_ids": [
                                                                                                                                             * "string"
                                                                                                                                             * ]
                                                                                                                                             * }
                                                                                                                                             * ```
                                                                                                                                             *
                                                                                                                                             * *Sample OUTPUT*
                                                                                                                                             *
                                                                                                                                             * ```json
                                                                                                                                             * {
                                                                                                                                                 * "message": "Assigned site(s) to customer",
                                                                                                                                                 * "response": null,
                                                                                                                                                 * "response_code": 200
                                                                                                                                                 * }
                                                                                                                                                 * ```
     * @param payload Customer Site Assign Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchCustomerSiteAssign(
payload: sts_internal_api_customer_customerSiteAssignReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/customer/site/assign',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Customer Site Unassign
     * ### Customer Site Unassign API.
                                                                                                                                                 *
                                                                                                                                                 * *Sample INPUT*
                                                                                                                                                 *
                                                                                                                                                 * ```json
                                                                                                                                                 * {
                                                                                                                                                     * "customer_id": "string",
                                                                                                                                                     * "site_ids": [
                                                                                                                                                         * "string"
                                                                                                                                                         * ]
                                                                                                                                                         * }
                                                                                                                                                         * ```
                                                                                                                                                         *
                                                                                                                                                         * *Sample OUTPUT*
                                                                                                                                                         *
                                                                                                                                                         * ```json
                                                                                                                                                         * {
                                                                                                                                                             * "message": "Unassigned site(s) to customer",
                                                                                                                                                             * "response": null,
                                                                                                                                                             * "response_code": 200
                                                                                                                                                             * }
                                                                                                                                                             * ```
     * @param payload Customer Site Assign Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchCustomerSiteUnassign(
payload: sts_internal_api_customer_customerSiteAssignReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/customer/site/unassign',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Customer Assign
     * ### Customer Site Unassign API.
                                                                                                                                                             *
                                                                                                                                                             * *Sample INPUT*
                                                                                                                                                             *
                                                                                                                                                             * ```json
                                                                                                                                                             * {
                                                                                                                                                                 * "customer_id": "string",
                                                                                                                                                                 * "site_ids": [
                                                                                                                                                                     * "string"
                                                                                                                                                                     * ]
                                                                                                                                                                     * }
                                                                                                                                                                     * ```
                                                                                                                                                                     *
                                                                                                                                                                     * *Sample OUTPUT*
                                                                                                                                                                     *
                                                                                                                                                                     * ```json
                                                                                                                                                                     * {
                                                                                                                                                                         * "message": "Unassigned site(s) to customer",
                                                                                                                                                                         * "response": null,
                                                                                                                                                                         * "response_code": 200
                                                                                                                                                                         * }
                                                                                                                                                                         * ```
     * @param payload Customer UnAssign Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postCustomerUnassign(
payload: sts_internal_api_customer_customerAssignReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/customer/unassign',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Customer Update
     * ### Customer Update API.
                                                                                                                                                                         *
                                                                                                                                                                         * *Sample INPUT*
                                                                                                                                                                         *
                                                                                                                                                                         * ```json
                                                                                                                                                                         * {
                                                                                                                                                                             * "customer_address": {
                                                                                                                                                                                 * "customer_area": "string",
                                                                                                                                                                                 * "customer_city": "string",
                                                                                                                                                                                 * "customer_country": "string",
                                                                                                                                                                                 * "customer_state": "string",
                                                                                                                                                                                 * "customer_street": "string",
                                                                                                                                                                                 * "customer_unit": "string",
                                                                                                                                                                                 * "customer_zip": "string"
                                                                                                                                                                                 * },
                                                                                                                                                                                 * "customer_contact": [
                                                                                                                                                                                     * "string"
                                                                                                                                                                                     * ],
                                                                                                                                                                                     * "customer_description": "string",
                                                                                                                                                                                     * "customer_icon": "string",
                                                                                                                                                                                     * "customer_id": "string",
                                                                                                                                                                                     * "customer_image": "string",
                                                                                                                                                                                     * "customer_key": "string",
                                                                                                                                                                                     * "customer_name": "string",
                                                                                                                                                                                     * "customer_type": "string",
                                                                                                                                                                                     * "organization_id": "string"
                                                                                                                                                                                     * }
                                                                                                                                                                                     * ```
                                                                                                                                                                                     *
                                                                                                                                                                                     * *Sample OUTPUT*
                                                                                                                                                                                     *
                                                                                                                                                                                     * ```json
                                                                                                                                                                                     * {
                                                                                                                                                                                         * "message": "Customer updated",
                                                                                                                                                                                         * "response": null,
                                                                                                                                                                                         * "response_code": 200
                                                                                                                                                                                         * }
                                                                                                                                                                                         * ```
     * @param payload Customer Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchCustomerUpdate(
payload: sts_internal_api_customer_customerUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/customer/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Customer View
     * ### Customer View API
                                                                                                                                                                                         *
                                                                                                                                                                                         * *Sample INPUT*
                                                                                                                                                                                         *
                                                                                                                                                                                         * // Query params
                                                                                                                                                                                         * ```json
                                                                                                                                                                                         * {
                                                                                                                                                                                             * "customer_id": "string",
                                                                                                                                                                                             * "type": 1
                                                                                                                                                                                             * }
                                                                                                                                                                                             * ```
                                                                                                                                                                                             *
                                                                                                                                                                                             * *Sample OUTPUT Type 1*
                                                                                                                                                                                             *
                                                                                                                                                                                             * ```json
                                                                                                                                                                                             * {
                                                                                                                                                                                                 * "message": "Customer site map",
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
                                                                                                                                                                                                                                 * "device_streams": [
                                                                                                                                                                                                                                     * {
                                                                                                                                                                                                                                         * "address": "string",
                                                                                                                                                                                                                                         * "fps": {
                                                                                                                                                                                                                                             * "input": 0,
                                                                                                                                                                                                                                             * "output": 0
                                                                                                                                                                                                                                             * },
                                                                                                                                                                                                                                             * "id": 0,
                                                                                                                                                                                                                                             * "password": "string",
                                                                                                                                                                                                                                             * "port": 0,
                                                                                                                                                                                                                                             * "protocol": "string",
                                                                                                                                                                                                                                             * "resolution": {
                                                                                                                                                                                                                                                 * "height": 0,
                                                                                                                                                                                                                                                 * "width": 0
                                                                                                                                                                                                                                                 * },
                                                                                                                                                                                                                                                 * "type": "string",
                                                                                                                                                                                                                                                 * "username": "string",
                                                                                                                                                                                                                                                 * "uuid": "string"
                                                                                                                                                                                                                                                 * }
                                                                                                                                                                                                                                                 * ],
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
                                                                                                                                                                                                                                                                     * }
                                                                                                                                                                                                                                                                     * ],
                                                                                                                                                                                                                                                                     * "response_code": 200
                                                                                                                                                                                                                                                                     * }
                                                                                                                                                                                                                                                                     * ```
                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                     * *Sample OUTPUT Type 2*
                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                     * ```json
                                                                                                                                                                                                                                                                     * {
                                                                                                                                                                                                                                                                         * "message": "Customer site map",
                                                                                                                                                                                                                                                                         * "response": {
                                                                                                                                                                                                                                                                             * "bundle_key": "string",
                                                                                                                                                                                                                                                                             * "is_available": true,
                                                                                                                                                                                                                                                                             * "usecase_background_color": "string",
                                                                                                                                                                                                                                                                             * "usecase_channel_count": 0,
                                                                                                                                                                                                                                                                             * "usecase_channels": [
                                                                                                                                                                                                                                                                                 * {
                                                                                                                                                                                                                                                                                     * "alerts": [
                                                                                                                                                                                                                                                                                         * {
                                                                                                                                                                                                                                                                                             * "alert_expression": "string",
                                                                                                                                                                                                                                                                                             * "alert_frequency": 0,
                                                                                                                                                                                                                                                                                             * "alert_id": "string",
                                                                                                                                                                                                                                                                                             * "alert_name": "string",
                                                                                                                                                                                                                                                                                             * "alert_priority": 0,
                                                                                                                                                                                                                                                                                             * "alert_uuid": "string",
                                                                                                                                                                                                                                                                                             * "channel_id": "string",
                                                                                                                                                                                                                                                                                             * "is_active": true
                                                                                                                                                                                                                                                                                             * }
                                                                                                                                                                                                                                                                                             * ],
                                                                                                                                                                                                                                                                                             * "channel_alerts": 0,
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
                                                                                                                                                                                                                                                                                                     * "usecase_component_key": "string",
                                                                                                                                                                                                                                                                                                     * "usecase_desc": "string",
                                                                                                                                                                                                                                                                                                     * "usecase_device_types": [
                                                                                                                                                                                                                                                                                                         * "string"
                                                                                                                                                                                                                                                                                                         * ],
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
                                                                                                                                                                                                                                                                                                                 * },
                                                                                                                                                                                                                                                                                                                 * "response_code": 200
                                                                                                                                                                                                                                                                                                                 * }
                                                                                                                                                                                                                                                                                                                 * ```
                                                                                                                                                                                                                                                                                                                 * 
     * @param customerId Customer ID
     * @param type type
     * @returns any type-1
     * @throws ApiError
     */
    public static getCustomerView(
customerId: string,
type: number,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(sts_internal_api__common_SiteResp & {
site_address?: (sts_internal_api__common_SiteAddress & {
site_geolocation?: sts_internal_api__common_GeoLocation;
});
site_devices?: Array<(sts_internal_api__common_DeviceResp & {
source_channels?: Array<sts_internal_api__common_ChannelResp>;
})>;
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/view',
            query: {
                'customer_id': customerId,
                'type': type,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
