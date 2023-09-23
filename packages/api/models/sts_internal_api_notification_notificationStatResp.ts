/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api__common_EventStatsResp } from './sts_internal_api__common_EventStatsResp';
import type { sts_internal_api__common_Stats } from './sts_internal_api__common_Stats';

export type sts_internal_api_notification_notificationStatResp = {
    usecase_channel?: Array<sts_internal_api__common_EventStatsResp>;
    usecase_key?: string;
    usecase_total_alert?: number;
    usecase_total_notification?: number;
    usecase_total_stats?: sts_internal_api__common_Stats;
};
