<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <HeaderText :text="t('Configurations')" :chips="[]"/>
    <v-row class="pa-2" no-gutters align-content="space-between">
      <div v-for="(route, i) in routes" :key="i">
        <RouteCard v-can="'super_admin_access'" class="mr-2" :route="route"/>
      </div>
    </v-row>
    <v-row v-can="'viewer_access'" no-gutters class="px-2" align="center">
      <v-col cols="12">
        <v-card
            class="ma-2"
            color="cardBG3"
            elevation="0"
            max-height="800"
            :class="useVuetify().theme.name === 'dark' ? 'glass-dark' : 'glass-light'"
        >
          <v-card-title>
            <v-row no-gutters>
              {{ t("Nimble") }}
              <v-btn elevation="0" variant="text" size="small" class="mx-2 mb-1" icon="mdi-reload"
                     @click="fetchConfigurations">
              </v-btn>
              <v-spacer/>
              <v-btn-toggle v-model="viewType">
                <v-tooltip bottom>
                  <template #activator="{props}">
                    <v-btn v-bind="props" :disabled="viewType === 0">
                      <v-icon>mdi-view-list-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ t("Table") }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template #activator="{props}">
                    <v-btn v-bind="props" :disabled="viewType === 1">
                      <v-icon>mdi-table</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ t("Cards") }}</span>
                </v-tooltip>
              </v-btn-toggle>
            </v-row>
          </v-card-title>
          <v-card-text v-if="viewType === 0">
            <v-data-table
                :headers="configurationHeaders"
                :items="configurations"
                item-key="nimble_id"
                density="compact"
                :item-class="getClass"
                @click:row="openDetails"
            >
              <template #[`item.nimble_name`]="{ item }">
                <span class="font-weight-bold">{{ item.raw.nimble_name }}</span>
              </template>
              <template #[`item.nimble_device_types`]="{ item }">
                <DeviceTypeChip class="mx-1 pa-0" :type="item.raw.nimble_device_types"
                                :mode="ModeType.legendIconString"/>
              </template>
              <template #[`item.address`]="{ item }">
                <section>{{ item.raw.nimble_address }}:{{ item.raw.nimble_port }}</section>
              </template>
              <template #[`item.license`]="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ props }">
                    <v-icon color="success" v-bind="props">mdi-check-decagram</v-icon>
                  </template>
                  <span v-if="item.raw.license && Object.keys(item.raw.license).length > 0">
                      <LicenseCard :license="item.raw.license" :is-context-menu="false"/>
                  </span>
                </v-tooltip>
              </template>
              <template #[`item.status`]="{ item }">
                <v-btn size="x-small" variant="outlined" :color="item.raw.nimble_status > 0 ? 'success' : 'error'">
                  {{ item.raw.nimble_status > 0 ? "Online" : "Offline" }}
                </v-btn>
              </template>
              <template #[`item.actions`]="{ item }">
                <v-tooltip bottom :text="t('Refresh Nimble Catalog')">
                  <template #activator="{ props }">
                    <v-btn
                        v-can="'super_admin_access'"
                        v-bind="props"
                        size="20"
                        variant="text"
                        icon="mdi-reload"
                        class="mr-2"
                        color="primary"
                        :disabled="item.raw.nimble_status === 0"
                        @click.stop="refreshDetails(item.raw)"
                    >
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-btn
                    v-can="'super_admin_access'"
                    size="20"
                    icon="mdi-pencil-outline"
                    variant="text"
                    class="mx-2"
                    color="success"
                    @click.stop="editDetails(item.raw)"
                >
                </v-btn>
                <v-btn
                    v-can="'super_admin_access'"
                    size="20"
                    icon="mdi-delete-outline"
                    variant="text"
                    class="mx-2"
                    color="error"
                    :loading="overlay"
                    @click.stop="deleteDetails(item.raw)"
                >
                </v-btn>
                <v-chip
                    v-can="'super_admin_access'"
                    class="ml-2 pa-0 py-2"
                    size="small"
                    color="default"
                    @click.stop="manualOverRide(item.raw)"
                >
                  <span class="mx-2 my-2"> Manual Override</span>
                  <span class="mr-1">
                    <v-icon v-if="!item.raw.nimble_is_override" color="warning" size="20"> mdi-close-circle</v-icon>
                    <v-icon v-else color="success" size="20">mdi-check-circle</v-icon>
                  </span>
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-text v-if="viewType === 1">
            <v-row no-gutters align="start">
              <section v-for="(configuration, i) in configurations" :key="i" class="mr-4">
                <NimbleCard
                    :class="['settingCardAnim-' + i]"
                    :configuration="configuration"
                    :deleteable_nimble_id="deleteableNimbleID"
                    @refresh="refreshDetails(configuration)"
                    @open="openDetails(configuration)"
                    @edit="editDetails(configuration)"
                    @delete="deleteDetails(configuration)"
                    @override="manualOverRide(configuration)"
                />
              </section>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--    <v-dialog v-if="selectedConfiguration.nimble_id" v-model="nimbleStats" persistent max-width="1200">-->
    <!--      <v-card elevation="0" color="cardBG2" class="pa-2">-->
    <!--        <v-row no-gutters>-->
    <!--          <v-spacer/>-->
    <!--          <v-btn icon class="mx-2" @click="nimbleStats = false">-->
    <!--            <v-icon size="24">mdi-close</v-icon>-->
    <!--          </v-btn>-->
    <!--        </v-row>-->
    <!--        <NimbleConfigCard :configuration="selectedConfiguration"/>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->
    <!--    <v-dialog v-model="deleteNimbleForm" persistent max-width="700">-->
    <!--      <v-card color="cardBG2" class="pa-4 px-6">-->
    <!--        <v-card-subtitle class="text-center subtitle-1">-->
    <!--          Type &nbsp;-->
    <!--          <span class="font-weight-bold text-h6">{{ selectedConfiguration.nimble_name }} </span>-->
    <!--          &nbsp; to continue(case sensitive)-->
    <!--        </v-card-subtitle>-->
    <!--        <v-card-text>-->
    <!--          <v-form @submit.prevent="deleteConfigurationHop2">-->
    <!--            <v-text-field-->
    <!--                v-model="configuration_name"-->
    <!--                outlined-->
    <!--                lable="Type Configuration name"-->
    <!--                dense-->
    <!--                @click.right.prevent-->
    <!--                @copy.prevent-->
    <!--                @paste.prevent-->
    <!--            >-->
    <!--            </v-text-field>-->
    <!--            <div class="text-center mb-3">-->
    <!--              <v-btn id="nimble_spellcheck_submit" type="submit" small class="mx-2" color="primary">-->
    <!--                {{ t("Submit") }}-->
    <!--              </v-btn>-->
    <!--              <v-btn-->
    <!--                  id="nimble_spell_cancel"-->
    <!--                  class="mx-2"-->
    <!--                  small-->
    <!--                  outlined-->
    <!--                  color="default"-->
    <!--                  @click="deleteNimbleForm = false"-->
    <!--              >-->
    <!--                {{ t("Cancel") }}-->
    <!--              </v-btn>-->
    <!--            </div>-->
    <!--          </v-form>-->
    <!--        </v-card-text>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->
    <div>
      <OverlayCard :overlay="overlay"/>
      <ConfirmCard ref="Confirm" :is-default="true"/>
      <OverlayLinear
          :message="message"
          :overlay="overlayLinear"
          :over-lay-timeout="overLayTimeout"
          :overlay-time-out-message="overlayTimeOutMessage"
          @verifyTransaction="verifyTransaction"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Centrifuge from "centrifuge";
