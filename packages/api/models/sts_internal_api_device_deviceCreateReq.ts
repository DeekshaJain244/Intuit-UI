/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api__common_DeviceStream } from './sts_internal_api__common_DeviceStream';

export type sts_internal_api_device_deviceCreateReq = {
    device_identifier: string;
    device_image?: string;
    device_name: string;
    device_streams?: Array<sts_internal_api__common_DeviceStream>;
    device_tags: Record<string, string>;
    device_type: string;
    device_uuid?: string;
    nimble_id: string;
    site_id: string;
};
