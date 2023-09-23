/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_nimble_licenseResp } from '../models/internal_api_nimble_licenseResp';
import type { internal_api_nimble_nimbleCreateReq } from '../models/internal_api_nimble_nimbleCreateReq';
import type { internal_api_nimble_nimbleLicenseUpsertReq } from '../models/internal_api_nimble_nimbleLicenseUpsertReq';
import type { internal_api_nimble_nimbleResp } from '../models/internal_api_nimble_nimbleResp';
import type { internal_api_nimble_nimbleRetryConfig } from '../models/internal_api_nimble_nimbleRetryConfig';
import type { internal_api_nimble_nimbleStats } from '../models/internal_api_nimble_nimbleStats';
import type { internal_api_nimble_nimbleStatsResp } from '../models/internal_api_nimble_nimbleStatsResp';
import type { internal_api_nimble_nimbleStatusReq } from '../models/internal_api_nimble_nimbleStatusReq';
import type { internal_api_nimble_nimbleUpdateReq } from '../models/internal_api_nimble_nimbleUpdateReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NimbleService {

    /**
     * Nimble Configuration Create
     * ### Nimble Conf Create API
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "license_id": "string",
     * "nimble_address": "string",
     * "nimble_is_secure": true,
     * "nimble_key": "string",
     * "nimble_name": "string",
     * "nimble_port": 0,
     * "nimble_retry": {
         * "disable_backoff": true,
         * "times": 0,
         * "wait_base": 0
         * },
         * "nimble_timeout": "string"
         * }
         * ```
         *
         * *Sample OUTPUT*
         *
         * ```json
         * {
             * "message": "Nimble created",
             * "response": {
                 * "nimble_id": "string",
                 * "transaction_id": "string"
                 * },
                 * "response_code": 0
                 * }
                 * ```
     * @param payload Nimble Config Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putNimbleConfig(
payload: internal_api_nimble_nimbleCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/nimble/config',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Nimble Configuration Delete
     * ### Nimble Conf Delete API
                 *
                 * *Sample INPUT*
                 *
                 * ```json
                 * {
                     * "nimble_id": "string"
                     * }
                     * ```
                     *
                     * *Sample OUTPUT*
                     *
                     * ```json
                     * {
                         * "message": "Nimble deleted",
                         * "response": {
                             * "nimble_id": "string",
                             * "transaction_id": "string"
                             * },
                             * "response_code": 0
                             * }
                             * ```
     * @param payload Nimble Config Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteNimbleConfig(
payload: internal_api_nimble_nimbleStatusReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/nimble/config',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Nimble Configuration Update
     * ### Nimble Conf Update API
                             *
                             * *Sample INPUT*
                             *
                             * ```json
                             * {
                                 * "license_id": "string",
                                 * "nimble_address": "string",
                                 * "nimble_id": "string",
                                 * "nimble_is_secure": true,
                                 * "nimble_key": "string",
                                 * "nimble_name": "string",
                                 * "nimble_port": 0,
                                 * "nimble_retry": {
                                     * "disable_backoff": true,
                                     * "times": 0,
                                     * "wait_base": 0
                                     * },
                                     * "nimble_timeout": "string"
                                     * }
                                     * ```
                                     *
                                     * *Sample OUTPUT*
                                     *
                                     * ```json
                                     * {
                                         * "message": "Nimble updated",
                                         * "response": {
                                             * "nimble_id": "string",
                                             * "transaction_id": "string"
                                             * },
                                             * "response_code": 0
                                             * }
                                             * ```
     * @param payload Nimble Config Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchNimbleConfig(
payload: internal_api_nimble_nimbleUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/nimble/config',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Nimble Configuration Override
     * ### Nimble Conf Override API
                                             *
                                             * *Sample INPUT*
                                             *
                                             * ```json
                                             * {
                                                 * "nimble_id": "string",
                                                 * "nimble_is_override": true
                                                 * }
                                                 * ```
                                                 *
                                                 * *Sample OUTPUT*
                                                 *
                                                 * ```json
                                                 * {
                                                     * "message": "Nimble override status updated",
                                                     * "response": {
                                                         * "nimble_id": "string",
                                                         * "transaction_id": "string"
                                                         * },
                                                         * "response_code": 0
                                                         * }
                                                         * ```
     * @param payload Nimble Config Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postNimbleConfigOverride(
payload: internal_api_nimble_nimbleStatusReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/nimble/config/override',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Nimble Configuration by ID
     * ### Nimble Conf Get API
                                                         *
                                                         * *Sample OUTPUT*
                                                         *
                                                         * ```json
                                                         * {
                                                             * "message": "string",
                                                             * "response": {
                                                                 * "license": {
                                                                     * "license_created_at": "string",
                                                                     * "license_customer": "string",
                                                                     * "license_expires_at": "string",
                                                                     * "license_id": "string",
                                                                     * "license_name": "string",
                                                                     * "license_status": {
                                                                         * "additionalProp1": {}
                                                                         * },
                                                                         * "license_updated_at": "string",
                                                                         * "license_uuid": "string"
                                                                         * },
                                                                         * "nimble_address": "string",
                                                                         * "nimble_api_version": "string",
                                                                         * "nimble_created_at": "string",
                                                                         * "nimble_device_types": [
                                                                             * "string"
                                                                             * ],
                                                                             * "nimble_hash": "string",
                                                                             * "nimble_host_name": "string",
                                                                             * "nimble_id": "string",
                                                                             * "nimble_is_active": true,
                                                                             * "nimble_is_override": true,
                                                                             * "nimble_is_secure": true,
                                                                             * "nimble_is_statistics": true,
                                                                             * "nimble_key": "string",
                                                                             * "nimble_name": "string",
                                                                             * "nimble_port": 0,
                                                                             * "nimble_retry": {
                                                                                 * "disable_backoff": true,
                                                                                 * "times": 0,
                                                                                 * "wait_base": 0
                                                                                 * },
                                                                                 * "nimble_routes": {
                                                                                     * "additionalProp1": {}
                                                                                     * },
                                                                                     * "nimble_status": 0,
                                                                                     * "nimble_timeout": "string",
                                                                                     * "nimble_updated_at": "string",
                                                                                     * "nimble_version": "string",
                                                                                     * "site_ids": [
                                                                                         * "string"
                                                                                         * ]
                                                                                         * },
                                                                                         * "response_code": 0
                                                                                         * }
                                                                                         * ```
     * @returns any OK
     * @throws ApiError
     */
    public static getNimbleId(): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_nimble_nimbleResp & {
license?: internal_api_nimble_licenseResp;
nimble_retry?: internal_api_nimble_nimbleRetryConfig;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/nimble/id',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Nimble License Upsert
     * ### Nimble License Upsert API
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
                                                                                                 * "message": "License updated to nimble.",
                                                                                                 * "response": null,
                                                                                                 * "response_code": 200
                                                                                                 * }
                                                                                                 * ```
     * @param payload Nimble License Upsert Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchNimbleLicenceUpsert(
payload: internal_api_nimble_nimbleLicenseUpsertReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/nimble/licence/upsert',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * List Nimble Configuration
     * ### Nimble List API
                                                                                                 *
                                                                                                 *
                                                                                                 * *Sample OUTPUT*
                                                                                                 *
                                                                                                 * ```json
                                                                                                 * {
                                                                                                     * "message": "string",
                                                                                                     * "response": [
                                                                                                         * {
                                                                                                             * "license": {
                                                                                                                 * "license_created_at": "string",
                                                                                                                 * "license_customer": "string",
                                                                                                                 * "license_expires_at": "string",
                                                                                                                 * "license_id": "string",
                                                                                                                 * "license_name": "string",
                                                                                                                 * "license_status": {
                                                                                                                     * "additionalProp1": {}
                                                                                                                     * },
                                                                                                                     * "license_updated_at": "string",
                                                                                                                     * "license_uuid": "string"
                                                                                                                     * },
                                                                                                                     * "nimble_address": "string",
                                                                                                                     * "nimble_api_version": "string",
                                                                                                                     * "nimble_created_at": "string",
                                                                                                                     * "nimble_device_types": [
                                                                                                                         * "string"
                                                                                                                         * ],
                                                                                                                         * "nimble_hash": "string",
                                                                                                                         * "nimble_host_name": "string",
                                                                                                                         * "nimble_id": "string",
                                                                                                                         * "nimble_is_active": true,
                                                                                                                         * "nimble_is_override": true,
                                                                                                                         * "nimble_is_secure": true,
                                                                                                                         * "nimble_is_statistics": true,
                                                                                                                         * "nimble_key": "string",
                                                                                                                         * "nimble_name": "string",
                                                                                                                         * "nimble_port": 0,
                                                                                                                         * "nimble_retry": {
                                                                                                                             * "disable_backoff": true,
                                                                                                                             * "times": 0,
                                                                                                                             * "wait_base": 0
                                                                                                                             * },
                                                                                                                             * "nimble_routes": {
                                                                                                                                 * "additionalProp1": {}
                                                                                                                                 * },
                                                                                                                                 * "nimble_status": 0,
                                                                                                                                 * "nimble_timeout": "string",
                                                                                                                                 * "nimble_updated_at": "string",
                                                                                                                                 * "nimble_version": "string"
                                                                                                                                 * }
                                                                                                                                 * ],
                                                                                                                                 * "response_code": 0
                                                                                                                                 * }
                                                                                                                                 * ```
     * @param siteIds Site ID
     * @param isStatus With Status
     * @returns any OK
     * @throws ApiError
     */
    public static getNimbleList(
siteIds: boolean,
isStatus: boolean,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(internal_api_nimble_nimbleResp & {
license?: internal_api_nimble_licenseResp;
nimble_retry?: internal_api_nimble_nimbleRetryConfig;
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/nimble/list',
            query: {
                'site_ids': siteIds,
                'is_status': isStatus,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Nimble Stats
     * ### Nimble Stats API
                                                                                                                                 *
                                                                                                                                 * *Sample INPUT*
                                                                                                                                 *
                                                                                                                                 * ```json
                                                                                                                                 * {
                                                                                                                                     * "nimble_id": "string"
                                                                                                                                     * }
                                                                                                                                     * ```
                                                                                                                                     *
                                                                                                                                     * *Sample OUTPUT*
                                                                                                                                     *
                                                                                                                                     * ```json
                                                                                                                                     * {
                                                                                                                                         * "message": "Nimble Configuration Stats",
                                                                                                                                         * "response": {
                                                                                                                                             * "nimble_id": "string",
                                                                                                                                             * "nimble_stats": [
                                                                                                                                                 * {
                                                                                                                                                     * "cpu": 0,
                                                                                                                                                     * "mem_physical": 0,
                                                                                                                                                     * "mem_virtual": 0,
                                                                                                                                                     * "time": "string"
                                                                                                                                                     * }
                                                                                                                                                     * ],
                                                                                                                                                     * "nimble_uptime": 0
                                                                                                                                                     * },
                                                                                                                                                     * "response_code": 0
                                                                                                                                                     * }
                                                                                                                                                     * ```
     * @param nimbleId Nimble ID
     * @returns any OK
     * @throws ApiError
     */
    public static getNimbleStats(
nimbleId: boolean,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_nimble_nimbleStatsResp & {
nimble_stats?: Array<internal_api_nimble_nimbleStats>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/nimble/stats',
            query: {
                'nimble_id': nimbleId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Nimble Service Status
     * ### Nimble Status API
                                                                                                                                                     *
                                                                                                                                                     * *Sample INPUT*
                                                                                                                                                     *
                                                                                                                                                     * ```json
                                                                                                                                                     * {
                                                                                                                                                         * "nimble_id": "string"
                                                                                                                                                         * }
                                                                                                                                                         * ```
                                                                                                                                                         *
                                                                                                                                                         * *Sample OUTPUT*
                                                                                                                                                         *
                                                                                                                                                         * ```json
                                                                                                                                                         * {
                                                                                                                                                             * "message": "string",
                                                                                                                                                             * "response": {
                                                                                                                                                                 * "nimble_id": "string"
                                                                                                                                                                 * },
                                                                                                                                                                 * "response_code": 0
                                                                                                                                                                 * }
                                                                                                                                                                 * ```
     * @param nimbleId Nimble ID
     * @returns any OK
     * @throws ApiError
     */
    public static getNimbleStatus(
nimbleId: boolean,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_nimble_nimbleResp & {
nimble_stats?: Array<internal_api_nimble_nimbleStats>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/nimble/status',
            query: {
                'nimble_id': nimbleId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