import HeaderText from "~/components/Text/Header.vue"
import RouteCard from "~/components/Cards/Route.vue"
import OverlayCard from "~/components/Nav/Overlay.vue"
import DeviceTypeChip from "~/components/Chips/DeviceType.vue"
import NimbleCard from "~/components/Cards/Nimble.vue"
import LicenseCard from "~/components/Cards/License.vue"
import ConfirmCard from "~/components/Notify/Confirm.vue"
import OverlayLinear from "@/components/Nav/OverlayLinear.vue"

// import UtilAnimate from "~/mixins/utilAnimate.js";
// import UtilSocket from "~/mixins/utilSocket.js";
// import UtilGeneric from "~/mixins/utilGeneric.js";
import {ModeType} from "~/service/utils/components";
import {useConfigurationStore} from "~/store/configurations";
import {useAuthStore} from "~/store/auth";
import {RouteQuery, RouterPush} from "~/composables/router/router";
import {useGeneric} from "~/composables/helpers/useGeneric";
import {useTraceStore} from "~/store/trace"
import {useChannelStore} from "~/store/channel";
import {usePipelineStore} from "~/store/pipeline";

const components = {
  NimbleConfigCard: () => import("@/components/Cards/NimbleConfig.vue"),
  NimbleCard: () => import("@/components/Cards/Nimble.vue"),
  RouteCard: () => import("@/components/Cards/Route.vue"),
  ConfirmCard: () => import("@/components/Notify/Confirm.vue"),
  OverlayLinear: () => import("@/components/Nav/OverlayLinear.vue"),
  LicenseForm: () => import("@/components/Forms/License.vue"),
  LicenseCard: () => import("@/components/Cards/License.vue"),
};

