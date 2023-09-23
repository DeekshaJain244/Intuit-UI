/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_device_staticContentCreateReq } from '../models/internal_api_device_staticContentCreateReq';
import type { internal_api_device_staticContentIDReq } from '../models/internal_api_device_staticContentIDReq';
import type { internal_api_device_staticContentResp } from '../models/internal_api_device_staticContentResp';
import type { internal_api_device_staticContentUpdateReq } from '../models/internal_api_device_staticContentUpdateReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StaticContentService {

    /**
     * Static Content Create
     * ### Static Create API
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "device_id": "string",
     * "id": 0,
     * "static_content_data": {
         * "additionalProp1": {}
         * },
         * "static_content_name": "string",
         * "static_content_type": "string"
         * }
         * ```
         *
         * *Sample OUTPUT*
         *
         * ```json
         * {
             * "message": "Zone created",
             * "response": null,
             * "response_code": 201
             * }
             * ```
     * @param payload Static Content Payload
     * @returns structs_HTTPResp OK
     * @throws ApiError
     */
    public static putDeviceStaticCreate(
payload: internal_api_device_staticContentCreateReq,
): CancelablePromise<structs_HTTPResp> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/device/static/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Static Content Delete
     * ### Static Delete API
             *
             * *Sample INPUT*
             *
             * ```json
             * {
                 * "static_content_id": "string"
                 * }
                 * ```
                 *
                 * *Sample OUTPUT*
                 *
                 * ```json
                 * {
                     * "message": "Static Content Deleted",
                     * "response": null,
                     * "response_code": 200
                     * }
                     * ```
     * @param payload Static Content Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteDeviceStaticDelete(
payload: internal_api_device_staticContentIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/device/static/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Static Content ID
     * ### Static ID API
                     *
                     * *Sample INPUT*
                     *
                     * // Query params
                     * ```json
                     * {
                         * "static_content_id": "string"
                         * }
                         * ```
                         *
                         * *Sample OUTPUT*
                         *
                         * ```json
                         * {
                             * "message": "Zone created",
                             * "response": {
                                 * "device_id": "string",
                                 * "id": 0,
                                 * "static_content_data": {
                                     * "additionalProp1": {}
                                     * },
                                     * "static_content_name": "string",
                                     * "static_content_type": "string"
                                     * },
                                     * "response_code": 201
                                     * }
                                     * ```
     * @param staticId Static ID
     * @returns any OK
     * @throws ApiError
     */
    public static getDeviceStaticId(
staticId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_device_staticContentResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/device/static/id',
            query: {
                'static_id': staticId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Static Content List
     * ### Static List API
                                     *
                                     * *Sample INPUT*
                                     *
                                     * // Query params
                                     *
                                     * ```json
                                     * {
                                         * "device_id": "string"
                                         * }
                                         * ```
                                         *
                                         * *Sample OUTPUT*
                                         *
                                         * ```json
                                         * {
                                             * "message": "Zone List",
                                             * "response": [
                                                 * {
                                                     * "device_id": "string",
                                                     * "id": 0,
                                                     * "static_content_data": {
                                                         * "additionalProp1": {}
                                                         * },
                                                         * "static_content_name": "string",
                                                         * "static_content_type": "string"
                                                         * }
                                                         * ],
                                                         * "response_code": 201
                                                         * }
                                                         * ```
     * @param deviceId Device ID
     * @returns any OK
     * @throws ApiError
     */
    public static getDeviceStaticList(
deviceId: string,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<internal_api_device_staticContentResp>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/device/static/list',
            query: {
                'device_id': deviceId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Static Content Update
     * ### Static Update API
                                                         *
                                                         * *Sample INPUT*
                                                         *
                                                         * ```json
                                                         * {
                                                             * "device_id": "string",
                                                             * "id": 0,
                                                             * "static_content_data": {
                                                                 * "additionalProp1": {}
                                                                 * },
                                                                 * "static_content_name": "string",
                                                                 * "static_content_type": "string"
                                                                 * }
                                                                 * ```
                                                                 *
                                                                 * *Sample OUTPUT*
                                                                 *
                                                                 * ```json
                                                                 * {
                                                                     * "message": "Zone updated",
                                                                     * "response": null,
                                                                     * "response_code": 201
                                                                     * }
                                                                     * ```
     * @param payload Static Content Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchDeviceStaticUpdate(
payload: internal_api_device_staticContentUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/device/static/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
