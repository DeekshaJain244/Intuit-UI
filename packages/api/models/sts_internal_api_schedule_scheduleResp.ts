/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api_schedule_scheduleOccurrence } from './sts_internal_api_schedule_scheduleOccurrence';

export type sts_internal_api_schedule_scheduleResp = {
    alert_id?: string;
    channel_id?: string;
    is_active?: boolean;
    rule_id?: string;
    schedule_id?: string;
    schedule_name?: string;
    schedule_occurrence?: Array<sts_internal_api_schedule_scheduleOccurrence>;
    schedule_type?: string;
    timezone?: string;
};
