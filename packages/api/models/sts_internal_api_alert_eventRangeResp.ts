/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api_alert_event } from './sts_internal_api_alert_event';

export type sts_internal_api_alert_eventRangeResp = {
    agg_frequency?: string;
    channel_id?: string;
    end?: string;
    event_limit?: number;
    event_offset?: number;
    events?: Array<sts_internal_api_alert_event>;
    start?: string;
    usecase_key?: string;
};
