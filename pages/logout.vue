<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-row :style="{ height: '90vh' }" align="center" justify="center" no-gutters>
    <v-card class="ma-4" color="cardBG3" elevation="1" loading width="480">
      <v-row align="center" class="logo-lg" justify="center">
        <img :width="200" alt="Brand Logo" class="pa-4" src="/images/brandlogo.png"/>
      </v-row>
      <v-card-text class="pa-10 text-center">
        <span class="text-h4 font-weight-light">{{ t("Logging out") }}</span>
        <br/>
        <br/>
        <p class="title font-weight-light">{{ t("Please wait ...") }}</p>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script lang="ts" setup>
import {useAuthStore} from "~/store/auth"
import {RouterPush} from "~/composables/router/router";

const {t} = useI18n()
useHead({
  title: t('Logout')
});
definePageMeta({
  layout: "logout",
});

const authStore = useAuthStore()

const logout = async () => {
  const response = await authStore.userLogout()
  if (response.status === "success") {
    localStorage.removeItem("uiModules");
    localStorage.clear();
  }
  setTimeout(async () => {
    await RouterPush("/login");
  }, 500)

}
logout()
</script>

<style scoped>
.logo-lg {
  border-radius: 0% 0% 100% 100%;
  background-color: rgb(255, 255, 255);
  padding-top: 20px;
}
</style>
