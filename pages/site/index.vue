<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <HeaderText :text="`${t('Customer')} - ${t('Sites')}`" :chips="chips"/>
    <v-row no-gutters class="px-2" align="center">
      <div v-for="route in routes" :key="route.id">
        <RouteCard v-can="route.acl" class="mx-3" :route="route"/>
      </div>
      <div v-for="action in actionButtons" :key="action.id">
        <ActionButton
            v-if="siteView.length > 0"
            v-can="action.acl"
            class="mr-3"
            :action="action"
            @triggerAction="triggerAction"
        />
      </div>
      <v-spacer/>
      <div class="float-right">
        <v-speed-dial
            v-model="fab"
            v-can="'admin_access'"
            direction="bottom"
            open-on-click
            transition="slide-y-transition"
        >
          <template #activator>
            <v-btn v-model="fab" class="route_text" color="routeCardBG1" fab small>
              <v-icon v-if="fab"> mdi-close</v-icon>
              <v-icon v-else>mdi-credit-card-multiple</v-icon>
            </v-btn>
          </template>
          <v-tooltip left :text="t('Update customer')">
            <template #activator="{ props }">
              <v-btn
                  v-can="'user_access'"
                  color="info"
                  fab
                  size="small"
                  style="z-index: 10"
                  v-bind="props"
                  @click="customerEdit(customer)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip left :text="t('Delete customer')">
            <template #activator="{ props }">
              <v-btn
                  v-can="'super_admin_access'"
                  :color="sites.length > 0 ? 'default' : 'error'"
                  fab
                  size="small"
                  style="z-index: 10"
                  v-bind="props"
                  @click="customerDelete(customer)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </v-speed-dial>
      </div>
    </v-row>
    <v-row no-gutters class="px-2" align="center">
      <CustomerCard v-if="Object.keys(customer).length > 0" :customer="customer"/>
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
              {{ t("Sites") }}
              <v-btn elevation="0" variant="text" icon="mdi-reload" size="small" class="mx-2"
                     @click="getSiteStatus">
              </v-btn>
              <v-spacer/>
              <v-btn-toggle v-model="viewType">
                <v-tooltip bottom :text="t('Table')">
                  <template #activator="{ props }">
                    <v-btn v-bind="props" :disabled="viewType === 0" icon="mdi-view-list-outline">
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip bottom :text="t('Cards')">
                  <template #activator="{ props }">
                    <v-btn v-bind="props" :disabled="viewType === 1" icon="mdi-table">
                    </v-btn>
                  </template>
                </v-tooltip>
              </v-btn-toggle>
            </v-row>
          </v-card-title>
          <v-card-subtitle v-show="viewType === 0" class="ma-0">
            <v-row no-gutters>
              <v-spacer/>
              <div class="text-sm-caption font-weight-light text--grey">
                {{ t("Events and Notifications is aggregated for last 24 hr.") }}
              </div>
            </v-row>
          </v-card-subtitle>
          <v-card-text v-if="viewType === 0">
            <v-data-table
                :headers="tableHeaders"
                :items="siteView"
                :style="{ backgroundColor: 'cardBG1' }"
                @click:row="siteDevices"
            >
              <template #[`item.site_name`]="{ item }">
                <span class="font-weight-bold">{{ item.raw.site_name }}</span>
              </template>
              <template #[`item.usecases`]="{ item }">
                <span v-if="item.raw.usecases.length > 0">
                  <v-chip v-for="(usecase, i) in item.raw.usecases" :key="i" small class="mr-1">
                    {{ usecase }}
                  </v-chip>
                </span>
                <span v-else>-</span>
              </template>
              <template #[`item.status`]="{ item }">
                <v-btn variant="outlined" :color="generic.getColor(item.raw.status)" size="x-small">
                  {{ item.raw.status }}
                </v-btn>
              </template>
              <template #[`item.site_alerts`]="{ item }">
                {{ item.raw.site_alerts ? item.raw.site_alerts : 0 }}
              </template>
              <template #[`item.site_notifications`]="{ item }">
                {{ item.raw.site_notifications ? item.raw.site_notifications : 0 }}
              </template>
              <template #[`item.actions`]="{ item }">
                <!--<v-btn id="site_id_view" class="mx-1" small icon color="primary" @click="siteDevices(item)">
                  <v-icon size="20">mdi-open-in-new</v-icon>
                </v-btn>-->
                <v-btn v-can="'user_access'" class="mx-1" color="info" size="20" variant="text"
                       icon="mdi-pencil-outline"
                       @click.stop="siteEdit(item.raw)">
                </v-btn>
                <v-btn
                    v-can="'super_admin_access'"
                    :disabled="item.raw.site_devices && item.raw.site_devices.length > 0"
                    :color="item.raw.site_devices && item.raw.site_devices.length > 0 ? 'default' : 'error'"
                    class="mx-1"
                    size="20"
                    variant="text"
                    icon="mdi-delete-outline"
                    @click.stop="siteDelete(item.raw)"
                >
                </v-btn>
                <v-btn id="site_cam_view" class="mx-1" size="small" color="cardBG2"
                       @click.stop="siteDeviceView(item.raw)">
                  <v-icon class="mr-2" size="20">mdi-camera-control</v-icon>
                  <span class="body-2"> {{ t("Device View") }} </span>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-text v-if="viewType === 1">
            <v-row v-if="siteView.length > 0" no-gutters>
              <div v-for="site in siteView" :key="site.site_id">
                <SiteCard
                    :site="site"
                    :type="['view', 'id', 'status']"
                    :mode="ModeType.none.toString()"
                    @siteDevices="siteDevices"
                    @siteEdit="siteEdit"
                    @siteDelete="siteDelete"
                    @siteDeviceView="siteDeviceView"
                />
              </div>
            </v-row>
            <div v-else>
              <p class="text-center grey--text text-md-h6 ma-2 font-weight-light">
                {{ t("No data available") }}
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="storageDialog" persistent scrollable width="70%">
      <!--      <StoragePurgeCard-->
      <!--          :tree-view="treeView"-->
      <!--          :selectable="selectable"-->
      <!--          @closeDialog="closeDialog"-->
      <!--          @clearStorage="clearStorage"-->
      <!--      />-->
    </v-dialog>
    <Overlay :overlay="overlay"/>
    <ConfirmCard ref="Confirm" :is-default="isDefault"/>
  </div>
