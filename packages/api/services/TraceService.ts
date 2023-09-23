/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_trace_trace } from '../models/internal_api_trace_trace';
import type { internal_api_trace_traceCodesResp } from '../models/internal_api_trace_traceCodesResp';
import type { internal_api_trace_traceRangeResp } from '../models/internal_api_trace_traceRangeResp';
import type { internal_api_trace_transaction } from '../models/internal_api_trace_transaction';
import type { internal_api_trace_transactionResp } from '../models/internal_api_trace_transactionResp';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TraceService {

    /**
     * Trace Codes
     * ### Trace Codes API
 *
 * *Sample OUTPUT*
 *
 * ```json
 * {
     * "message": "Trace Codes",
     * "response": [
         * {
             * "code": 0,
             * "type": "string"
             * },
             * {
                 * "code": 1,
                 * "type": "string"
                 * }
                 * ],
                 * "response_code": 200
                 * }
                 * ```
                 * 
     * @returns any OK
     * @throws ApiError
     */
    public static getTraceCodes(): CancelablePromise<(structs_HTTPResp & {
response?: Array<internal_api_trace_traceCodesResp>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trace/codes',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Trace By Range
     * ### Trace Range API
                 *
                 * *Sample INPUT*
                 *
                 * ```json
                 * {
                     * "start": "string",
                     * "end": "string",
                     * "trace_codes": [],
                     * "trace_user_ids": [],
                     * "trace_offset": "int",
                     * "trace_limit": "int"
                     * }
                     * ```
                     *
                     * *Sample OUTPUT*
                     *
                     * ```json
                     * {
                         * "message": "Trace by range",
                         * "response": {
                             * "end": "string",
                             * "start": "string",
                             * "total_count": 0,
                             * "trace_data": [
                                 * {
                                     * "code": 0,
                                     * "data": {},
                                     * "message": "string",
                                     * "time": "string",
                                     * "type": "string",
                                     * "user": "string"
                                     * }
                                     * ]
                                     * },
                                     * "response_code": 200
                                     * }
                                     * ```
                                     * 
     * @param traceUserIds Trace User ID
     * @param traceCodes Trace Codes
     * @param channelId Channel ID
     * @param start Start Time
     * @param end End Time
     * @param traceOffset Trace Offset
     * @param traceLimit Trace Limit
     * @returns any OK
     * @throws ApiError
     */
    public static getTraceRange(
traceUserIds: string,
traceCodes: string,
channelId: string,
start: string,
end: string,
traceOffset?: number,
traceLimit?: number,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_trace_traceRangeResp & {
trace_data?: Array<internal_api_trace_trace>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trace/range',
            query: {
                'trace_user_ids': traceUserIds,
                'trace_codes': traceCodes,
                'channel_id': channelId,
                'trace_offset': traceOffset,
                'trace_limit': traceLimit,
                'start': start,
                'end': end,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Transaction List
     * ### Transaction List API
                                     *
                                     * *Sample OUTPUT*
                                     *
                                     * ```json
                                     * {
                                         * "message": "Transactions",
                                         * "response": {
                                             * "transaction_count": 0,
                                             * "transaction_data": [
                                                 * {
                                                     * "data": {},
                                                     * "message": "string",
                                                     * "source": "string",
                                                     * "status": "string",
                                                     * "time": "string",
                                                     * "uuid": "string"
                                                     * }
                                                     * ]
                                                     * },
                                                     * "response_code": 200
                                                     * }
                                                     * ```
                                                     * 
     * @param offset Offset
     * @param limit Limit
     * @returns any OK
     * @throws ApiError
     */
    public static getTraceTransaction(
offset: number,
limit: number,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_trace_transactionResp & {
transaction_data?: Array<internal_api_trace_transaction>;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trace/transaction',
            query: {
                'offset': offset,
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Transaction By UUID
     * ### Transaction by UUUID API
                                                     *
                                                     * *Sample OUTPUT*
                                                     *
                                                     * ```json
                                                     * {
                                                         * "message": "Transaction",
                                                         * "response":  {
                                                             * "transaction_count": 0,
                                                             * "transaction_data": {
                                                                 * "data": {},
                                                                 * "message": "string",
                                                                 * "source": "string",
                                                                 * "status": "string",
                                                                 * "time": "string",
                                                                 * "uuid": "string"
                                                                 * }
                                                                 * },
                                                                 * "response_code": 200
                                                                 * }
                                                                 * ```
                                                                 * 
     * @param uuid Transaction UUID
     * @returns any OK
     * @throws ApiError
     */
    public static getTraceTransactionId(
uuid: string,
): CancelablePromise<(structs_HTTPResp & {
response?: (internal_api_trace_transactionResp & {
transaction_data?: internal_api_trace_transaction;
});
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trace/transaction/id',
            query: {
                'uuid': uuid,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
