<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <HeaderText :text="t('Deployment')" :chips="[]"/>
    <div v-if="!overlay">
      <v-card elevation="0" color="transparent" @mouseenter="checkAnimate()">
        <v-card-title class="grey--text"> {{ t("Onboarding") }}</v-card-title>
        <v-divider class="mx-8"/>
        <v-row no-gutters align="center" justify="center">
          <v-col cols="6">
            <v-card width="100%" class="pa-0" color="transparent" elevation="0">
              <v-row no-gutters align="center" justify="center">
                <v-col cols="12" md="auto" align-self="center">
                  <v-card color="cardBG1" class="pa-8">
                    <v-card-text>
                      <div :style="{ backgroundColor: 'white' }" class="pa-4 rounded-4">
                        <img src="~/assets/images/onboard-site.png" width="480"/>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-timeline dense side="end">
              <v-timeline-item dot-color="#87212E" size="x-small">
                <v-card width="900" class="pa-4" color="transparent" elevation="0">
                  <v-row no-gutters align="center" justify="start">
                    <v-col cols="12" md="6" class="text-center pa-4">
                      <span class="text-h5 font-weight-light"> Add a new customer. </span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-timeline-item>
              <v-timeline-item dot-color="#87212E" icon="mdi-numeric-1">
                <v-card width="500" class="pa-0 b1sr" color="transparent" elevation="0">
                  <v-row no-gutters align="center" justify="center">
                    <v-col cols="12" md="auto" align-self="center" class="animation-customer">
                      <v-card
                          id="addCustomer"
                          width="320"
                          min-height="100"
                          class="pa-2 gradient-border d-flex align-center justify-start"
                          color="cardBG3"
                          @click="RouterPush('/customer/add')"
                      >
                        <div class="logo-lg elevation-0">
                          <v-icon size="55" color="#87212E" class="ma-4"> mdi-shield-account</v-icon>
                        </div>
                        <v-spacer/>
                        <div class="text-center text-h4 font-weight-light">
                          {{ t("Customer") }}
                        </div>
                        <v-spacer/>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-timeline-item>
              <v-timeline-item dot-color="#87212E" size="x-small">
                <v-card width="900" class="pa-4" color="transparent" elevation="0">
                  <v-row no-gutters align="center" justify="start">
                    <v-col cols="12" md="6" class="text-center pa-4">
                      <span class="text-h5 font-weight-light">
                        {{ t("Add multiple sites or locations, buildings, grouped under a Customer.") }}
                      </span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-timeline-item>
              <v-timeline-item dot-color="#87212E" icon="mdi-numeric-2">
                <v-card width="500" class="pa-0 b1sr" color="transparent" elevation="0">
                  <v-row no-gutters align="center" justify="center">
                    <v-col cols="12" md="auto" align-self="center">
                      <v-card
                          id="addSite"
                          width="320"
                          min-height="100"
                          class="pa-2 gradient-border d-flex align-center justify-start"
                          color="cardBG3"
                          :disabled="customers && customers.length === 0"
                          @click="RouterPush('/site/add')"
                      >
                        <div class="logo-lg elevation-0">
                          <v-icon size="55" color="#87212E" class="ma-4">mdi-office-building-marker-outline</v-icon>
                        </div>
                        <v-spacer/>
                        <div class="text-center text-h4 font-weight-light">
                          {{ t("Site") }}
                        </div>
                        <v-spacer/>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-timeline-item>
              <v-timeline-item dot-color="#87212E" icon="mdi-numeric-3">
                <v-card width="900" class="pa-4" color="transparent" elevation="0">
                  <v-row no-gutters align="center" justify="start">
                    <v-col cols="12" md="6" class="text-center pa-4">
                      <span class="text-h5 font-weight-light">
                        {{
                          t(
                              "Add devices to each site or locations, buildings, grouped under a Customer. And attach analytics"
                          )
                        }}
                      </span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </v-card>
      <v-card elevation="0" color="transparent">
        <v-divider class="mx-8"/>
        <v-card-title class="grey--text"> {{ t("Manage") }}</v-card-title>
        <v-row no-gutters align="center" justify="center">
          <v-alert v-if="configurations.length === 0" type="warning" class="mx-6 ma-2" max-width="300"
                   variant="outlined" density="compact">
            {{ t("No Nimble Configurations") }}
          </v-alert>
        </v-row>
        <v-row no-gutters align="center" justify="center">
          <v-alert v-if="sites.length === 0" type="warning" class="mx-6 ma-2" max-width="300" variant="outlined"
                   density="compact">
            {{ t("No Sites") }}
          </v-alert>
        </v-row>
        <v-row no-gutters align="center" justify="center">
          <v-card width="500" class="pa-0 b1sr" color="transparent" elevation="0">
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" md="auto" align-self="center">
                <v-card
                    id="addSite"
                    width="320"
                    min-height="100"
                    class="pa-2 gradient-border d-flex align-center justify-start"
                    color="cardBG3"
                    :disabled="!(configurations.length > 0 && sites.length > 0)"
                    @click="RouterPush('/deployment/device')"
                >
                  <div class="logo-lg elevation-0">
                    <v-icon size="55" color="#87212E" class="ma-4"> mdi-cctv</v-icon>
                  </div>
                  <v-spacer/>
                  <div class="text-center text-h4 font-weight-light">{{ t("Device") }}</div>
                  <v-spacer/>
                </v-card>
                <p class="subtitle-1 text-center mt-1">({{ t("Bulk Create") }})</p>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-card>
    </div>
    <OverlayCard :overlay="overlay"/>
  </div>
