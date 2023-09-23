<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-row no-gutters align="start" justify="start">
    <div v-if="customerResolve && customerResolve.customer_id">
      <v-tooltip bottom open-delay="500">
        <template #activator="props">
          <v-btn variant="text" color="default" v-bind="props" @click="openResolve = true">
            <v-icon class="mr-2">mdi-chart-bubble</v-icon>
            {{ customerResolve && customerResolve.customer_id && customerResolve.customer_name }}
            <v-icon class="ml-1">mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <span></span>
      </v-tooltip>
    </div>
    <v-dialog
        v-model="openResolve"
        :overlay-opacity="0.5"
        :persistent="!(customerResolve && customerResolve.hasOwnProperty('customer_id'))"
        class="pa-2"
        width="85%"
    >
      <v-card elevation="0" height="800" color="cardBG4">
        <v-row no-gutters class="ma-2">
          <v-btn v-can="'admin_add'" class="button_text mt-2 mx-2" color="routeCardBG1" @click="customerAdd"
                 prepend-icon="mdi-plus">
            <template v-slot:prepend>
              <v-icon class="ml-1"></v-icon>
            </template>
            Add Customer
          </v-btn>
          <v-spacer/>
          <v-btn variant="text" icon="mdi-close" color="grey" @click="openResolve = false"></v-btn>
        </v-row>
        <v-row no-gutters class="px-2">
          <v-col cols="12">
            <v-card
                class="ma-2"
                color="cardBG3"
                elevation="0"
                min-height="600"
                max-height="750"
                :class="useVuetify().theme.name ? 'glass-dark' : 'glass-light'"
            >
              <v-card-title>
                <v-row no-gutters>
                  Customer
                  <v-spacer/>
                  <v-btn-toggle v-model="viewType" divided>
                    <v-tooltip text="Table">
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" :disabled="viewType === 0" icon="mdi-view-list-outline"></v-btn>
                      </template>
                    </v-tooltip>
                    <v-tooltip text="Cards">
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" :disabled="viewType === 1" icon="mdi-table"></v-btn>
                      </template>
                    </v-tooltip>
                  </v-btn-toggle>
                </v-row>
              </v-card-title>
              <v-card-subtitle v-show="viewType === 1" class="ma-0">
                <v-row no-gutters>
                  <div class="text-sm-caption font-weight-light text--grey">
                    Click check box to switch the customer
                  </div>
                </v-row>
              </v-card-subtitle>
              <v-card-text v-if="viewType === 0">
                <v-row no-gutters class="mb-2">
                  <v-spacer></v-spacer>
                  <v-text-field
                      v-model="search"
                      append-inner-icon="mdi-magnify"
                      variant="outlined"
                      label="Search"
                      density="compact"
                      hide-details
                  ></v-text-field>
                </v-row>
                <v-data-table
                    class="row-pointer"
                    :headers="headers"
                    :items="customers ? customers : []"
                    :search="search"
                    density="compact"
                    :style="{ backgroundColor: 'cardBG1' }"
                >
                  <template #[`item.customer_select`]="{ item }">
                    <v-tooltip v-if="item.raw.customer_id === selectedResolveCustomer.customer_id"
                               location="top"
                               open-delay="500"
                               text="Selected Customer">
                      <template #activator="{ props }">
                        <v-btn size="24" variant="text" color="success" density="compact" icon="mdi-check-circle"
                               v-bind="props"
                               @click="setCustomer(item)">
                        </v-btn>
                      </template>
                    </v-tooltip>
                    <v-tooltip v-else location="top" open-delay="500" text="Select Customer">
                      <template #activator="{ props }">
                        <v-btn size="24" variant="text" color="default" density="compact" icon="mdi-circle-outline"
                               v-bind="props"
                               @click="setCustomer(item)">
                        </v-btn>
                      </template>
                    </v-tooltip>
                  </template>
                  <template #[`item.customer_name`]="{ item }">
                    <span class="font-weight-bold text-truncate">{{ item.raw.customer_name }}</span>
                  </template>
                  <template #[`item.customer_sites`]="{ item }">
                    <v-chip
                        small
                        color="default"
                        text-color="black"
                        class="ma-0 pa-1"
                        density="compact"
                        :style="{ backgroundColor: 'cardBG3' }"
                    >
                      <span class="subtitle-1 font-weight-bold mx-2">
                        {{ item.raw.customer_sites ? item.raw.customer_sites.length : 0 }}
                      </span>
                    </v-chip>
                  </template>
                  <template #[`item.actions`]="{ item }">
                    <v-tooltip location="start" open-delay="1000" text="Update">
                      <template #activator="{ props  }">
                        <v-btn
                            class="ma-2"
                            variant="text"
                            density="compact"
                            icon
                            v-bind="props"
                            @click.stop="customerEdit(item)"
                        >
                          <v-icon size="20">mdi-pencil-outline</v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>
                    <v-tooltip location="end" :open-delay="item.raw.customer_sites != null ? 0 : 1000"
                               :text="item.raw.customer_sites != null ? 'Cannot delete, contains site(s).': 'Delete'">
                      <template #activator="{ props  }">
                        <v-btn
                            v-can="'super_admin_access'"
                            :disabled="item.raw.customer_sites != null"
                            size="small"
                            icon
                            variant="text"
                            density="compact"
                            color="error"
                            v-bind="props "
                            @click.stop="customerDelete(item)"
                        >
                          <v-icon size="20">mdi-delete-outline</v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>
                  </template>

                </v-data-table>
              </v-card-text>
              <v-card-text v-if="viewType === 1">
                <v-row v-if="customers.length > 0" no-gutters>
                  <div v-for="(customer, i) in customers" :key="i">
                    <CustomerCard
                        :customer="customer"
                        :type="['selector']"
                        :width="360"
                        :selected="selectedResolveCustomer.customer_id === customer.customer_id"
                        @selectCustomer="customerSelect"
                    />
                  </div>
                </v-row>
                <div v-else>
                  <p class="text-center grey--text text-md-h6 ma-2 font-weight-light">
                    No data available
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <ConfirmCard ref="Confirm"/>
  </v-row>
