/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_user_userNotificationFetchReq } from '../models/internal_api_user_userNotificationFetchReq';
import type { internal_api_user_userNotificationReq } from '../models/internal_api_user_userNotificationReq';
import type { internal_api_user_userPushTokenDeleteReq } from '../models/internal_api_user_userPushTokenDeleteReq';
import type { internal_api_user_userPushTokenReq } from '../models/internal_api_user_userPushTokenReq';
import type { internal_api_user_userSessionCheckReq } from '../models/internal_api_user_userSessionCheckReq';
import type { internal_api_user_userSessionInitReq } from '../models/internal_api_user_userSessionInitReq';
import type { internal_api_user_userSessionInitResp } from '../models/internal_api_user_userSessionInitResp';
import type { internal_api_user_userSyncCreateReq } from '../models/internal_api_user_userSyncCreateReq';
import type { internal_api_user_userSyncRemoveReq } from '../models/internal_api_user_userSyncRemoveReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * User Push Token Create
     * ### User Auth with return Access token
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "uuid": "string",
     * "mobile_token": "string",
     * "mobile_type": "string",
     * }
     * ```
     *
     * *Sample OUTPUT*
     *
     * ```json
     * {
         * "message": "Mobile token created successfully",
         * "response": {},
         * "response_code": 201
         * }
         * ```
     * @param payload User Push Token Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putUserMobileToken(
payload: internal_api_user_userPushTokenReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/mobile/token',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Push Token Delete
     * ### User Delete Push Token
         *
         * *Sample INPUT*
         *
         * ```json
         * {
             * "mobile_token": "string"
             * }
             * ```
             *
             * *Sample OUTPUT*
             *
             * ```json
             * {
                 * "message": "Mobile token deleted",
                 * "response": {},
                 * "response_code": 200
                 * }
                 * ```
     * @param payload User Push Token Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUserMobileToken(
payload: internal_api_user_userPushTokenDeleteReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/mobile/token',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Notification Delete
     * ### User Notification delete
                 *
                 * *Sample Input*
                 *
                 * ```json
                 * {
                     * "user_uuid": "string",
                     * "notification_uuid": "string"
                     * }
                     * ```
                     *
                     * *Sample Output*
                     * ```json
                     * {
                         * "message": "Notification deleted",
                         * "response": null,
                         * "response_code": 200
                         * }
                         * ```
     * @param payload User Delete Notification Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUserNotificationDelete(
payload: internal_api_user_userNotificationReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/notification/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Notification Filter
     * ### User Notification filter
                         *
                         * *Sample Input*
                         *
                         * ```json
                         * {
                             * "user_uuid": "string",
                             * "start": "string",
                             * "end": "string",
                             * "is_deleted": false,
                             * "limit": false,
                             * "offset": false
                             * }
                             * ```
                             *
                             * *Sample Output*
                             * ```json
                             * {
                                 * "message": "Notification by range",
                                 * "response": {
                                     * "user_uuid": "string",
                                     * "total_notifications": 0,
                                     * "user_notifications": [
                                         * {
                                             * "notification_uuid": "string",
                                             * "instance_id": "string",
                                             * "rule_uuid": "string",
                                             * "notification_url": "string",
                                             * "images": ["https://www.example.com/icon.png"],
                                             * "rule_expression": "string",
                                             * "is_read": false,
                                             * "notification_time": "string",
                                             * "message": "string"
                                             * }
                                             * ]
                                             * },
                                             * "response_code": 200
                                             * }
                                             * ```
     * @param payload User Notification Range Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postUserNotificationFilter(
payload: internal_api_user_userNotificationFetchReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/notification/filter',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Notification Read
     * ### User Notification read
                                             *
                                             * *Sample Input*
                                             *
                                             * ```json
                                             * {
                                                 * "user_uuid": "string",
                                                 * "notification_uuid": "string"
                                                 * }
                                                 * ```
                                                 *
                                                 * *Sample Output*
                                                 * ```json
                                                 * {
                                                     * "message": "Notification updated",
                                                     * "response": null,
                                                     * "response_code": 200
                                                     * }
                                                     * ```
     * @param payload User Read Notification Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putUserNotificationRead(
payload: internal_api_user_userNotificationReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/notification/read',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Notification By UUID
     * ### User Notification By UUID
                                                     *
                                                     * *Sample Input*
                                                     *
                                                     * ```json
                                                     * {
                                                         * "notification_uuid": "string"
                                                         * }
                                                         * ```
                                                         *
                                                         * *Sample Output*
                                                         * ```json
                                                         * {
                                                             * "message": "Notification by uuid",
                                                             * "response": {
                                                                 * "notification_uuid": "string",
                                                                 * "instance_id": "string",
                                                                 * "rule_uuid": "string",
                                                                 * "notification_url": "string",
                                                                 * "images": [
                                                                     * "https://www.example.com/icon.png"
                                                                     * ],
                                                                     * "rule_expression": "string",
                                                                     * "is_read": false,
                                                                     * "notification_time": "string",
                                                                     * "message": "string"
                                                                     * },
                                                                     * "response_code": 200
                                                                     * }
                                                                     * ```
     * @param notificationUuid Notification ID
     * @returns any OK
     * @throws ApiError
     */
    public static getUserNotificationUuid(
notificationUuid: string,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/notification/uuid',
            query: {
                'notification_uuid': notificationUuid,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Session Check
     * ### User Session Check
                                                                     *
                                                                     * *Sample INPUT*
                                                                     *
                                                                     * ```json
                                                                     * {
                                                                         * "user_uuid": "string",
                                                                         * "exchange_token": "string"
                                                                         * }
                                                                         * ```
                                                                         *
                                                                         * *Sample OUTPUT*
                                                                         *
                                                                         * ```json
                                                                         * {
                                                                             * "message": "Session valid",
                                                                             * "response": {
                                                                                 * "data": {}
                                                                                 * },
                                                                                 * "response_code": 200
                                                                                 * }
                                                                                 *
                                                                                 * ```
     * @param payload User Sync Remove Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postUserSessionCheck(
payload: internal_api_user_userSessionCheckReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/session/check',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Session Init
     * ### User Session Init
                                                                                 *
                                                                                 * *Sample INPUT*
                                                                                 *
                                                                                 * ```json
                                                                                 * {
                                                                                     * "instance_id": "string"
                                                                                     * }
                                                                                     * ```
                                                                                     *
                                                                                     * *Sample OUTPUT*
                                                                                     *
                                                                                     * ```json
                                                                                     * {
                                                                                         * "message": "User sessions",
                                                                                         * "response": {
                                                                                             * "exchange_token": "string"
                                                                                             * },
                                                                                             * "response_code": 200
                                                                                             * }
                                                                                             *
                                                                                             * ```
     * @param payload User Session Init Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postUserSessionInit(
payload: internal_api_user_userSessionInitReq,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_user_userSessionInitResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/session/init',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Sync
     * ### New User Sync Create
                                                                                             *
                                                                                             * *Sample INPUT*
                                                                                             *
                                                                                             * ```json
                                                                                             * {
                                                                                                 * "id": "string",
                                                                                                 * "first_name": "string",
                                                                                                 * "last_name": "string",
                                                                                                 * "user_name": "string",
                                                                                                 * "avatar": "string",
                                                                                                 * "image": "string",
                                                                                                 * "email": "string",
                                                                                                 * "hash": "string",
                                                                                                 * "password": "string",
                                                                                                 * "is_active": false,
                                                                                                 * "is_verified": false,
                                                                                                 * "o_auth2_uid": "string",
                                                                                                 * "o_auth2_provider": "string",
                                                                                                 * "last_logged_in_at": "string",
                                                                                                 * "last_attempt": "string",
                                                                                                 * "created_at": "string",
                                                                                                 * "updated_at": "string",
                                                                                                 * "confirm_selector": "string",
                                                                                                 * "confirm_verifier": "string",
                                                                                                 * "confirmed": false,
                                                                                                 * "attempt_count": 0,
                                                                                                 * "locked": false,
                                                                                                 * "recover_selector": "string",
                                                                                                 * "recover_verifier": "string",
                                                                                                 * "recover_token_expiry": "string",
                                                                                                 * "o_auth2_accessToken": "string",
                                                                                                 * "o_auth2_refreshToken": "string",
                                                                                                 * "o_auth2_expiry": "string"
                                                                                                 * }
                                                                                                 * ```
                                                                                                 *
                                                                                                 * *Sample OUTPUT*
                                                                                                 *
                                                                                                 * ```json
                                                                                                 * {
                                                                                                     * "message": "User created successfully",
                                                                                                     * "response": {},
                                                                                                     * "response_code": 201
                                                                                                     * }
                                                                                                     * ```
     * @param payload User Sync Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putUserSyncCreate(
payload: internal_api_user_userSyncCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/sync/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Remove Sync
     * ### Remove User Sync
                                                                                                     *
                                                                                                     * *Sample INPUT*
                                                                                                     *
                                                                                                     * ```json
                                                                                                     * {
                                                                                                         * "id": "string"
                                                                                                         * }
                                                                                                         * ```
                                                                                                         *
                                                                                                         * *Sample OUTPUT*
                                                                                                         *
                                                                                                         * ```json
                                                                                                         * {
                                                                                                             * "message": "User Deleted",
                                                                                                             * "response": null,
                                                                                                             * "response_code": 200
                                                                                                             * }
                                                                                                             * ```
     * @param payload User Session Check Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postUserSyncRemove(
payload: internal_api_user_userSyncRemoveReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/sync/remove',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
