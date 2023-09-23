/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_usecase_channelStatsResp } from './internal_api_usecase_channelStatsResp';
import type { model_StatsData } from './model_StatsData';

export type internal_api_usecase_usecaseStatResp = {
    usecase_channel?: Array<internal_api_usecase_channelStatsResp>;
    usecase_key?: string;
    usecase_total_alert?: number;
    usecase_total_notification?: number;
    usecase_total_stats?: model_StatsData;
};
