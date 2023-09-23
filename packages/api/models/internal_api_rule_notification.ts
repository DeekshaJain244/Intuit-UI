/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_rule_reminder } from './internal_api_rule_reminder';

export type internal_api_rule_notification = {
    notification_frequency?: number;
    notification_is_reminder: boolean;
    notification_reminder?: internal_api_rule_reminder;
    notification_type: string;
};
