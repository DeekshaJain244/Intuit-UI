<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <HeaderText :text="t('Customer')" :chips="[]"/>
    <CustomerForm
        v-if="Object.keys(editCustomer).length > 0"
        :options="options"
        :edit-customer="editCustomer"
        :disable-loading="disableLoading"
        @submit="updateCustomer"
    />
  </div>
</template>

<script lang="ts" setup>
import HeaderText from "~/components/Text/Header.vue"
import CustomerForm from "~/components/Forms/Customer.vue"
import {useCustomerStore} from "~/store/customer";
import {RouteQuery, RouterPush} from "~/composables/router/router";
import {storeToRefs} from "pinia";
import {useGeneric} from "~/composables/helpers/useGeneric";

const customerStore = useCustomerStore()
const {editCustomer} = storeToRefs(customerStore)

if (Object.keys(editCustomer.value).length === 0) {
  RouterPush("/dashboard")
}

const {t} = useI18n()
useHead({
  title: t('Customer Update')
});
definePageMeta({
  middleware: ["auth"],
})

const generic = useGeneric()
const breadCrumbItems = ref([
  {
    text: t("Dashboard"),
    disabled: false,
    href: "/dashboard",
    queryItem: null,
  },
  // {
  //   text: "Customer",
  //   disabled: true,
  //   href: "/customer",
  // 	queryItem: null
  // },
  {
    text: t("Customer"),
    disabled: true,
    href: "/customer/edit",
    queryItem: null,
  },
])
const options = ref({
  mode: "update",
})
const disableLoading = ref(false)

const setPageDefaults = () => {
  const routeQuery = RouteQuery()
  generic.setPageInfoData(null, null);
  generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value)
}
setPageDefaults()

const updateCustomer = async (data: Object) => {
  // console.debug("updateCustomer")
  disableLoading.value = false;
  const response = await customerStore.updateCustomer(data)
  if (response.status === "success") {
    await RouterPush("/dashboard")
  }
  disableLoading.value = true;
}
</script>

<style lang="scss" scoped>
/* @import "~/assets/scss/main.scss";*/
</style>
