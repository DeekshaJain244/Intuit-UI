import {RuleService} from "~/packages/api";
import {APIResponse, StoreAPIResponse} from "~/types";
import {internal_api_rule_ruleActivateDeActivateReq as RuleReq} from "~/packages/api";

type RootState = {}

type Actions = {
    getAllRules(siteID: string): Promise<StoreAPIResponse>
    removeUserAssociationFromRule(payload:Object): Promise<StoreAPIResponse>
}


export const useRuleStore = defineStore<"rule", RootState, any, Actions>({
    id: "rule",
    state: (): RootState => ({}),
    actions: {
        async getAllRules(siteID: string): Promise<StoreAPIResponse> {
            try {
                // api/v1/customer/list
                const response = await RuleService.patchRuleUpdate(siteID)
                const ruleListResp = response as APIResponse
                if (ruleListResp.response_code == 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        },
        async removeUserAssociationFromRule(payload): Promise<StoreAPIResponse> {
            try {
                // /rule/remove/reference
                const response = await RuleService.patchRuleRemoveReference(payload as RuleReq)
                const ruleResp = response as APIResponse
                if (ruleResp.response_code == 200) {
                    return {status: "success", data: null}
                }
                return {status: "failure", data: null}
            } catch (error) {
                console.debug(error, "error")
                return {status: "failure", data: null}
            }
        }

    }
})