const {t} = useI18n()
useHead({
  title: t('Configurations')
});
definePageMeta({
  middleware: ["auth", "rbac"],
})

const generic = useGeneric()

const runtimeConfig = useRuntimeConfig()
let timer;

const configurationStore = useConfigurationStore()
const authStore = useAuthStore()
const traceStore = useTraceStore()
const channelStore = useChannelStore()
const pipelineStore = usePipelineStore()

const Confirm = ref()
const configurations = ref(configurationStore.configurations)
const centrifugeSocket = ref([])
const overlay = ref(false)
const role_key = ref(authStore.loggedInUser.role_key)
const disableLoading = ref(false)
const subscribe = ref(false)
const subscription = ref({})
const transaction_id = ref("")
const message = ref("")
const overlayLinear = ref(false)
const overlayTimeOutMessage = ref("")
const overLayTimeout = ref(false)
const deleteableNimbleID = ref(null)
const expanded = ref([])
const singleExpand = ref(true)
const transactionMessage = ref("")
const configurationHeaders = ref([
  {
    title: t("Name"),
    key: "nimble_name",
    sortable: false,
    align: "start",
  },
  {
    title: t("Supported device types"),
    key: "nimble_device_types",
  },
  {
    title: t("License"),
    key: "license",
  },
  {
    title: t("Version"),
    key: "nimble_version",
    width: "150",
    align: "left",
  },
  {
    title: t("Address"),
    key: "address",
    width: "220",
    align: "left",
  },
  {
    title: t("Status"),
    key: "status",
    width: "80",
    align: "left",
  },
  {
    title: t("Actions"),
    key: "actions",
    width: "360",
    align: "center",
  },
])
const selectedConfiguration = ref({})
const nimbleStats = ref(false)
const deleteNimbleForm = ref(false)
const configuration_name = ref("")
const viewType = ref(0)
const worker = ref(null)
const workerIDs = ref([])
const showLicenceForm = ref(false)
const licenses = ref([])

const breadCrumbItems = ref([
  {
    text: t("Dashboard"),
    disabled: false,
    href: "/dashboard",
    queryItem: null,
  },
  {
    text: t("Configuration"),
    disabled: true,
    href: "/configuration",
    queryItem: null,
  },
])
const routes = ref([
  {
    id: "add_nimble_configuration",
    state: true,
    isNew: true,
    icon: "mdi-plus",
    name: t("Add Configuration"),
    background_color: "routeCardBG1",
    to: `/configuration/add`,
    acl: "super_admin_add",
  }
])
const tours = [
  {
    target: "#configuration",
    header: {
      title: t("Configuration"),
    },
    params: {
      placement: "right",
    },
    content: t(
        "Configuration details of services<br>Click on a service card to get more details of service configuration<br>"
    ),
  },
]
// options: {
// mode: ModeType.create,
// },

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
  const routeQuery = RouteQuery()
  const pageInfo = {
    title: t("Configuration"),
    message: t("Configuration of source and pipeline"),
  };
  generic.setPageInfoData(pageInfo, null);
  generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value)
}
setPageDefaults()

