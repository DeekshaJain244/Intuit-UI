/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_pipeline_pipelineCatalogInfoResp } from '../models/internal_api_pipeline_pipelineCatalogInfoResp';
import type { internal_api_pipeline_pipelineCatalogRefreshReq } from '../models/internal_api_pipeline_pipelineCatalogRefreshReq';
import type { internal_api_pipeline_pipelineCatalogRefreshResp } from '../models/internal_api_pipeline_pipelineCatalogRefreshResp';
import type { internal_api_pipeline_pipelineCreateReq } from '../models/internal_api_pipeline_pipelineCreateReq';
import type { internal_api_pipeline_pipelineDefaultsResp } from '../models/internal_api_pipeline_pipelineDefaultsResp';
import type { internal_api_pipeline_pipelineIDReq } from '../models/internal_api_pipeline_pipelineIDReq';
import type { internal_api_pipeline_pipelineResp } from '../models/internal_api_pipeline_pipelineResp';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { structs_HTTPRespArray } from '../models/structs_HTTPRespArray';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PipelineService {

    /**
     * Pipeline Catalog Information
     * ### Pipeline Catalog Info API
 *
 * *Sample INPUT*
 *
 * // Query params
 * ```json
 * {
     * "nimble_id": "string",
     * "key": []
     * }
     * ```
     *
     * *Sample OUTPUT*
     *
     * ```json
     * {
         * "message": "Pipeline Catalog Info",
         * "response": {
             * "catalog_elements": [
                 * {
                     * "additionalProp1": {}
                     * }
                     * ],
                     * "models": [
                         * {
                             * "additionalProp1": {}
                             * }
                             * ]
                             * },
                             * "response_code": 0
                             * }
                             * ```
     * @param nimbleId Nimble ID
     * @param key Catalog Element Key
     * @returns any OK
     * @throws ApiError
     */
    public static getPipelineCatalogInfo(
nimbleId: string,
key: Array<string>,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_pipeline_pipelineCatalogInfoResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pipeline/catalog/info',
            query: {
                'nimble_id': nimbleId,
                'key': key,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Refresh Catalog Information
     * ### Catalog Refresh API.
                             *
                             * *Sample INPUT*
                             *
                             * ```json
                             * {
                                 * "nimble_id": "string"
                                 * }
                                 * ```
                                 *
                                 * *Sample OUTPUT*
                                 *
                                 * ```json
                                 * {
                                     * "message": "Catalog Information updated",
                                     * "response": {
                                         * "transaction_id": "string"
                                         * },
                                         * "response_code": 200
                                         * }
                                         * ```
     * @param payload Pipeline Catalog refresh Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postPipelineCatalogRefresh(
payload: internal_api_pipeline_pipelineCatalogRefreshReq,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_pipeline_pipelineCatalogRefreshResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pipeline/catalog/refresh',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Pipeline Create
     * ### Pipeline Create API
                                         *
                                         * *Sample INPUT*
                                         *
                                         * ```json
                                         * {
                                             * "nimble_id": "string",
                                             * "pipeline_elements": [
                                                 * {}
                                                 * ],
                                                 * "pipeline_name": "string",
                                                 * "pipeline_source": [
                                                     * 0
                                                     * ],
                                                     * "pipeline_usecase": "string"
                                                     * }
                                                     * ```
                                                     *
                                                     * *Sample OUTPUT*
                                                     *
                                                     * ```json
                                                     * {
                                                         * "message": "Pipeline created",
                                                         * "response": null,
                                                         * "response_code": 201
                                                         * }
                                                         * ```
     * @param payload Pipeline Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postPipelineCreate(
payload: internal_api_pipeline_pipelineCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pipeline/create',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Default Pipeline Element Information
     * ### Pipeline Defaults API
                                                         *
                                                         * *Sample INPUT*
                                                         *
                                                         * // Query params
                                                         * ```json
                                                         * {
                                                             * "usecase_key": "string"
                                                             * }
                                                             * ```
                                                             *
                                                             * *Sample OUTPUT*
                                                             *
                                                             * ```json
                                                             * {
                                                                 * "message": "Default Pipeline Elements",
                                                                 * "response": {
                                                                     * "default_data": {
                                                                         * "additionalProp1": {}
                                                                         * }
                                                                         * },
                                                                         * "response_code": 200
                                                                         * }
                                                                         * ```
     * @param usecaseKey UseCase Key
     * @returns any OK
     * @throws ApiError
     */
    public static getPipelineDefaults(
usecaseKey: string,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_pipeline_pipelineDefaultsResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pipeline/defaults',
            query: {
                'usecase_key': usecaseKey,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Pipeline Delete
     * ### Pipeline Delete API
                                                                         *
                                                                         * *Sample INPUT*
                                                                         *
                                                                         * ```json
                                                                         * {
                                                                             * "pipeline_id": "string"
                                                                             * }
                                                                             * ```
                                                                             *
                                                                             * *Sample OUTPUT*
                                                                             *
                                                                             * ```json
                                                                             * {
                                                                                 * "message": "Pipeline deleted",
                                                                                 * "response": null,
                                                                                 * "response_code": 200
                                                                                 * }
                                                                                 * ```
     * @param payload Pipeline Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deletePipelineDelete(
payload: internal_api_pipeline_pipelineIDReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/pipeline/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Pipeline ID
     * ### Pipeline ID API
                                                                                 *
                                                                                 * *Sample INPUT*
                                                                                 *
                                                                                 * // Query params
                                                                                 * ```json
                                                                                 * {
                                                                                     * "pipeline_id": "string"
                                                                                     * }
                                                                                     * ```
                                                                                     *
                                                                                     * *Sample OUTPUT*
                                                                                     *
                                                                                     * ```json
                                                                                     * {
                                                                                         * "message": "Pipeline ID",
                                                                                         * "response": {
                                                                                             * "nimble_id": "string",
                                                                                             * "pipeline_elements": [
                                                                                                 * {}
                                                                                                 * ],
                                                                                                 * "pipeline_id": "string",
                                                                                                 * "pipeline_name": "string",
                                                                                                 * "pipeline_source": [
                                                                                                     * 0
                                                                                                     * ],
                                                                                                     * "pipeline_usecase": "string"
                                                                                                     * },
                                                                                                     * "response_code": 200
                                                                                                     * }
                                                                                                     * ```
     * @param pipelineId Pipeline ID
     * @returns any OK
     * @throws ApiError
     */
    public static getPipelineId(
pipelineId: string,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_pipeline_pipelineResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pipeline/id',
            query: {
                'pipeline_id': pipelineId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Pipeline List
     * ### Pipeline List API
                                                                                                     *
                                                                                                     * *Sample OUTPUT*
                                                                                                     *
                                                                                                     * ```json
                                                                                                     * {
                                                                                                         * "message": "Pipeline List",
                                                                                                         * "response": [
                                                                                                             * {
                                                                                                                 * "nimble_id": "string",
                                                                                                                 * "pipeline_elements": [
                                                                                                                     * {}
                                                                                                                     * ],
                                                                                                                     * "pipeline_id": "string",
                                                                                                                     * "pipeline_name": "string",
                                                                                                                     * "pipeline_source": [
                                                                                                                         * 0
                                                                                                                         * ],
                                                                                                                         * "pipeline_usecase": "string"
                                                                                                                         * }
                                                                                                                         * ],
                                                                                                                         * "response_code": 200
                                                                                                                         * }
                                                                                                                         * ```
     * @returns any OK
     * @throws ApiError
     */
    public static getPipelineList(): CancelablePromise<(structs_HTTPRespArray & {
response?: Array<internal_api_pipeline_pipelineResp>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pipeline/list',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Pipeline Update
     * ### Pipeline Update API
                                                                                                                         *
                                                                                                                         * *Sample INPUT*
                                                                                                                         *
                                                                                                                         * ```json
                                                                                                                         * {
                                                                                                                             * "nimble_id": "string",
                                                                                                                             * "pipeline_elements": [
                                                                                                                                 * {}
                                                                                                                                 * ],
                                                                                                                                 * "pipeline_name": "string",
                                                                                                                                 * "pipeline_source": [
                                                                                                                                     * 0
                                                                                                                                     * ],
                                                                                                                                     * "pipeline_usecase": "string"
                                                                                                                                     * }
                                                                                                                                     * ```
                                                                                                                                     *
                                                                                                                                     * *Sample OUTPUT*
                                                                                                                                     *
                                                                                                                                     * ```json
                                                                                                                                     * {
                                                                                                                                         * "message": "Pipeline updated",
                                                                                                                                         * "response": null,
                                                                                                                                         * "response_code": 200
                                                                                                                                         * }
                                                                                                                                         * ```
     * @param payload Pipeline Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchPipelineUpdate(
payload: internal_api_pipeline_pipelineCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_pipeline_pipelineIDReq;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/pipeline/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
