/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { internal_api_source_channelResp } from './internal_api_source_channelResp';

export type internal_api_source_sourceResp = {
    device_id: string;
    nimble_id: string;
    source_address?: string;
    source_channels?: Array<internal_api_source_channelResp>;
    source_fps?: number;
    source_id?: string;
    source_name: string;
    source_type?: string;
    static_content?: Array<any>;
    stream_id: number;
};
