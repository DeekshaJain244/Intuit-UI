<template>
    <div class="bg onboard-card">
        <v-row align="center" justify="center">
            <v-col cols="12" md="4" sm="12">
                <v-card class="pa-4">
                    <v-card-text>
                        <div style="text-align: center">
                            <v-row no-gutters align="center" justify="center" class="logo my-4">
                                <img alt="MEGH Video Analytics Solution" src="/images/brandlogo-lg.png" :width="'250'"/>
                            </v-row>
                            <span class="body-1"> {{"Verify email address"}} </span> <br/><br/>
                            <span class="subtitle"> {{ "Please confirm your account to continue accessing portal" }} </span>
                            <v-row no-gutters>
                                <v-spacer/>
                                <div class="has-text-centered mx-2" style="margin-top: 20px">
                                    <v-tooltip :open-delay="serverTooltipDelay" bottom>
                                        <template #activator="{ on, attrs }">
                                            <v-btn
                                                    id="confirm_btn"
                                                    class="mt-4"
                                                    color="primary"
                                                    link
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    @click="confirmAccount"
                                            >
                                                {{ "Confirm account" }}
                                            </v-btn>
                                        </template>
                                        <span>{{ "Confirm account" }}</span>
                                    </v-tooltip>
                                </div>
                                <v-spacer/>
                            </v-row>
                        </div>
                        <br/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts" setup>
import {authStore} from "~/store/auth";
import {Router,Route} from "~/composables/router/router";

definePageMeta({
    layout: "no",
});

const confirmAuthStore = authStore()
const cnfToken = ref(Route().query.cnf);
if (!cnfToken) {
    Router().push({path: "/"})
}

const confirmAccount = async () => {
    let response = await confirmAuthStore.confirmAccount(cnfToken)
    console.debug(response, "response")
    if (response) {
            await Router().push({path: "/login"})
        }
        // else {
        //     console.debug("Error confirming account")
        // }
};
</script>