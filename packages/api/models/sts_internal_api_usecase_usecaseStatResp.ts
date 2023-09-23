/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { model_StatsData } from './model_StatsData';
import type { sts_internal_api_usecase_channelStatsResp } from './sts_internal_api_usecase_channelStatsResp';

export type sts_internal_api_usecase_usecaseStatResp = {
    usecase_channel?: Array<sts_internal_api_usecase_channelStatsResp>;
    usecase_key?: string;
    usecase_total_alert?: number;
    usecase_total_notification?: number;
    usecase_total_stats?: model_StatsData;
};