</template>

<script lang="ts" setup>
import ConfirmCard from "~/components/Notify/Confirm.vue"
import Overlay from "@/components/Nav/Overlay.vue"
import HeaderText from "~/components/Text/Header.vue"
import RouteCard from "~/components/Cards/Route.vue"
import CustomerCard from "~/components/Cards/Customer.vue";
import ActionButton from "~/components/Cards/ActionButton.vue"
import SiteCard from "~/components/Cards/Site.vue"
import {ModeType} from "~/service/utils/components";

import {useMainStore} from "~/store";
import {useCustomerStore} from "~/store/customer";
import {useSiteStore} from "~/store/site";
import {useStatusStore} from "~/store/status";
import {useAuthStore} from "~/store/auth";
import {useGeneric} from "~/composables/helpers/useGeneric";
import {useSite} from "~/composables/helpers/useSite"
import {RouteQuery, RouterPush} from "~/composables/router/router";

const indexStore = useMainStore()
const customerStore = useCustomerStore()
const siteStore = useSiteStore()
const statusStore = useStatusStore()
const userStore = useAuthStore()
const generic = useGeneric()
const siteHelper = useSite()

const {t} = useI18n()
useHead({
  title: t('Sites')
});
definePageMeta({
  middleware: ["auth", "rbac"],
})
const Confirm = ref()


