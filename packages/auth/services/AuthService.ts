/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_auth_x_login_loginReq } from '../models/internal_auth_x_login_loginReq';
import type { internal_auth_x_recover_recoveryEndReq } from '../models/internal_auth_x_recover_recoveryEndReq';
import type { internal_auth_x_recover_recoveryReq } from '../models/internal_auth_x_recover_recoveryReq';
import type { internal_auth_x_register_registerReq } from '../models/internal_auth_x_register_registerReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { sts_internal_auth_x_confirm_confirmReq } from '../models/sts_internal_auth_x_confirm_confirmReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Confirm a new user
     * Confirm a new user
     * @param payload Confirm request
     * @returns any OK
     * @throws ApiError
     */
    public static confirm(
payload: sts_internal_auth_x_confirm_confirmReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/confirm',
            body: payload,
        });
    }

    /**
     * Login
     * Login
     * @param payload Login request
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthLogin(
payload: internal_auth_x_login_loginReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: payload,
        });
    }

    /**
     * Logout the user
     * Logout the user
     * @returns string OK
     * @throws ApiError
     */
    public static deleteAuthLogout(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/auth/logout',
        });
    }

    /**
     * Recover procedure.
     * Recover procedure.
     * @param payload Recovery request
     * @returns any OK
     * @throws ApiError
     */
    public static recover(
payload: internal_auth_x_recover_recoveryReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/recover',
            body: payload,
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Recover End procedure.
     * Recover End procedure.
     * @param payload Recovery End request
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthRecoverEnd(
payload: internal_auth_x_recover_recoveryEndReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/recover/end',
            body: payload,
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Register a new user
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
     * @param payload Registration request
     * @returns any OK
     * @throws ApiError
     */
    public static register(
payload: internal_auth_x_register_registerReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: payload,
        });
    }

}
