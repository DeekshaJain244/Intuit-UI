/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { sts_internal_auth_oauth_clientCreateReq } from '../models/sts_internal_auth_oauth_clientCreateReq';
import type { sts_internal_auth_oauth_clientIDReq } from '../models/sts_internal_auth_oauth_clientIDReq';
import type { sts_internal_auth_oauth_clientResp } from '../models/sts_internal_auth_oauth_clientResp';
import type { sts_internal_auth_oauth_clientUpdateReq } from '../models/sts_internal_auth_oauth_clientUpdateReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OAuth2Service {

    /**
     * OAuth2 Client Create
     * ### App Client Create API.
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "id": "string",
     * "created_at": "string",
     * "updated_at": "string",
     * "allowed_audiences": [],
     * "allowed_regions": [],
     * "allowed_tenant_access": [],
     * "grant_types": [],
     * "response_types": [],
     * "scopes": [],
     * "public": false,
     * "disabled": false,
     * "name": "string",
     * "secret": "string",
     * "redirect_uris": [],
     * "owner": "string",
     * "policy_uri": "string",
     * "terms_of_service_uri": "string",
     * "client_uri": "string",
     * "logo_uri": "string",
     * "contacts": "string",
     * "published": false,
     * "provider": "string"
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
    public static putOauth2ClientCreate(
payload: sts_internal_auth_oauth_clientCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_auth_oauth_clientResp;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/oauth2/client/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * OAuth2 Client Delete
     * ### App Client Delete API.
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
    public static deleteOauth2ClientDelete(
payload: sts_internal_auth_oauth_clientIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/oauth2/client/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * OAuth2 Client Update
     * ### App Client Update API.
                 *
                 * *Sample INPUT*
                 *
                 * ```json
                 * {
                     * "id": "string",
                     * "created_at": "string",
                     * "updated_at": "string",
                     * "allowed_audiences": [],
                     * "allowed_regions": [],
                     * "allowed_tenant_access": [],
                     * "grant_types": [],
                     * "response_types": [],
                     * "scopes": [],
                     * "public": false,
                     * "disabled": false,
                     * "name": "string",
                     * "secret": "string",
                     * "redirect_uris": [],
                     * "owner": "string",
                     * "policy_uri": "string",
                     * "terms_of_service_uri": "string",
                     * "client_uri": "string",
                     * "logo_uri": "string",
                     * "contacts": "string",
                     * "published": false,
                     * "provider": "string"
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
    public static patchOauth2ClientUpdate(
payload: sts_internal_auth_oauth_clientUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/oauth2/client/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
