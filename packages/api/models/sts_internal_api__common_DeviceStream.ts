/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api__common_StreamFPS } from './sts_internal_api__common_StreamFPS';
import type { sts_internal_api__common_StreamResolution } from './sts_internal_api__common_StreamResolution';

export type sts_internal_api__common_DeviceStream = {
    address?: string;
    fps?: sts_internal_api__common_StreamFPS;
    id?: number;
    password?: string;
    port?: number;
    protocol?: string;
    resolution?: sts_internal_api__common_StreamResolution;
    type?: string;
    username?: string;
    uuid?: string;
};
