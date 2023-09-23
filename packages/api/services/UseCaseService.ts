/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_usecase_usecaseAssignReq } from '../models/internal_api_usecase_usecaseAssignReq';
import type { internal_api_usecase_usecaseCreateReq } from '../models/internal_api_usecase_usecaseCreateReq';
import type { internal_api_usecase_usecaseReq } from '../models/internal_api_usecase_usecaseReq';
import type { internal_api_usecase_usecaseUnAssignReq } from '../models/internal_api_usecase_usecaseUnAssignReq';
import type { internal_api_usecase_usecaseUpdateReq } from '../models/internal_api_usecase_usecaseUpdateReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';
import type { sts_internal_api__common_UsecaseResp } from '../models/sts_internal_api__common_UsecaseResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UseCaseService {

    /**
     * UseCase Assign
     * ### Usecase Assign API
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "usecase_id": [
         * "string"
         * ],
         * "user_id": "string"
         * }
         * ```
         *
         * *Sample OUTPUT*
         *
         * ```json
         * {
             * "message": "Usecase assigned",
             * "response": null,
             * "response_code": 200
             * }
             * ```
             * 
     * @param payload UseCase Assign Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postUsecaseAssign(
payload: internal_api_usecase_usecaseAssignReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/usecase/assign',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * UseCase Create
     * ### Usecase Create API
             *
             * *Sample INPUT*
             *
             * ```json
             * {
                 * "usecase_background_color": "string",
                 * "usecase_channel_count": 0,
                 * "usecase_component_key": "string",
                 * "usecase_desc": "string",
                 * "usecase_icon": "string",
                 * "usecase_key": "string",
                 * "usecase_meta_key": [
                     * "string"
                     * ],
                     * "usecase_name": "string"
                     * }
                     * ```
                     *
                     * *Sample OUTPUT*
                     *
                     * ```json
                     * {
                         * "message": "Usecase created",
                         * "response": null,
                         * "response_code": 201
                         * }
                         * ```
                         * 
     * @param payload UseCase Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putUsecaseCreate(
payload: internal_api_usecase_usecaseCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/usecase/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * UseCase Delete
     * ### Usecase Delete API
                         *
                         * *Sample INPUT*
                         *
                         * ```json
                         * {
                             * "usecase_id": "string"
                             * }
                             * ```
                             *
                             * *Sample OUTPUT*
                             *
                             * ```json
                             * {
                                 * "message": "Usecase deleted",
                                 * "response": null,
                                 * "response_code": 200
                                 * }
                                 * ```
                                 * 
     * @param payload UseCase Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsecaseDelete(
payload: internal_api_usecase_usecaseReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/usecase/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * UseCase ID
     * ### Usecase ID API
                                 *
                                 * *Sample INPUT*
                                 *
                                 * // Query params
                                 * ```json
                                 * {
                                     * "usecase_id": "string"
                                     * }
                                     * ```
                                     *
                                     * *Sample OUTPUT*
                                     *
                                     * ```json
                                     * {
                                         * "message": "Usecase deleted",
                                         * "response": {
                                             * "usecase_background_color": "string",
                                             * "usecase_channel_count": 0,
                                             * "usecase_component_key": "string",
                                             * "usecase_desc": "string",
                                             * "usecase_icon": "string",
                                             * "usecase_id": "string",
                                             * "usecase_key": "string",
                                             * "usecase_meta_key": [
                                                 * "string"
                                                 * ],
                                                 * "usecase_name": "string"
                                                 * },
                                                 * "response_code": 200
                                                 * }
                                                 * ```
                                                 * 
     * @param usecaseId UseCase ID
     * @returns any OK
     * @throws ApiError
     */
    public static getUsecaseId(
usecaseId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api__common_UsecaseResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/usecase/id',
            query: {
                'usecase_id': usecaseId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * UseCase List
     * ### Usecase List API
                                                 *
                                                 *
                                                 * *Sample OUTPUT*
                                                 *
                                                 * ```json
                                                 * {
                                                     * "message": "Usecase list",
                                                     * "response": [
                                                         * {
                                                             * "usecase_background_color": "string",
                                                             * "usecase_channel_count": 0,
                                                             * "usecase_component_key": "string",
                                                             * "usecase_desc": "string",
                                                             * "usecase_icon": "string",
                                                             * "usecase_id": "string",
                                                             * "usecase_key": "string",
                                                             * "usecase_meta_key": [
                                                                 * "string"
                                                                 * ],
                                                                 * "usecase_name": "string"
                                                                 * }
                                                                 * ],
                                                                 * "response_code": 200
                                                                 * }
                                                                 * ```
                                                                 * 
     * @returns any OK
     * @throws ApiError
     */
    public static postUsecaseList(): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<sts_internal_api__common_UsecaseResp>;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/usecase/list',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * UseCase UnAssign
     * ### Usecase UnAssign API
                                                                 *
                                                                 * *Sample INPUT*
                                                                 *
                                                                 * ```json
                                                                 * {
                                                                     * "usecase_id": [
                                                                         * "string"
                                                                         * ],
                                                                         * "user_id": "string"
                                                                         * }
                                                                         * ```
                                                                         *
                                                                         * *Sample OUTPUT*
                                                                         *
                                                                         * ```json
                                                                         * {
                                                                             * "message": "Usecase un-assigned",
                                                                             * "response": null,
                                                                             * "response_code": 200
                                                                             * }
                                                                             * ```
                                                                             * 
     * @param payload UseCase UnAssign Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postUsecaseUnassign(
payload: internal_api_usecase_usecaseUnAssignReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/usecase/unassign',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * UseCase Update
     * ### Usecase Update API
                                                                             *
                                                                             * *Sample INPUT*
                                                                             *
                                                                             * ```json
                                                                             * {
                                                                                 * "usecase_background_color": "string",
                                                                                 * "usecase_channel_count": 0,
                                                                                 * "usecase_component_key": "string",
                                                                                 * "usecase_desc": "string",
                                                                                 * "usecase_icon": "string",
                                                                                 * "usecase_id": "string",
                                                                                 * "usecase_key": "string",
                                                                                 * "usecase_meta_key": [
                                                                                     * "string"
                                                                                     * ],
                                                                                     * "usecase_name": "string"
                                                                                     * }
                                                                                     * ```
                                                                                     *
                                                                                     * *Sample OUTPUT*
                                                                                     *
                                                                                     * ```json
                                                                                     * {
                                                                                         * "message": "Usecase updated",
                                                                                         * "response": null,
                                                                                         * "response_code": 200
                                                                                         * }
                                                                                         * ```
                                                                                         * 
     * @param payload UseCase Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchUsecaseUpdate(
payload: internal_api_usecase_usecaseUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/usecase/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
