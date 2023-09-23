<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <HeaderText :text="t('Create Configuration')" :chips="[]"/>
    <NimbleForm
        v-can="'super_admin_access'"
        :options="options"
        :disable-loading="disableLoading"
        :configurations="configurations"
        :licenses="licenses"
        @submit="addNimble"
    />
    <OverlayLinear
        :message="message"
        :overlay="overlayLinear"
        :over-lay-timeout="overLayTimeout"
        :overlay-time-out-message="overlayTimeOutMessage"
        @verifyTransaction="verifyTransaction"
    />
    <v-dialog v-model="showLicenseNilDialog" width="600" persistent>
      <v-card elevation="0" color="cardBG2">
        <p class="subtitle-1 ma-2 pa-2 text-center">
          <v-icon color="warning" class="mx-2">mdi-alert-rhombus-outline</v-icon>
          {{ t("No Licenses found, please add a license to continue") }}
        </p>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="RouterPush('/license/add')">{{ t("Add License") }}</v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
// import UtilSocket from "~/mixins/utilSocket.js";
// import UtilGeneric from "~/mixins/utilGeneric.js";
import Centrifuge from "centrifuge";
import HeaderText from "~/components/Text/Header.vue"
import NimbleForm from "@/components/Forms/Nimble.vue"
import OverlayLinear from "@/components/Nav/OverlayLinear.vue"
import {ModeType} from "~/service/utils/components";
import {RouteQuery, RouterPush} from "~/composables/router/router";
import {useGeneric} from "~/composables/helpers/useGeneric";
import {useConfigurationStore} from "~/store/configurations";
import {useLicenseStore} from "~/store/license";
import {useTraceStore} from "~/store/trace"

let timer;

const {t} = useI18n()
useHead({
  title: t('Configuration Create')
});
definePageMeta({
  middleware: ["auth", "rbac"],
})
const runtimeConfig = useRuntimeConfig()

const generic = useGeneric()

const configurationStore = useConfigurationStore()
const traceStore = useTraceStore()
const licenseStore = useLicenseStore()
const breadCrumbItems = ref([
  {
    text: t("Dashboard"),
    disabled: false,
    href: "/dashboard",
    queryItem: null,
  },
  {
    text: t("Configuration"),
    disabled: false,
    href: "/configuration",
    queryItem: null,
  },
  {
    text: t("Create"),
    disabled: true,
    href: "/configuration/add",
    acl: "super_admin_access",
    queryItem: null,
  },
])

const options = {
  mode: ModeType.create
}

const centrifugeSocket = ref([])
const disableLoading = ref(false)
const configurations = ref(configurationStore.configurations ? configurationStore.configurations : [])
const subscribe = ref(false)
const subscription = ref({})
const transaction_id = ref("")
const message = ref("")
const overlayLinear = ref(false)
const overlayTimeOutMessage = ref("")
const overLayTimeout = ref(false)
const licenses = ref(licenseStore.licenses ? licenseStore.licenses : [])
const showLicenseNilDialog = ref(false)

// beforeRouteLeave(to, from, next) {
//   try {
//     clearTimeout(timer);
//   } catch (error) {
//     console.debug(error);
//   }
//   next();
// }

const initSocket = () => {
  // const token = this.$store.state.auth["token.local"];
  // let debug = false
  let protocol = "ws:";
  if (window.location.protocol === "https:") {
    protocol = "wss:";
  }
  const hostname = window.location.hostname;
  const port = window.location.port;
  let url = `${protocol}//${hostname}`;
  if (port !== "") {
    url = `${protocol}//${hostname}:${port}`;
  }
  if (runtimeConfig.public.isDebug) {
    url = runtimeConfig.public.socketURL;
    // debug = false
  }
  const currentUrl = url + "/connection/metadata";
  console.debug(currentUrl);
  const socket = new Centrifuge(currentUrl);
  // socket.setToken(token);
  socket.connect();
  socket.on("connect", (ctx) => {
    console.debug("connected::", ctx);
    centrifugeSocket.value = socket;
  });
  socket.on("disconnect", (ctx) => {
    console.debug("disconnected::", ctx);
  });
}
initSocket()


const setPageDefaults = () => {
  if (licenses.value.length === 0) {
    showLicenseNilDialog.value = true;
  }
  const routeQuery = RouteQuery()

  generic.setPageInfoData(null, null);
  generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value)
}
setPageDefaults()

const overlayTimer = () => {
  // clearTimeout(timer)
  timer = setTimeout(() => {
    overlayTimeOutMessage.value =
        "Ahh..! encountered an error while performing add nimble, \n Please try after sometime.";
    overLayTimeout.value = true;
  }, 40000);
}

const addNimble = async (data) => {
  disableLoading.value = false;
  const socket = centrifugeSocket.value;
  const response = await configurationStore.addNimbleConfiguration(data)
  if (response.status === "success") {
    // this.routePush("/configuration");
    message.value = "Creating Nimble Configuration";
    overlayLinear.value = true;
    overlayTimer();
    const transactionId = response.data.transaction_id;
    transaction_id.value = transactionId;
    const callbacks = {
      publish: (e) => {
        console.debug("publish::", e);
        if (e.data.status === "success") {
          useNuxtApp().$notification.show({
            message: "Nimble Created.",
            type: "success",
          });
          clearTimeout(timer);
          overlayLinear.value = false;
          RouterPush(`/configuration`);
        } else if (e.data.status === "failure" || e.data.status === "pending") {
          overlayTimeOutMessage.value =
              "Ahh..! encountered an error while performing adding nimble, \n Please try after sometime.";
          useNuxtApp().$notification.show({
            message: "Nimble create failed - " + e.data.message,
            type: "error",
          });
          subscription.value.unsubscribe();
        }
        // disabled.value = false;
        overlayLinear.value = false;
      },
      join: (message) => {
        // See below description of join message format
        console.debug("join::", message);
      },
      leave: (message) => {
        // See below description of leave message format
        console.debug("leave::", message);
      },
      subscribe: (context) => {
        // See below description of subscribe callback context format
        subscribe.value = true;
        // this.apiRes = true;
        // this.requestStats();
        console.debug("subscribe::", context);
      },
      error: (errContext) => {
        // See below description of subscribe error callback context format
        console.debug("error::", errContext);
      },
      unsubscribe: (context) => {
        // See below description of unsubscribe event callback context format
        subscribe.value = false;
        console.debug("unsubscribe::", context);
      },
    };
    subscription.value = socket.subscribe(transactionId, callbacks);
  }
  disableLoading.value = true;
}

const verifyTransaction = async (resp) => {
  const response = await traceStore.transactionByUUID(transaction_id.value)
  // console.debug(response, "verifyTransaction")
  if (response.status === "success" && response.data.status === "success") {
    overlayLinear.value = false;
  } else {
    useNuxtApp().$notification.show({
      message: "Nimble Configuration create error",
      type: "error",
    });
    overlayLinear.value = false;
  }
  await RouterPush(`/configuration`);
}

// beforeDestroy() {
//   this.clearStoreBeforePageLeave();
// },
</script>

<style></style>
