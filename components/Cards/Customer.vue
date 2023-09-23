<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-card
      class="ma-2 pa-1 gradient-border"
      color="cardBG2"
      :min-width="width"
      min-height="80"
      :elevation="type.includes('selector') ? (selected ? 4 : 0) : 1"
      @click="type.includes('selector') ? selectCustomer(customer) : $router.push('/customer/id')"
  >
    <v-row no-gutters class="ma-0">
      <v-col v-if="type.includes('info')" md="auto" class="pa-1">
        <img :src="customer_image" class="float-left custom-image" alt="customer-logo"/>
      </v-col>
      <v-col v-if="type.includes('selector')" cols="3" class="pa-1">
        <img :src="customer_image" class="float-left custom-image-small" alt="customer-logo"/>
      </v-col>
      <v-col class="pa-1 ma-0 align-start">
        <v-card-title class="pa-1 title-1">
          <v-row no-gutters>
            <span class="font-weight-medium" :class="useVuetify().theme.name === 'dark' ? 'custom-title-dark' : 'custom-title-light'">
              {{ generic.getStringRoundOff(customer.customer_name) }}
            </span>
            <v-spacer/>
            <div
                v-if="type.includes('selector')"
                :style="{
                position: 'absolute',
                top: '6px',
                right: '8px',
              }"
            >
              <v-tooltip v-if="selected" top open-delay="500" :text="t('Selected Customer')">
                <template #activator="{ props}">
                  <v-btn size="26" variant="text" icon="mdi-check-circle" color="success" v-bind="props">
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip v-else top open-delay="500" :text="t('Select Customer')">
                <template #activator="{ props }">
                  <v-btn size="26" variant="text" icon="mdi-circle-outline" color="default" v-bind="props">
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </v-row>
        </v-card-title>
        <v-card-subtitle v-if="type.includes('info')" class="pa-1 my-2 caption-2">
          <span>
            <span v-if="customer.customer_address.customer_unit">{{ customer.customer_address.customer_unit }},</span>
            <span v-if="customer.customer_address.customer_street">
              {{ customer.customer_address.customer_street }},
            </span>
            <span v-if="customer.customer_address.customer_area">{{ customer.customer_address.customer_area }},</span>
            <br/>
            {{ customer.customer_address.customer_city }}, {{ customer.customer_address.customer_state }}, <br/>
            {{ customer.customer_address.customer_country }},
            {{ customer.customer_address.customer_zip }}
          </span>
        </v-card-subtitle>
        <v-row v-if="type.includes('selector')" no-gutters>
          <v-chip color="default" class="ma-0 pa-1">
            <v-avatar color="primary" class="white--text">
              <v-icon size="18">mdi-office-building-marker</v-icon>
            </v-avatar>
            <span class="mx-2 caption-2">
              {{ t("Total Sites") }}
            </span>
            <v-chip
                color="default"
                class="ma-0 pa-1 px-2"
                :style="{
                right: '0px',
              }"
            >
              <span class="subtitle-1 font-weight-bold">
                {{ customer.customer_sites ? customer.customer_sites.length : 0 }}
              </span>
            </v-chip>
          </v-chip>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
// import UtilGeneric from "~/mixins/utilGeneric.js";

import {useStatusStore} from "~/store/status";
import {storeToRefs} from "pinia";
import {useGeneric} from "~/composables/helpers/useGeneric";

const generic = useGeneric()

const emit = defineEmits(["selectCustomer"])
const {t} = useI18n()

const {customer, selected, width, type} = defineProps({
  customer: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 440,
  },
  type: {
    type: Array,
    default: () => ["info"],
  },
})

const statusStore = useStatusStore()
const {status} = storeToRefs(statusStore)

console.debug(generic.getURL(), "utl")

const customer_image = ref(customer.customer_image ? generic.getURL() + customer.customer_image.replace("/api/v1", "") : "/images/default-site.png")
const selectCustomer = (data) => {
  const payload = {
    customer: data,
    redirect: true,
  };
  emit("selectCustomer", payload);
}
</script>
