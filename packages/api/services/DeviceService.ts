/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_device_deviceCreateReq } from '../models/internal_api_device_deviceCreateReq';
import type { internal_api_device_deviceDeleteReq } from '../models/internal_api_device_deviceDeleteReq';
import type { internal_api_device_deviceUpdateReq } from '../models/internal_api_device_deviceUpdateReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_api__common_ChannelResp } from '../models/sts_internal_api__common_ChannelResp';
import type { sts_internal_api__common_DeviceResp } from '../models/sts_internal_api__common_DeviceResp';
import type { sts_internal_api__common_DeviceStream } from '../models/sts_internal_api__common_DeviceStream';
import type { sts_internal_api__common_SourceResp } from '../models/sts_internal_api__common_SourceResp';
import type { sts_internal_api__common_StreamFPS } from '../models/sts_internal_api__common_StreamFPS';
import type { sts_internal_api__common_StreamResolution } from '../models/sts_internal_api__common_StreamResolution';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DeviceService {

    /**
     * Device Create
     * ### Device Create API
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "device_identifier": "string",
     * "device_image": "string",
     * "device_name": "string",
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
                         * "nimble_id": "string",
                         * "site_id": "string"
                         * }
                         * ```
                         *
                         * *Sample OUTPUT*
                         *
                         * ```json
                         * {
                             * "message": "Device created",
                             * "response": {
                                 * "device_id": "string",
                                 * "transaction_id": "string"
                                 * },
                                 * "response_code": 201
                                 * }
                                 * ```
     * @param payload Device Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putDeviceCreate(
payload: internal_api_device_deviceCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api__common_DeviceResp;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/device/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Device Delete
     * ### Device Delete API
                                 *
                                 * *Sample INPUT*
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
                                         * "message": "Device deleted",
                                         * "response": null,
                                         * "response_code": 200
                                         * }
                                         * ```
     * @param payload Device Delete Payload
     * @returns structs_HTTPResp OK
     * @throws ApiError
     */
    public static deleteDeviceDelete(
payload: internal_api_device_deviceDeleteReq,
): CancelablePromise<structs_HTTPResp> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/device/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Device ID
     * ### Device ID API
                                         *
                                         * *Sample INPUT*
                                         *
                                         * // Query params
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
                                                 * "message": "Device ID",
                                                 * "response": {
                                                     * "device_id": "string",
                                                     * "device_identifier": "string",
                                                     * "device_image": "string",
                                                     * "device_name": "string",
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
                                                                         * },
                                                                         * "response_code": 200
                                                                         * }
                                                                         * ```
     * @param deviceId Device ID
     * @returns any OK
     * @throws ApiError
     */
    public static getDeviceId(
deviceId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api__common_DeviceResp & {
device_streams?: Array<(sts_internal_api__common_DeviceStream & {
fps?: sts_internal_api__common_StreamFPS;
resolution?: sts_internal_api__common_StreamResolution;
})>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/device/id',
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
     * Device List
     * ### Device List API
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
                                                                                 * "message": "Device List",
                                                                                 * "response": [
                                                                                     * {
                                                                                         * "device_id": "string",
                                                                                         * "device_identifier": "string",
                                                                                         * "device_image": "string",
                                                                                         * "device_name": "string",
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
                                                                                                             * "site_id": "string"
                                                                                                             * }
                                                                                                             * ],
                                                                                                             * "response_code": 200
                                                                                                             * }
                                                                                                             * ```
     * @param siteId Site ID
     * @returns any OK
     * @throws ApiError
     */
    public static getDeviceList(
siteId: string,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(sts_internal_api__common_DeviceResp & {
device_streams?: Array<(sts_internal_api__common_DeviceStream & {
fps?: sts_internal_api__common_StreamFPS;
resolution?: sts_internal_api__common_StreamResolution;
})>;
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/device/list',
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
     * Device Update
     * ### Device Update API
                                                                                                             *
                                                                                                             * *Sample INPUT*
                                                                                                             *
                                                                                                             * ```json
                                                                                                             * {
                                                                                                                 * "device_id": "string",
                                                                                                                 * "device_identifier": "string",
                                                                                                                 * "device_image": "string",
                                                                                                                 * "device_name": "string",
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
                                                                                                                                     * "nimble_id": "string",
                                                                                                                                     * "site_id": "string"
                                                                                                                                     * }
                                                                                                                                     * ```
                                                                                                                                     *
                                                                                                                                     * *Sample OUTPUT*
                                                                                                                                     *
                                                                                                                                     * ```json
                                                                                                                                     * {
                                                                                                                                         * "message": "Device Updated",
                                                                                                                                         * "response": null,
                                                                                                                                         * "response_code": 200
                                                                                                                                         * }
                                                                                                                                         * ```
     * @param payload Device Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchDeviceUpdate(
payload: internal_api_device_deviceUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/device/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Device List
     * ### Device View API
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
                                                                                                                                                 * "message": "Device view",
                                                                                                                                                 * "response": {
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
                                                                                                                                                                                                 * "transaction_id": "string",
                                                                                                                                                                                                 * "device_sources": [
                                                                                                                                                                                                     * {
                                                                                                                                                                                                         * "source_address": "string",
                                                                                                                                                                                                         * "source_fps": 0,
                                                                                                                                                                                                         * "source_id": "string",
                                                                                                                                                                                                         * "source_name": "string",
                                                                                                                                                                                                         * "source_sid": 0,
                                                                                                                                                                                                         * "source_type": "string"
                                                                                                                                                                                                         * }
                                                                                                                                                                                                         * ]
                                                                                                                                                                                                         * },
                                                                                                                                                                                                         * "response_code": 200
                                                                                                                                                                                                         * }
                                                                                                                                                                                                         *
                                                                                                                                                                                                         * ```
     * @param deviceId Device ID
     * @returns any OK
     * @throws ApiError
     */
    public static getDeviceView(
deviceId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api__common_DeviceResp & {
device_sources?: Array<sts_internal_api__common_SourceResp>;
source_channels?: Array<sts_internal_api__common_ChannelResp>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/device/view',
            query: {
                'device_id': deviceId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
