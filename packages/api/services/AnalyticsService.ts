/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_alert_event } from '../models/internal_api_alert_event';
import type { internal_api_alert_eventRangeResp } from '../models/internal_api_alert_eventRangeResp';
import type { internal_api_notification_notificationStatResp } from '../models/internal_api_notification_notificationStatResp';
import type { model_AlertData } from '../models/model_AlertData';
import type { model_StatsData } from '../models/model_StatsData';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { sts_internal_api__common_EventStatsResp } from '../models/sts_internal_api__common_EventStatsResp';
import type { sts_internal_api_usecase_channelStatsResp } from '../models/sts_internal_api_usecase_channelStatsResp';
import type { sts_internal_api_usecase_usecaseReportReq } from '../models/sts_internal_api_usecase_usecaseReportReq';
import type { sts_internal_api_usecase_usecaseStatReq } from '../models/sts_internal_api_usecase_usecaseStatReq';
import type { sts_internal_api_usecase_usecaseStatResp } from '../models/sts_internal_api_usecase_usecaseStatResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalyticsService {

    /**
     * Events By Range
     * ### Event By Range API.
 *
 * *Sample INPUT*
 *
 * // Query params
 * ```json
 * {
     * "usecase_key": "string",
     * "usecase_meta_key": [
         * "string"
         * ],
         * "channel_id": "string",
         * "event_offset": 0,
         * "event_limit": "string",
         * "start": "string",
         * "end": "string",
         * "agg_frequency": "string",
         * "details": false,
         * "type": 0
         * }
         * ```
         *
         * *Sample OUTPUT*
         *
         * ```json
         * {
             * "message": "Events by range",
             * "response": {
                 * "agg_frequency": "string",
                 * "channel_id": "string",
                 * "end": "string",
                 * "event_limit": 0,
                 * "event_offset": 0,
                 * "events": [
                     * {
                         * "alert": 0,
                         * "alert_uuids": "string",
                         * "condition": "string",
                         * "down": 0,
                         * "dwell_time": 0,
                         * "fire": 0,
                         * "frame_collision": 0,
                         * "frame_near_miss": 0,
                         * "high_smoke": 0,
                         * "id": 0,
                         * "ids": [
                             * "string"
                             * ],
                             * "intermediate_smoke": 0,
                             * "is_intersected": 0,
                             * "low_smoke": 0,
                             * "metadata": "string",
                             * "moving_average_count": 0,
                             * "non_violation": 0,
                             * "not_intersected": 0,
                             * "occupancy": 0,
                             * "time": "string",
                             * "total": 0,
                             * "total_collision": 0,
                             * "total_count": 0,
                             * "total_near_miss": 0,
                             * "up": 0,
                             * "violation": 0
                             * }
                             * ],
                             * "start": "string",
                             * "usecase_key": "string"
                             * },
                             * "response_code": 200
                             * }
                             * ```
                             * 
     * @param usecaseKey UseCase Key
     * @param usecaseMetaKey UseCase Meta Key
     * @param channelId Channel ID
     * @param start Start Time
     * @param end End Time
     * @param eventOffset Event Offset
     * @param eventLimit Event Limit
     * @param aggFrequency Aggregation Frequency
     * @param details details
     * @param type type
     * @returns any OK
     * @throws ApiError
     */
    public static getAlertEventRange(
usecaseKey: string,
usecaseMetaKey: string,
channelId: string,
start: string,
end: string,
eventOffset?: number,
eventLimit?: number,
aggFrequency: string = '60s',
details: boolean = false,
type: number = 1,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_alert_eventRangeResp & {
events?: Array<internal_api_alert_event>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/alert/event/range',
            query: {
                'usecase_key': usecaseKey,
                'usecase_meta_key': usecaseMetaKey,
                'channel_id': channelId,
                'event_offset': eventOffset,
                'event_limit': eventLimit,
                'start': start,
                'end': end,
                'agg_frequency': aggFrequency,
                'details': details,
                'type': type,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Channel Stats
     * ### Event Alert Stats API.
                             *
                             * *Sample INPUT*
                             *
                             * // Query params
                             * ```json
                             * {
                                 * "usecase_key": "string",
                                 * "usecase_meta_key": [
                                     * "string"
                                     * ],
                                     * "channel_id": "string",
                                     * "frequency": "-string"
                                     * }
                                     * ```
                                     *
                                     * *Sample OUTPUT*
                                     *
                                     * ```json
                                     * {
                                         * "message": "Channel event stats for last frequency",
                                         * "response": {
                                             * "channel_alert": {
                                                 * "channel": "string",
                                                 * "condition": "string",
                                                 * "count": 0,
                                                 * "key": "string",
                                                 * "name": "string",
                                                 * "time": "string"
                                                 * },
                                                 * "channel_id": "string",
                                                 * "channel_key": "string",
                                                 * "channel_name": "string",
                                                 * "channel_stats": {
                                                     * "alert": 0,
                                                     * "down": 0,
                                                     * "dwell_time": 0,
                                                     * "fire": 0,
                                                     * "frame_collision": 0,
                                                     * "frame_near_miss": 0,
                                                     * "high_smoke": 0,
                                                     * "ids": [
                                                         * "string"
                                                         * ],
                                                         * "intermediate_smoke": 0,
                                                         * "is_intersected": 0,
                                                         * "low_smoke": 0,
                                                         * "moving_average_count": 0,
                                                         * "non_violation": 0,
                                                         * "not_intersected": 0,
                                                         * "occupancy": 0,
                                                         * "total": 0,
                                                         * "total_collision": 0,
                                                         * "total_near_miss": 0,
                                                         * "up": 0,
                                                         * "violation": 0
                                                         * },
                                                         * "channel_total_alert": 0,
                                                         * "channel_total_notification": 0,
                                                         * "usecase_key": "string"
                                                         * },
                                                         * "response_code": 200
                                                         * }
                                                         * ```
                                                         * 
     * @param usecaseKey UseCase Key
     * @param usecaseMetaKey UseCase Meta Key
     * @param channelId Channel ID
     * @param frequency Frequency
     * @returns any OK
     * @throws ApiError
     */
    public static getAlertEventStats(
usecaseKey: string,
usecaseMetaKey: string,
channelId: string,
frequency: string = '-1h',
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api__common_EventStatsResp & {
channel_alert?: model_AlertData;
channel_stats?: model_StatsData;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/alert/event/stats',
            query: {
                'usecase_key': usecaseKey,
                'usecase_meta_key': usecaseMetaKey,
                'channel_id': channelId,
                'frequency': frequency,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * UseCase Stats
     * ### Notification Stats By Usecase API.
                                                         *
                                                         * *Sample INPUT*
                                                         *
                                                         * // Query params
                                                         *
                                                         * ```json
                                                         * {
                                                             * "usecase_key": "string",
                                                             * "usecase_meta_key": [
                                                                 * "string",
                                                                 * "string",
                                                                 * "string"
                                                                 * ],
                                                                 * "frequency": "string",
                                                                 * "details": true
                                                                 * }
                                                                 * ```
                                                                 *
                                                                 * *Sample OUTPUT*
                                                                 *
                                                                 * ```json
                                                                 * {
                                                                     * "message": "Notification stats",
                                                                     * "response": {
                                                                         * "usecase_channel": [
                                                                             * {
                                                                                 * "channel_alert": {
                                                                                     * "channel": "string",
                                                                                     * "condition": "string",
                                                                                     * "count": 0,
                                                                                     * "key": "string",
                                                                                     * "name": "string",
                                                                                     * "time": "string"
                                                                                     * },
                                                                                     * "channel_id": "string",
                                                                                     * "channel_key": "string",
                                                                                     * "channel_name": "string",
                                                                                     * "channel_stats": {
                                                                                         * "alert": 0,
                                                                                         * "down": 0,
                                                                                         * "dwell_time": 0,
                                                                                         * "fire": 0,
                                                                                         * "frame_collision": 0,
                                                                                         * "frame_near_miss": 0,
                                                                                         * "high_smoke": 0,
                                                                                         * "ids": [
                                                                                             * "string"
                                                                                             * ],
                                                                                             * "intermediate_smoke": 0,
                                                                                             * "low_smoke": 0,
                                                                                             * "moving_average_count": 0,
                                                                                             * "non_violation": 0,
                                                                                             * "occupancy": 0,
                                                                                             * "total": 0,
                                                                                             * "total_collision": 0,
                                                                                             * "total_near_miss": 0,
                                                                                             * "up": 0,
                                                                                             * "violation": 0
                                                                                             * },
                                                                                             * "channel_total_alert": 0,
                                                                                             * "channel_total_notification": 0,
                                                                                             * "usecase_key": "string"
                                                                                             * }
                                                                                             * ],
                                                                                             * "usecase_key": "string",
                                                                                             * "usecase_total_alert": 0,
                                                                                             * "usecase_total_notification": 0,
                                                                                             * "usecase_total_stats": {
                                                                                                 * "down": 0,
                                                                                                 * "dwell_time": 0,
                                                                                                 * "fire": 0,
                                                                                                 * "frame_collision": 0,
                                                                                                 * "frame_nearmiss": 0,
                                                                                                 * "high_smoke": 0,
                                                                                                 * "intermediate_smoke": 0,
                                                                                                 * "low_smoke": 0,
                                                                                                 * "movingaverage_count": 0,
                                                                                                 * "nonviolation": 0,
                                                                                                 * "occupancy": 0,
                                                                                                 * "total": 0,
                                                                                                 * "total_collision": 0,
                                                                                                 * "total_nearmiss": 0,
                                                                                                 * "up": 0,
                                                                                                 * "violation": 0
                                                                                                 * }
                                                                                                 * },
                                                                                                 * "response_code": 200
                                                                                                 * }
                                                                                                 * ```
                                                                                                 * 
     * @param usecaseKey UseCase Key
     * @param usecaseMetaKey UseCase Meta Key
     * @param frequency Frequency
     * @param details details
     * @returns any OK
     * @throws ApiError
     */
    public static getNotificationStats(
usecaseKey: string,
usecaseMetaKey: string,
frequency: string = '-1h',
details: boolean = false,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_notification_notificationStatResp & {
usecase_channel?: Array<(sts_internal_api__common_EventStatsResp & {
channel_alert?: model_AlertData;
channel_stats?: model_StatsData;
})>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notification/stats',
            query: {
                'usecase_key': usecaseKey,
                'usecase_meta_key': usecaseMetaKey,
                'frequency': frequency,
                'details': details,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * UseCase Stats
     * ### Usecase Stats API
                                                                                                 *
                                                                                                 * *Sample INPUT*
                                                                                                 *
                                                                                                 * ```json
                                                                                                 * {
                                                                                                     * "details": true,
                                                                                                     * "frequency": "string",
                                                                                                     * "usecase_key": "string",
                                                                                                     * "usecase_meta_key": [
                                                                                                         * "string"
                                                                                                         * ]
                                                                                                         * }
                                                                                                         * ```
                                                                                                         *
                                                                                                         * *Sample OUTPUT*
                                                                                                         *
                                                                                                         * ```json
                                                                                                         * {
                                                                                                             * "message": "Usecase deleted",
                                                                                                             * "response":  {
                                                                                                                 * "usecase_channel": [
                                                                                                                     * {
                                                                                                                         * "channel_alert": {
                                                                                                                             * "channel": "string",
                                                                                                                             * "condition": "string",
                                                                                                                             * "count": 0,
                                                                                                                             * "key": "string",
                                                                                                                             * "name": "string",
                                                                                                                             * "time": "string"
                                                                                                                             * },
                                                                                                                             * "channel_id": "string",
                                                                                                                             * "channel_key": "string",
                                                                                                                             * "channel_name": "string",
                                                                                                                             * "channel_stats": {
                                                                                                                                 * "alert": 0,
                                                                                                                                 * "down": 0,
                                                                                                                                 * "dwell_time": 0,
                                                                                                                                 * "fire": 0,
                                                                                                                                 * "frame_collision": 0,
                                                                                                                                 * "frame_near_miss": 0,
                                                                                                                                 * "high_smoke": 0,
                                                                                                                                 * "ids": [
                                                                                                                                     * "string"
                                                                                                                                     * ],
                                                                                                                                     * "intermediate_smoke": 0,
                                                                                                                                     * "low_smoke": 0,
                                                                                                                                     * "moving_average_count": 0,
                                                                                                                                     * "non_violation": 0,
                                                                                                                                     * "occupancy": 0,
                                                                                                                                     * "total": 0,
                                                                                                                                     * "total_collision": 0,
                                                                                                                                     * "total_near_miss": 0,
                                                                                                                                     * "up": 0,
                                                                                                                                     * "violation": 0
                                                                                                                                     * },
                                                                                                                                     * "channel_total_alert": 0,
                                                                                                                                     * "channel_total_notification": 0,
                                                                                                                                     * "usecase_key": "string"
                                                                                                                                     * }
                                                                                                                                     * ],
                                                                                                                                     * "usecase_key": "string",
                                                                                                                                     * "usecase_total_alert": 0,
                                                                                                                                     * "usecase_total_notification": 0,
                                                                                                                                     * "usecase_total_stats": {
                                                                                                                                         * "alert": 0,
                                                                                                                                         * "down": 0,
                                                                                                                                         * "dwell_time": 0,
                                                                                                                                         * "fire": 0,
                                                                                                                                         * "frame_collision": 0,
                                                                                                                                         * "frame_near_miss": 0,
                                                                                                                                         * "high_smoke": 0,
                                                                                                                                         * "ids": [
                                                                                                                                             * "string"
                                                                                                                                             * ],
                                                                                                                                             * "intermediate_smoke": 0,
                                                                                                                                             * "low_smoke": 0,
                                                                                                                                             * "moving_average_count": 0,
                                                                                                                                             * "non_violation": 0,
                                                                                                                                             * "occupancy": 0,
                                                                                                                                             * "total": 0,
                                                                                                                                             * "total_collision": 0,
                                                                                                                                             * "total_near_miss": 0,
                                                                                                                                             * "up": 0,
                                                                                                                                             * "violation": 0
                                                                                                                                             * }
                                                                                                                                             * },
                                                                                                                                             * "response_code": 200
                                                                                                                                             * }
                                                                                                                                             * ```
                                                                                                                                             * 
     * @param payload UseCase Stats Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postUsecaseStats(
payload: sts_internal_api_usecase_usecaseStatReq,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api_usecase_usecaseStatResp & {
usecase_channel?: Array<(sts_internal_api_usecase_channelStatsResp & {
channel_alert?: model_AlertData;
channel_stats?: model_StatsData;
})>;
usecase_total_stats?: model_StatsData;
});
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/usecase/stats',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * UseCase Report
     * ### Usecase Report API
                                                                                                                                             *
                                                                                                                                             * *Sample INPUT*
                                                                                                                                             *
                                                                                                                                             * ```json
                                                                                                                                             * {
                                                                                                                                                 * "details": true,
                                                                                                                                                 * "frequency": "string",
                                                                                                                                                 * "usecase_key": "string",
                                                                                                                                                 * "usecase_meta_key": [
                                                                                                                                                     * "string"
                                                                                                                                                     * ]
                                                                                                                                                     * }
                                                                                                                                                     * ```
                                                                                                                                                     *
                                                                                                                                                     * *Sample OUTPUT*
                                                                                                                                                     *
                                                                                                                                                     * ```json
                                                                                                                                                     * {
                                                                                                                                                         * "message": "UseCase stats",
                                                                                                                                                         * "response": {
                                                                                                                                                             * "channel_alert": {
                                                                                                                                                                 * "channel": "string",
                                                                                                                                                                 * "condition": "string",
                                                                                                                                                                 * "count": 0,
                                                                                                                                                                 * "key": "string",
                                                                                                                                                                 * "name": "string",
                                                                                                                                                                 * "time": "string"
                                                                                                                                                                 * },
                                                                                                                                                                 * "channel_id": "string",
                                                                                                                                                                 * "channel_key": "string",
                                                                                                                                                                 * "channel_name": "string",
                                                                                                                                                                 * "channel_stats": {
                                                                                                                                                                     * "alert": 0,
                                                                                                                                                                     * "down": 0,
                                                                                                                                                                     * "dwell_time": 0,
                                                                                                                                                                     * "fire": 0,
                                                                                                                                                                     * "frame_collision": 0,
                                                                                                                                                                     * "frame_near_miss": 0,
                                                                                                                                                                     * "high_smoke": 0,
                                                                                                                                                                     * "ids": [
                                                                                                                                                                         * "string"
                                                                                                                                                                         * ],
                                                                                                                                                                         * "intermediate_smoke": 0,
                                                                                                                                                                         * "is_intersected": 0,
                                                                                                                                                                         * "low_smoke": 0,
                                                                                                                                                                         * "moving_average_count": 0,
                                                                                                                                                                         * "non_violation": 0,
                                                                                                                                                                         * "not_intersected": 0,
                                                                                                                                                                         * "occupancy": 0,
                                                                                                                                                                         * "total": 0,
                                                                                                                                                                         * "total_collision": 0,
                                                                                                                                                                         * "total_near_miss": 0,
                                                                                                                                                                         * "up": 0,
                                                                                                                                                                         * "violation": 0
                                                                                                                                                                         * },
                                                                                                                                                                         * "channel_total_alert": 0,
                                                                                                                                                                         * "channel_total_notification": 0,
                                                                                                                                                                         * "usecase_key": "string"
                                                                                                                                                                         * },
                                                                                                                                                                         * "response_code": 200
                                                                                                                                                                         * }
                                                                                                                                                                         * ```
                                                                                                                                                                         * 
     * @param payload UseCase Stats Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postUsecaseStatsReport(
payload: sts_internal_api_usecase_usecaseReportReq,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api_usecase_channelStatsResp & {
channel_alert?: model_AlertData;
channel_stats?: model_StatsData;
});
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/usecase/stats/report',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
