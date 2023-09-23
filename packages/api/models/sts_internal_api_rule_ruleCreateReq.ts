/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api_rule_notification } from './sts_internal_api_rule_notification';

export type sts_internal_api_rule_ruleCreateReq = {
    rule_action: Array<any>;
    rule_expression: string;
    rule_frequency?: number;
    rule_name: string;
    rule_notification: sts_internal_api_rule_notification;
    rule_priority: string;
    rule_template?: any;
    rule_tolerance: number;
    site_id: string;
};