const breadCrumbItems = ref([
  {
    text: t("Dashboard"),
    disabled: false,
    href: "/dashboard",
    queryItem: null,
  },
  {
    text: t("Customer"),
    disabled: false,
    href: "/customer/id",
    queryItem: null,
  },
  {
    text: t("Sites"),
    disabled: true,
    href: "/site",
    queryItem: null,
  },
])
const routes = ref([
  {
    id: "addSiteRouteCard",
    state: true,
    isNew: true,
    icon: "mdi-plus", // mdi-office-building"
    name: t("Add Site"),
    background_color: "routeCardBG1",
    to: "/site/add",
    acl: "admin_add",
  },
  // {
  //   id: "manageUsersRoureCard",
  //   state: true,
  //   isNew: true,
  //   icon: "mdi-office-building",
  //   name: "Manage Users",
  //   background_color: "#707070",
  //   to: "/user/manage",
  //   role: ["admin"],
  // },
])
const actionButtons = ref([
  {
    id: "a0",
    state: true,
    isNew: true,
    icon: "mdi-delete-outline",
    name: t("Clear Storage"),
    background_color: "actionCard",
    method: "openClearStorageDialog",
    acl: "admin_access",
  },
])
const tableHeaders = ref([
  {
    title: t("Name"),
    align: "start",
    sortable: true,
    key: "site_name",
  },
  {
    title: t("Analytics"),
    align: "start",
    sortable: false,
    key: "usecases",
  },
  {
    title: t("Devices"),
    align: "center",
    sortable: false,
    key: "site_total_devices",
  },
  // {
  //   text: t("Events"),
  //   align: "center",
  //   sortable: false,
  //   value: "site_alerts",
  // },
  {
    title: t("Notifications"),
    align: "center",
    sortable: false,
    key: "site_notifications",
  },
  {
    title: t("Status"),
    align: "center",
    sortable: false,
    width: "60",
    key: "status",
  },
  {
    title: t("Actions"),
    align: "center",
    sortable: false,
    width: "280",
    key: "actions",
  },
])
const storageModuleStats = ref({
  totalStorage: 0,
  totalObjects: 0,
})

const fab = ref(true)
const sites = ref(siteStore.sites)
const overlay = ref(false)
const customer = ref({})
const chips = ref([])
const viewType = ref(0) // card -> 0, table -> 1
const role_key = ref(userStore.loggedInUser.role_key)
const storageDialog = ref(false)
const selectedChannels = ref([])
const siteView = ref([])
const treeView = ref([])
const selectable = ref(false)
const status = ref(statusStore.status)
const isDefault = ref(false)

const storage_server_info = ref({})
const storage_account_info = ref({})
const buckets = ref({})

watch(storageDialog, (n, o) => {
  selectedChannels.value = [];
})

watch(selectedChannels, (n, o) => {
// console.debug("selectedChannels", n, o);
})

let timer;
// const components = {
//   SiteCard: () => import("@/components/Cards/Site.vue"),
//   InfoChip: () => import("@/components/Chips/Info.vue"),
//   ActionButton: () => import("@/components/Cards/ActionButton.vue"),
//   StoragePurgeCard: () => import("@/components/Cards/StoragePurge.vue"),
// };


const setPageDefaults = () => {
  const routeQuery = RouteQuery()
  const pageInfo = {
    id: "siteList",
    title: t("Site List"),
    message: `<p class="body-1">${t("Manage multiple sites,buildings spread across different locations.")}</p>
        <p class="body-1">${t("Manage users and have groups of camera deployed under Sites.")}</p>`,
  };
  generic.setPageInfoData(pageInfo, []);
  generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value)
}
setPageDefaults()


const getSiteStatus = async () => {
  const data = {
    loading: true,
  };
  const response = await siteStore.getAllSiteDevices(data)
  if (response.status === "success") {
    const sites = siteStore.sites;
    siteView.value = sites.map((site) => {
      let totalOnline = 0;
      let totalOffline = 0;
      const usecases = {};
      const _site = {...site};
      const devices = site.site_devices ? [..._site.site_devices] : [];
      if (devices.length > 0) {
        devices.map((device) => {
          const _device = {...device};
          const _channels = device.source_channels ? [...device.source_channels] : [];
          if (_channels.length > 0) {
            _channels.map((channel) => {
              if (channel.is_verified) {
                totalOnline += 1;
              } else {
                totalOffline += 1;
              }
              usecases[channel.usecase_name]
                  ? (usecases[channel.usecase_name] += 1)
                  : (usecases[channel.usecase_name] = 1);
              // usecases.push(channel.usecase_name);
              return null;
            });
          }
          return _device;
        });
      }
      // console.debug(usecases, "usecases");
      if (totalOnline === 0 && totalOffline === 0) {
        _site.status = "healthy";
      } else if (totalOnline === 0) {
        _site.status = "critical - needs attention";
      } else if (totalOffline === 0) {
        _site.status = "healthy";
      } else if (totalOnline > 0 && totalOffline > 0) {
        _site.status = "needs attention";
      }
      const uniqUsecase = [];
      for (const key in usecases) {
        if (key !== "-") {
          uniqUsecase.push(`${key} - ${usecases[key]}`);
        }
      }
      _site.usecases = uniqUsecase;
      return _site;
    });
  }
  // this.runSiteViewInterval();
}

