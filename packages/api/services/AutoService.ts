/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AutoService {

    /**
     * Auto Test
     * ### Auto Test API.
 *
 * *Sample OUTPUT*
 *
 * ```json
 * {
     * "message": "Auto Test",
     * "response": null,
     * "response_code": 200
     * }
     * ```
     * @returns any OK
     * @throws ApiError
     */
    public static postAutoTest(): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auto/test',
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
