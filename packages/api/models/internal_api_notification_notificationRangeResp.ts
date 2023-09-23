/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_notification_notificationUUIDResp } from './internal_api_notification_notificationUUIDResp';

export type internal_api_notification_notificationRangeResp = {
    end?: string;
    notifications?: Array<internal_api_notification_notificationUUIDResp>;
    /**
     * UseCase       string                 `json:"usecase_key"`
 * ChannelID     string                 `json:"channel_id"`
     */
    rule_uuid?: string;
    start?: string;
};
