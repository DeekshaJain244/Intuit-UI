/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api__common_ChannelResp } from './sts_internal_api__common_ChannelResp';

export type sts_internal_api__common_UsecaseResp = {
    bundle_key?: string;
    is_available?: boolean;
    usecase_background_color?: string;
    usecase_channel_count?: number;
    usecase_channels?: Array<sts_internal_api__common_ChannelResp>;
    usecase_component_key?: string;
    usecase_desc?: string;
    usecase_device_types?: Array<string>;
    usecase_icon?: string;
    usecase_id?: string;
    usecase_key?: string;
    usecase_meta_key?: Array<Record<string, string>>;
    usecase_name?: string;
};
