/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_notification_notificationRangeResp } from '../models/internal_api_notification_notificationRangeResp';
import type { internal_api_notification_notificationUUIDResp } from '../models/internal_api_notification_notificationUUIDResp';
import type { structs_DefaultEmail } from '../models/structs_DefaultEmail';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationService {

    /**
     * Notifications By Range
     * ### Notification By Range API.
 *
 * *Sample INPUT*
 *
 * // Query params
 * ```json
 * {
     * "rule_uuid": "string",
     * "notification_offset": 0,
     * "notification_limit": 0,
     * "start": "string",
     * "end": "string",
     * "type": 0,
     * "agg_frequency": "0ms"
     * }
     * ```
     *
     * *Sample OUTPUT*
     *
     * ```json
     * {
         * "message": "Notifications by range",
         * "response": {
             * "end": "string",
             * "rule_uuid": "string",
             * "notifications": [
                 * {
                     * "rule_uuid": "string",
                     * "notification_data": {
                         * "attachment": "string",
                         * "from": "string",
                         * "message": "string",
                         * "subject": "string",
                         * "to": "string"
                         * },
                         * "notification_extra": "string",
                         * "notification_time": "string",
                         * "notification_uuid": "string"
                         * }
                         * ],
                         * "start": "string"
                         * },
                         * "response_code": 200
                         * }
                         * ```
                         * 
     * @param ruleUuid Rule UUID
     * @param start Start Time
     * @param end End Time
     * @param type Type
     * @param aggFrequency Aggregation Frequency
     * @param notificationOffset Notification Offset
     * @param notificationLimit Notification Limit
     * @returns any OK
     * @throws ApiError
     */
    public static getNotificationRange(
ruleUuid: string,
start: string,
end: string,
type: number,
aggFrequency: string,
notificationOffset?: number,
notificationLimit?: number,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_notification_notificationRangeResp & {
notifications?: Array<internal_api_notification_notificationUUIDResp>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notification/range',
            query: {
                'rule_uuid': ruleUuid,
                'notification_offset': notificationOffset,
                'notification_limit': notificationLimit,
                'start': start,
                'end': end,
                'type': type,
                'agg_frequency': aggFrequency,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Notification By UUID
     * ### Notification By UUID API.
                         *
                         * *Sample INPUT*
                         *
                         * // Query params
                         * ```json
                         * {
                             * "rule_uuid": "string",
                             * "notification_uuid": "string"
                             * }
                             * ```
                             *
                             * *Sample OUTPUT*
                             *
                             * ```json
                             * {
                                 * "message": "Notification by UUID",
                                 * "response": {
                                     * "rule_uuid": "string",
                                     * "notification_data": {
                                         * "attachment": "string",
                                         * "from": "string",
                                         * "message": "string",
                                         * "subject": "string",
                                         * "to": "string"
                                         * },
                                         * "notification_extra": "string",
                                         * "notification_time": "string",
                                         * "notification_uuid": "string"
                                         * },
                                         * "response_code": 200
                                         * }
                                         * ```
                                         * 
     * @param ruleUuid Rule UUID
     * @param notificationUuid Notification UUID
     * @returns any OK
     * @throws ApiError
     */
    public static getNotificationUuid(
ruleUuid: string,
notificationUuid: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_notification_notificationUUIDResp & {
notification_data?: structs_DefaultEmail;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notification/uuid',
            query: {
                'rule_uuid': ruleUuid,
                'notification_uuid': notificationUuid,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
