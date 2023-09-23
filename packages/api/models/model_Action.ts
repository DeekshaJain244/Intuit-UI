/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { model_ActionType } from './model_ActionType';

export type model_Action = {
    access_id?: string;
    access_token?: string;
    auth_header?: string;
    external_link?: string;
    header?: string;
    is_auto_payload?: boolean;
    is_secure?: boolean;
    message?: string;
    method?: string;
    payload?: string;
    process_delay?: number;
    query?: string;
    service_key?: string;
    subject?: string;
    to?: string;
    type?: model_ActionType;
    url?: string;
};
