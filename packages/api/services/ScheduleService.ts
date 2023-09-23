/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { sts_internal_api_schedule_scheduleCreateReq } from '../models/sts_internal_api_schedule_scheduleCreateReq';
import type { sts_internal_api_schedule_scheduleIDReq } from '../models/sts_internal_api_schedule_scheduleIDReq';
import type { sts_internal_api_schedule_scheduleListReq } from '../models/sts_internal_api_schedule_scheduleListReq';
import type { sts_internal_api_schedule_scheduleOccurrence } from '../models/sts_internal_api_schedule_scheduleOccurrence';
import type { sts_internal_api_schedule_scheduleResp } from '../models/sts_internal_api_schedule_scheduleResp';
import type { sts_internal_api_schedule_scheduleRuleListReq } from '../models/sts_internal_api_schedule_scheduleRuleListReq';
import type { sts_internal_api_schedule_scheduleUpdateReq } from '../models/sts_internal_api_schedule_scheduleUpdateReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ScheduleService {

    /**
     * Schedule Create
     * ### Schedule Create API
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "alert_id": "string",
     * "channel_id": "string",
     * "rule_id": "string",
     * "schedule_name": "string",
     * "schedule_occurrence": [
         * {
             * "occurrence_activate_cron": "string",
             * "occurrence_constraint": "string",
             * "occurrence_deactivate_cron": "string",
             * "occurrence_end_time": "string",
             * "occurrence_id": 0,
             * "occurrence_is_allday": true,
             * "occurrence_start_time": "string"
             * }
             * ],
             * "schedule_timezone": "string",
             * "schedule_type": "string",
             * "site_id": "string"
             * }
             * ```
             *
             * *Sample OUTPUT*
             *
             * ```json
             * {
                 * "message": "Schedule created",
                 * "response": null,
                 * "response_code": 201
                 * }
                 * ```
     * @param payload Schedule Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putScheduleCreate(
payload: sts_internal_api_schedule_scheduleCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/schedule/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Schedule Delete
     * ### Schedule Delete API
                 *
                 * *Sample INPUT*
                 *
                 * ```json
                 * {
                     * "schedule_id": "string"
                     * }
                     * ```
                     *
                     * *Sample OUTPUT*
                     *
                     * ```json
                     * {
                         * "message": "Schedule deleted",
                         * "response": null,
                         * "response_code": 200
                         * }
                         * ```
     * @param payload Schedule Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteScheduleDelete(
payload: sts_internal_api_schedule_scheduleIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/schedule/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Schedule ID
     * ### Schedule ID API
                         *
                         * *Sample INPUT*
                         *
                         * ```json
                         * {
                             * "schedule_id": "string"
                             * }
                             * ```
                             *
                             * *Sample OUTPUT*
                             *
                             * ```json
                             * {
                                 * "message": "Schedule ID",
                                 * "response": {
                                     * "alert_id": "string",
                                     * "channel_id": "string",
                                     * "is_active": true,
                                     * "rule_id": "string",
                                     * "schedule_id": "string",
                                     * "schedule_name": "string",
                                     * "schedule_occurrence": [
                                         * {
                                             * "occurrence_activate_cron": "string",
                                             * "occurrence_constraint": "string",
                                             * "occurrence_deactivate_cron": "string",
                                             * "occurrence_end_time": "string",
                                             * "occurrence_id": 0,
                                             * "occurrence_is_allday": true,
                                             * "occurrence_start_time": "string"
                                             * }
                                             * ],
                                             * "schedule_type": "string",
                                             * "timezone": "string"
                                             * },
                                             * "response_code": 200
                                             * }
                                             * ```
     * @param payload Schedule ID Payload
     * @returns any OK
     * @throws ApiError
     */
    public static getScheduleId(
payload: sts_internal_api_schedule_scheduleIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api_schedule_scheduleResp & {
schedule_occurrence?: Array<sts_internal_api_schedule_scheduleOccurrence>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedule/id',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Schedule List by Channel ID
     * ### Schedule List By Channel ID API
                                             *
                                             * *Sample INPUT*
                                             *
                                             * ```json
                                             * {
                                                 * "channel_id": "string"
                                                 * }
                                                 * ```
                                                 *
                                                 * *Sample OUTPUT*
                                                 *
                                                 * ```json
                                                 * {
                                                     * "message": "Schedule List",
                                                     * "response": [
                                                         * {
                                                             * "alert_id": "string",
                                                             * "channel_id": "string",
                                                             * "is_active": true,
                                                             * "schedule_id": "string",
                                                             * "schedule_name": "string",
                                                             * "schedule_occurrence": [
                                                                 * {
                                                                     * "occurrence_activate_cron": "string",
                                                                     * "occurrence_constraint": "string",
                                                                     * "occurrence_deactivate_cron": "string",
                                                                     * "occurrence_end_time": "string",
                                                                     * "occurrence_id": 0,
                                                                     * "occurrence_is_allday": true,
                                                                     * "occurrence_start_time": "string"
                                                                     * }
                                                                     * ],
                                                                     * "schedule_type": "string",
                                                                     * "timezone": "string"
                                                                     * }
                                                                     * ],
                                                                     * "response_code": 200
                                                                     * }
                                                                     * ```
     * @param payload Schedule List Payload
     * @returns any OK
     * @throws ApiError
     */
    public static getScheduleList(
payload: sts_internal_api_schedule_scheduleListReq,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api_schedule_scheduleResp & {
schedule_occurrence?: Array<sts_internal_api_schedule_scheduleOccurrence>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedule/list',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Schedule Rule List
     * ### Schedule Rule List
                                                                     *
                                                                     * *Sample INPUT*
                                                                     *
                                                                     * ```json
                                                                     * {
                                                                         * "site_id": "string"
                                                                         * }
                                                                         * ```
                                                                         *
                                                                         * *Sample OUTPUT*
                                                                         *
                                                                         * ```json
                                                                         * {
                                                                             * "message": "Schedule Rule List",
                                                                             * "response": [
                                                                                 * {
                                                                                     * "rule_id": "string",
                                                                                     * "is_active": true,
                                                                                     * "schedule_id": "string",
                                                                                     * "schedule_name": "string",
                                                                                     * "schedule_occurrence": [
                                                                                         * {
                                                                                             * "occurrence_activate_cron": "string",
                                                                                             * "occurrence_constraint": "string",
                                                                                             * "occurrence_deactivate_cron": "string",
                                                                                             * "occurrence_end_time": "string",
                                                                                             * "occurrence_id": 0,
                                                                                             * "occurrence_is_allday": true,
                                                                                             * "occurrence_start_time": "string"
                                                                                             * }
                                                                                             * ],
                                                                                             * "schedule_type": "string",
                                                                                             * "timezone": "string"
                                                                                             * }
                                                                                             * ],
                                                                                             * "response_code": 200
                                                                                             * }
                                                                                             * ```
     * @param payload Schedule List Payload
     * @returns any OK
     * @throws ApiError
     */
    public static getScheduleRuleList(
payload: sts_internal_api_schedule_scheduleRuleListReq,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api_schedule_scheduleResp & {
schedule_occurrence?: Array<sts_internal_api_schedule_scheduleOccurrence>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedule/rule/list',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Schedule Update
     * ### Schedule Update API
                                                                                             *
                                                                                             * *Sample INPUT*
                                                                                             *
                                                                                             * ```json
                                                                                             * {
                                                                                                 * "alert_id": "string",
                                                                                                 * "channel_id": "string",
                                                                                                 * "is_active": true,
                                                                                                 * "rule_id": "string",
                                                                                                 * "schedule_id": "string",
                                                                                                 * "schedule_name": "string",
                                                                                                 * "schedule_occurrence": [
                                                                                                     * {
                                                                                                         * "occurrence_activate_cron": "string",
                                                                                                         * "occurrence_constraint": "string",
                                                                                                         * "occurrence_deactivate_cron": "string",
                                                                                                         * "occurrence_end_time": "string",
                                                                                                         * "occurrence_id": 0,
                                                                                                         * "occurrence_is_allday": true,
                                                                                                         * "occurrence_start_time": "string"
                                                                                                         * }
                                                                                                         * ],
                                                                                                         * "schedule_type": "string",
                                                                                                         * "timezone": "string"
                                                                                                         * }
                                                                                                         * ```
                                                                                                         *
                                                                                                         * *Sample OUTPUT*
                                                                                                         *
                                                                                                         * ```json
                                                                                                         * {
                                                                                                             * "message": "Schedule updated",
                                                                                                             * "response": {
                                                                                                                 * "alert_id": "string",
                                                                                                                 * "channel_id": "string",
                                                                                                                 * "is_active": true,
                                                                                                                 * "rule_id": "string",
                                                                                                                 * "schedule_id": "string",
                                                                                                                 * "schedule_name": "string",
                                                                                                                 * "schedule_occurrence": [
                                                                                                                     * {
                                                                                                                         * "occurrence_activate_cron": "string",
                                                                                                                         * "occurrence_constraint": "string",
                                                                                                                         * "occurrence_deactivate_cron": "string",
                                                                                                                         * "occurrence_end_time": "string",
                                                                                                                         * "occurrence_id": 0,
                                                                                                                         * "occurrence_is_allday": true,
                                                                                                                         * "occurrence_start_time": "string"
                                                                                                                         * }
                                                                                                                         * ],
                                                                                                                         * "schedule_type": "string",
                                                                                                                         * "timezone": "string"
                                                                                                                         * },
                                                                                                                         * "response_code": 200
                                                                                                                         * }
                                                                                                                         * ```
     * @param payload Schedule Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchScheduleUpdate(
payload: sts_internal_api_schedule_scheduleUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_api_schedule_scheduleResp & {
schedule_occurrence?: Array<sts_internal_api_schedule_scheduleOccurrence>;
});
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/schedule/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
