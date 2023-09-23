/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_instance_instanceNotificationSendReq } from '../models/internal_api_instance_instanceNotificationSendReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { sts_internal_api_instance_instanceCreateReq } from '../models/sts_internal_api_instance_instanceCreateReq';
import type { sts_internal_api_instance_instanceUpdateReq } from '../models/sts_internal_api_instance_instanceUpdateReq';
import type { sts_internal_api_instance_instanceUsageProcessReq } from '../models/sts_internal_api_instance_instanceUsageProcessReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InstanceService {

    /**
     * Instance Create
     * ### Instance Create API
 *
 * *Sample Input*
 * ```json
 * {
     * "uuid": "string"
     * }
     * ```
     *
     * *Sample Output*
     * ```json
     * {
         * "message": "Instance created",
         * "response": "string",
         * "response_code": 200
         * }
         * ```
     * @param payload Instance Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putInstanceCreate(
payload: sts_internal_api_instance_instanceCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/instance/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Instance List
     * ### Instance List by User API
         *
         * *Sample Output*
         * ```json
         * {
             * "message": "Instance",
             * "response": [
                 * {
                     * "instance_id": "string",
                     * "instance_uuid": "string"
                     * }
                     * ],
                     * "response_code": 200
                     * }
                     * ```
     * @returns any OK
     * @throws ApiError
     */
    public static getInstanceList(): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/instance/list',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Instance Notification Send
     * ### Instance send notification
                     *
                     * *Sample Input*
                     *
                     * ```json
                     * {
                         * "instance_notification": {
                             * "action_uuid": "string",
                             * "customer_name": "string",
                             * "site_name": "string",
                             * "rule_uuid": "string",
                             * "rule_name": "string",
                             * "rule_expression": "string",
                             * "notification_url": "string",
                             * "extra_data": "",
                             * "image_url": [
                                 * "https://www.example.com/icon.png"
                                 * ],
                                 * "action": [
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
                                         * ]
                                         * },
                                         * "instance_attachments": [
                                             * "https://www.example.com/icon.png"
                                             * ]
                                             * }
                                             * ```
                                             *
                                             * *Sample Output*
                                             *
                                             * ```json
                                             * {
                                                 * "message": "Notification sent",
                                                 * "response": "string",
                                                 * "response_code": 200
                                                 * }
                                                 * ```
     * @param payload Notification Send Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postInstanceNotificationSend(
payload: internal_api_instance_instanceNotificationSendReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/instance/notification/send',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Instance Process
     * ### Instance Report Process API
                                                 *
                                                 * *Sample INPUT*
                                                 *
                                                 * ```json
                                                 * {
                                                     * "bucket": "string",
                                                     * "object": "string",
                                                     * "filename": "string"
                                                     * }
                                                     * ```
                                                     *
                                                     * *Sample OUTPUT*
                                                     *
                                                     * ```json
                                                     * {
                                                         * "message": "Usage Instance",
                                                         * "response": null,
                                                         * "response_code": 200
                                                         * }
                                                         * ```
     * @param payload Process instance request
     * @returns any OK
     * @throws ApiError
     */
    public static postInstanceProcess(
payload: sts_internal_api_instance_instanceUsageProcessReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/instance/process',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update Instance details in Env
     * ### Backoffice Instance Update API
                                                         *
                                                         * *Sample INPUT*
                                                         *
                                                         * ```json
                                                         * {
                                                             * "instance_name": "string",
                                                             * "instance_image": "string"
                                                             * }
                                                             * ```
                                                             *
                                                             * *Sample OUTPUT*
                                                             *
                                                             * ```json
                                                             * {
                                                                 * "message": "Instance Details Updated",
                                                                 * "response": null,
                                                                 * "response_code": 200
                                                                 * }
                                                                 * ```
     * @param payload Instance Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchInstanceUpdate(
payload: sts_internal_api_instance_instanceUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/instance/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Instance By UUID
     * ### Instance by UUID API
                                                                 *
                                                                 * *Sample Output*
                                                                 * ```json
                                                                 * {
                                                                     * "message": "Instance",
                                                                     * "response": null,
                                                                     * "response_code": 200
                                                                     * }
                                                                     * ```
     * @returns any OK
     * @throws ApiError
     */
    public static postInstanceUuid(): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/instance/uuid',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
