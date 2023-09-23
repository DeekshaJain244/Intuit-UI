/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_channel_channelAssignReq } from '../models/internal_api_channel_channelAssignReq';
import type { internal_api_channel_channelCreateReq } from '../models/internal_api_channel_channelCreateReq';
import type { internal_api_channel_channelListReq } from '../models/internal_api_channel_channelListReq';
import type { internal_api_channel_channelRefactorReq } from '../models/internal_api_channel_channelRefactorReq';
import type { internal_api_channel_channelStatusReq } from '../models/internal_api_channel_channelStatusReq';
import type { internal_api_channel_channelStatusResp } from '../models/internal_api_channel_channelStatusResp';
import type { internal_api_channel_channelUnAssignReq } from '../models/internal_api_channel_channelUnAssignReq';
import type { internal_api_channel_channelUpdateReq } from '../models/internal_api_channel_channelUpdateReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_api__common_ChannelResp } from '../models/sts_internal_api__common_ChannelResp';
import type { sts_internal_api_alert_alertListBySiteReq } from '../models/sts_internal_api_alert_alertListBySiteReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChannelService {

    /**
     * Alerts list by Site ID
     * ### Alert List By Site ID
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
         * "message": "Channel List",
         * "response":  [
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
                                 * "response_code": 200
                                 * }
                                 * ```
                                 * 
     * @param payload Alert List by Site ID Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postAlertSiteList(
payload: sts_internal_api_alert_alertListBySiteReq,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<sts_internal_api__common_ChannelResp>;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/alert/site/list',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel Assign
     * ### Channel Assign API
                                 *
                                 * *Sample INPUT*
                                 *
                                 * ```json
                                 * {
                                     * "channel_id": [
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
                                             * "message": "Channel assigned",
                                             * "response": null,
                                             * "response_code": 200
                                             * }
                                             * ```
                                             * 
     * @param payload Channel Assign Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postChannelAssign(
payload: internal_api_channel_channelAssignReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/channel/assign',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel Create
     * ### Channel Create API
                                             *
                                             * *Sample INPUT*
                                             *
                                             * ```json
                                             * {
                                                 * "channel_name": "string",
                                                 * "nimble_id": "string",
                                                 * "pipeline_id": "string",
                                                 * "site_id": "string",
                                                 * "source_id": "string",
                                                 * "usecase_key": "string"
                                                 * }
                                                 * ```
                                                 *
                                                 * *Sample OUTPUT*
                                                 *
                                                 * ```json
                                                 * {
                                                     * "message": "Channel Created",
                                                     * "response": {
                                                         * "channel_id": "string",
                                                         * "transaction_id": "string"
                                                         * },
                                                         * "response_code": 201
                                                         * }
                                                         * ```
                                                         * 
     * @param payload Channel Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putChannelCreate(
payload: internal_api_channel_channelCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/channel/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel Delete
     * ### Channel Delete API
                                                         *
                                                         * *Sample INPUT*
                                                         *
                                                         * ```json
                                                         * {
                                                             * "channel_id": "string",
                                                             * "is_force": false
                                                             * }
                                                             * ```
                                                             *
                                                             * *Sample OUTPUT*
                                                             *
                                                             * ```json
                                                             * {
                                                                 * "message": "Channel Deleted",
                                                                 * "response": {
                                                                     * "channel_id": "string",
                                                                     * "transaction_id": "string"
                                                                     * },
                                                                     * "response_code": 200
                                                                     * }
                                                                     * ```
                                                                     * 
     * @param payload Channel Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteChannelDelete(
payload: internal_api_channel_channelStatusReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/channel/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel ID
     * ### Channel ID API
                                                                     *
                                                                     * *Sample INPUT*
                                                                     *
                                                                     * // Query params
                                                                     * ```sh
                                                                     * ?channel_id="string"
                                                                     * ```
                                                                     *
                                                                     * *Sample OUTPUT*
                                                                     *
                                                                     * ```json
                                                                     * {
                                                                         * "message": "Channel ID",
                                                                         * "response": {
                                                                             * "channel_favorite": true,
                                                                             * "channel_id": "string",
                                                                             * "channel_key": "string",
                                                                             * "channel_name": "string",
                                                                             * "channel_sid": "string",
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
                                                                                     * },
                                                                                     * "response_code": 200
                                                                                     * }
                                                                                     * ```
                                                                                     * 
     * @param channelId Channel ID Payload
     * @returns any OK
     * @throws ApiError
     */
    public static getChannelId(
channelId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api__common_ChannelResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/channel/id',
            query: {
                'channel_id': channelId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel List
     * ### Channel List By Key API
                                                                                     *
                                                                                     * *Sample INPUT*
                                                                                     *
                                                                                     * // Query params
                                                                                     * ```json
                                                                                     * {
                                                                                         * "usecase_key": "string"
                                                                                         * }
                                                                                         * ```
                                                                                         *
                                                                                         * *Sample OUTPUT*
                                                                                         *
                                                                                         * ```json
                                                                                         * {
                                                                                             * "message": "Channel List",
                                                                                             * "response": [
                                                                                                 * {
                                                                                                     * "channel_favorite": true,
                                                                                                     * "channel_id": "string",
                                                                                                     * "channel_key": "string",
                                                                                                     * "channel_name": "string",
                                                                                                     * "channel_sid": "string",
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
                                                                                                             * "response_code": 200
                                                                                                             * }
                                                                                                             * ```
                                                                                                             * 
     * @param payload Channel List Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postChannelList(
payload: internal_api_channel_channelListReq,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<sts_internal_api__common_ChannelResp>;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/channel/list',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel Refactor
     * ### Channel Refactor API
                                                                                                             *
                                                                                                             * *Sample INPUT*
                                                                                                             *
                                                                                                             * ```json
                                                                                                             * {
                                                                                                                 * "nimble_id": "string",
                                                                                                                 * "device_id": "string"
                                                                                                                 * }
                                                                                                                 * ```
                                                                                                                 *
                                                                                                                 * *Sample OUTPUT*
                                                                                                                 *
                                                                                                                 * ```json
                                                                                                                 * {
                                                                                                                     * "message": "Channel Updated",
                                                                                                                     * "response": {
                                                                                                                         * "channel_id": "string",
                                                                                                                         * "transaction_id": "string"
                                                                                                                         * },
                                                                                                                         * "response_code": 200
                                                                                                                         * }
                                                                                                                         * ```
                                                                                                                         * 
     * @param payload Channel Refactor Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchChannelRefactor(
payload: internal_api_channel_channelRefactorReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/channel/refactor',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel Revive
     * ### Channel Revive API
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
                                                                                                                                 * "message": "Channel Revive initiated",
                                                                                                                                 * "response": {
                                                                                                                                     * "channel_id": "string",
                                                                                                                                     * "transaction_id": "string"
                                                                                                                                     * },
                                                                                                                                     * "response_code": 200
                                                                                                                                     * }
                                                                                                                                     * ```
                                                                                                                                     * 
     * @param payload Channel Revive Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postChannelRevive(
payload: internal_api_channel_channelStatusReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/channel/revive',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel Status
     * ### Channel Status API
                                                                                                                                     *
                                                                                                                                     * *Sample INPUT*
                                                                                                                                     *
                                                                                                                                     * // Query params
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
                                                                                                                                             * "message": "Channel Status",
                                                                                                                                             * "response": {
                                                                                                                                                 * "is_active": true,
                                                                                                                                                 * "is_auto_recovery": true,
                                                                                                                                                 * "is_storage": true,
                                                                                                                                                 * "is_verified": true
                                                                                                                                                 * },
                                                                                                                                                 * "response_code": 200
                                                                                                                                                 * }
                                                                                                                                                 * ```
                                                                                                                                                 * 
     * @param channelId Channel ID Payload
     * @returns any OK
     * @throws ApiError
     */
    public static getChannelStatus(
channelId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_channel_channelStatusResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/channel/status',
            query: {
                'channel_id': channelId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel Troubleshoot
     * ### Channel Troubleshoot API
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
                                                                                                                                                         * "message": "Channel troubleshoot",
                                                                                                                                                         * "response": {
                                                                                                                                                             * "channel_id": "string",
                                                                                                                                                             * "transaction_id": "string"
                                                                                                                                                             * },
                                                                                                                                                             * "response_code": 200
                                                                                                                                                             * }
                                                                                                                                                             * ```
                                                                                                                                                             * 
     * @param channelId Channel Troubleshoot Payload
     * @returns any OK
     * @throws ApiError
     */
    public static getChannelTroubleshoot(
channelId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/channel/troubleshoot',
            query: {
                'channel_id': channelId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel UnAssign
     * ### Channel UnAssign API
                                                                                                                                                             *
                                                                                                                                                             * *Sample INPUT*
                                                                                                                                                             *
                                                                                                                                                             * ```json
                                                                                                                                                             * {
                                                                                                                                                                 * "channel_id": [
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
                                                                                                                                                                         * "message": "Channel un-assigned",
                                                                                                                                                                         * "response": null,
                                                                                                                                                                         * "response_code": 200
                                                                                                                                                                         * }
                                                                                                                                                                         * ```
                                                                                                                                                                         * 
     * @param payload Channel UnAssign Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postChannelUnassign(
payload: internal_api_channel_channelUnAssignReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/channel/unassign',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel Update
     * ### Channel Update API
                                                                                                                                                                         *
                                                                                                                                                                         * *Sample INPUT*
                                                                                                                                                                         *
                                                                                                                                                                         * ```json
                                                                                                                                                                         * {
                                                                                                                                                                             * "channel_id": "string",
                                                                                                                                                                             * "channel_name": "string",
                                                                                                                                                                             * "is_auto_recovery": true,
                                                                                                                                                                             * "is_force": true,
                                                                                                                                                                             * "pipeline_elements": {
                                                                                                                                                                                 * "additionalProp1": {}
                                                                                                                                                                                 * },
                                                                                                                                                                                 * "pipeline_id": "string",
                                                                                                                                                                                 * "usecase_key": "string"
                                                                                                                                                                                 * }
                                                                                                                                                                                 * ```
                                                                                                                                                                                 *
                                                                                                                                                                                 * *Sample OUTPUT*
                                                                                                                                                                                 *
                                                                                                                                                                                 * ```json
                                                                                                                                                                                 * {
                                                                                                                                                                                     * "message": "Channel updated",
                                                                                                                                                                                     * "response":  {},
                                                                                                                                                                                     * "response_code": 200
                                                                                                                                                                                     * }
                                                                                                                                                                                     * ```
                                                                                                                                                                                     * 
     * @param payload Channel Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchChannelUpdate(
payload: internal_api_channel_channelUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api__common_ChannelResp;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/channel/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel Update Notification Count
     * ### Channel Update API
                                                                                                                                                                                     *
                                                                                                                                                                                     * *Sample INPUT*
                                                                                                                                                                                     *
                                                                                                                                                                                     * ```json
                                                                                                                                                                                     * {
                                                                                                                                                                                         * "channel_id": "string",
                                                                                                                                                                                         * "channel_name": "string",
                                                                                                                                                                                         * "is_auto_recovery": true,
                                                                                                                                                                                         * "is_force": true,
                                                                                                                                                                                         * "pipeline_elements": {
                                                                                                                                                                                             * "additionalProp1": {}
                                                                                                                                                                                             * },
                                                                                                                                                                                             * "pipeline_id": "string",
                                                                                                                                                                                             * "usecase_key": "string"
                                                                                                                                                                                             * }
                                                                                                                                                                                             * ```
                                                                                                                                                                                             *
                                                                                                                                                                                             * *Sample OUTPUT*
                                                                                                                                                                                             *
                                                                                                                                                                                             * ```json
                                                                                                                                                                                             * {
                                                                                                                                                                                                 * "message": "Channel updated",
                                                                                                                                                                                                 * "response":  {},
                                                                                                                                                                                                 * "response_code": 200
                                                                                                                                                                                                 * }
                                                                                                                                                                                                 * ```
                                                                                                                                                                                                 * 
     * @param payload Channel Revive Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchChannelUpdateNotify(
payload: internal_api_channel_channelUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/channel/update/notify',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
