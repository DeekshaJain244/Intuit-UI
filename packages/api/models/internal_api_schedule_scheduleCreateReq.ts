/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_schedule_scheduleOccurrence } from './internal_api_schedule_scheduleOccurrence';

export type internal_api_schedule_scheduleCreateReq = {
    alert_id?: string;
    channel_id?: string;
    rule_id?: string;
    schedule_name: string;
    schedule_occurrence: Array<internal_api_schedule_scheduleOccurrence>;
    schedule_timezone: string;
    schedule_type: string;
    site_id?: string;
};
