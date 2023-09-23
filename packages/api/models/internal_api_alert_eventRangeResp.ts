/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_alert_event } from './internal_api_alert_event';

export type internal_api_alert_eventRangeResp = {
    agg_frequency?: string;
    channel_id?: string;
    end?: string;
    event_limit?: number;
    event_offset?: number;
    events?: Array<internal_api_alert_event>;
    start?: string;
    usecase_key?: string;
};
