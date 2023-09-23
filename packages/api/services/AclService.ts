/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_api_acl_component } from '../models/sts_internal_api_acl_component';
import type { sts_internal_api_acl_moduleResp } from '../models/sts_internal_api_acl_moduleResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AclService {

    /**
     * ACL list
     * ### Lists all the UI modules for all the roles by default.
 *
 * *Sample OUTPUT*
 *
 * ```json
 * {
     * "message": "string",
     * "response": [
         * {
             * "components": [
                 * {
                     * "component_key": 0,
                     * "component_name": "string"
                     * }
                     * ],
                     * "module_key": "string",
                     * "module_name": "string",
                     * "module_path": "string"
                     * }
                     * ],
                     * "response_code": 200
                     * }
                     * ```
                     *
                     * To get list of UI modules for a specific role, `role_key` is accepted and query params.
     * @returns any OK
     * @throws ApiError
     */
    public static getAclList(): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<(sts_internal_api_acl_moduleResp & {
components?: Array<sts_internal_api_acl_component>;
})>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/acl/list',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