const fetchConfigurations = async () => {
  const response = await configurationStore.getNimbleConfigurations(true);
  if (response) {
    configurations.value = configurationStore.configurations;
  }
}
const openNimbleSpellCheckForm = () => {
  deleteNimbleForm.value = true;
}

const overlayTimer = () => {
  // clearTimeout(timer)
  timer = setTimeout(() => {
    overlayTimeOutMessage.value = t(
        "Ahh..! encountered an error while performing, \n Please try after sometime.",
        [transactionMessage.value]
    );
    overLayTimeout.value = true;
  }, 40000);
}

const verifyTransaction = async () => {
  const response = await traceStore.transactionByUUID(transaction_id.value)
  // console.debug(response, "verifyTransaction")
  if (response.status === "success" && response.data.status === "success") {
    overlayLinear.value = false;
  } else {
    useNuxtApp().$notification.show({
      message: t("Messages.NimbleConfigCreateError"),
      type: "error",
    });
    overlayLinear.value = false;
  }
  await RouterPush(`/dashboard`);
}

const openDetails = (data) => {
  nimbleStats.value = true;
  selectedConfiguration.value = data;
}

const manualOverRide = (data) => {
  let q = ["pause"];
  if (data.nimble_is_override) {
    q = ["resume"];
  }
  if (!data.nimble_is_override) {
    // this.$alert.show({
    //   message: this.$t(
    //       "Please make sure that the Nimble instance is offline when the manual override is switched on. If ignored, state integrity will not be guaranteed."
    //   ),
    //   color: "warning",
    //   icon: "mdi-close",
    //   dismiss: "",
    // });
  }
  setTimeout(async () => {
    const confirm = await Confirm.value.open(
        "",
        t("Are you sure this action will nimble transactions, Do you wish to continue?", q),
        {
          color: "success",
        }
    );
    if (confirm) {
      // const payload = {
      //   nimble_id: data.nimble_id,
      //   nimble_is_override: !data.nimble_is_override,
      // };
      const response = await configurationStore.overrideNimbleConfiguration(data.nimble_id, !data.nimble_is_override)
      // const response = await this.$store.dispatch("nimble/nimbleOverride", payload);
      if (response.status === "success") {
        await fetchConfigurations();
      }
    }
  }, 2000);
}

const getNimbleStatus = async (nimbleId) => {
  const response = await configurationStore.getNimbleStatus(nimbleId)
  if (response.status === "success") {
    const nimble = response.data;
    return !!(nimble && nimble.nimble_status === 1);
  }
}
const getClass = (data) => {
  if (data.nimble_is_override) return "grey--text";
  else return "";
}
const workerHandler = (data) => {
  data.data.callback();
}

