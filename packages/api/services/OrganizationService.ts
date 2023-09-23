/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_api_organization_geoLocation } from '../models/sts_internal_api_organization_geoLocation';
import type { sts_internal_api_organization_organizationAddress } from '../models/sts_internal_api_organization_organizationAddress';
import type { sts_internal_api_organization_organizationCreateReq } from '../models/sts_internal_api_organization_organizationCreateReq';
import type { sts_internal_api_organization_organizationIDReq } from '../models/sts_internal_api_organization_organizationIDReq';
import type { sts_internal_api_organization_organizationResp } from '../models/sts_internal_api_organization_organizationResp';
import type { sts_internal_api_organization_organizationUpdateReq } from '../models/sts_internal_api_organization_organizationUpdateReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrganizationService {

    /**
     * Organization Create
     * ### Organization Create API
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "organization_address": {
         * "organization_area": "string",
         * "organization_city": "string",
         * "organization_country": "string",
         * "organization_geolocation": {
             * "lat": 0,
             * "long": 0
             * },
             * "organization_state": "string",
             * "organization_street": "string",
             * "organization_unit": "string",
             * "organization_zip": "string"
             * },
             * "organization_description": "string",
             * "organization_icon": "string",
             * "organization_key": "string",
             * "organization_name": "string",
             * "organization_website": "string"
             * }
             * ```
             *
             * *Sample OUTPUT*
             *
             * ```json
             * {
                 * "message": "Organization created",
                 * "response": null,
                 * "response_code": 200
                 * }
                 * ```
     * @param payload Organization Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putOrganizationCreate(
payload: sts_internal_api_organization_organizationCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/organization/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Organization Delete
     * ### Organization Delete API
                 *
                 * *Sample INPUT*
                 *
                 * ```json
                 * {
                     * "organization_id": "string"
                     * }
                     * ```
                     *
                     * *Sample OUTPUT*
                     *
                     * ```json
                     * {
                         * "message": "Organization Deleted",
                         * "response": null,
                         * "response_code": 200
                         * }
                         * ```
     * @param payload Organization Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteOrganizationDelete(
payload: sts_internal_api_organization_organizationIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/organization/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Organization ID
     * ### Organization ID API
                         *
                         * *Sample INPUT*
                         *
                         * // Query params
                         *
                         * ```json
                         * {
                             * "organization_id": "string"
                             * }
                             * ```
                             *
                             * *Sample OUTPUT*
                             *
                             * ```json
                             * {
                                 * "message": "Organization ID",
                                 * "response": [
                                     * {
                                         * "organization_address": {
                                             * "organization_area": "string",
                                             * "organization_city": "string",
                                             * "organization_country": "string",
                                             * "organization_geolocation": {
                                                 * "lat": 0,
                                                 * "long": 0
                                                 * },
                                                 * "organization_state": "string",
                                                 * "organization_street": "string",
                                                 * "organization_unit": "string",
                                                 * "organization_zip": "string"
                                                 * },
                                                 * "organization_description": "string",
                                                 * "organization_icon": "string",
                                                 * "organization_id": "string",
                                                 * "organization_key": "string",
                                                 * "organization_name": "string",
                                                 * "organization_website": "string"
                                                 * }
                                                 * ],
                                                 * "response_code": 200
                                                 * }
                                                 * ```
     * @param organizationId Organization ID
     * @returns any OK
     * @throws ApiError
     */
    public static getOrganizationId(
organizationId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api_organization_organizationResp & {
organization_address?: (sts_internal_api_organization_organizationAddress & {
organization_geolocation?: sts_internal_api_organization_geoLocation;
});
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organization/id',
            query: {
                'organization_id': organizationId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Organization List
     * ### Organization List API
                                                 *
                                                 *
                                                 * *Sample OUTPUT*
                                                 *
                                                 * ```json
                                                 * {
                                                     * "message": "string",
                                                     * "response": [
                                                         * {
                                                             * "organization_address": {
                                                                 * "organization_area": "string",
                                                                 * "organization_city": "string",
                                                                 * "organization_country": "string",
                                                                 * "organization_geolocation": {
                                                                     * "lat": 0,
                                                                     * "long": 0
                                                                     * },
                                                                     * "organization_state": "string",
                                                                     * "organization_street": "string",
                                                                     * "organization_unit": "string",
                                                                     * "organization_zip": "string"
                                                                     * },
                                                                     * "organization_description": "string",
                                                                     * "organization_icon": "string",
                                                                     * "organization_id": "string",
                                                                     * "organization_key": "string",
                                                                     * "organization_name": "string",
                                                                     * "organization_website": "string"
                                                                     * }
                                                                     * ],
                                                                     * "response_code": 0
                                                                     * }
                                                                     * ```
     * @returns any OK
     * @throws ApiError
     */
    public static getOrganizationList(): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(sts_internal_api_organization_organizationResp & {
organization_address?: (sts_internal_api_organization_organizationAddress & {
organization_geolocation?: sts_internal_api_organization_geoLocation;
});
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organization/list',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Organization Update
     * ### Organization Update API
                                                                     *
                                                                     * *Sample INPUT*
                                                                     *
                                                                     * ```json
                                                                     * {
                                                                         * "organization_address": {
                                                                             * "organization_area": "string",
                                                                             * "organization_city": "string",
                                                                             * "organization_country": "string",
                                                                             * "organization_geolocation": {
                                                                                 * "lat": 0,
                                                                                 * "long": 0
                                                                                 * },
                                                                                 * "organization_state": "string",
                                                                                 * "organization_street": "string",
                                                                                 * "organization_unit": "string",
                                                                                 * "organization_zip": "string"
                                                                                 * },
                                                                                 * "organization_description": "string",
                                                                                 * "organization_icon": "string",
                                                                                 * "organization_id": "string",
                                                                                 * "organization_key": "string",
                                                                                 * "organization_name": "string",
                                                                                 * "organization_website": "string"
                                                                                 * }
                                                                                 * ```
                                                                                 *
                                                                                 * *Sample OUTPUT*
                                                                                 *
                                                                                 * ```json
                                                                                 * {
                                                                                     * "message": "Organization updated",
                                                                                     * "response": null,
                                                                                     * "response_code": 200
                                                                                     * }
                                                                                     * ```
     * @param payload Organization Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchOrganizationUpdate(
payload: sts_internal_api_organization_organizationUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/organization/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
