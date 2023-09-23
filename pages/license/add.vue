<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <HeaderText :text="t('Create License')" :chips="[]"/>
    <LicenseForm :options="options" @submit="submitLicense"/>
  </div>
</template>

<script lang="ts" setup>
import HeaderText from "~/components/Text/Header.vue"
import {useGeneric} from "~/composables/helpers/useGeneric";
import LicenseForm from "~/components/Forms/License.vue"
import {useLicenseStore} from "~/store/license";
import {useMainStore} from "~/store/index";
import {useStatusStore} from "~/store/status";
import {RouteQuery, RouterPush} from "~/composables/router/router";

const {t} = useI18n()
const statusStore = useStatusStore()
const licenseStore = useLicenseStore()
const indexStore = useMainStore()
const generic = useGeneric()

useHead({
  title: t('License Create')
});

const breadCrumbItems = ref([
  {
    text: t("Dashboard"),
    disabled: false,
    href: "/dashboard",
    queryItem: null,
  },
  {
    text: t("License"),
    disabled: false,
    href: "/license",
  },
  {
    text: t("Create"),
    disabled: true,
    href: "/license/add",
  },
])

const options = ref({
  mode: "create",
})

const setPageDefaults = () => {
  const routeQuery = RouteQuery()
  generic.setPageInfoData(null, null);
  generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value)
}
setPageDefaults()
// beforeDestroy() {
//     this.clearStoreBeforePageLeave();
// },

const submitLicense = async (data) => {
  const response = await licenseStore.createLicense(data)
  if (response.status === "success") {
    await statusStore.getStatus()
    // await this.$store.dispatch("getStatus", false, true);
    await RouterPush("/license")
  }
}
</script>


