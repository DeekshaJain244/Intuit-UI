/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_auth_api_user_userConfigResp } from './sts_internal_auth_api_user_userConfigResp';

export type sts_internal_auth_api_user_userResp = {
    avatar?: string;
    email?: string;
    first_name?: string;
    image?: string;
    is_active?: boolean;
    is_verified?: boolean;
    last_logged_in_at?: string;
    last_name?: string;
    role_key?: string;
    user_config?: sts_internal_auth_api_user_userConfigResp;
    user_id?: string;
    user_name?: string;
    uuid?: string;
};
