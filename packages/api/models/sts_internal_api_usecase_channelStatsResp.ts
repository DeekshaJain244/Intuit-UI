/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { model_AlertData } from './model_AlertData';
import type { model_StatsData } from './model_StatsData';

export type sts_internal_api_usecase_channelStatsResp = {
    channel_alert?: model_AlertData;
    channel_id?: string;
    channel_key?: string;
    channel_name?: string;
    channel_stats?: model_StatsData;
    channel_total_alert?: number;
    channel_total_notification?: number;
    usecase_key?: string;
};
