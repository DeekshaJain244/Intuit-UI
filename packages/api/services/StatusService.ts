/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_status_statusResp } from '../models/internal_api_status_statusResp';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StatusService {

    /**
     * Status Check
     * ### Status Check
 *
 * *Sample OUTPUT*
 *
 * ```json
 * {
     * "message": "STS Status",
     * "response": {
         * "auth_providers": [
             * "string"
             * ],
             * "brand_name": "string",
             * "desc": "string",
             * "is_onboarding": true,
             * "license_count": 0,
             * "nis_module": true,
             * "sms_module": true,
             * "smtp_module": true,
             * "sts_service": [
                 * {
                     * "additionalProp1": {}
                     * }
                     * ],
                     * "version": "string"
                     * },
                     * "response_code": 200
                     * }
                     * ```
                     * 
     * @returns any OK
     * @throws ApiError
     */
    public static getStatus(): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_status_statusResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/status',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
