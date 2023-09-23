/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_source_channelResp } from '../models/internal_api_source_channelResp';
import type { internal_api_source_sourceCreateReq } from '../models/internal_api_source_sourceCreateReq';
import type { internal_api_source_sourceIDReq } from '../models/internal_api_source_sourceIDReq';
import type { internal_api_source_sourceMappingResp } from '../models/internal_api_source_sourceMappingResp';
import type { internal_api_source_sourceResp } from '../models/internal_api_source_sourceResp';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SourceService {

    /**
     * Source Create
     * ### Source Create API
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "device_id": "string",
     * "nimble_id": "string",
     * "source_address": "string",
     * "source_fps": 0,
     * "source_name": "string",
     * "source_type": "string",
     * "static_content": [
         * {
             * "additionalProp1": {}
             * }
             * ]
             * }
             * ```
             *
             * *Sample OUTPUT*
             *
             * ```json
             * {
                 * "message": "Source Created",
                 * "response": null,
                 * "response_code": 201
                 * }
                 * ```
                 * 
     * @param payload Source Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postSourceCreate(
payload: internal_api_source_sourceCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/source/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Source Delete
     * ### Source Delete API
                 *
                 * *Sample INPUT*
                 *
                 * ```json
                 * {
                     * "source_id": "string"
                     * }
                     * ```
                     *
                     * *Sample OUTPUT*
                     *
                     * ```json
                     * {
                         * "message": "Source Deleted",
                         * "response": null,
                         * "response_code": 200
                         * }
                         * ```
                         * 
     * @param payload Source Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteSourceDelete(
payload: internal_api_source_sourceIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/source/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Source ID
     * ### Source ID API
                         *
                         * *Sample INPUT*
                         *
                         * // Query params
                         * ```json
                         * {
                             * "source_id": "string"
                             * }
                             * ```
                             *
                             * *Sample OUTPUT*
                             *
                             * ```json
                             * {
                                 * "message": "Source ID",
                                 * "response": {
                                     * "device_id": "string",
                                     * "nimble_id": "string",
                                     * "source_address": "string",
                                     * "source_channels": [
                                         * {
                                             * "channel_favorite": true,
                                             * "channel_id": "string",
                                             * "channel_key": "string",
                                             * "channel_name": "string",
                                             * "channel_sid": "string",
                                             * "channel_threshold_duration": 0,
                                             * "is_active": true,
                                             * "is_storage": true,
                                             * "is_verified": true,
                                             * "nimble_id": "string",
                                             * "pipeline_id": "string",
                                             * "source_id": "string",
                                             * "usecase_icon": "string",
                                             * "usecase_id": "string",
                                             * "usecase_key": "string",
                                             * "usecase_meta_key": [
                                                 * "string"
                                                 * ],
                                                 * "usecase_name": "string"
                                                 * }
                                                 * ],
                                                 * "source_fps": 0,
                                                 * "source_id": "string",
                                                 * "source_name": "string",
                                                 * "source_type": "string",
                                                 * "static_content": [
                                                     * {
                                                         * "additionalProp1": {}
                                                         * }
                                                         * ]
                                                         * },
                                                         * "response_code": 200
                                                         * }
                                                         * ```
                                                         * 
     * @param sourceId Source ID
     * @returns any OK
     * @throws ApiError
     */
    public static getSourceId(
sourceId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_source_sourceResp & {
source_channels?: Array<internal_api_source_channelResp>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/source/id',
            query: {
                'source_id': sourceId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Source List
     * ### Source List API
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
                                                                 * "message": "Source List",
                                                                 * "response": [
                                                                     * {
                                                                         * "device_id": "string",
                                                                         * "nimble_id": "string",
                                                                         * "source_address": "string",
                                                                         * "source_fps": 0,
                                                                         * "source_id": "string",
                                                                         * "source_name": "string",
                                                                         * "source_type": "string",
                                                                         * "static_content": [
                                                                             * {
                                                                                 * "additionalProp1": {}
                                                                                 * }
                                                                                 * ]
                                                                                 * }
                                                                                 * ],
                                                                                 * "response_code": 200
                                                                                 * }
                                                                                 * ```
                                                                                 * 
     * @param deviceId Device ID
     * @returns any OK
     * @throws ApiError
     */
    public static getSourceList(
deviceId: string,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(internal_api_source_sourceResp & {
source_channels?: Array<internal_api_source_channelResp>;
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/source/list',
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
     * Source Mapping
     * ### Source Mapping API
                                                                                 *
                                                                                 * *Sample INPUT*
                                                                                 *
                                                                                 * // Query params
                                                                                 * ```json
                                                                                 * {
                                                                                     * "is_default": "string",
                                                                                     * "site_id": "string"
                                                                                     * }
                                                                                     * ```
                                                                                     *
                                                                                     * *Sample OUTPUT*
                                                                                     *
                                                                                     * ```json
                                                                                     * {
                                                                                         * "message": "Source List",
                                                                                         * "response": {
                                                                                             * "is_default": true,
                                                                                             * "nimble_address": "string",
                                                                                             * "nimble_hostname": "string",
                                                                                             * "nimble_id": "string",
                                                                                             * "site_id": "string",
                                                                                             * "site_name": "string",
                                                                                             * "sources": [
                                                                                                 * {
                                                                                                     * "device_id": "string",
                                                                                                     * "nimble_id": "string",
                                                                                                     * "source_address": "string",
                                                                                                     * "source_fps": 0,
                                                                                                     * "source_id": "string",
                                                                                                     * "source_name": "string",
                                                                                                     * "source_type": "string",
                                                                                                     * "static_content": [
                                                                                                         * {
                                                                                                             * "additionalProp1": {}
                                                                                                             * }
                                                                                                             * ]
                                                                                                             * }
                                                                                                             * ]
                                                                                                             * },
                                                                                                             * "response_code": 200
                                                                                                             * }
                                                                                                             * ```
                                                                                                             * 
     * @param isDefault Include Default Site
     * @param siteId Specific Site data
     * @returns any OK
     * @throws ApiError
     */
    public static getSourceMapping(
isDefault: string,
siteId?: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_source_sourceMappingResp & {
sources?: Array<(internal_api_source_sourceResp & {
source_channels?: Array<internal_api_source_channelResp>;
})>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/source/mapping',
            query: {
                'is_default': isDefault,
                'site_id': siteId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Source Update
     * ### Source Update API
                                                                                                             *
                                                                                                             * *Sample INPUT*
                                                                                                             *
                                                                                                             * ```json
                                                                                                             * {
                                                                                                                 * "device_id": "string",
                                                                                                                 * "nimble_id": "string",
                                                                                                                 * "source_address": "string",
                                                                                                                 * "source_fps": 0,
                                                                                                                 * "source_name": "string",
                                                                                                                 * "source_type": "string",
                                                                                                                 * "static_content": [
                                                                                                                     * {
                                                                                                                         * "additionalProp1": {}
                                                                                                                         * }
                                                                                                                         * ]
                                                                                                                         * }
                                                                                                                         * ```
                                                                                                                         *
                                                                                                                         * *Sample OUTPUT*
                                                                                                                         *
                                                                                                                         * ```json
                                                                                                                         * {
                                                                                                                             * "message": "Source Updated",
                                                                                                                             * "response": {
                                                                                                                                 * "device_id": "string",
                                                                                                                                 * "nimble_id": "string",
                                                                                                                                 * "source_address": "string",
                                                                                                                                 * "source_channels": [
                                                                                                                                     * {
                                                                                                                                         * "channel_favorite": true,
                                                                                                                                         * "channel_id": "string",
                                                                                                                                         * "channel_key": "string",
                                                                                                                                         * "channel_name": "string",
                                                                                                                                         * "channel_sid": "string",
                                                                                                                                         * "channel_threshold_duration": 0,
                                                                                                                                         * "is_active": true,
                                                                                                                                         * "is_storage": true,
                                                                                                                                         * "is_verified": true,
                                                                                                                                         * "nimble_id": "string",
                                                                                                                                         * "pipeline_id": "string",
                                                                                                                                         * "source_id": "string",
                                                                                                                                         * "usecase_icon": "string",
                                                                                                                                         * "usecase_id": "string",
                                                                                                                                         * "usecase_key": "string",
                                                                                                                                         * "usecase_meta_key": [
                                                                                                                                             * "string"
                                                                                                                                             * ],
                                                                                                                                             * "usecase_name": "string"
                                                                                                                                             * }
                                                                                                                                             * ],
                                                                                                                                             * "source_fps": 0,
                                                                                                                                             * "source_id": "string",
                                                                                                                                             * "source_name": "string",
                                                                                                                                             * "source_type": "string",
                                                                                                                                             * "static_content": [
                                                                                                                                                 * {
                                                                                                                                                     * "additionalProp1": {}
                                                                                                                                                     * }
                                                                                                                                                     * ]
                                                                                                                                                     * },
                                                                                                                                                     * "response_code": 200
                                                                                                                                                     * }
                                                                                                                                                     * ```
                                                                                                                                                     * 
     * @param payload Source Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchSourceUpdate(
payload: internal_api_source_sourceCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_source_sourceResp;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/source/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
