/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api__common_ChannelResp } from './sts_internal_api__common_ChannelResp';
import type { sts_internal_api__common_DeviceStream } from './sts_internal_api__common_DeviceStream';
import type { sts_internal_api__common_SourceResp } from './sts_internal_api__common_SourceResp';

export type sts_internal_api__common_DeviceResp = {
    device_alerts?: number;
    device_icon?: string;
    device_id?: string;
    device_identifier?: string;
    device_image?: string;
    device_name?: string;
    device_notifications?: number;
    device_source?: Array<sts_internal_api__common_SourceResp>;
    device_state?: boolean;
    device_status?: string;
    device_streams?: Array<sts_internal_api__common_DeviceStream>;
    device_tags?: Record<string, string>;
    device_type?: string;
    device_uuid?: string;
    device_value?: string;
    nimble_id?: string;
    site_id?: string;
    source_channels?: Array<sts_internal_api__common_ChannelResp>;
    transaction_id?: string;
};
