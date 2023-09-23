/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api__common_AlertResp } from './sts_internal_api__common_AlertResp';

export type sts_internal_api__common_ChannelResp = {
    alerts?: Array<sts_internal_api__common_AlertResp>;
    channel_alerts?: number;
    channel_favorite?: boolean;
    channel_id?: string;
    channel_key?: string;
    channel_name?: string;
    channel_notifications?: number;
    channel_sid?: string;
    channel_type?: string;
    customer_id?: string;
    device_icon?: string;
    device_id?: string;
    device_name?: string;
    is_active?: boolean;
    is_auto_recovery?: boolean;
    is_purge?: boolean;
    is_storage?: boolean;
    is_verified?: boolean;
    nimble_id?: string;
    pipeline_id?: string;
    site_id?: string;
    site_name?: string;
    source_id?: string;
    transaction_id?: string;
    usecase_icon?: string;
    usecase_id?: string;
    usecase_key?: string;
    usecase_meta_key?: Array<Record<string, string>>;
    usecase_name?: string;
};