const deleteConfigurationHop2 = async () => {
  const socket = centrifugeSocket.value;
  const payload = {
    nimble_id: selectedConfiguration.value.nimble_id,
  };
  if (selectedConfiguration.value.nimble_name === configuration_name.value) {
    deleteNimbleForm.value = false;
    const confirm = await Confirm.value.open(
        "",
        t("Are you sure this action will remove nimble configuration, Do you wish to continue?"),
        {
          color: "success",
        }
    );
    if (confirm) {
      const response = await configurationStore.deleteNimbleConfiguration(selectedConfiguration.value.nimble_id)
      if (response.status === "success") {
        deleteableNimbleID.value = selectedConfiguration.value.nimble_id;
        // console.debug(this.deleteableNimbleID, "deleteableNimbleID")
        message.value = t("Deleting Nimble Configuration");
        overlayLinear.value = true;
        transactionMessage.value = "deleting nimble";
        overlayTimer();
        const transactionId = response.data.transaction_id;
        transaction_id.value = transactionId;
        const callbacks = {
          publish: (e) => {
            console.debug("publish::", e);
            if (e.data.status === "success") {
              useNuxtApp().$notification.show({
                message: "Nimble Deleted.",
                type: "success",
              });
              fetchConfigurations();
              clearTimeout(timer);
              // this.routePush(`/dashboard`);
            } else if (e.data.status === "failure" || e.data.status === "pending") {
              overlayTimeOutMessage.value = t(
                  "Ahh..! encountered an error while performing, \n Please try after sometime.",
                  [transactionMessage.value]
              );
              useNuxtApp().$notification.show({
                message: t("Messages.NimbleUpdateFailed", [e.data.message]),
                type: "error",
              });
              subscription.value.unsubscribe();
            }
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
    }
  } else {
    useNuxtApp().$notification.show({message: t("The name you have entered is incorrect."), type: "error"});
  }
}

const editDetails = async (data) => {
  selectedConfiguration.value = data;
  const response = configurationStore.setEditConfiguration(selectedConfiguration.value)
  if (response) {
    await RouterPush("/configuration/edit");
  }
}

const deleteDetails = async (data: any) => {
  selectedConfiguration.value = data;
  // console.debug(data, 'deleteDetails')
  const payload = {
    nimble_id: selectedConfiguration.value.nimble_id,
  };
  const response = await channelStore.channelList(payload)
  if (response.status === "success") {
    // console.debug(response.data, "nimbleChannel")
    if (response.data.length === 0) {
      configuration_name.value = selectedConfiguration.value.nimble_name;
      await deleteConfigurationHop2();
    } else {
      useNuxtApp().$notification.show({
        message: t("Messages.ActiveChannelsUnderNimble"),
        position: "topCenter",
        type: "info",
        timeout: 10000,
        buttons: [
          // true to focus
          [
            "<button>Force Delete</button>",
            (instance, toast) => {
              instance.hide(
                  {
                    transitionOut: "fadeOutUp",
                    onClosing: (instance, toast, closedBy) => {
                      openNimbleSpellCheckForm();
                    },
                  },
                  toast,
                  "buttonName"
              );
            },
          ],
        ],
      });
    }
  }
  // this.settingsCardAnimation(".settingCardAnim-" + this.selected_index, "rev");
  // this.selected_index = null;
}

const refreshDetails = async (data) => {
  const socket = centrifugeSocket.value;
  // const payload = {nimble_id: data.nimble_id};
  const response = await pipelineStore.refreshNimbleCatalog(data.nimble_id)
  if (response.status === "success") {
    message.value = t("Refreshing Nimble");
    transactionMessage.value = "refreshing nimble catalog";
    overlayLinear.value = true;
    overlayTimer();
    const transactionId = response.data.transaction_id;
    transaction_id.value = transactionId;
    const callbacks = {
      publish: (e) => {
        console.debug("publish::", e);
        if (e.data.status === "success") {
          useNuxtApp().$notification.show({
            message: t("Nimble Catalog Refreshed."),
            type: "success",
          });
          clearTimeout(timer);
        } else if (e.data.status === "failure" || e.data.status === "pending") {
          overlayTimeOutMessage.value = t(
              "Ahh..! encountered an error while performing, \n Please try after sometime.",
              [transactionMessage.value]
          );
          useNuxtApp().$notification.show({
            message: t("Messages.RefreshNimbleFailed", [e.data.message]),
            type: "error",
          });
          subscription.value.unsubscribe();
        }
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
  } else {
    useNuxtApp().$notification.show({
      message: t("Error Refreshing Nimble Catalog"),
      type: "error",
    });
  }
}

// beforeRouteLeave(to, from, next) {
//   try {
//     // this.workerIDs.map((worker) => {
//     //   this.worker.postMessage({
//     //     key: worker.key,
//     //     type: "destroy",
//     //   });
//     //   return null;
//     // });
//     if (this.socket instanceof Centrifuge) {
//       if (this.subscribe) {
//         this.subscriptionChannel.unsubscribe();
//         this.subscriptionChannel.removeAllListeners();
//       }
//       this.socket.disconnect();
//     }
//   } catch (error) {
//     if (this.socket instanceof Centrifuge) {
//       this.socket.disconnect();
//     }
//     // console.debug(error);
//   }
//   clearTimeout(timer);
//   next();
// }

// computed: {
//   ModeType() {
//     return ModeType;
//   },
// },
// beforeDestroy() {
//   clearStoreBeforePageLeave();
// },

</script>
