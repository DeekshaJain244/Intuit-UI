/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_rule_action } from './internal_api_rule_action';
import type { internal_api_rule_notification } from './internal_api_rule_notification';

export type internal_api_rule_ruleResp = {
    is_active?: boolean;
    rule_action?: Array<internal_api_rule_action>;
    rule_expand?: any;
    rule_expression?: string;
    rule_frequency?: number;
    rule_id?: string;
    rule_name?: string;
    rule_notification?: internal_api_rule_notification;
    rule_priority?: string;
    rule_template?: any;
    rule_tolerance?: number;
    rule_uuid?: string;
    site_id?: string;
};
