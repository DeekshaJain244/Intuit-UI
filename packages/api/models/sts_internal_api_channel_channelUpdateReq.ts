/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { sts_internal_api_channel_pipelineUpdateReq } from './sts_internal_api_channel_pipelineUpdateReq';

export type sts_internal_api_channel_channelUpdateReq = {
    channel_id: string;
    channel_name: string;
    channel_pipeline?: sts_internal_api_channel_pipelineUpdateReq;
    is_auto_recovery: boolean;
    is_force?: boolean;
    usecase_key: string;
};
