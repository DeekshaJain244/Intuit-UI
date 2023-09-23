/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_api__common_AlertResp } from '../models/sts_internal_api__common_AlertResp';
import type { sts_internal_api_alert_alertActivateDeActivateReq } from '../models/sts_internal_api_alert_alertActivateDeActivateReq';
import type { sts_internal_api_alert_alertCreateReq } from '../models/sts_internal_api_alert_alertCreateReq';
import type { sts_internal_api_alert_alertIDReq } from '../models/sts_internal_api_alert_alertIDReq';
import type { sts_internal_api_alert_alertListReq } from '../models/sts_internal_api_alert_alertListReq';
import type { sts_internal_api_alert_alertUpdateReq } from '../models/sts_internal_api_alert_alertUpdateReq';
import type { sts_internal_api_alert_alertUUIDReq } from '../models/sts_internal_api_alert_alertUUIDReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AlertService {

    /**
     * Alert Active
     * ### Alert Active API.
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "channel_id": "string"
     * }
     * ```
     *
     * *Sample OUTPUT*
     *
     * ```json
     * {
         * "message": "Active alerts",
         * "response":  [
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
                 * "response_code": 200
                 * }
                 * ```
                 * 
     * @param payload Alert ID Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postAlertActive(
payload: sts_internal_api_alert_alertListReq,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<sts_internal_api__common_AlertResp>;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/alert/active',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Alert Create
     * ### Alert Create API.
                 *
                 * *Sample INPUT*
                 *
                 * ```json
                 * {
                     * "alert_expression": "string",
                     * "alert_frequency": 86400,
                     * "alert_name": "string",
                     * "alert_priority": 0,
                     * "channel_id": "string"
                     * }
                     * ```
                     *
                     * *Sample OUTPUT*
                     *
                     * ```json
                     * {
                         * "message": "Alert created",
                         * "response": null,
                         * "response_code": 201
                         * }
                         * ```
                         * 
     * @param payload Alert Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putAlertCreate(
payload: sts_internal_api_alert_alertCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/alert/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Alert Delete
     * ### Alert Delete API
                         *
                         * *Sample INPUT*
                         *
                         * ```json
                         * {
                             * "alert_id": "string",
                             * "channel_id": "string"
                             * }
                             * ```
                             *
                             *
                             * *Sample OUTPUT*
                             *
                             * ```json
                             * {
                                 * "message": "Alert deleted",
                                 * "response": null,
                                 * "response_code": 200
                                 * }
                                 * ```
     * @param payload Alert Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAlertDelete(
payload: sts_internal_api_alert_alertIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/alert/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Alert Disable
     * ### Alert De-Activate API.
                                 *
                                 * *Sample INPUT*
                                 *
                                 * ```json
                                 * {
                                     * "alert_id": "string",
                                     * "channel_id": "string"
                                     * }
                                     * ```
                                     *
                                     * *Sample OUTPUT*
                                     *
                                     * ```json
                                     * {
                                         * "message": "Alert deactivated",
                                         * "response": null,
                                         * "response_code": 200
                                         * }
                                         * ```
                                         * 
     * @param payload Alert Disable Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postAlertDisable(
payload: sts_internal_api_alert_alertActivateDeActivateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api__common_AlertResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/alert/disable',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Alert Enable
     * ### Alert Activate API.
                                         *
                                         * *Sample INPUT*
                                         *
                                         * ```json
                                         * {
                                             * "alert_id": "string",
                                             * "channel_id": "string"
                                             * }
                                             * ```
                                             *
                                             * *Sample OUTPUT*
                                             *
                                             * ```json
                                             * {
                                                 * "message": "Alert activated",
                                                 * "response": null,
                                                 * "response_code": 200
                                                 * }
                                                 * ```
                                                 * 
     * @param payload Alert Enable Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postAlertEnable(
payload: sts_internal_api_alert_alertActivateDeActivateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api__common_AlertResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/alert/enable',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Alert ID
     * ### Alert ID API.
                                                 *
                                                 * *Sample INPUT*
                                                 *
                                                 * ```json
                                                 * {
                                                     * "alert_id": "string"
                                                     * }
                                                     * ```
                                                     *
                                                     * *Sample OUTPUT*
                                                     *
                                                     * ```json
                                                     * {
                                                         * "message": "Alert by ID",
                                                         * "response": {
                                                             * "alert_expression": "string",
                                                             * "alert_frequency": 0,
                                                             * "alert_id": "string",
                                                             * "alert_name": "string",
                                                             * "alert_priority": 0,
                                                             * "alert_uuid": "string",
                                                             * "channel_id": "string",
                                                             * "is_active": true
                                                             * },
                                                             * "response_code": 200
                                                             * }
                                                             * ```
                                                             * 
     * @param payload Alert ID Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postAlertId(
payload: sts_internal_api_alert_alertIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api__common_AlertResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/alert/id',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Alert List by Channel ID
     * ### Alert List API.
                                                             *
                                                             * *Sample INPUT*
                                                             *
                                                             * ```json
                                                             * {
                                                                 * "channel_id": "string"
                                                                 * }
                                                                 * ```
                                                                 *
                                                                 * *Sample OUTPUT*
                                                                 *
                                                                 * ```json
                                                                 * {
                                                                     * "message": "Alert list",
                                                                     * "response": [
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
                                                                             * "response_code": 200
                                                                             * }
                                                                             * ```
                                                                             * 
     * @param payload Alert List Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postAlertList(
payload: sts_internal_api_alert_alertListReq,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<sts_internal_api__common_AlertResp>;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/alert/list',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Alert Update
     * ### Alert Update API.
                                                                             *
                                                                             * *Sample INPUT*
                                                                             *
                                                                             * ```json
                                                                             * {
                                                                                 * "alert_expression": "string",
                                                                                 * "alert_frequency": 86400,
                                                                                 * "alert_id": "string",
                                                                                 * "alert_name": "string",
                                                                                 * "alert_priority": 0,
                                                                                 * "channel_id": "string"
                                                                                 * }
                                                                                 * ```
                                                                                 *
                                                                                 * *Sample OUTPUT*
                                                                                 *
                                                                                 * ```json
                                                                                 * {
                                                                                     * "message": "Alert updated",
                                                                                     * "response": {
                                                                                         * "alert_expression": "string",
                                                                                         * "alert_frequency": 0,
                                                                                         * "alert_id": "string",
                                                                                         * "alert_name": "string",
                                                                                         * "alert_priority": 0,
                                                                                         * "alert_uuid": "string",
                                                                                         * "channel_id": "string",
                                                                                         * "is_active": true
                                                                                         * },
                                                                                         * "response_code": 200
                                                                                         * }
                                                                                         * ```
                                                                                         * 
     * @param payload Alert Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchAlertUpdate(
payload: sts_internal_api_alert_alertUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api__common_AlertResp;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/alert/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Alert UUID
     * ### Alert UUID API.
                                                                                         *
                                                                                         * *Sample INPUT*
                                                                                         *
                                                                                         * ```json
                                                                                         * {
                                                                                             * "alert_uuid": "string"
                                                                                             * }
                                                                                             * ```
                                                                                             *
                                                                                             * *Sample OUTPUT*
                                                                                             *
                                                                                             * ```json
                                                                                             * {
                                                                                                 * "message": "Alert by ID",
                                                                                                 * "response": {
                                                                                                     * "alert_expression": "string",
                                                                                                     * "alert_frequency": 0,
                                                                                                     * "alert_id": "string",
                                                                                                     * "alert_name": "string",
                                                                                                     * "alert_priority": 0,
                                                                                                     * "alert_uuid": "string",
                                                                                                     * "channel_id": "string",
                                                                                                     * "is_active": true
                                                                                                     * },
                                                                                                     * "response_code": 200
                                                                                                     * }
                                                                                                     * ```
     * @param payload Alert UUID Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postAlertUuid(
payload: sts_internal_api_alert_alertUUIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api__common_AlertResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/alert/uuid',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
