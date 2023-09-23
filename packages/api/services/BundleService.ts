/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_api__common_BundleResp } from '../models/sts_internal_api__common_BundleResp';
import type { sts_internal_api__common_UsecaseResp } from '../models/sts_internal_api__common_UsecaseResp';
import type { sts_internal_api_bundle_defaultConfigReqSet } from '../models/sts_internal_api_bundle_defaultConfigReqSet';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BundleService {

    /**
     * Default Bundle config get
     * ### Config Defaults Get API.
 *
 * *Sample INPUT*
 *
 * // Query params
 * ```json
 * {
     * "bundle_usecase": "string"
     * }
     * ```
     * *Sample Output*
     *
     * ```json
     * {
         * "message": "Bundle Default config",
         * "response": {
             * "bundle_default_data": {
                 * "additionalProp1": {}
                 * },
                 * "bundle_id": "string",
                 * "bundle_key": "string",
                 * "bundle_name": "string",
                 * "bundle_usecases": [
                     * {
                         * "bundle_key": "string",
                         * "is_available": true,
                         * "usecase_background_color": "string",
                         * "usecase_channel_count": 0,
                         * "usecase_channels": [
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
                                                     * }
                                                     * ]
                                                     * },
                                                     * "response_code": 200
                                                     * }
                                                     * ```
     * @param bundleUsecase Bundle Usecase
     * @returns any OK
     * @throws ApiError
     */
    public static getBundleConfigDefaultsGet(
bundleUsecase: string,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api__common_BundleResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bundle/config/defaults/get',
            query: {
                'bundle_usecase': bundleUsecase,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Default Bundle config set
     * ### Config Defaults Set API.
                                                     *
                                                     * *Sample INPUT*
                                                     *
                                                     * // Query params
                                                     *
                                                     * ```json
                                                     * {
                                                         * "bundle_data": {
                                                             * "additionalProp1": {}
                                                             * },
                                                             * "bundle_usecase": "string"
                                                             * }
                                                             * ```
                                                             *
                                                             * *Sample Output*
                                                             *
                                                             * ```json
                                                             * {
                                                                 * "message": "Default Json updated",
                                                                 * "response": null,
                                                                 * "response_code": 200
                                                                 * }
                                                                 * ```
     * @param payload Default Set Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchBundleConfigDefaultsSet(
payload: sts_internal_api_bundle_defaultConfigReqSet,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/bundle/config/defaults/set',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Bundle List
     * ### Bundle List API.
                                                                 *
                                                                 * *Sample INPUT*
                                                                 *
                                                                 * // Query params
                                                                 *
                                                                 * ```json
                                                                 * {
                                                                     * "type": 0
                                                                     * }
                                                                     * ```
                                                                     *
                                                                     *
                                                                     * *Sample OUTPUT*
                                                                     *
                                                                     * ```json
                                                                     * {
                                                                         * "message": "Bundle List",
                                                                         * "response": [
                                                                             * {
                                                                                 * "bundle_id": "string",
                                                                                 * "bundle_key": "string",
                                                                                 * "bundle_name": "string",
                                                                                 * "bundle_usecases": {
                                                                                     * "usecase_background_color": "string",
                                                                                     * "usecase_channel_count": 0,
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
                                                                                             * }
                                                                                             * ],
                                                                                             * "response_code": 200
                                                                                             * }
                                                                                             * ```
     * @param type Type
     * @returns any OK
     * @throws ApiError
     */
    public static getBundleList(
type: number,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(sts_internal_api__common_BundleResp & {
bundle_usecases?: sts_internal_api__common_UsecaseResp;
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bundle/list',
            query: {
                'type': type,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
