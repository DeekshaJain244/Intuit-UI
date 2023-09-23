/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api_rule_reminder } from './sts_internal_api_rule_reminder';

export type sts_internal_api_rule_notification = {
    notification_frequency?: number;
    notification_is_reminder: boolean;
    notification_reminder?: sts_internal_api_rule_reminder;
    notification_type: string;
};
