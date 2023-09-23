/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { structs_HTTPResp } from '../models/structs_HTTPResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GenericService {

    /**
     * Asset Upload Image
     * ### Returns a file
 *
 * *Sample Input*
 * ```json
 * {
     * "path": "string",
     * "type": "string"
     * }
     * ```
     *
     * *Sample Output*
     * ```
     * Returns file
     * ```
     * 
     * @param path Path
     * @returns any OK
     * @throws ApiError
     */
    public static getGenericAsset(
path: string,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/generic/asset',
            query: {
                'path': path,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get Secure Image
     * ### Takes in a file as part of a multipart form and stores the file
     * @param path Asset Path
     * @param type Asset Type
     * @returns any OK
     * @throws ApiError
     */
    public static getGenericAssetSecure(
path: string,
type: string,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/generic/asset/secure',
            query: {
                'path': path,
                'type': type,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Upload Image
     * ### Takes in a file as part of a multipart form and stores the file
     *
     * *Sample Input*
     * ```json
     * {
         * "isBase64": false,
         * "base64Image": "string",
         * "image": "formData"
         * }
         * ```
         *
         * *Sample Output*
         * ```json
         * {
             * "message": "Uploaded successfully",
             * "response": "string",
             * "response_code": 200
             * }
             * ```
     * @param image Accepts .jpg .png
     * @param isBase64 isBase64
     * @param base64Image base64Image
     * @returns any OK
     * @throws ApiError
     */
    public static postGenericUpload(
image: string,
isBase64: boolean,
base64Image: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (structs_HTTPResp & {
response?: string;
});
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/generic/upload',
            body: base64Image,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Upload No Auth
     * ### Takes in a file as part of a multipart form and stores the file
             *
             * *Sample Input*
             * ```json
             * {
                 * "isBase64": false,
                 * "base64Image": "string",
                 * "image": "formData"
                 * }
                 * ```
                 *
                 * *Sample Output*
                 * ```json
                 * {
                     * "message": "Uploaded successfully",
                     * "response": "string",
                     * "response_code": 200
                     * }
                     * ```
     * @param file Accepts .gz
     * @param isBase64 isGzip
     * @returns any OK
     * @throws ApiError
     */
    public static postGenericUpload1(
file: string,
isBase64: boolean,
): CancelablePromise<(structs_HTTPResp & {
response?: (structs_HTTPResp & {
response?: string;
});
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/generic/upload/_',
            body: isBase64,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
