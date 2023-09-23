/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type sts_internal_api_alert_event = {
    alert?: number;
    alert_uuids?: string;
    condition?: string;
    down?: number;
    dwell_time?: number;
    fire?: number;
    frame_collision?: number;
    frame_near_miss?: number;
    high_smoke?: number;
    id?: number;
    ids?: Array<string>;
    intermediate_smoke?: number;
    is_intersected?: number;
    low_smoke?: number;
    metadata?: string;
    moving_average_count?: number;
    non_violation?: number;
    not_intersected?: number;
    occupancy?: number;
    time?: string;
    total?: number;
    total_collision?: number;
    total_count?: number;
    total_near_miss?: number;
    up?: number;
    violation?: number;
};
