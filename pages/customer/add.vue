<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <HeaderText :text="t('Customer')" :chips="[]"/>
    <CustomerForm :options="options" :disable-loading="disableLoading" @submit="addCustomer"/>
  </div>
</template>

<script lang="ts" setup>
import HeaderText from "~/components/Text/Header.vue"
import CustomerForm from "~/components/Forms/Customer.vue"
import {useCustomerStore} from "~/store/customer";
import {RouteQuery, Router} from "~/composables/router/router";
import {useGeneric} from "~/composables/helpers/useGeneric";

const customerStore = useCustomerStore()

const {t} = useI18n()
useHead({
  title: t('Customer Create')
});

definePageMeta({
  middleware: ["auth"],
})

// const components = {
//   Trail: () => import("@/components/Nav/Trail.vue"),
//   CustomerForm: () => import("@/components/Forms/Customer.vue"),
//   Header: () => import("@/components/Text/Header.vue"),
// };

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
    href: "/customer/add",
    queryItem: null,
  },
])
const options = ref({
  mode: "create",
})
const disableLoading = ref(false)
const generic = useGeneric()

const setPageDefaults = () => {
  const routeQuery = RouteQuery()
  generic.setPageInfoData(null, null);
  generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value)
}
setPageDefaults()

// this.setPageInfoData(null, null);
// this.constructBreadcrumbs(this.routeQuery(), this.breadCrumbItems);
const addCustomer = async (data: Object) => {
  disableLoading.value = false;
  const response = await customerStore.createCustomer(data)
  if (response.status === "success") {
    await Router().push("/dashboard")
  }
  // const response = await this.$store.dispatch("customer/addCustomer", data);
  // if (response.success) {
  //   if (response) {
  //     this.routePush("/dashboard");
  //   }
  // }
  disableLoading.value = true;
}
</script>

<style lang="scss" scoped>
/* @import "~/assets/scss/main.scss";*/
</style>