</template>

<script lang="ts" setup>
import {resolveStore} from "~/store/resolve";
import {useCustomerStore} from "~/store/customer";
import {storeToRefs} from "pinia";
import {Customer} from "~/types";
import {Router, RouterPush} from "~/composables/router/router";
import CustomerCard from "~/components/Cards/Customer.vue";
import ConfirmCard from "~/components/Notify/Confirm.vue"

const {showResolve} = defineProps({
  showResolve: {type: Boolean, required: false},
})

const {t} = useI18n()
const customerStore = useCustomerStore()
const resolveDataStore = resolveStore()

const {customers, openResolveDialog, selectedResolveCustomer} = storeToRefs(customerStore)
let {resolve} = storeToRefs(resolveDataStore)

const Confirm = ref()
let openResolve = ref<boolean>(false)
const headers = ref([
  {
    title: "",
    key: "customer_select",
    sortable: false,
    align: "start",
    width: "30px",
  },
  {
    title: "Name",
    key: "customer_name",
    align: "start",
    sortable: true,
  },
  {
    title: "Description",
    key: "customer_description",
    sortable: false,
    align: "center",
  },
  {
    title: "Total Sites",
    key: "customer_sites",
    sortable: false,
    align: "center",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
    align: "center",
  },
])

let viewType = ref<number>(0)
let customerResolve = ref<Customer | null>(null)
let itemsPerPage = ref<number>(10)
const search = ref("")


onMounted(async () => {
  // console.debug(useVuetify().theme.name, "$vuetify")
  if (customers.value && customers.value.length === 0) {
    // openResolve.value = false;
    const response = await customerStore.getCustomers()
    if (response.status === "success") {
    }
  }
  await setCustomerDetails();
})

watch(openResolveDialog, (n, o) => {
  if (n) {
    openResolve.value = true
  }
})

watch(openResolve, async (n, o) => {
  if (n) {
    if (!customers.value || customers.value.length === 0) {
      const response = await customerStore.getCustomers()
      if (response.status === "success") {
      }
    }
    await setCustomerDetails();
  }
})


