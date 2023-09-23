<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div class="bg index-card">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card class="elevation-2 pa-4" color="cardBG3">
          <v-row no-gutters justify="center" class="logo-lg ma-0">
            <img alt="LOGO" class="pa-8" src="~/assets/images/logo-vas-portal.png" width="355"/>
          </v-row>
          <v-row no-gutters justify="center" class="ma-4">
            <p class="text-center">
              <span class="text-h4 mb-4">
                {{ status.brand_name }}
              </span>
              <br/>
              <br/>
              <span class="title mt-4">
                {{ status.version }}
              </span>
            </p>
          </v-row>
          <v-divider class="ma-4"/>
          <v-card-actions v-if="runtimeConfig.public.isDebug" class="mt-6" justify="center">
            <v-spacer/>
            <v-btn-toggle>
              <!-- <v-btn @click="directToPage('/test')">Test</v-btn>-->
              <v-btn color="primary" @click="RouterPush('/dashboard')">{{ t("Dashboard") }}</v-btn>
            </v-btn-toggle>
            <v-spacer/>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
// import UtilGeneric from "~/mixins/utilGeneric.js";
// import {BaseURL} from "~/service/api/endpoint/constants";
import {useAuthStore} from "~/store/auth";
import {useStatusStore} from "~/store/status"
import {storeToRefs} from "pinia";
import {Route, Router, RouterPush} from "~/composables/router/router";

const runtimeConfig = useRuntimeConfig()
const i18n = useI18n()
const {t} = useI18n()

const statusStore = useStatusStore()
const authStore = useAuthStore()
const {status} = storeToRefs(statusStore)

definePageMeta({
  layout: "no",
  middleware: ["auth"]
});

useHead({
  title: "-"
});

onMounted(async () => {
  let response = await statusStore.getStatus();
  const user = authStore.loggedInUser;
  console.debug(await i18n.setLocale(user.user_config.ui_config.lang), "setLocale")
  // const query = this.routeQuery();
  console.debug(authStore.authenticated, Route().path, "authStore.authenticated")
  if (authStore.authenticated) {
    // if (query.try) {
    //   const uri = BaseURL + query.try;
    //   await this.$axios.$post(uri, {});
    //   await this.$router.replace("/login");
    // }
    const user = authStore.loggedInUser;
    await RouterPush("/dashboard");
    const lang = user.user_config.ui_config.lang;
    if (lang !== i18n.locale && Route().path.split("/")[1] !== lang) {
      // setTimeout(async () => {
      //   await i18n.setLocale(user.user_config.ui_config.lang)
      //   if (user.user_config.ui_config.lang !== "en") {
      //     await Router().replace(`/${lang}/`)
      //   } else {
      //     await Router().replace("/")
      //   }
      // }, 100);
    }
  } else {
    if (status.value.is_onboarding) {
      await RouterPush("/onboard");
    }
    await RouterPush("/login");
  }
})
</script>

<style scoped>
.index-card {
  margin-top: 10%;
}

.logo-lg {
  border-radius: 0% 0% 100% 100%;
  background-color: rgb(255, 255, 255);
}
</style>