</template>

<script lang="ts" setup>
import HeaderText from "~/components/Text/Header.vue"
import OverlayCard from "~/components/Nav/Overlay.vue"
import {useConfigurationStore} from "~/store/configurations";
import {useCustomerStore} from "~/store/customer";
import {useSiteStore} from "~/store/site";
// const components = {
//   Trail: () => import("@/components/Nav/Trail.vue"),
//   OverlayCard: () => import("@/components/Nav/Overlay.vue"),
//   HeaderText: () => import("@/components/Text/Header.vue"),
// };
import {RouterPush} from "~/composables/router/router";
import {storeToRefs} from "pinia";

const configurationStore = useConfigurationStore()
const customerStore = useCustomerStore()
const siteStore = useSiteStore()

const {configurations} = storeToRefs(configurationStore)
const {customers, customer, resolve} = storeToRefs(customerStore)
const {sites} = storeToRefs(siteStore)

const {t} = useI18n()
useHead({
  title: t('Deployment')
});

definePageMeta({
  middleware: ["auth"],
})

const animate = useAnimate()

// import awesomeGif from "~/assets/images/awesome.gif";
// import UtilSocket from "~/mixins/utilSocket.js";
// import UtilGeneric from "~/mixins/utilGeneric.js";
// import UtilAnimate from "~/mixins/utilAnimate";

const overlay = ref<boolean>(true)
const items = ref([
  {
    color: "red lighten-2",
    icon: "mdi-star",
  },
  {
    color: "purple darken-1",
    icon: "mdi-book-variant",
  },
  {
    color: "green lighten-1",
    icon: "mdi-airballoon",
  },
  {
    color: "indigo",
    icon: "mdi-buffer",
  },
])

const breadCrumbItems = ref([
  {
    text: t("Dashboard"),
    disabled: false,
    href: "/dashboard",
    queryItem: null,
  },
  {
    text: t("Deployment"),
    disabled: true,
    href: "/deployment",
    queryItem: null,
  },
])

const tours = ref([
  // {
  //   target: "#addCustomer",
  //   header: {
  //     title: t("Add Customer"),
  //   },
  //   content: t("Configure Customer here"),
  //   image: awesomeGif,
  // },
  // {
  //   target: "#addSite",
  //   header: {
  //     title: t("Add Site"),
  //   },
  //   content: t("Configure Site here"),
  //   image: awesomeGif,
  // },
  // {
  //   target: "#addDevice",
  //   header: {
  //     title: "Add Device",
  //   },
  //   content: "Configure Devices to Site here",
  // },
  // {
  //   target: "#addAnalytic",
  //   header: {
  //     title: "Add Analytic",
  //   },
  //   content:
  //     "Configure Analytics to the Devices here",
  // },
  // {
  //   target: "#deviceSourceMapping",
  //   header: {
  //     title: "Device/Source Mapping",
  //   },
  //   content:
  //     "Map Source to Device,Site to Customer here",
  // },
])

const fetchData = async () => {
  // if (configurations.value.length === 0) {
  //   const response = await nimbleStore.fetchConfigurations()
  //   if (response) {
  //
  //   }
  // }
  const customerId = resolve.value.customer_id
  if (customerId) {
    let response = await siteStore.getCustomerSites()
    if (response) {
      // this.sites = this.$store.state.site.sites;
      if (configurations.value.length === 0) {
        const response = await configurationStore.getNimbleConfigurations(false)
        // if (response) {
        //
        // }
      }
    }
  }
  setTimeout(() => {
    overlay.value = false
  }, 4000)
}

await fetchData()

const checkAnimate = () => {
  if (!customers.value || customers.value.length === 0) {
    animate.gridAnimation(".animation-customer");
  }
}

</script>

<style scoped>
.border {
  position: absolute;
  display: block;
  top: -50%;
  left: -50%;
  z-index: -9;
  height: 200%;
  width: 200%;
  transform: rotate(-45deg);
  overflow: hidden;
  background: linear-gradient(to right, #fff 20%, #fff 40%, #ecd08c 50%, #ecd08c 55%, #fff 70%, #fff 100%);
  background-size: 200% auto;
  animation: shine 3s linear infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