const setCustomerDetails = async () => {
  if (selectedResolveCustomer.value && selectedResolveCustomer.value.customer_id) {
    const customerCheck = customers.value.find((c) => {
      return c.customer_id === selectedResolveCustomer.value.customer_id;
    });
    if (customerCheck) {
      customerResolve.value = customerCheck;
      const payload = {
        customer: selectedResolveCustomer.value,
        redirect: false,
      };
      await customerSelect(payload);
      return;
    } else {
      customerResolve.value = {} as Customer;
      customerStore.setResolve(customerResolve.value);
      // await this.$store.dispatch("site/setCustomerID", "");
    }
  }
  const customerFormStorage = JSON.parse(localStorage.getItem("customer"));
  if (customerFormStorage && customerFormStorage.customer_id && customers.value && customers.value.length > 0) {
    const customerCheck = customers.value.find((c) => {
      return c.customer_id === customerFormStorage.customer_id;
    });
    if (customerCheck) {
      customerResolve.value = customerCheck
      customerStore.setResolve(customerCheck);
      const payload = {
        customer: customerResolve.value,
        redirect: false,
      };
      await customerSelect(payload);
    } else if (customers.value && customers.value.length > 0) {
      await assignFirstCustomer();
    } else {
      customerResolve.value = {} as Customer;
      // if (this.$store.state.auth.user.role_key === "super_admin") {
      //   this.routePush("/deployment");
      // }
    }
  } else if (customers.value && customers.value.length > 0) {
    await assignFirstCustomer();
  } else {
    customerResolve.value = {} as Customer;
    const response = customerStore.setResolve(customerResolve.value);
    if (response) {
      openResolve.value = false;
    }
  }
}
const assignFirstCustomer = async () => {
  customerResolve.value = customers.value[0]
  const response = customerStore.setResolve(customerResolve.value);
  if (response) {
    const payload = {
      customer: selectedResolveCustomer.value,
      redirect: false,
    };
    await customerSelect(payload);
  }
}
const customerSelect = async (data) => {
  if (data) {
    const response = customerStore.setResolve(data.customer);
    if (response) {
      customerResolve.value = data.customer
      localStorage.setItem("customer", JSON.stringify(selectedResolveCustomer.value));
      if (data.redirect) {
        await RouterPush("/dashboard");
      }
    }
  } else {
    customerStore.setResolve({});
  }
}
const customerAdd = async () => {
  await Router().push("/customer/add")
  openResolve.value = false
}
const setCustomer = async (item: any) => {
  if (item.raw.customer_id !== selectedResolveCustomer.value.customer_id) {
    customerResolve.value = item.raw
    const response = customerStore.setResolve(item.raw);
    if (response) {
      const payload = {
        customer: selectedResolveCustomer.value,
        redirect: false,
      };
      await customerSelect(payload);
    }
  }
}
const customerEdit = async (item: any) => {
  const response = customerStore.setEditCustomer(item.raw)
  if (response) {
    await RouterPush("/customer/edit")
    openResolve.value = false
  }
}

const customerDelete = async (data) => {
  // openResolve.value = false
  const message =
      '<span style="color: #B71C1C;' +
      "background-color: #FFEBEE;" +
      "padding: 4px;" +
      "border-radius: 4px;" +
      'font-weight: 400;">' +
      data.raw.customer_name +
      "</span> ?</div>";
  const alert = await Confirm.value.open("", t("Are you sure you want to delete", [message]), {
    color: "success",
  });
  if (alert) {
    let response = await customerStore.deleteCustomer(data.raw.customer_id)
    if (response) {
      response = await customerStore.getCustomers()
      if (response) {
        if (selectedResolveCustomer.value.customer_id === data.raw.customer_id) {
          await customerSelect("");
        }
        await setCustomerDetails();
      }
    }
  }
}
</script>

<style scoped>
.button_text {
  color: white !important;
  padding: 6px;
  font-size: 15px;
  font-weight: 500;
}

.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
