<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <HeaderText :text="'Update Site'" :chips="chips"/>
    <SiteForm
        v-if="Object.keys(site).length > 0"
        v-can="'user_access'"
        :options="options"
        :edit-site="site"
        :disable-loading="disableLoading"
        @submit="editSite"
    />
  </div>
</template>

<script lang="ts" setup>
import SiteForm from "~/components/Forms/Site.vue"
import HeaderText from "~/components/Text/Header.vue"
import {ModeType} from "~/service/utils/components";
import {useSiteStore} from "~/store/site";
import {useGeneric} from "~/composables/helpers/useGeneric";
import {RouteQuery, RouterPush} from "~/composables/router/router";
import {useCustomerStore} from "~/store/customer";

const {t} = useI18n()
useHead({
  title: t('Site Update')
});
definePageMeta({
  middleware: ["auth", "rbac"],
})

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
    text: t("Update"),
    disabled: true,
    href: "/site/edit",
    queryItem: null,
  },
])

const generic = useGeneric()
const siteStore = useSiteStore()
const customerStore = useCustomerStore()

if (Object.keys(siteStore.editSite).length === 0) {
  RouterPush("/site");
}

const site = ref(siteStore.editSite)
const options = {
  mode: ModeType.update,
}

const disableLoading = ref(false)
const chips = ref([])
const customer = ref(customerStore.selectedResolveCustomer)

const setPageDefaults = () => {
  const routeQuery = RouteQuery()
  generic.setPageInfoData(null, null);
  generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value)
  chips.value.push({name: "Customer", value: customer.value.customer_name});
  siteStore.setCustomerID(customer.value.customer_id)
}
setPageDefaults()

const editSite = async (data) => {
  disableLoading.value = false;
  const response = await siteStore.updateSite(data)
  if (response) {
    await RouterPush("/site");
  }
  disableLoading.value = true;
}
</script>
