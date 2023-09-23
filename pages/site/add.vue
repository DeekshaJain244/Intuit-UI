<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <HeaderText :text="'Create Site'" :chips="chips"/>
    <SiteForm v-can="'admin_access'" :options="options" :disable-loading="disableLoading" @submit="addSite"/>
  </div>
</template>

<script lang="ts" setup>
import SiteForm from "~/components/Forms/Site.vue"
import HeaderText from "~/components/Text/Header.vue"
import {ModeType} from "~/service/utils/components";
import {useGeneric} from "~/composables/helpers/useGeneric";
import {RouteQuery, RouterPush} from "~/composables/router/router";

import {useSiteStore} from "~/store/site"
import {useCustomerStore} from "~/store/customer";

const {t} = useI18n()
useHead({
  title: t('Site Create')
});
definePageMeta({
  middleware: ["auth", "rbac"],
})

const generic = useGeneric()
const siteStore = useSiteStore()
const customerStore = useCustomerStore()

const breadCrumbItems = ref([
  {
    text: t("Dashboard"),
    disabled: false,
    href: "/dashboard",
    queryItem: null,
  },
  {
    text: t("Sites"),
    disabled: false,
    href: "/site",
    queryItem: null,
  },
  {
    text: t("Create"),
    disabled: true,
    href: "/site/add",
    queryItem: null,
  },
])

const options = {
  mode: ModeType.create,
}
const customer = ref(customerStore.selectedResolveCustomer)
const chips = ref([])
const disableLoading = ref(false)

const setPageDefaults = () => {
  const routeQuery = RouteQuery()
  generic.setPageInfoData(null, null);
  generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value)
  chips.value.push({name: "Customer", value: customer.value.customer_name});
  siteStore.setCustomerID(customer.value.customer_id)
}
setPageDefaults()

const addSite = async (data) => {
  disableLoading.value = false;
  let response = await siteStore.createSite(data)
  if (response.status === "success") {
    customerStore.addSiteIDToCustomer(response.data.site_id)
    await RouterPush("/site");
  }
  disableLoading.value = true;
}

// const components = {
//   Trail: () => import("@/components/Nav/Trail.vue"),
//   SiteForm: () => import("@/components/Forms/Site.vue"),
//   InfoChip: () => import("@/components/Chips/Info.vue"),
//   Header: () => import("@/components/Text/Header.vue"),
// };
</script>
