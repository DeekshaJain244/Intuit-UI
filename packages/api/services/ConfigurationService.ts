/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_config_channelStorageData } from '../models/internal_api_config_channelStorageData';
import type { internal_api_config_channelStorageDeleteReq } from '../models/internal_api_config_channelStorageDeleteReq';
import type { internal_api_config_smsConfResp } from '../models/internal_api_config_smsConfResp';
import type { internal_api_config_smsConfTestReq } from '../models/internal_api_config_smsConfTestReq';
import type { internal_api_config_statusAccountStorageResp } from '../models/internal_api_config_statusAccountStorageResp';
import type { internal_api_config_storageConfigReq } from '../models/internal_api_config_storageConfigReq';
import type { structs_HTTPResp } from '../models/structs_HTTPResp';
import type { sts_internal_api_config_backupResponse } from '../models/sts_internal_api_config_backupResponse';
import type { sts_internal_api_config_settingInitResp } from '../models/sts_internal_api_config_settingInitResp';
import type { sts_internal_api_config_smtpConfCreateReq } from '../models/sts_internal_api_config_smtpConfCreateReq';
import type { sts_internal_api_config_smtpConfDeleteReq } from '../models/sts_internal_api_config_smtpConfDeleteReq';
import type { sts_internal_api_config_smtpConfResp } from '../models/sts_internal_api_config_smtpConfResp';
import type { sts_internal_api_config_smtpConfTestReq } from '../models/sts_internal_api_config_smtpConfTestReq';
import type { sts_internal_api_config_smtpConfUpdateReq } from '../models/sts_internal_api_config_smtpConfUpdateReq';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConfigurationService {

    /**
     * Backup State
     * ### Config Backup State API.
 *
 * #### `run_type` options
 *
 * - `1` for Docker backup
 * - `2` for local backup
 *
 * Note: For local backup, `mongo`, `mongodump` & `mongorestore`
 * executables are required in `$PATH`.
 *
 * *Sample INPUT*
 *
 * ```json
 * {
     * "run_type": 1
     * }
     * ```
     *
     * *Sample OUTPUT*
     *
     * ```json
     * {
         * "message": "Backup completed",
         * "response": {
             * "mongo_backup": "string",
             * "influx_backup": "string"
             * },
             * "response_code": 200
             * }
             * ```
     * @param runType Backup run type, [1] Docker, [2] Local
     * @returns any OK
     * @throws ApiError
     */
    public static postConfigBackupState(
runType: string,
): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api_config_backupResponse;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config/backup/state',
            query: {
                'run_type': runType,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Patch State
     * ### Config Patch State API.
             *
             * #### `run_type` options
             *
             * - `1` for Docker patch
             * - `2` for local patch
             *
             * #### `data_base` options
             *
             * - `1` for MongoDB
             * - `2` for InfluxDB
             *
             * Note: For local patch, `mongo`, `mongodump` & `mongorestore`
             * executables are required in `$PATH`.
             *
             * *Sample INPUT*
             *
             * ```json
             * {
                 * "run_type": 1,
                 * "data_base": 1
                 * }
                 * ```
                 *
                 * *Sample OUTPUT*
                 *
                 * ```json
                 * {
                     * "message": "State patch completed",
                     * "response": null,
                     * "response_code": 200
                     * }
                     * ```
     * @param runType Patch run type, [1] Docker, [2] Local
     * @param dataBase Patch data base type, [1] MongoDB, [2] InfluxDB
     * @returns any OK
     * @throws ApiError
     */
    public static postConfigPatchState(
runType: string,
dataBase: string,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config/patch/state',
            query: {
                'run_type': runType,
                'data_base': dataBase,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Restore State
     * ### Config Restore State API.
                     *
                     * #### `run_type` options
                     *
                     * - `1` for Docker restore
                     * - `2` for local restore
                     *
                     * Note: For local restore, `mongo`, `mongodump` & `mongorestore`
                     * executables are required in `$PATH`.
                     *
                     * *Sample INPUT*
                     *
                     * ```json
                     * {
                         * "file_": "",
                         * "run_type": 1
                         * }
                         * ```
                         *
                         * *Sample OUTPUT*
                         *
                         * ```json
                         * {
                             * "message": "State restore completed",
                             * "response": null,
                             * "response_code": 200
                             * }
                             * ```
     * @param runType Restore run type, [1] Docker, [2] Local
     * @returns any OK
     * @throws ApiError
     */
    public static postConfigRestoreState(
runType: string,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config/restore/state',
            query: {
                'run_type': runType,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get SMS Config
     * ### Get SMS Config API.
                             *
                             *
                             * *Sample Input*
                             *
                             * ```json
                             * {
                                 * "is_secret": false
                                 * }
                                 * ```
                                 *
                                 * *Sample OUTPUT*
                                 *
                                 * ```json
                                 * {
                                     * "message": "SMS Settings",
                                     * "response": [
                                         * {
                                             * "sms_auth_key": "string",
                                             * "sms_auth_token": "string",
                                             * "sms_provider": "string",
                                             * "sms_from": "string",
                                             * "sms_to": "string",
                                             * "smtp_relay_id": "string",
                                             * "is_default": true
                                             * }
                                             * ],
                                             * "response_code": 200
                                             * }
                                             * ```
     * @param isSecret Reveal Secret
     * @returns any OK
     * @throws ApiError
     */
    public static getConfigSms(
isSecret: boolean,
): CancelablePromise<(structs_HTTPResp & {
response?: Array<internal_api_config_smsConfResp>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/config/sms',
            query: {
                'is_secret': isSecret,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create SMS Config
     * ### Create SMS Config API.
                                             *
                                             * *Sample INPUT*
                                             *
                                             * ```json
                                             * {
                                                 * "sms_key": "string",
                                                 * "sms_token": "string",
                                                 * "sms_provider": "string",
                                                 * "sms_from": "string",
                                                 * "sms_to": "string"
                                                 * }
                                                 * ```
                                                 *
                                                 * *Sample OUTPUT*
                                                 *
                                                 * ```json
                                                 * {
                                                     * "message": "SMS settings created",
                                                     * "response": null,
                                                     * "response_code": 201
                                                     * }
                                                     * ```
     * @returns any OK
     * @throws ApiError
     */
    public static putConfigSms(): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/config/sms',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update SMS Config
     * ### Update SMS Config API.
                                                     *
                                                     * *Sample INPUT*
                                                     *
                                                     * ```json
                                                     * {
                                                         * "sms_auth_key": "string",
                                                         * "sms_auth_token": "string",
                                                         * "sms_provider": "string",
                                                         * "sms_from": "string",
                                                         * "sms_to": "string"
                                                         * }
                                                         * ```
                                                         *
                                                         * *Sample OUTPUT*
                                                         *
                                                         * ```json
                                                         * {
                                                             * "message": "SMS settings updated",
                                                             * "response": null,
                                                             * "response_code": 200
                                                             * }
                                                             * ```
     * @returns any OK
     * @throws ApiError
     */
    public static postConfigSms(): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config/sms',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete SMS Config
     * ### Delete SMS Config API.
                                                             *
                                                             * *Sample INPUT*
                                                             *
                                                             * ```json
                                                             * {
                                                                 * "sms_relay_id": "string"
                                                                 * }
                                                                 * ```
                                                                 *
                                                                 * *Sample OUTPUT*
                                                                 *
                                                                 * ```json
                                                                 * {
                                                                     * "message": "SMS settings deleted",
                                                                     * "response": null,
                                                                     * "response_code": 200
                                                                     * }
                                                                     * ```
     * @returns any OK
     * @throws ApiError
     */
    public static deleteConfigSms(): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/config/sms',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Test SMS Config
     * ### Test SMS Config API.
                                                                     *
                                                                     * *Sample INPUT*
                                                                     *
                                                                     * ```json
                                                                     * {
                                                                         * "sms_from": "string",
                                                                         * "sms_to": "string",
                                                                         * "sms_relay_id": "string"
                                                                         * }
                                                                         * ```
                                                                         *
                                                                         * *Sample OUTPUT*
                                                                         *
                                                                         * ```json
                                                                         * {
                                                                             * "message": "SMS test successful.",
                                                                             * "response": null,
                                                                             * "response_code": 200
                                                                             * }
                                                                             * ```
     * @param payload SMS Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postConfigSmsTest(
payload: internal_api_config_smsConfTestReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config/sms/test',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get SMTP Config
     * ### Get SMS Config API.
                                                                             *
                                                                             *
                                                                             * *Sample Input*
                                                                             *
                                                                             * ```json
                                                                             * {
                                                                                 * "is_secret": false
                                                                                 * }
                                                                                 * ```
                                                                                 *
                                                                                 * *Sample OUTPUT*
                                                                                 *
                                                                                 * ```json
                                                                                 * {
                                                                                     * "message": "SMTP Settings",
                                                                                     * "response": [
                                                                                         * {
                                                                                             * "smtp_attachment": true,
                                                                                             * "smtp_auth": true,
                                                                                             * "smtp_from": "string",
                                                                                             * "smtp_host": "string",
                                                                                             * "smtp_password": "string",
                                                                                             * "smtp_port": 0,
                                                                                             * "smtp_to": "string",
                                                                                             * "smtp_username": "string",
                                                                                             * "smtp_relay_id": "string",
                                                                                             * "is_default": true
                                                                                             * }
                                                                                             * ],
                                                                                             * "response_code": 200
                                                                                             * }
                                                                                             * ```
     * @param isSecret Reveal Secret
     * @returns any OK
     * @throws ApiError
     */
    public static getConfigSmtp(
isSecret: boolean,
): CancelablePromise<(structs_HTTPResp & {
response?: Array<sts_internal_api_config_smtpConfResp>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/config/smtp',
            query: {
                'is_secret': isSecret,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create SMTP Conf
     * ### Create SMTP Config API.
                                                                                             *
                                                                                             * *Sample INPUT*
                                                                                             *
                                                                                             * ```json
                                                                                             * {
                                                                                                 * "smtp_attachment": true,
                                                                                                 * "smtp_auth": true,
                                                                                                 * "smtp_from": "string",
                                                                                                 * "smtp_host": "string",
                                                                                                 * "smtp_password": "string",
                                                                                                 * "smtp_port": 0,
                                                                                                 * "smtp_to": "string",
                                                                                                 * "smtp_username": "string"
                                                                                                 * }
                                                                                                 * ```
                                                                                                 *
                                                                                                 * *Sample OUTPUT*
                                                                                                 *
                                                                                                 * ```json
                                                                                                 * {
                                                                                                     * "message": "SMTP settings created",
                                                                                                     * "response": null,
                                                                                                     * "response_code": 201
                                                                                                     * }
                                                                                                     * ```
     * @param payload SMTP Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putConfigSmtp(
payload: sts_internal_api_config_smtpConfCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/config/smtp',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete SMTP Config
     * ### Delete SMTP Config API.
                                                                                                     *
                                                                                                     * *Sample INPUT*
                                                                                                     *
                                                                                                     * ```json
                                                                                                     * {
                                                                                                         * "smtp_relay_id": "string"
                                                                                                         * }
                                                                                                         * ```
                                                                                                         *
                                                                                                         * *Sample OUTPUT*
                                                                                                         *
                                                                                                         * ```json
                                                                                                         * {
                                                                                                             * "message": "SMTP settings deleted",
                                                                                                             * "response": null,
                                                                                                             * "response_code": 200
                                                                                                             * }
                                                                                                             * ```
     * @param payload SMTP Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static deleteConfigSmtp(
payload: sts_internal_api_config_smtpConfDeleteReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/config/smtp',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update SMTP Config
     * ### Update SMTP Config API.
                                                                                                             *
                                                                                                             * *Sample INPUT*
                                                                                                             *
                                                                                                             * ```json
                                                                                                             * {
                                                                                                                 * "smtp_attachment": true,
                                                                                                                 * "smtp_auth": true,
                                                                                                                 * "smtp_from": "string",
                                                                                                                 * "smtp_host": "string",
                                                                                                                 * "smtp_password": "string",
                                                                                                                 * "smtp_port": 0,
                                                                                                                 * "smtp_to": "string",
                                                                                                                 * "smtp_username": "string",
                                                                                                                 * "smtp_relay_id": "string",
                                                                                                                 * "is_default": true
                                                                                                                 * }
                                                                                                                 * ```
                                                                                                                 *
                                                                                                                 * *Sample OUTPUT*
                                                                                                                 *
                                                                                                                 * ```json
                                                                                                                 * {
                                                                                                                     * "message": "SMTP settings updated",
                                                                                                                     * "response": null,
                                                                                                                     * "response_code": 200
                                                                                                                     * }
                                                                                                                     * ```
     * @param payload SMTP Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static patchConfigSmtp(
payload: sts_internal_api_config_smtpConfUpdateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/config/smtp',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Onboard SMTP Create
     * ### Create SMTP Config API.
                                                                                                                     *
                                                                                                                     * *Sample INPUT*
                                                                                                                     *
                                                                                                                     * ```json
                                                                                                                     * {
                                                                                                                         * "smtp_attachment": true,
                                                                                                                         * "smtp_auth": true,
                                                                                                                         * "smtp_from": "string",
                                                                                                                         * "smtp_host": "string",
                                                                                                                         * "smtp_password": "string",
                                                                                                                         * "smtp_port": 0,
                                                                                                                         * "smtp_to": "string",
                                                                                                                         * "smtp_username": "string"
                                                                                                                         * }
                                                                                                                         * ```
                                                                                                                         *
                                                                                                                         * *Sample OUTPUT*
                                                                                                                         *
                                                                                                                         * ```json
                                                                                                                         * {
                                                                                                                             * "message": "SMTP settings created",
                                                                                                                             * "response": null,
                                                                                                                             * "response_code": 201
                                                                                                                             * }
                                                                                                                             * ```
     * @param payload SMTP Create Payload
     * @returns any OK
     * @throws ApiError
     */
    public static putConfigSmtpOnboard(
payload: sts_internal_api_config_smtpConfCreateReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/config/smtp/onboard',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Test SMTP Config
     * ### Test SMTP Config API.
                                                                                                                             *
                                                                                                                             * *Sample INPUT*
                                                                                                                             *
                                                                                                                             * ```json
                                                                                                                             * {
                                                                                                                                 * "smtp_from": "string",
                                                                                                                                 * "smtp_to": "string",
                                                                                                                                 * "smtp_relay_id": "string"
                                                                                                                                 * }
                                                                                                                                 * ```
                                                                                                                                 *
                                                                                                                                 * *Sample OUTPUT*
                                                                                                                                 *
                                                                                                                                 * ```json
                                                                                                                                 * {
                                                                                                                                     * "message": "SMTP test successful.",
                                                                                                                                     * "response": null,
                                                                                                                                     * "response_code": 200
                                                                                                                                     * }
                                                                                                                                     * ```
     * @param payload SMTP Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postConfigSmtpTest(
payload: sts_internal_api_config_smtpConfTestReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config/smtp/test',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Status Storage
     * ### Storage Information + Account Information
     * @returns any OK
     * @throws ApiError
     */
    public static getConfigStorageAccount(): CancelablePromise<(structs_HTTPResp & {
response?: internal_api_config_statusAccountStorageResp;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/config/storage/account',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Status Storage
     * ### Storage Information 
     * @returns any OK
     * @throws ApiError
     */
    public static getConfigStorageData(): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/config/storage/data',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Storage Delete
     * ### Storage Delete
                                                                                                                                     *
                                                                                                                                     * *Sample INPUT*
                                                                                                                                     *
                                                                                                                                     * // Query params
                                                                                                                                     * ```json
                                                                                                                                     * {
                                                                                                                                         * "purge_data": [
                                                                                                                                             * {
                                                                                                                                                 * "channel_ids": [
                                                                                                                                                     * "string"
                                                                                                                                                     * ],
                                                                                                                                                     * "site_id": "string"
                                                                                                                                                     * }
                                                                                                                                                     * ]
                                                                                                                                                     * }
                                                                                                                                                     * ```
                                                                                                                                                     *
                                                                                                                                                     * *Sample Output*
                                                                                                                                                     * ```json
                                                                                                                                                     * {
                                                                                                                                                         * "message": "Storage delete initiated for selected channels",
                                                                                                                                                         * "response": "string",
                                                                                                                                                         * "response_code": 200
                                                                                                                                                         * }
                                                                                                                                                         *
                                                                                                                                                         * ```
     * @param payload Channel Storage Delete Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postConfigStorageDelete(
payload: (internal_api_config_channelStorageDeleteReq & {
purge_data?: Array<internal_api_config_channelStorageData>;
}),
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config/storage/delete',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Storage Config Update
     * ### Storage Update
                                                                                                                                                         *
                                                                                                                                                         * *Sample INPUT*
                                                                                                                                                         *
                                                                                                                                                         * // Query params
                                                                                                                                                         * ```json
                                                                                                                                                         * {
                                                                                                                                                             * "notification_types": [
                                                                                                                                                                 * "string"
                                                                                                                                                                 * ],
                                                                                                                                                                 * "purge_frequency": 0,
                                                                                                                                                                 * "purge_threshold": 0
                                                                                                                                                                 * }
                                                                                                                                                                 * ```
                                                                                                                                                                 *
                                                                                                                                                                 * *Sample Output*
                                                                                                                                                                 * ```json
                                                                                                                                                                 * {
                                                                                                                                                                     * "message": "string",
                                                                                                                                                                     * "response": "string",
                                                                                                                                                                     * "response_code": 200
                                                                                                                                                                     * }
                                                                                                                                                                     *
                                                                                                                                                                     * ```
     * @param payload Storage Config Update Payload
     * @returns any OK
     * @throws ApiError
     */
    public static postConfigStorageUpdate(
payload: internal_api_config_storageConfigReq,
): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config/storage/update',
            body: payload,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Is INIT
     * ### Config Init API.
                                                                                                                                                                     *
                                                                                                                                                                     * *Sample OUTPUT*
                                                                                                                                                                     *
                                                                                                                                                                     * ```json
                                                                                                                                                                     * {
                                                                                                                                                                         * "message": "Init Settings",
                                                                                                                                                                         * "response": {},
                                                                                                                                                                         * "response_code": 200
                                                                                                                                                                         * }
                                                                                                                                                                         * ```
     * @returns any OK
     * @throws ApiError
     */
    public static postConfigStsInit(): CancelablePromise<(structs_HTTPResp & {
response?: sts_internal_api_config_settingInitResp;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config/sts/init',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Reset STS
     * ![MEGH Computing](https://megh.com/wp-content/uploads/2023/02/vas_system_configuration-1.png)
                                                                                                                                                                         *
                                                                                                                                                                         * # MEGH APIs
                                                                                                                                                                         *
                                                                                                                                                                         * **API documentation.**
                                                                                                                                                                         * 
     * @returns any OK
     * @throws ApiError
     */
    public static postConfigStsReset(): CancelablePromise<(structs_HTTPResp & {
response?: any;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config/sts/reset',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
