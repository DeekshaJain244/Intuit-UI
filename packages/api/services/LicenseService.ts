/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_license_licenseCreateReq } from '../models/internal_api_license_licenseCreateReq';
import type { internal_api_license_licenseResp } from '../models/internal_api_license_licenseResp';
import type { internal_api_license_licenseStatusReq } from '../models/internal_api_license_licenseStatusReq';
import type { internal_api_license_licenseUpdateReq } from '../models/internal_api_license_licenseUpdateReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LicenseService {

    /**
     * License Create
     * ### Licence Create API
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "license_customer": "string",
     * "license_pool": "string",
     * "license_subscription": "string",
     * "license_version": 0
     * }
     * ```
     *
     * *Sample OUTPUT*
     *
     * ```json
     * {
         * "message": "License add and activation transaction created successfully",
         * "response": {
             * "license_id": "string"
             * },
             * "response_code": 200
             * }
             * ```
     * @param payload License Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putLicenseCreate(
payload: internal_api_license_licenseCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_license_licenseResp;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/license/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * License Delete
     * ### Licence Delete API
             *
             * *Sample INPUT*
             *
             * ```json
             * {
                 * "license_id": "string"
                 * }
                 * ```
                 *
                 * *Sample OUTPUT*
                 *
                 * ```json
                 * {
                     * "message": "License deleted",
                     * "response": {
                         * "license_id": "string"
                         * },
                         * "response_code": 200
                         * }
                         * ```
     * @param payload License Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteLicenseDelete(
payload: internal_api_license_licenseStatusReq,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_license_licenseResp;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/license/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * License by ID
     * ### Licence ID API
                         *
                         * *Sample INPUT*
                         *
                         * ```json
                         * {
                             * "license_id": "string"
                             * }
                             * ```
                             *
                             * *Sample OUTPUT*
                             *
                             * ```json
                             * {
                                 * "message": "License by ID",
                                 * "response": {
                                     * "license_created_at": "string",
                                     * "license_customer": "string",
                                     * "license_id": "string",
                                     * "license_status": {
                                         * "additionalProp1": {}
                                         * },
                                         * "license_updated_at": "string",
                                         * "license_version": 0
                                         * },
                                         * "response_code": 200
                                         * }
                                         * ```
     * @param licenseId License ID
     * @returns any OK
     * @throws ApiError
     */
    public static getLicenseId(
licenseId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_license_licenseResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/license/id',
            query: {
                'license_id': licenseId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * List License
     * ### Licence List API
                                         *
                                         * *Sample OUTPUT*
                                         *
                                         * ```json
                                         * {
                                             * "message": "License Configuration list",
                                             * "response": [
                                                 * {
                                                     * "license_created_at": "string",
                                                     * "license_customer": "string",
                                                     * "license_id": "string",
                                                     * "license_status": {
                                                         * "additionalProp1": {}
                                                         * },
                                                         * "license_updated_at": "string",
                                                         * "license_version": 0
                                                         * }
                                                         * ],
                                                         * "response_code": 200
                                                         * }
                                                         * ```
     * @param isStatus With Status
     * @returns any OK
     * @throws ApiError
     */
    public static getLicenseList(
isStatus: boolean,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<internal_api_license_licenseResp>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/license/list',
            query: {
                'is_status': isStatus,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * License Status
     * ### Licence Status API
                                                         *
                                                         * *Sample INPUT*
                                                         *
                                                         * ```json
                                                         * {
                                                             * "license_id": "string"
                                                             * }
                                                             * ```
                                                             *
                                                             * *Sample OUTPUT*
                                                             *
                                                             * ```json
                                                             * {
                                                                 * "message": "License Configuration Status",
                                                                 * "response": {
                                                                     * "license_created_at": "string",
                                                                     * "license_customer": "string",
                                                                     * "license_id": "string",
                                                                     * "license_status": {
                                                                         * "additionalProp1": {}
                                                                         * },
                                                                         * "license_updated_at": "string",
                                                                         * "license_version": 0
                                                                         * },
                                                                         * "response_code": 200
                                                                         * }
                                                                         * ```
     * @param licenseId License ID
     * @returns any OK
     * @throws ApiError
     */
    public static getLicenseStatus(
licenseId: boolean,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_license_licenseResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/license/status',
            query: {
                'license_id': licenseId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * License Update
     * ### Licence Update API
                                                                         *
                                                                         * *Sample INPUT*
                                                                         *
                                                                         * ```json
                                                                         * {
                                                                             * "license_customer": "string",
                                                                             * "license_id": "string",
                                                                             * "license_pool": "string",
                                                                             * "license_subscription": "string",
                                                                             * "license_version": 0
                                                                             * }
                                                                             * ```
                                                                             *
                                                                             * *Sample OUTPUT*
                                                                             *
                                                                             * ```json
                                                                             * {
                                                                                 * "message": "License updated",
                                                                                 * "response": {
                                                                                     * "license_id": "string"
                                                                                     * },
                                                                                     * "response_code": 200
                                                                                     * }
                                                                                     * ```
     * @param payload License Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchLicenseUpdate(
payload: internal_api_license_licenseUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_license_licenseResp;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/license/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
