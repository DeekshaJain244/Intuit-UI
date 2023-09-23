/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_rule_action } from '../models/internal_api_rule_action';
import type { internal_api_rule_ruleActivateDeActivateReq } from '../models/internal_api_rule_ruleActivateDeActivateReq';
import type { internal_api_rule_ruleCreateReq } from '../models/internal_api_rule_ruleCreateReq';
import type { internal_api_rule_ruleIDReq } from '../models/internal_api_rule_ruleIDReq';
import type { internal_api_rule_ruleResp } from '../models/internal_api_rule_ruleResp';
import type { internal_api_rule_ruleUpdateReq } from '../models/internal_api_rule_ruleUpdateReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RuleService {

    /**
     * Rule Create
     * ### Rule Create API.
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "rule_action": [
         * {
             * "action_access_id": "string",
             * "action_access_token": "string",
             * "action_auth_header": "string",
             * "action_external_link": "string",
             * "action_header": "string",
             * "action_is_auto_payload": true,
             * "action_is_secure": true,
             * "action_message": "string",
             * "action_method": "string",
             * "action_payload": "string",
             * "action_process_delay": 0,
             * "action_query": "string",
             * "action_subject": "string",
             * "action_to": "string",
             * "action_type": "string",
             * "action_url": "string",
             * "service_key": "string",
             * "additionalProp1": {}
             * }
             * ],
             * "rule_expression": "string",
             * "rule_frequency": 0,
             * "rule_name": "string",
             * "rule_notification": {
                 * "notification_frequency": 0,
                 * "notification_is_reminder": true,
                 * "notification_reminder": {
                     * "reminder_count": 0,
                     * "reminder_frequency": 0,
                     * "reminder_is_ack": true,
                     * "reminder_priority_type": "string",
                     * "reminder_type": "string"
                     * },
                     * "notification_type": "string"
                     * },
                     * "rule_priority": "string",
                     * "rule_template": {
                         * "additionalProp1": {}
                         * },
                         * "rule_tolerance": 0,
                         * "site_id": "string"
                         * }
                         * ```
                         *
                         * *Sample OUTPUT*
                         *
                         * ```json
                         * {
                             * "message": "Rule created",
                             * "response": {
                                 * "rule_id": "string"
                                 * },
                                 * "response_code": 201
                                 * }
                                 * ```
     * @param payload Rule Create Payload
     * @returns any Created
     * @throws ApiError
     */
    public static putRuleCreate(
payload: (internal_api_rule_ruleCreateReq & {
rule_action?: Array<internal_api_rule_action>;
}),
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_rule_ruleResp;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/rule/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Rule Delete
     * ### Rule Delete API.
                                 *
                                 * *Sample INPUT*
                                 *
                                 * ```json
                                 * {
                                     * "rule_id": "string"
                                     * }
                                     * ```
                                     *
                                     * *Sample OUTPUT*
                                     *
                                     * ```json
                                     * {
                                         * "message": "Rule deleted",
                                         * "response": null,
                                         * "response_code": 200
                                         * }
                                         * ```
                                         * 
     * @param payload Rule Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteRuleDelete(
payload: internal_api_rule_ruleIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/rule/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Rule Disable
     * ### Rule Disable API.
                                         *
                                         * *Sample INPUT*
                                         *
                                         * ```json
                                         * {
                                             * "rule_id": "string",
                                             * "site_id": "string"
                                             * }
                                             * ```
                                             *
                                             * *Sample OUTPUT*
                                             *
                                             * ```json
                                             * {
                                                 * "message": "Rule deactivated",
                                                 * "response": null,
                                                 * "response_code": 200
                                                 * }
                                                 * ```
                                                 * 
     * @param payload Rule Disable Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postRuleDisable(
payload: internal_api_rule_ruleActivateDeActivateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_rule_ruleResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rule/disable',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Rule Enable
     * ### Rule Enable API.
                                                 *
                                                 * *Sample INPUT*
                                                 *
                                                 * ```json
                                                 * {
                                                     * "rule_id": "string",
                                                     * "site_id": "string"
                                                     * }
                                                     * ```
                                                     *
                                                     * *Sample OUTPUT*
                                                     *
                                                     * ```json
                                                     * {
                                                         * "message": "Rule activated",
                                                         * "response": null,
                                                         * "response_code": 200
                                                         * }
                                                         * ```
                                                         * 
     * @param payload Rule Enable Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postRuleEnable(
payload: internal_api_rule_ruleActivateDeActivateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_rule_ruleResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rule/enable',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Rule by ID
     * ### Rule by ID API.
                                                         *
                                                         * *Sample INPUT*
                                                         *
                                                         * ```json
                                                         * {
                                                             * "rule_id": "string"
                                                             * }
                                                             * ```
                                                             *
                                                             * *Sample OUTPUT*
                                                             *
                                                             * ```json
                                                             * {
                                                                 * "message": "Rule ID",
                                                                 * "response": {
                                                                     * "is_active": true,
                                                                     * "rule_action": [
                                                                         * {
                                                                             * "action_access_id": "string",
                                                                             * "action_access_token": "string",
                                                                             * "action_auth_header": "string",
                                                                             * "action_external_link": "string",
                                                                             * "action_header": "string",
                                                                             * "action_is_auto_payload": true,
                                                                             * "action_is_secure": true,
                                                                             * "action_message": "string",
                                                                             * "action_method": "string",
                                                                             * "action_payload": "string",
                                                                             * "action_process_delay": 0,
                                                                             * "action_query": "string",
                                                                             * "action_subject": "string",
                                                                             * "action_to": "string",
                                                                             * "action_type": "string",
                                                                             * "action_url": "string",
                                                                             * "service_key": "string"
                                                                             * }
                                                                             * ],
                                                                             * "rule_expand": {
                                                                                 * "additionalProp1": {}
                                                                                 * },
                                                                                 * "rule_expression": "string",
                                                                                 * "rule_frequency": 0,
                                                                                 * "rule_id": "string",
                                                                                 * "rule_name": "string",
                                                                                 * "rule_notification": {
                                                                                     * "notification_frequency": 0,
                                                                                     * "notification_is_reminder": true,
                                                                                     * "notification_reminder": {
                                                                                         * "reminder_count": 0,
                                                                                         * "reminder_frequency": 0,
                                                                                         * "reminder_is_ack": true,
                                                                                         * "reminder_priority_type": "string",
                                                                                         * "reminder_type": "string"
                                                                                         * },
                                                                                         * "notification_type": "string"
                                                                                         * },
                                                                                         * "rule_priority": "string",
                                                                                         * "rule_template": {
                                                                                             * "additionalProp1": {}
                                                                                             * },
                                                                                             * "rule_tolerance": 0,
                                                                                             * "rule_uuid": "string",
                                                                                             * "site_id": "string"
                                                                                             * },
                                                                                             * "response_code": 200
                                                                                             * }
                                                                                             * ```
                                                                                             * 
     * @param ruleId Rule ID
     * @returns any OK
     * @throws ApiError
     */
    public static getRuleId(
ruleId: string,
): CancelablePromise<(structs_HTTPRespArray & {
response?: (internal_api_rule_ruleResp & {
rule_action?: Array<internal_api_rule_action>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rule/id',
            query: {
                'rule_id': ruleId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Rule List by Site ID
     * ### Rule List by Site ID API.
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
                                                                                                     * "message": "Rule list",
                                                                                                     * "response": [
                                                                                                         * {
                                                                                                             * "is_active": true,
                                                                                                             * "rule_action": [
                                                                                                                 * {
                                                                                                                     * "action_access_id": "string",
                                                                                                                     * "action_access_token": "string",
                                                                                                                     * "action_auth_header": "string",
                                                                                                                     * "action_external_link": "string",
                                                                                                                     * "action_header": "string",
                                                                                                                     * "action_is_auto_payload": true,
                                                                                                                     * "action_is_secure": true,
                                                                                                                     * "action_message": "string",
                                                                                                                     * "action_method": "string",
                                                                                                                     * "action_payload": "string",
                                                                                                                     * "action_process_delay": 0,
                                                                                                                     * "action_query": "string",
                                                                                                                     * "action_subject": "string",
                                                                                                                     * "action_to": "string",
                                                                                                                     * "action_type": "string",
                                                                                                                     * "action_url": "string",
                                                                                                                     * "service_key": "string"
                                                                                                                     * }
                                                                                                                     * ],
                                                                                                                     * "rule_expand": {
                                                                                                                         * "additionalProp1": {}
                                                                                                                         * },
                                                                                                                         * "rule_expression": "string",
                                                                                                                         * "rule_frequency": 0,
                                                                                                                         * "rule_id": "string",
                                                                                                                         * "rule_name": "string",
                                                                                                                         * "rule_notification": {
                                                                                                                             * "notification_frequency": 0,
                                                                                                                             * "notification_is_reminder": true,
                                                                                                                             * "notification_reminder": {
                                                                                                                                 * "reminder_count": 0,
                                                                                                                                 * "reminder_frequency": 0,
                                                                                                                                 * "reminder_is_ack": true,
                                                                                                                                 * "reminder_priority_type": "string",
                                                                                                                                 * "reminder_type": "string"
                                                                                                                                 * },
                                                                                                                                 * "notification_type": "string"
                                                                                                                                 * },
                                                                                                                                 * "rule_priority": "string",
                                                                                                                                 * "rule_template": {
                                                                                                                                     * "additionalProp1": {}
                                                                                                                                     * },
                                                                                                                                     * "rule_tolerance": 0,
                                                                                                                                     * "rule_uuid": "string",
                                                                                                                                     * "site_id": "string"
                                                                                                                                     * }
                                                                                                                                     * ],
                                                                                                                                     * "response_code": 200
                                                                                                                                     * }
                                                                                                                                     * ```
                                                                                                                                     * 
     * @param siteId Site ID
     * @returns any OK
     * @throws ApiError
     */
    public static getRuleList(
siteId: string,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(internal_api_rule_ruleResp & {
rule_action?: Array<internal_api_rule_action>;
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rule/list',
            query: {
                'site_id': siteId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Rule List by Device ID
     * ### Rule List by Device ID API.
                                                                                                                                     *
                                                                                                                                     * *Sample INPUT*
                                                                                                                                     *
                                                                                                                                     * ```json
                                                                                                                                     * {
                                                                                                                                         * "device_id": "string"
                                                                                                                                         * }
                                                                                                                                         * ```
                                                                                                                                         *
                                                                                                                                         * *Sample OUTPUT*
                                                                                                                                         *
                                                                                                                                         * ```json
                                                                                                                                         * {
                                                                                                                                             * "message": "Rule list",
                                                                                                                                             * "response": [
                                                                                                                                                 * {
                                                                                                                                                     * "is_active": true,
                                                                                                                                                     * "rule_action": [
                                                                                                                                                         * {
                                                                                                                                                             * "action_access_id": "string",
                                                                                                                                                             * "action_access_token": "string",
                                                                                                                                                             * "action_auth_header": "string",
                                                                                                                                                             * "action_external_link": "string",
                                                                                                                                                             * "action_header": "string",
                                                                                                                                                             * "action_is_auto_payload": true,
                                                                                                                                                             * "action_is_secure": true,
                                                                                                                                                             * "action_message": "string",
                                                                                                                                                             * "action_method": "string",
                                                                                                                                                             * "action_payload": "string",
                                                                                                                                                             * "action_process_delay": 0,
                                                                                                                                                             * "action_query": "string",
                                                                                                                                                             * "action_subject": "string",
                                                                                                                                                             * "action_to": "string",
                                                                                                                                                             * "action_type": "string",
                                                                                                                                                             * "action_url": "string",
                                                                                                                                                             * "service_key": "string"
                                                                                                                                                             * }
                                                                                                                                                             * ],
                                                                                                                                                             * "rule_expand": {
                                                                                                                                                                 * "additionalProp1": {}
                                                                                                                                                                 * },
                                                                                                                                                                 * "rule_expression": "string",
                                                                                                                                                                 * "rule_frequency": 0,
                                                                                                                                                                 * "rule_id": "string",
                                                                                                                                                                 * "rule_name": "string",
                                                                                                                                                                 * "rule_notification": {
                                                                                                                                                                     * "notification_frequency": 0,
                                                                                                                                                                     * "notification_is_reminder": true,
                                                                                                                                                                     * "notification_reminder": {
                                                                                                                                                                         * "reminder_count": 0,
                                                                                                                                                                         * "reminder_frequency": 0,
                                                                                                                                                                         * "reminder_is_ack": true,
                                                                                                                                                                         * "reminder_priority_type": "string",
                                                                                                                                                                         * "reminder_type": "string"
                                                                                                                                                                         * },
                                                                                                                                                                         * "notification_type": "string"
                                                                                                                                                                         * },
                                                                                                                                                                         * "rule_priority": "string",
                                                                                                                                                                         * "rule_template": {
                                                                                                                                                                             * "additionalProp1": {}
                                                                                                                                                                             * },
                                                                                                                                                                             * "rule_tolerance": 0,
                                                                                                                                                                             * "rule_uuid": "string",
                                                                                                                                                                             * "site_id": "string"
                                                                                                                                                                             * }
                                                                                                                                                                             * ],
                                                                                                                                                                             * "response_code": 200
                                                                                                                                                                             * }
                                                                                                                                                                             * ```
                                                                                                                                                                             * 
     * @param deviceId Device ID
     * @returns any OK
     * @throws ApiError
     */
    public static getRuleListDevice(
deviceId: string,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(internal_api_rule_ruleResp & {
rule_action?: Array<internal_api_rule_action>;
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rule/list/device',
            query: {
                'device_id': deviceId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Rule Remove User Reference
     * ### Rule Remove User Reference API.
                                                                                                                                                                             *
                                                                                                                                                                             * *Sample INPUT*
                                                                                                                                                                             *
                                                                                                                                                                             * ```json
                                                                                                                                                                             * {
                                                                                                                                                                                 * "user_id": "string"
                                                                                                                                                                                 * }
                                                                                                                                                                                 * ```
                                                                                                                                                                                 *
                                                                                                                                                                                 * *Sample OUTPUT*
                                                                                                                                                                                 *
                                                                                                                                                                                 * ```json
                                                                                                                                                                                 * {
                                                                                                                                                                                     * "message": "Removed user association from rule.",
                                                                                                                                                                                     * "response": null,
                                                                                                                                                                                     * "response_code": 200
                                                                                                                                                                                     * }
                                                                                                                                                                                     * ```
                                                                                                                                                                                     * 
     * @param payload Rule Remove User Reference Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchRuleRemoveReference(
payload: internal_api_rule_ruleActivateDeActivateReq,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(internal_api_rule_ruleResp & {
rule_action?: Array<internal_api_rule_action>;
})>;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/rule/remove/reference',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Rule TemplateGet by Rule ID
     * ### Rule Template by Rule ID API.
                                                                                                                                                                                     *
                                                                                                                                                                                     * *Sample INPUT*
                                                                                                                                                                                     *
                                                                                                                                                                                     * // Query params
                                                                                                                                                                                     * ```json
                                                                                                                                                                                     * {
                                                                                                                                                                                         * "rule_id": "string"
                                                                                                                                                                                         * }
                                                                                                                                                                                         * ```
                                                                                                                                                                                         *
                                                                                                                                                                                         * *Sample OUTPUT*
                                                                                                                                                                                         *
                                                                                                                                                                                         * ```json
                                                                                                                                                                                         * {
                                                                                                                                                                                             * "message": "Rule Template",
                                                                                                                                                                                             * "response": [
                                                                                                                                                                                                 * {
                                                                                                                                                                                                     * "is_active": true,
                                                                                                                                                                                                     * "rule_action": [
                                                                                                                                                                                                         * {
                                                                                                                                                                                                             * "action_access_id": "string",
                                                                                                                                                                                                             * "action_access_token": "string",
                                                                                                                                                                                                             * "action_auth_header": "string",
                                                                                                                                                                                                             * "action_external_link": "string",
                                                                                                                                                                                                             * "action_header": "string",
                                                                                                                                                                                                             * "action_is_auto_payload": true,
                                                                                                                                                                                                             * "action_is_secure": true,
                                                                                                                                                                                                             * "action_message": "string",
                                                                                                                                                                                                             * "action_method": "string",
                                                                                                                                                                                                             * "action_payload": "string",
                                                                                                                                                                                                             * "action_process_delay": 0,
                                                                                                                                                                                                             * "action_query": "string",
                                                                                                                                                                                                             * "action_subject": "string",
                                                                                                                                                                                                             * "action_to": "string",
                                                                                                                                                                                                             * "action_type": "string",
                                                                                                                                                                                                             * "action_url": "string",
                                                                                                                                                                                                             * "service_key": "string"
                                                                                                                                                                                                             * }
                                                                                                                                                                                                             * ],
                                                                                                                                                                                                             * "rule_expand": {
                                                                                                                                                                                                                 * "additionalProp1": {}
                                                                                                                                                                                                                 * },
                                                                                                                                                                                                                 * "rule_expression": "string",
                                                                                                                                                                                                                 * "rule_frequency": 0,
                                                                                                                                                                                                                 * "rule_id": "string",
                                                                                                                                                                                                                 * "rule_name": "string",
                                                                                                                                                                                                                 * "rule_notification": {
                                                                                                                                                                                                                     * "notification_frequency": 0,
                                                                                                                                                                                                                     * "notification_is_reminder": true,
                                                                                                                                                                                                                     * "notification_reminder": {
                                                                                                                                                                                                                         * "reminder_count": 0,
                                                                                                                                                                                                                         * "reminder_frequency": 0,
                                                                                                                                                                                                                         * "reminder_is_ack": true,
                                                                                                                                                                                                                         * "reminder_priority_type": "string",
                                                                                                                                                                                                                         * "reminder_type": "string"
                                                                                                                                                                                                                         * },
                                                                                                                                                                                                                         * "notification_type": "string"
                                                                                                                                                                                                                         * },
                                                                                                                                                                                                                         * "rule_priority": "string",
                                                                                                                                                                                                                         * "rule_template": {
                                                                                                                                                                                                                             * "additionalProp1": {}
                                                                                                                                                                                                                             * },
                                                                                                                                                                                                                             * "rule_tolerance": 0,
                                                                                                                                                                                                                             * "rule_uuid": "string",
                                                                                                                                                                                                                             * "site_id": "string"
                                                                                                                                                                                                                             * }
                                                                                                                                                                                                                             * ],
                                                                                                                                                                                                                             * "response_code": 200
                                                                                                                                                                                                                             * }
                                                                                                                                                                                                                             * ```
                                                                                                                                                                                                                             * 
     * @param ruleId Rule ID
     * @returns any OK
     * @throws ApiError
     */
    public static getRuleTemplate(
ruleId: string,
): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(internal_api_rule_ruleResp & {
rule_action?: Array<internal_api_rule_action>;
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rule/template',
            query: {
                'rule_id': ruleId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Rule Update
     * ### Rule Update API.
                                                                                                                                                                                                                             *
                                                                                                                                                                                                                             * *Sample INPUT*
                                                                                                                                                                                                                             *
                                                                                                                                                                                                                             * ```json
                                                                                                                                                                                                                             * {
                                                                                                                                                                                                                                 * "is_active": true,
                                                                                                                                                                                                                                 * "rule_action": [
                                                                                                                                                                                                                                     * {
                                                                                                                                                                                                                                         * "action_access_id": "string",
                                                                                                                                                                                                                                         * "action_access_token": "string",
                                                                                                                                                                                                                                         * "action_auth_header": "string",
                                                                                                                                                                                                                                         * "action_external_link": "string",
                                                                                                                                                                                                                                         * "action_header": "string",
                                                                                                                                                                                                                                         * "action_is_auto_payload": true,
                                                                                                                                                                                                                                         * "action_is_secure": true,
                                                                                                                                                                                                                                         * "action_message": "string",
                                                                                                                                                                                                                                         * "action_method": "string",
                                                                                                                                                                                                                                         * "action_payload": "string",
                                                                                                                                                                                                                                         * "action_process_delay": 0,
                                                                                                                                                                                                                                         * "action_query": "string",
                                                                                                                                                                                                                                         * "action_subject": "string",
                                                                                                                                                                                                                                         * "action_to": "string",
                                                                                                                                                                                                                                         * "action_type": "string",
                                                                                                                                                                                                                                         * "action_url": "string",
                                                                                                                                                                                                                                         * "service_key": "string"
                                                                                                                                                                                                                                         * }
                                                                                                                                                                                                                                         * ],
                                                                                                                                                                                                                                         * "rule_expand": {
                                                                                                                                                                                                                                             * "additionalProp1": {}
                                                                                                                                                                                                                                             * },
                                                                                                                                                                                                                                             * "rule_expression": "string",
                                                                                                                                                                                                                                             * "rule_frequency": 0,
                                                                                                                                                                                                                                             * "rule_id": "string",
                                                                                                                                                                                                                                             * "rule_name": "string",
                                                                                                                                                                                                                                             * "rule_notification": {
                                                                                                                                                                                                                                                 * "notification_frequency": 0,
                                                                                                                                                                                                                                                 * "notification_is_reminder": true,
                                                                                                                                                                                                                                                 * "notification_reminder": {
                                                                                                                                                                                                                                                     * "reminder_count": 0,
                                                                                                                                                                                                                                                     * "reminder_frequency": 0,
                                                                                                                                                                                                                                                     * "reminder_is_ack": true,
                                                                                                                                                                                                                                                     * "reminder_priority_type": "string",
                                                                                                                                                                                                                                                     * "reminder_type": "string"
                                                                                                                                                                                                                                                     * },
                                                                                                                                                                                                                                                     * "notification_type": "string"
                                                                                                                                                                                                                                                     * },
                                                                                                                                                                                                                                                     * "rule_priority": "string",
                                                                                                                                                                                                                                                     * "rule_template": {
                                                                                                                                                                                                                                                         * "additionalProp1": {}
                                                                                                                                                                                                                                                         * },
                                                                                                                                                                                                                                                         * "rule_tolerance": 0,
                                                                                                                                                                                                                                                         * "rule_uuid": "string",
                                                                                                                                                                                                                                                         * "site_id": "string"
                                                                                                                                                                                                                                                         * }
                                                                                                                                                                                                                                                         * ```
                                                                                                                                                                                                                                                         *
                                                                                                                                                                                                                                                         * *Sample OUTPUT*
                                                                                                                                                                                                                                                         *
                                                                                                                                                                                                                                                         * ```json
                                                                                                                                                                                                                                                         * {
                                                                                                                                                                                                                                                             * "message": "Rule Update",
                                                                                                                                                                                                                                                             * "response": null,
                                                                                                                                                                                                                                                             * "response_code": 200
                                                                                                                                                                                                                                                             * }
                                                                                                                                                                                                                                                             * ```
                                                                                                                                                                                                                                                             * 
     * @param payload Rule Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchRuleUpdate(
payload: (internal_api_rule_ruleUpdateReq & {
rule_action?: Array<internal_api_rule_action>;
}),
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/rule/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Rule by UUID
     * ### Rule by ID API.
                                                                                                                                                                                                                                                             *
                                                                                                                                                                                                                                                             * *Sample INPUT*
                                                                                                                                                                                                                                                             *
                                                                                                                                                                                                                                                             * ```json
                                                                                                                                                                                                                                                             * {
                                                                                                                                                                                                                                                                 * "rule_uuid": "string"
                                                                                                                                                                                                                                                                 * }
                                                                                                                                                                                                                                                                 * ```
                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                 * *Sample OUTPUT*
                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                 * ```json
                                                                                                                                                                                                                                                                 * {
                                                                                                                                                                                                                                                                     * "message": "Rule UUID",
                                                                                                                                                                                                                                                                     * "response": {
                                                                                                                                                                                                                                                                         * "is_active": true,
                                                                                                                                                                                                                                                                         * "rule_action": [
                                                                                                                                                                                                                                                                             * {
                                                                                                                                                                                                                                                                                 * "action_access_id": "string",
                                                                                                                                                                                                                                                                                 * "action_access_token": "string",
                                                                                                                                                                                                                                                                                 * "action_auth_header": "string",
                                                                                                                                                                                                                                                                                 * "action_external_link": "string",
                                                                                                                                                                                                                                                                                 * "action_header": "string",
                                                                                                                                                                                                                                                                                 * "action_is_auto_payload": true,
                                                                                                                                                                                                                                                                                 * "action_is_secure": true,
                                                                                                                                                                                                                                                                                 * "action_message": "string",
                                                                                                                                                                                                                                                                                 * "action_method": "string",
                                                                                                                                                                                                                                                                                 * "action_payload": "string",
                                                                                                                                                                                                                                                                                 * "action_process_delay": 0,
                                                                                                                                                                                                                                                                                 * "action_query": "string",
                                                                                                                                                                                                                                                                                 * "action_subject": "string",
                                                                                                                                                                                                                                                                                 * "action_to": "string",
                                                                                                                                                                                                                                                                                 * "action_type": "string",
                                                                                                                                                                                                                                                                                 * "action_url": "string",
                                                                                                                                                                                                                                                                                 * "service_key": "string"
                                                                                                                                                                                                                                                                                 * }
                                                                                                                                                                                                                                                                                 * ],
                                                                                                                                                                                                                                                                                 * "rule_expand": {
                                                                                                                                                                                                                                                                                     * "additionalProp1": {}
                                                                                                                                                                                                                                                                                     * },
                                                                                                                                                                                                                                                                                     * "rule_expression": "string",
                                                                                                                                                                                                                                                                                     * "rule_frequency": 0,
                                                                                                                                                                                                                                                                                     * "rule_id": "string",
                                                                                                                                                                                                                                                                                     * "rule_name": "string",
                                                                                                                                                                                                                                                                                     * "rule_notification": {
                                                                                                                                                                                                                                                                                         * "notification_frequency": 0,
                                                                                                                                                                                                                                                                                         * "notification_is_reminder": true,
                                                                                                                                                                                                                                                                                         * "notification_reminder": {
                                                                                                                                                                                                                                                                                             * "reminder_count": 0,
                                                                                                                                                                                                                                                                                             * "reminder_frequency": 0,
                                                                                                                                                                                                                                                                                             * "reminder_is_ack": true,
                                                                                                                                                                                                                                                                                             * "reminder_priority_type": "string",
                                                                                                                                                                                                                                                                                             * "reminder_type": "string"
                                                                                                                                                                                                                                                                                             * },
                                                                                                                                                                                                                                                                                             * "notification_type": "string"
                                                                                                                                                                                                                                                                                             * },
                                                                                                                                                                                                                                                                                             * "rule_priority": "string",
                                                                                                                                                                                                                                                                                             * "rule_template": {
                                                                                                                                                                                                                                                                                                 * "additionalProp1": {}
                                                                                                                                                                                                                                                                                                 * },
                                                                                                                                                                                                                                                                                                 * "rule_tolerance": 0,
                                                                                                                                                                                                                                                                                                 * "rule_uuid": "string",
                                                                                                                                                                                                                                                                                                 * "site_id": "string"
                                                                                                                                                                                                                                                                                                 * },
                                                                                                                                                                                                                                                                                                 * "response_code": 200
                                                                                                                                                                                                                                                                                                 * }
                                                                                                                                                                                                                                                                                                 * ```
                                                                                                                                                                                                                                                                                                 * 
     * @param ruleUuid Rule UUID
     * @returns any OK
     * @throws ApiError
     */
    public static getRuleUuid(
ruleUuid: string,
): CancelablePromise<(structs_HTTPRespArray & {
response?: (internal_api_rule_ruleResp & {
rule_action?: Array<internal_api_rule_action>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rule/uuid',
            query: {
                'rule_uuid': ruleUuid,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