const fetchData = async () => {
  if (customerStore.selectedResolveCustomer && customerStore.selectedResolveCustomer.customer_id) {
    customer.value = customerStore.selectedResolveCustomer;
    sites.value = siteStore.sites;
    if (role_key.value === "super_admin" || role_key.value === "admin") {
      if (status.value.storage_module) {
        storageDetails();
        constructTreeView();
      }
    }
    await getSiteStatus();
  }
}
fetchData()

const storageDetails = () => {
  const data = siteHelper.storageInformation();
  storage_server_info.value = data.storage_server_info
  storage_account_info.value = data.storage_account_info
  buckets.value = data.buckets
}
const constructTreeView = () => {
  const data = siteHelper.storageTreeView(sites.value, buckets.value);
  storageModuleStats.value = data.storageModuleStats
  treeView.value = data.treeView
}


const siteEdit = (site) => {
  const response = siteStore.setEditSite(site)
  if (response) {
    RouterPush(`/site/edit?sid=${site.site_id}`);
  }
}
const siteDelete = async (site) => {
  isDefault.value = false;
  const message =
      '<span style="color: #B71C1C;' +
      "background-color: #FFEBEE;" +
      "padding: 4px;" +
      "border-radius: 4px;" +
      'font-weight: 400;"><b>' +
      site.site_name +
      "</b></span> ?</div>";
  const confirm = await Confirm.value.open("Delete", t("Are you sure you want to delete", [message]), {
    color: "success",
  });
  if (confirm) {
    const payload = {site_id: site.site_id};
    const response = await siteStore.deleteSite(payload)
    if (response) {
      await getSiteStatus();
    }
  }
}

const siteDevices = async (site) => {
  siteStore.setSite(site)
  siteStore.setSiteID(site.site_id)
  await RouterPush(`/site/id?sid=${site.site_id}`);
}
const siteDeviceView = (site) => {
  // console.debug(site, "site")
  RouterPush(`/site/view?sid=${site.site_id}`);
}

const clearStorage = async (selectedChannels) => {
  isDefault.value = true;
  const confirm = await Confirm.value.open(
      "Delete",
      t(
          "This process clear storage takes some time. If there are any active alert(s) they will be de-activated and re-activated once the storage is cleared. Are you sure to go ahead with this ?"
      ),
      {
        color: "success",
      }
  );
  if (confirm) {
    overlay.value = true;
    const response = await siteHelper.purgeStorage(selectedChannels);
    await fetchData()
    storageDialog.value = false;
    overlay.value = false;
  }
}

const openClearStorageDialog = () => {
  storageDialog.value = true;
}
const triggerAction = (data) => {
  data.method();
}
const closeDialog = () => {
  selectedChannels.value = [];
  storageDialog.value = false;
}
const customerEdit = async (data) => {
  // openResolve.value = false;
  const response = await customerStore.setEditCustomer(data)
  if (response) {
    await RouterPush(`/customer/edit?cid=${data.customer_id}`);
  }
}

const customerDelete = async (data) => {
  if (sites.value.length > 0) {
    useNuxtApp().$notification.show({
      title: "Warning",
      message: t("Please delete all sites before deleting customer"),
      type: "warning",
    });
  } else {
    const message =
        '<span style="color: #B71C1C;' +
        "background-color: #FFEBEE;" +
        "padding: 4px;" +
        "border-radius: 4px;" +
        'font-weight: 400;">' +
        data.customer_name +
        "</span> ?</div>";
    const alert = await Confirm.value.open("", t("Are you sure you want to delete", [message]), {
      color: "success",
    });
    if (alert) {
      const payload = {
        customer_id: data.customer_id,
      };
      const response = await customerStore.deleteCustomer(payload)
      if (response) {
        // await this.getAllCustomers();
      }
    }
  }
}


// beforeDestroy() {
//   this.clearStoreBeforePageLeave();
//   clearTimeout(timer);
// },
</script>

<style lang="scss" scoped>
.site-add-title {
  font-weight: 24;
}

.card-icon {
  text-align: center;
  position: absolute;
  top: -10%;
  left: 42%;
}
</style>
