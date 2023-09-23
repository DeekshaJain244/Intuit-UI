/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { sts_internal_auth_api_client_clientCreateReq } from '../models/sts_internal_auth_api_client_clientCreateReq';
import type { sts_internal_auth_api_client_clientIDReq } from '../models/sts_internal_auth_api_client_clientIDReq';
import type { sts_internal_auth_api_client_clientListResp } from '../models/sts_internal_auth_api_client_clientListResp';
import type { sts_internal_auth_api_client_clientUpdateReq } from '../models/sts_internal_auth_api_client_clientUpdateReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientService {

    /**
     * Auth Client Create
     * ### Auth Client Create API.
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "auth_client_id": "string",
     * "allowed_audience": [],
     * "grant_type": [],
     * "response_type": [],
     * "scope": [],
     * "provider": "string",
     * "name": "string",
     * "client_secret":"string",
     * "redirect_uri": []
     * }
     * ```
     *
     * *Sample OUTPUT*
     *
     * ```json
     * {
         * "message": "Client created",
         * "response": null,
         * "response_code": 201
         * }
         * ```
         * 
     * @param payload Client Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putAuthClientCreate(
payload: sts_internal_auth_api_client_clientCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/auth/client/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Auth Client Delete
     * ### Auth Client Delete API.
         *
         * *Sample INPUT*
         *
         * ```json
         * {
             * "client_id": "string"
             * }
             * ```
             *
             * *Sample OUTPUT*
             *
             * ```json
             * {
                 * "message": "Client deleted",
                 * "response": null,
                 * "response_code": 200
                 * }
                 * ```
                 * 
     * @param payload Client Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAuthClientDelete(
payload: sts_internal_auth_api_client_clientIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/auth/client/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Auth Client List
     * ### Auth Client List API.
                 *
                 * *Sample INPUT*
                 *
                 * ```json
                 * {
                     * "is_secret": false,
                     * "client_id": "string"
                     * }
                     * ```
                     *
                     * *Sample OUTPUT*
                     *
                     * ```json
                     * {
                         * "message": "Client List",
                         * "response": {
                             * "client": [
                                 * {
                                     * "client_id": "string",
                                     * "auth_client_id": "string",
                                     * "allowed_audience": [],
                                     * "grant_type": [],
                                     * "response_type": [],
                                     * "scope": [],
                                     * "provider": "string",
                                     * "name": "string",
                                     * "client_secret": "string",
                                     * "redirect_uri": []
                                     * }
                                     * ]
                                     * },
                                     * "response_code": 200
                                     * }
                                     * ```
                                     * 
     * @param isSecret Reveal Secret
     * @param clientId Reveal Secret for Client ID
     * @returns any OK
     * @throws ApiError
     */
    public static getAuthClientList(
isSecret?: boolean,
clientId?: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (sts_internal_auth_api_client_clientListResp & {
client?: Array<sts_internal_auth_api_client_clientUpdateReq>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/client/list',
            query: {
                'is_secret': isSecret,
                'client_id': clientId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Auth Client update
     * ### Auth Client Update API.
                                     *
                                     * *Sample INPUT*
                                     *
                                     * ```json
                                     * {
                                         * "client_id": "string",
                                         * "auth_client_id": "string",
                                         * "allowed_audience": [],
                                         * "grant_type": [],
                                         * "response_type": [],
                                         * "scope": [],
                                         * "provider": "string",
                                         * "name": "string",
                                         * "client_secret":"string",
                                         * "redirect_uri": []
                                         * }
                                         * ```
                                         *
                                         * *Sample OUTPUT*
                                         *
                                         * ```json
                                         * {
                                             * "message": "Client updated",
                                             * "response": null,
                                             * "response_code": 200
                                             * }
                                             * ```
                                             * 
     * @param payload Client Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchAuthClientUpdate(
payload: sts_internal_auth_api_client_clientUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/auth/client/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
