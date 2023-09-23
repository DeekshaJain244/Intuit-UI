/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_auth_api_user_configCreateReq } from '../models/sts_internal_auth_api_user_configCreateReq';
import type { sts_internal_auth_api_user_sessionResp } from '../models/sts_internal_auth_api_user_sessionResp';
import type { sts_internal_auth_api_user_userAuthReq } from '../models/sts_internal_auth_api_user_userAuthReq';
import type { sts_internal_auth_api_user_userConfigReq } from '../models/sts_internal_auth_api_user_userConfigReq';
import type { sts_internal_auth_api_user_userConfigResp } from '../models/sts_internal_auth_api_user_userConfigResp';
import type { sts_internal_auth_api_user_userDeleteReq } from '../models/sts_internal_auth_api_user_userDeleteReq';
import type { sts_internal_auth_api_user_userIDReq } from '../models/sts_internal_auth_api_user_userIDReq';
import type { sts_internal_auth_api_user_userRegisterReq } from '../models/sts_internal_auth_api_user_userRegisterReq';
import type { sts_internal_auth_api_user_userResp } from '../models/sts_internal_auth_api_user_userResp';
import type { sts_internal_auth_api_user_userSessionResp } from '../models/sts_internal_auth_api_user_userSessionResp';
import type { sts_internal_auth_api_user_userUpdateReq } from '../models/sts_internal_auth_api_user_userUpdateReq';
import type { sts_internal_auth_oauth_userResp } from '../models/sts_internal_auth_oauth_userResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * User Config By ID
     * ### User config Create
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "email": "string",
     * "role_key": "string"
     * }
     * ```
     *
     * *Sample OUTPUT*
     *
     * ```json
     * {
         * "message": "User config created",
         * "response": null,
         * "response_code": 200
         * }
         * ```
     * @param payload User Config By ID Payload
     * @returns any OK
     * @throws ApiError
     */
    public static getAuthUserConfig(
payload: sts_internal_auth_api_user_userIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_auth_api_user_userConfigResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/user/config',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Config Register
     * ### User config Create
         *
         * *Sample INPUT*
         *
         * ```json
         * {
             * "email": "string",
             * "role_key": "string"
             * }
             * ```
             *
             * *Sample OUTPUT*
             *
             * ```json
             * {
                 * "message": "User config created",
                 * "response": null,
                 * "response_code": 200
                 * }
                 * ```
     * @param payload User Config Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putAuthUserConfig(
payload: sts_internal_auth_api_user_configCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/auth/user/config',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Config Update By ID
     * ### User Config Update By ID
                 *
                 * *Sample INPUT*
                 *
                 * ```json
                 * {
                     * "user_config": {
                         * "channel_ids": [
                             * "string"
                             * ],
                             * "customer_ids": [
                                 * "string"
                                 * ],
                                 * "role_id": "string",
                                 * "site_ids": [
                                     * "string"
                                     * ],
                                     * "ui_config": {
                                         * "additionalProp1": {}
                                         * },
                                         * "usecase_ids": [
                                             * "string"
                                             * ],
                                             * "user_id": "string"
                                             * },
                                             * "user_id": "string"
                                             * }
                                             * ```
                                             *
                                             * *Sample OUTPUT*
                                             *
                                             * ```json
                                             * {
                                                 * "message": "User Config Updated",
                                                 * "response": null,
                                                 * "response_code": 200
                                                 * }
                                                 * ```
     * @param payload User Config Update By ID Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchAuthUserConfig(
payload: sts_internal_auth_api_user_userConfigReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/auth/user/config',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Register
     * ### New User Register
                                                 *
                                                 * *Sample INPUT*
                                                 *
                                                 * ```json
                                                 * {
                                                     * "email": "string",
                                                     * "first_name": "string",
                                                     * "last_name": "string",
                                                     * "password": "string",
                                                     * "role_key": "string"
                                                     * }
                                                     * ```
                                                     *
                                                     * *Sample OUTPUT*
                                                     *
                                                     * ```json
                                                     * {
                                                         * "message": "User Registered",
                                                         * "response": {
                                                             * "avatar": "string",
                                                             * "channel_ids": [
                                                                 * "string"
                                                                 * ],
                                                                 * "email": "string",
                                                                 * "first_name": "string",
                                                                 * "is_active": true,
                                                                 * "is_verified": true,
                                                                 * "last_logged_in_at": "string",
                                                                 * "last_name": "string",
                                                                 * "role_id": "string",
                                                                 * "role_key": "string",
                                                                 * "ui_config": {
                                                                     * "additionalProp1": {}
                                                                     * },
                                                                     * "usecase_ids": [
                                                                         * "string"
                                                                         * ],
                                                                         * "user_id": "string",
                                                                         * "user_name": "string"
                                                                         * },
                                                                         * "response_code": 201
                                                                         * }
                                                                         * ```
     * @param payload User Register Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putAuthUserCreate(
payload: sts_internal_auth_api_user_userRegisterReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_auth_api_user_userResp;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/auth/user/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Delete
     * ### User Delete by ID
                                                                         *
                                                                         * *Sample INPUT*
                                                                         *
                                                                         * ```json
                                                                         * {
                                                                             * "user_id": "string"
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
                                                                                 *
                                                                                 * ```
     * @param payload User Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAuthUserDelete(
payload: sts_internal_auth_api_user_userDeleteReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/auth/user/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Email Lookup
     * ### User Email lookup
                                                                                 *
                                                                                 * *Sample OUTPUT*
                                                                                 *
                                                                                 * ```json
                                                                                 * {
                                                                                     * "message": "User List",
                                                                                     * "response": [
                                                                                         * {
                                                                                             * "email": "string",
                                                                                             * "first_name": "string",
                                                                                             * "last_name": "string",
                                                                                             * "user_name": "string"
                                                                                             * }
                                                                                             * ],
                                                                                             * "response_code": 200
                                                                                             * }
                                                                                             *
                                                                                             * ```
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthUserEmailLookup(): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<sts_internal_auth_api_user_userResp>;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/user/email_lookup',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Get By ID
     * ### User Get by ID
                                                                                             *
                                                                                             * *Sample INPUT*
                                                                                             *
                                                                                             * ```json
                                                                                             * {
                                                                                                 * "user_id": "string"
                                                                                                 * }
                                                                                                 * ```
                                                                                                 *
                                                                                                 * *Sample OUTPUT*
                                                                                                 *
                                                                                                 * ```json
                                                                                                 * {
                                                                                                     * "message": "User By ID",
                                                                                                     * "response":{
                                                                                                         * "avatar": "string",
                                                                                                         * "email": "string",
                                                                                                         * "first_name": "string",
                                                                                                         * "is_active": true,
                                                                                                         * "is_verified": true,
                                                                                                         * "last_logged_in_at": "string",
                                                                                                         * "last_name": "string",
                                                                                                         * "role_id": "string",
                                                                                                         * "role_key": "string",
                                                                                                         * "user_id": "string",
                                                                                                         * "user_name": "string"
                                                                                                         * },
                                                                                                         * "response_code": 200
                                                                                                         * }
                                                                                                         *
                                                                                                         * ```
     * @param payload User Get By ID Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthUserId(
payload: sts_internal_auth_api_user_userIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_auth_api_user_userResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/user/id',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Info
     * ### User Info by Access token
                                                                                                         *
                                                                                                         * *Sample OUTPUT*
                                                                                                         *
                                                                                                         * ```json
                                                                                                         * {
                                                                                                             * "message": "User By ID",
                                                                                                             * "response":  {
                                                                                                                 * "avatar": "string",
                                                                                                                 * "channel_ids": [
                                                                                                                     * "string"
                                                                                                                     * ],
                                                                                                                     * "customer_ids": [
                                                                                                                         * "string"
                                                                                                                         * ],
                                                                                                                         * "email": "string",
                                                                                                                         * "first_name": "string",
                                                                                                                         * "is_active": true,
                                                                                                                         * "is_verified": true,
                                                                                                                         * "last_logged_in_at": "string",
                                                                                                                         * "last_name": "string",
                                                                                                                         * "role_id": "string",
                                                                                                                         * "role_key": "string",
                                                                                                                         * "site_ids": [
                                                                                                                             * "string"
                                                                                                                             * ],
                                                                                                                             * "ui_config": {
                                                                                                                                 * "additionalProp1": {}
                                                                                                                                 * },
                                                                                                                                 * "usecase_ids": [
                                                                                                                                     * "string"
                                                                                                                                     * ],
                                                                                                                                     * "user_id": "string",
                                                                                                                                     * "user_name": "string",
                                                                                                                                     * "user_config": {
                                                                                                                                         * "channel_ids": [
                                                                                                                                             * "string"
                                                                                                                                             * ],
                                                                                                                                             * "customer_ids": [
                                                                                                                                                 * "string"
                                                                                                                                                 * ],
                                                                                                                                                 * "role_id": "string",
                                                                                                                                                 * "site_ids": [
                                                                                                                                                     * "string"
                                                                                                                                                     * ],
                                                                                                                                                     * "ui_config": {
                                                                                                                                                         * "additionalProp1": {}
                                                                                                                                                         * },
                                                                                                                                                         * "usecase_ids": [
                                                                                                                                                             * "string"
                                                                                                                                                             * ],
                                                                                                                                                             * "user_id": "string"
                                                                                                                                                             * }
                                                                                                                                                             * },
                                                                                                                                                             * "response_code": 200
                                                                                                                                                             * }
                                                                                                                                                             *
                                                                                                                                                             * ```
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthUserInfo(): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_auth_api_user_userResp & {
user_config?: sts_internal_auth_api_user_userConfigResp;
});
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/user/info',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User List
     * ### User List
                                                                                                                                                             *
                                                                                                                                                             * *Sample OUTPUT*
                                                                                                                                                             *
                                                                                                                                                             * ```json
                                                                                                                                                             * {
                                                                                                                                                                 * "message": "User List",
                                                                                                                                                                 * "response": [
                                                                                                                                                                     * {
                                                                                                                                                                         * "avatar": "string",
                                                                                                                                                                         * "email": "string",
                                                                                                                                                                         * "first_name": "string",
                                                                                                                                                                         * "is_active": true,
                                                                                                                                                                         * "is_verified": true,
                                                                                                                                                                         * "last_logged_in_at": "string",
                                                                                                                                                                         * "last_name": "string",
                                                                                                                                                                         * "role_id": "string",
                                                                                                                                                                         * "role_key": "string",
                                                                                                                                                                         * "user_id": "string",
                                                                                                                                                                         * "user_name": "string"
                                                                                                                                                                         * }
                                                                                                                                                                         * ],
                                                                                                                                                                         * "response_code": 200
                                                                                                                                                                         * }
                                                                                                                                                                         *
                                                                                                                                                                         * ```
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthUserList(): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<sts_internal_auth_api_user_userResp>;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/user/list',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Register
     * ### New User Register
                                                                                                                                                                         *
                                                                                                                                                                         * *Sample INPUT*
                                                                                                                                                                         *
                                                                                                                                                                         * ```json
                                                                                                                                                                         * {
                                                                                                                                                                             * "email": "string",
                                                                                                                                                                             * "first_name": "string",
                                                                                                                                                                             * "last_name": "string",
                                                                                                                                                                             * "password": "string",
                                                                                                                                                                             * "role_key": "string"
                                                                                                                                                                             * }
                                                                                                                                                                             * ```
                                                                                                                                                                             *
                                                                                                                                                                             * *Sample OUTPUT*
                                                                                                                                                                             *
                                                                                                                                                                             * ```json
                                                                                                                                                                             * {
                                                                                                                                                                                 * "message": "User Registered",
                                                                                                                                                                                 * "response": {
                                                                                                                                                                                     * "avatar": "string",
                                                                                                                                                                                     * "channel_ids": [
                                                                                                                                                                                         * "string"
                                                                                                                                                                                         * ],
                                                                                                                                                                                         * "email": "string",
                                                                                                                                                                                         * "first_name": "string",
                                                                                                                                                                                         * "is_active": true,
                                                                                                                                                                                         * "is_verified": true,
                                                                                                                                                                                         * "last_logged_in_at": "string",
                                                                                                                                                                                         * "last_name": "string",
                                                                                                                                                                                         * "role_id": "string",
                                                                                                                                                                                         * "role_key": "string",
                                                                                                                                                                                         * "ui_config": {
                                                                                                                                                                                             * "additionalProp1": {}
                                                                                                                                                                                             * },
                                                                                                                                                                                             * "usecase_ids": [
                                                                                                                                                                                                 * "string"
                                                                                                                                                                                                 * ],
                                                                                                                                                                                                 * "user_id": "string",
                                                                                                                                                                                                 * "user_name": "string"
                                                                                                                                                                                                 * },
                                                                                                                                                                                                 * "response_code": 201
                                                                                                                                                                                                 * }
                                                                                                                                                                                                 * ```
     * @param payload User Register Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putAuthUserOnboardRegister(
payload: sts_internal_auth_api_user_userRegisterReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_auth_api_user_userResp;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/auth/user/onboard/register',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Sessions
     * ### User Sessions
                                                                                                                                                                                                 *
                                                                                                                                                                                                 * *Sample OUTPUT*
                                                                                                                                                                                                 *
                                                                                                                                                                                                 * ```json
                                                                                                                                                                                                 * {
                                                                                                                                                                                                     * "message": "User sessions",
                                                                                                                                                                                                     * "response": {
                                                                                                                                                                                                         * "user_id": "string",
                                                                                                                                                                                                         * "sessions": [
                                                                                                                                                                                                             * {
                                                                                                                                                                                                                 * "sid": "string",
                                                                                                                                                                                                                 * "session_expiry": "string",
                                                                                                                                                                                                                 * "value": {
                                                                                                                                                                                                                     * "mobile": "string",
                                                                                                                                                                                                                     * "os": "string",
                                                                                                                                                                                                                     * "browser_name": "string",
                                                                                                                                                                                                                     * "user_agent": "string",
                                                                                                                                                                                                                     * "browser_version": "string",
                                                                                                                                                                                                                     * "fwd_ip": "string",
                                                                                                                                                                                                                     * "ip": "string",
                                                                                                                                                                                                                     * "uid": "string"
                                                                                                                                                                                                                     * }
                                                                                                                                                                                                                     * }
                                                                                                                                                                                                                     * ]
                                                                                                                                                                                                                     * },
                                                                                                                                                                                                                     * "response_code": 200
                                                                                                                                                                                                                     * }
                                                                                                                                                                                                                     *
                                                                                                                                                                                                                     * ```
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthUserSessionList(): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_auth_api_user_userSessionResp & {
sessions?: sts_internal_auth_api_user_sessionResp;
});
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/user/session/list',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Revoke User Session
     * ### User Session Revoke
                                                                                                                                                                                                                     *
                                                                                                                                                                                                                     *
                                                                                                                                                                                                                     * *Sample INPUT*
                                                                                                                                                                                                                     *
                                                                                                                                                                                                                     * ```json
                                                                                                                                                                                                                     * {
                                                                                                                                                                                                                         * "user_id": "string",
                                                                                                                                                                                                                         * "session_id": "string"
                                                                                                                                                                                                                         * }
                                                                                                                                                                                                                         * ```
                                                                                                                                                                                                                         *
                                                                                                                                                                                                                         * *Sample OUTPUT*
                                                                                                                                                                                                                         *
                                                                                                                                                                                                                         * ```json
                                                                                                                                                                                                                         * {
                                                                                                                                                                                                                             * "message": "User session revoked",
                                                                                                                                                                                                                             * "response": null,
                                                                                                                                                                                                                             * "response_code": 200
                                                                                                                                                                                                                             * }
                                                                                                                                                                                                                             * ```
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAuthUserSessionRevoke(): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/auth/user/session/revoke',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Token Exchange
     * ### User Auth with return Access token
                                                                                                                                                                                                                             *
                                                                                                                                                                                                                             * *Sample INPUT*
                                                                                                                                                                                                                             *
                                                                                                                                                                                                                             * ```json
                                                                                                                                                                                                                             * {
                                                                                                                                                                                                                                 * "uuid": "string",
                                                                                                                                                                                                                                 * }
                                                                                                                                                                                                                                 * ```
                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                 * *Sample OUTPUT*
                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                 * ```json
                                                                                                                                                                                                                                 * {
                                                                                                                                                                                                                                     * "token": "string"
                                                                                                                                                                                                                                     * }
                                                                                                                                                                                                                                     * ```
     * @param payload User Auth Payload
     * @returns structs_HTTPResp OK
     * @throws ApiError
     */
    public static postAuthUserSessionToken(
payload: sts_internal_auth_api_user_userAuthReq,
): CancelablePromise<structs_HTTPResp> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/user/session/token',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Update
     * ### User Update by ID
                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                     * *Sample INPUT*
                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                     * ```json
                                                                                                                                                                                                                                     * {
                                                                                                                                                                                                                                         * "change_password": true,
                                                                                                                                                                                                                                         * "confirm_password": "string",
                                                                                                                                                                                                                                         * "email": "string",
                                                                                                                                                                                                                                         * "first_name": "string",
                                                                                                                                                                                                                                         * "last_name": "string",
                                                                                                                                                                                                                                         * "image": "string",
                                                                                                                                                                                                                                         * "password": "string",
                                                                                                                                                                                                                                         * "role_id": "string",
                                                                                                                                                                                                                                         * "user_id": "string"
                                                                                                                                                                                                                                         * }
                                                                                                                                                                                                                                         * ```
                                                                                                                                                                                                                                         *
                                                                                                                                                                                                                                         * *Sample OUTPUT*
                                                                                                                                                                                                                                         *
                                                                                                                                                                                                                                         * ```json
                                                                                                                                                                                                                                         * {
                                                                                                                                                                                                                                             * "message": "User Updated",
                                                                                                                                                                                                                                             * "response": null,
                                                                                                                                                                                                                                             * "response_code": 200
                                                                                                                                                                                                                                             * }
                                                                                                                                                                                                                                             * ```
     * @param payload User Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchAuthUserUpdate(
payload: sts_internal_auth_api_user_userUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_auth_api_user_userResp;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/auth/user/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * User Info
     * ### User Info by Access token
                                                                                                                                                                                                                                             *
                                                                                                                                                                                                                                             * *Sample OUTPUT*
                                                                                                                                                                                                                                             *
                                                                                                                                                                                                                                             * ```json
                                                                                                                                                                                                                                             * {
                                                                                                                                                                                                                                                 * "message": "User By ID",
                                                                                                                                                                                                                                                 * "response":  {
                                                                                                                                                                                                                                                     * "avatar": "string",
                                                                                                                                                                                                                                                     * "channel_ids": [
                                                                                                                                                                                                                                                         * "string"
                                                                                                                                                                                                                                                         * ],
                                                                                                                                                                                                                                                         * "customer_ids": [
                                                                                                                                                                                                                                                             * "string"
                                                                                                                                                                                                                                                             * ],
                                                                                                                                                                                                                                                             * "email": "string",
                                                                                                                                                                                                                                                             * "first_name": "string",
                                                                                                                                                                                                                                                             * "is_active": true,
                                                                                                                                                                                                                                                             * "is_verified": true,
                                                                                                                                                                                                                                                             * "last_logged_in_at": "string",
                                                                                                                                                                                                                                                             * "last_name": "string",
                                                                                                                                                                                                                                                             * "role_id": "string",
                                                                                                                                                                                                                                                             * "role_key": "string",
                                                                                                                                                                                                                                                             * "site_ids": [
                                                                                                                                                                                                                                                                 * "string"
                                                                                                                                                                                                                                                                 * ],
                                                                                                                                                                                                                                                                 * "ui_config": {
                                                                                                                                                                                                                                                                     * "additionalProp1": {}
                                                                                                                                                                                                                                                                     * },
                                                                                                                                                                                                                                                                     * "usecase_ids": [
                                                                                                                                                                                                                                                                         * "string"
                                                                                                                                                                                                                                                                         * ],
                                                                                                                                                                                                                                                                         * "user_id": "string",
                                                                                                                                                                                                                                                                         * "user_name": "string",
                                                                                                                                                                                                                                                                         * "user_config": {
                                                                                                                                                                                                                                                                             * "channel_ids": [
                                                                                                                                                                                                                                                                                 * "string"
                                                                                                                                                                                                                                                                                 * ],
                                                                                                                                                                                                                                                                                 * "customer_ids": [
                                                                                                                                                                                                                                                                                     * "string"
                                                                                                                                                                                                                                                                                     * ],
                                                                                                                                                                                                                                                                                     * "role_id": "string",
                                                                                                                                                                                                                                                                                     * "site_ids": [
                                                                                                                                                                                                                                                                                         * "string"
                                                                                                                                                                                                                                                                                         * ],
                                                                                                                                                                                                                                                                                         * "ui_config": {
                                                                                                                                                                                                                                                                                             * "additionalProp1": {}
                                                                                                                                                                                                                                                                                             * },
                                                                                                                                                                                                                                                                                             * "usecase_ids": [
                                                                                                                                                                                                                                                                                                 * "string"
                                                                                                                                                                                                                                                                                                 * ],
                                                                                                                                                                                                                                                                                                 * "user_id": "string"
                                                                                                                                                                                                                                                                                                 * }
                                                                                                                                                                                                                                                                                                 * },
                                                                                                                                                                                                                                                                                                 * "response_code": 200
                                                                                                                                                                                                                                                                                                 * }
                                                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                                                 * ```
     * @returns any OK
     * @throws ApiError
     */
    public static postUserInfo(): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_auth_oauth_userResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/info',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
