/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_api_role_roleListResp } from '../models/sts_internal_api_role_roleListResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoleService {

    /**
     * Role List
     * ### Role List
 *
 * *Sample OUTPUT*
 *
 * ```json
 * {
     * "message": "Roles List",
     * "response": [
         * {
             * "role_id": "string",
             * "role_key": "string",
             * "role_name": "string"
             * }
             * ],
             * "response_code": 200
             * }
             * ```
     * @returns any OK
     * @throws ApiError
     */
    public static postRoleList(): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<sts_internal_api_role_roleListResp>;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/role/list',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
