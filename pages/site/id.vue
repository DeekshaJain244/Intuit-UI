<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <HeaderText :text="t('Site')" :chips="chips"/>
    <v-row align="center" class="px-2" no-gutters>
      <div v-for="route in routes" :key="route.id">
        <RouteCard v-can="route.acl" :route="route" class="mr-2"/>
      </div>
      <div v-for="action in actionButtons" :key="action.id">
        <ActionButton
            v-if="devices.length > 0"
            v-can="action.acl"
            :action="action"
            class="mr-2"
            @triggerAction="triggerAction"
        />
      </div>
      <!--      <v-switch-->
      <!--        label="Show preview"-->
      <!--        class="mr-2"-->
      <!--        color="routeCardBG1"-->
      <!--        @change="previewDialog ? (previewDialog = false) : (previewDialog = true)"-->
      <!--      />-->
      <v-spacer/>
      <div class="float-right">
        <v-speed-dial
            v-model="fab"
            v-can="'user_access'"
            direction="bottom"
            open-on-click
            transition="slide-y-transition"
        >
          <template #activator>
            <v-btn v-model="fab" class="route_text" color="routeCardBG1" fab small>
              <v-icon v-if="fab"> mdi-close</v-icon>
              <v-icon v-else>mdi-office-building-marker</v-icon>
            </v-btn>
          </template>
          <v-tooltip left>
            <template #activator="{ on, attrs }">
              <v-btn
                  v-can="'user_access'"
                  color="info"
                  fab
                  small
                  style="z-index: 10"
                  v-bind="attrs"
                  @click="siteEdit"
                  v-on="on"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>{{ t("Update site") }}</span>
          </v-tooltip>
          <v-tooltip left>
            <template #activator="{ on, attrs }">
              <v-btn
                  v-can="'super_admin_access'"
                  :color="devices.length > 0 ? 'default' : 'error'"
                  fab
                  small
                  style="z-index: 10"
                  v-bind="attrs"
                  @click="siteDelete"
                  v-on="on"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>{{ t("Delete site") }}</span>
          </v-tooltip>
        </v-speed-dial>
      </div>
    </v-row>
    <v-row align="center" class="px-2" justify="center" no-gutters>
      <v-col cols="8">
        <v-card v-can="'viewer_access'" color="transparent" elevation="0">
          <SiteCard :site="site" :type="type" :mode="ModeType.info.toString()"/>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" elevation="0" max-width="740" color="transparent">
          <v-slide-group class="pa-2" active-class="success" show-arrows>
            <v-slide-item v-for="configuration in siteConfigurations" :key="configuration.nimble_id">
              <DeviceNimbleCard
                  v-if="configuration && Object.keys(configuration).length > 0"
                  :configuration="configuration"
              />
            </v-slide-item>
          </v-slide-group>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-can="'viewer_access'" align="center" class="px-2" no-gutters>
      <ScoreCard
          :score-icon="'mdi-video'"
          :score-title="t('Total Devices')"
          :score-data="site.site_total_devices ? site.site_total_devices : 0"
          :tooltip="''"
      />
      <!-- <ScoreCard-->
      <!--   :score-icon="'mdi-alert-octagon-outline'"-->
      <!--   :score-title="$t('Total Events')"-->
      <!--   :score-data="site.site_alerts ? site.site_alerts : 0"-->
      <!--   :tooltip="''"-->
      <!-- />-->
      <ScoreCard
          :score-icon="'mdi-mail'"
          :score-title="t('Total Notifications')"
          :score-data="site.site_notifications ? site.site_notifications : 0"
          :tooltip="''"
      />
      <ScoreCard
          :score-icon="'mdi-harddisk'"
          :score-title="t('Data Storage')"
          :score-data="formatBytes(storageModuleStats.totalStorage)"
          :tooltip="''"
      />
    </v-row>
    <v-row no-gutters class="px-2" align="center">
      <v-col cols="12">
        <v-card class="ma-2" color="cardBG3" elevation="0" max-height="800">
          <v-card-title>
            {{ t("Devices") }}
            <v-btn elevation="0" small class="mx-2 mt-1" icon @click="getSiteDeviceStatus">
              <v-icon size="20">mdi-reload</v-icon>
            </v-btn>
            <v-spacer/>
            <v-spacer/>
            <div class="mt-4 text-sm-caption grey--text">
              {{ t("Events and Notifications is aggregated for last 24 hr.") }}
            </div>
            <!--<v-btn @click="downloadXLSX">Download Excel</v-btn>-->
          </v-card-title>
          <v-card-text>
            <v-data-table
                :headers="tableHeaders"
                :items="siteDevices"
                :item-key="'device_id'"
                color="cardBG3"
                :loading="overlay"
                @click:row="deviceSources"
            >
              <template #[`item.device_name`]="{ item }">
                <span class="font-weight-bold text-truncate">{{ item.device_name }}</span>
              </template>
              <template #[`item.channels`]="{ item }">
                <span v-if="item.source_channels && item.source_channels.length > 0">
                  <v-chip v-for="channel in getUsecaseCount(item.source_channels)" :key="channel" small class="mr-1">
                    {{ channel }}
                  </v-chip>
                </span>
                <span v-else>-</span>
              </template>
              <template #[`item.device_type`]="{ item }">
                <DeviceTypeChip
                    :type="item.device_type"
                    :mode="ModeType.legendIcon"
                    :is-little="false"
                    class="ma-0 mr-2"
                />
              </template>
              <template #[`item.actions`]="{ item }">
                <v-btn
                    id="site_id_edit"
                    v-can="'user_edit'"
                    :disabled="!(item.source_channels && item.source_channels.length > 0)"
                    class="mx-1"
                    color="info"
                    icon
                    small
                    @click.stop="deviceEdit(item)"
                >
                  <v-icon size="20">mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn
                    id="site_id_delete"
                    v-can="'admin_delete'"
                    class="mx-1"
                    color="error"
                    icon
                    small
                    @click.stop="deviceDelete(item)"
                >
                  <v-icon size="20">mdi-delete-outline</v-icon>
                </v-btn>
              </template>
              <template #[`item.status`]="{ item }">
                <!--<v-btn outlined :color="getChannelsStatus(item.source_channels)[0]" x-small>
                {{ getChannelsStatus(item.source_channels)[1] }}
              </v-btn>-->
                <span v-html="getChannelsStatus(item.source_channels)"></span>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <v-card class="ma-2" color="cardBG3" elevation="0" max-height="800">
          <v-card-title>
            {{ t("Rules") }}
            <v-btn elevation="0" small class="mx-2 mt-1" icon @click="fetchRules">
              <v-icon size="20">mdi-reload</v-icon>
            </v-btn>
            <v-spacer/>
          </v-card-title>
          <v-card-text>
            <RuleTable :rules="rules" :site="site" :users="siteUsers" @fetchRules="fetchRules"/>
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
    <OverlayLinear :message="t('Deleting Device')" :over-lay-timeout="overLayTimeout" :overlay="overlayLinear"/>
    <OverlayCard :overlay="overlay"/>
    <ConfirmCard ref="Confirm" :is-default="isDefault"/>
  </div>
</template>

<script>
import UtilSocket from "~/mixins/utilSocket.js";
import UtilGeneric from "~/mixins/utilGeneric.js";
import UtilStatus from "~/mixins/utilStatus.js";
import UtilSite from "~/mixins/utilSite.js";
import UtilDate from "~/mixins/utilDate";
import {Passthru, TimerCountDown} from "~/service/utils/constants";
import {ModeType} from "~/service/utils/components";
import {useStatusStore} from "~/store/status";
import {useAuthStore} from "~/store/auth";
import {useSiteStore} from "~/store/site";


const statusStore = useStatusStore()
const userStore = useAuthStore()
const siteStore = useSiteStore()

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
    text: "",
    disabled: true,
    href: "/site/id",
    queryItem: "sid",
  },
])
const routes = ref([
  {
    id: "addDeviceRouteCard",
    isNew: true,
    icon: "mdi-plus",
    name: t("Add Device"),
    background_color: "routeCardBG1",
    to: "/device/add",
    acl: "admin_add",
    state: this.$store.state.configuration.configurations.length !== 0,
  },
  {
    id: "addRuleRouteCard",
    isNew: true,
    icon: "mdi-plus",
    name: t("Add Rule"),
    background_color: "routeCardBG1",
    to: `/site/rule/add`, // ?sid=${site.site_id}
    acl: "admin_add",
    state: devices.length !== 0,
  },
])
const actionButtons = ref([
  {
    id: "clearStorageActionButton",
    state: true,
    isNew: true,
    icon: "mdi-delete-outline",
    name: t("Clear Storage"),
    background_color: "actionCard",
    method: "openClearStorageDialog",
    acl: "admin_access",
  },
  {
    id: "siteViewActionButton",
    state: true,
    isNew: true,
    icon: "mdi-camera-control",
    name: t("Device View"),
    background_color: "actionCard",
    method: "siteDeviceView",
    acl: "viewer_access",
  },
  // {
  //   id: "siteSchedulerRuleActionCard",
  //   isNew: true,
  //   icon: "mdi-clock-outline",
  //   name: t("Scheduler"),
  //   background_color: "actionCard",
  //   method: "routeToRuleSchedule",
  //   acl: "admin_add",
  //   state: true,
  // },
])

const tableHeaders = ref([
  {
    title: t("Type"),
    align: "start",
    sortable: false,
    key: "device_type",
    width: "80",
  },
  {
    title: t("Name"),
    align: "start",
    key: "device_name",
  },
  {
    title: t("Analytics"),
    align: "start",
    sortable: false,
    key: "channels",
  },
  // {
  //   text: t("Events"),
  //   align: "center",
  //   sortable: false,
  //   key: "device_alerts",
  // },
  {
    title: t("Notifications"),
    align: "center",
    sortable: false,
    key: "device_notifications",
    width: "260",
  },
  {
    title: t("Status"),
    align: "center",
    sortable: false,
    width: "60",
    key: "status",
  },
  {
    title: t("no-text"),
    align: "center",
    sortable: false,
    width: "30",
    key: "sources",
  },
  {
    title: t("Actions"),
    align: "center",
    sortable: false,
    width: "120",
    key: "actions",
  },
])
const storageModuleStats = ref({
  totalStorage: 0,
  totalObjects: 0,
})

const overlay = ref(true)
const overlayLinear = ref(false)
const devices = ref()
const site = ref(siteStore.site)
const testDeviceTags = ref([])
const role_key = ref(userStore.loggedInUser.role_key)
const type = ref(["view", "map"])
const customer = ref({})
const sources = ref({})
const nimbleSources = ref([])
const sourceMap = ref({})
const tab = ref(0)
const siteSourceMapping = ref([])
const chips = ref([])
const socket = ref([])
const subscriptionChannel = ref("")
const overLayTimeout = ref(false)
const fab = ref(false)
const channels = ref([])
const channelStorage = ref([])
const storageDialog = ref(false)
const previewDialog = ref(false)
const selectedChannels = ref([])
const siteDevices = ref([])
const treeView = ref([])
const buckets = ref([])
const selectable = ref(false)
const status = ref(statusStore.status)
const isDefault = ref(false)
const rules = ref([])
const siteConfigurations = ref([])
const siteUsers = ref([])

let timer;
const components = {
  ConfirmCard: () => import("@/components/Notify/Confirm.vue"),
  OverlayCard: () => import("@/components/Nav/Overlay.vue"),
  OverlayLinear: () => import("@/components/Nav/OverlayLinear.vue"),
  SiteCard: () => import("@/components/Cards/Site.vue"),
  SourceToDeviceMapping: () => import("@/components/Cards/SourceToDeviceMapping.vue"),
  InfoChip: () => import("@/components/Chips/Info.vue"),
  RouteCard: () => import("@/components/Cards/Route.vue"),
  ActionButton: () => import("@/components/Cards/ActionButton.vue"),
  StoragePurgeCard: () => import("@/components/Cards/StoragePurge.vue"),
  HeaderText: () => import("@/components/Text/Header.vue"),
  ScoreCard: () => import("@/components/Cards/Score.vue"),
  RuleTable: () => import("@/components/Table/Rule.vue"),
  DeviceTypeChip: () => import("@/components/Chips/DeviceType.vue"),
  DeviceNimbleCard: () => import("@/components/Cards/DeviceNimble.vue"),
};

export default {
  name: "SiteID",
  components,
  mixins: [UtilSocket, UtilGeneric, UtilStatus, UtilSite, UtilDate],
  middleware: ["rbac", "usecases"],
  data() {
    const site = this.$store.state.site.site;
    const devices = this.$store.state.site.siteDevices;
    return {};
  },
  async fetch() {
    this.initSocket();
    // console.debug(this.$store.state.configuration.configurations, "configurations");
    const siteConfigurations = [];
    const devices = this.$store.state.site.siteDevices;
    const configurations = this.$store.state.configuration.configurations;
    devices.map((device) => {
      if (siteConfigurations.length === 0) {
        const _config = configurations.find((config) => {
          return config.nimble_id === device.nimble_id;
        });
        if (_config) {
          siteConfigurations.push(_config);
        }
        // nimbleIDs.push(device.nimble_id);
      } else {
        const _config = siteConfigurations.find((config) => {
          return config.nimble_id === device.nimble_id;
        });
        if (!_config) {
          const _config = configurations.find((config) => {
            return config.nimble_id === device.nimble_id;
          });
          if (_config) {
            siteConfigurations.push(_config);
          }
          // nimbleIDs.push(device.nimble_id);
        }
      }
      return null;
    });
    this.siteConfigurations = siteConfigurations;
    // console.debug(this.siteConfigurations, "this.siteConfigurations");
    // configurations.map((config) => {
    //   configurations.map((id) => {
    //     if (config.nimble_id === id) {
    //     }
    //   });
    // });

    if (this.role_key === "super_admin") {
      const pageInfo = {
        id: "devicesList",
        title: this.$t("Onboard New Camera"),
        message: `<p class="body-1">${this.$t("Camera location + reachable over web interface.")}</p>
        <p class="body-1">${this.$t("Camera is onVIF + RTSP feed with H.264 encode.")}</p>
        <p class="body-1">${this.$t("Nimble running on edge or in the camera subnet.")}</p>`,
      };
      this.setPageInfoData(pageInfo, null);
    }
    const query = this.routeQuery();
    const routes = this.routes;
    this.site = this.$store.state.site.site;
    this.status = this.$store.state.status;
    this.constructBreadcrumbs(query, this.breadCrumbItems);
    this.routes = routes.map((route) => {
      route.to = route.to + `?sid=${this.site.site_id}`;
      return {...route};
    });
    if (this.role_key === "super_admin" || this.role_key === "admin") {
      // if (this.status.storage_module) {
      await this.storageDetails();
      await this.constructTreeView();
      // }
    }
    this.customer = this.$store.state.resolve;
    this.chips = [];
    this.chips.push({
      id: "c1",
      name: "Customer",
      value: this.customer.customer_name,
    });
    this.chips.push({id: "c2", name: "Site", value: this.site.site_name});
    this.chips.push({id: "c3", name: TimerCountDown, value: this.site.site_address.site_timezone});
    this.siteDevices = this.$store.state.site.siteDevices;
    this.rules = this.$store.state.rule.rules;
    if (this.rules.length > 0) {
      const payload = {
        site_id: this.site.site_id,
      };
      const response = await this.$store.dispatch("user/getUsersBySiteID", payload);
      if (response.status === "success") {
        // console.debug(response.data, "response.data");
        this.siteUsers = response.data;
      }
    }
    this.overlay = false;
  },
  head: {
    title: "Site",
  },
  computed: {
    ModeType() {
      return ModeType;
    },
  },
  watch: {
    tab: {
      async handler(n, o) {
        if (n === 1) {
          await this.refreshSourceToDeviceMap();
        }
      },
    },
  },
  beforeDestroy() {
    this.clearStoreBeforePageLeave();
    clearTimeout(timer);
  },
  methods: {
    selectTag(tag) {
    },
    async siteEdit() {
      const response = await this.$store.dispatch("site/setEditSite", this.site);
      if (response) {
        await this.routePush(`/site/edit?sid=${this.site.site_id}`);
      }
    },
    async siteDelete() {
      if (this.devices.length > 0) {
        this.$notification.show({
          message: `Cannot delete <b>${this.site.site_name}</b>, contains devices.`,
          position: "topCenter",
          type: "info",
        });
      } else {
        this.isDefault = false;
        const message =
            '<span style="color: #B71C1C;' +
            "background-color: #FFEBEE;" +
            "padding: 4px;" +
            "border-radius: 4px;" +
            'font-weight: 400;"><b>' +
            this.site.site_name +
            "</b></span> ?</div>";
        const confirm = await this.$refs.Confirm.open("Delete", this.$t("Are you sure you want to delete", [message]), {
          color: "success",
        });
        if (confirm) {
          this.overlay = true;
          const payload = {site_id: this.site.site_id};
          let response = await this.$store.dispatch("site/deleteSite", payload);
          if (response) {
            response = await this.$store.dispatch("removeCustomerSite", this.site.site_id);
            if (response) {
              await this.$store.dispatch("setDeleteResource", true);
            }
            // response = await this.$store.dispatch("site/getAllSites")
            // if (response) {
            //   this.sites = this.$store.state.site.sites
            await this.routePush("/site");
            // }
          }
          this.overlay = false;
        }
      }
    },
    async deviceEdit(device) {
      this.overlay = true;
      let response = await this.$store.dispatch("device/getDeviceByID", device.device_id);
      if (response) {
        const _device = this.$store.state.device.device;
        response = await this.$store.dispatch("device/setEditDevice", _device);
        if (response) {
          await this.routePush(`/device/edit?sid=${this.site.site_id}&did=${device.device_id}`);
        }
      }
      this.overlay = false;
    },
    async deviceDelete(device) {
      this.isDefault = false;
      const message =
          '<span style="color: #B71C1C;' +
          "background-color: #FFEBEE;" +
          "padding: 4px;" +
          "border-radius: 4px;" +
          'font-weight: 400;"><b>' +
          device.device_name +
          "</b></span> ?</div>";
      const confirm = await this.$refs.Confirm.open("", this.$t("Are you sure you want to delete", [message]), {
        color: "success",
      });
      if (confirm) {
        // const nimbleStatus = await this.nimbleStatus(device.nimble_id, false);
        // if (nimbleStatus) {
        const payload = {device_id: device.device_id};
        const response = await this.$store.dispatch("device/deleteDevice", payload);
        // console.debug(response, "response, ");
        if (response.status === "success" && response.data !== null) {
          this.overlayLinear = true;
          this.overlayTimer();
          this.transaction_id = response.data.transaction_id;
          // console.debug(
          //   response,
          //   response.data.transaction_id,
          //   this.socket,
          //   "transaction_id"
          // );
          const socket = this.socket;
          const callbacks = {
            publish: async (e) => {
              // console.debug("publish::", e);
              clearTimeout(timer);
              if (e.data.status === "success") {
                this.$notification.show({
                  message: "Device deleted",
                  type: "success",
                });
                await this.$store.dispatch("setDeleteResource", true);
                await this.getSiteDevices();
                this.overlayLinear = false;
              } else if (e.data.status === "failure" || e.data.status === "pending") {
                this.$notification.show({
                  message: "Device delete failed - " + e.data.message,
                  type: "error",
                });
                // setTimeout(() => {
                //   this.$router.back();
                // }, 500);
                this.subscriptionChannel.unsubscribe();
                await this.getSiteDevices();
                this.overlayLinear = false;
              }
              clearTimeout(timer);
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
              this.subscribe = true;
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
              this.subscribe = false;
              console.debug("unsubscribe::", context);
            },
          };
          this.subscriptionChannel = socket.subscribe(this.transaction_id, callbacks);
        } else {
          await this.getSiteDevices();
        }
        // } else {
        // 	this.$notification.show({
        // 		message: this.$t("Messages.NimbleServerDown"),
        // 		type: "warning",
        // 		position: "topCenter",
        // 	});
        // }
      }
    },
    overlayTimer() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.overLayTimeout = true;
      }, 40000);
    },
    async verifyTransaction(resp) {
      const response = await this.$store.dispatch("trace/verifyTransactionByUUID", this.transaction_id);
      // console.debug(response, "verifyTransaction")
      if (response.status === "success" && response.data.status === "success") {
        this.overlayLinear = false;
        await this.getSiteDevices();
      } else {
        this.$notification.show({
          message: "Device Delete failed",
          type: "error",
        });
        this.overlayLinear = false;
      }
    },
    async deviceSources(device) {
      this.overlay = true;
      // await this.$store.dispatch("device/setDevice", device);
      await this.routePush(`/device/id?sid=${this.site.site_id}&did=${device.device_id}`);
      this.overlay = false;
    },
    resetPosition() {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo(this.center);
      });
    },
    async getSiteDevices() {
      const siteId = this.site.site_id;
      const response = await this.$store.dispatch("site/getSiteDevices", siteId);
      if (response) {
        // await this.getSiteDeviceStatus();
        if (this.role_key === "super_admin" || this.role_key === "admin") {
          // this.type.push("storage");
          await this.storageDetails();
          await this.constructTreeView();
        }
        // this.devices = this.$store.state.device.devices;
        this.siteDevices = this.$store.state.site.siteDevices;
      }
    },
    async refreshSourceToDeviceMap() {
      const response = await this.$store.dispatch("device/getSourceMappingWithSite", this.site.site_id);
      if (response) {
        // console.debug(this.$store.state.device.site_source_mapping, "refreshSourceToDeviceMap")
        if (this.$store.state.device.site_source_mapping) {
          this.nimbleSources = this.$store.state.device.site_source_mapping;
        } else {
          this.nimbleSources = [];
        }
      }
      await this.getSiteDevices();
    },
    siteDeviceView() {
      this.routePush(`/site/view?sid=${this.site.site_id}`);
    },
    async storageDetails() {
      await this.storageInformation();
    },
    removeSelectedChannels(i) {
      this.selectedChannels.splice(i, 1);
    },
    async clearStorage(selectedChannels) {
      this.isDefault = true;
      const confirm = await this.$refs.Confirm.open(
          "Delete storage",
          this.$t(
              "This process clear storage takes some time. If there are any active alert(s) they will be de-activated and re-activated once the storage is cleared. Are you sure to go ahead with this ?"
          ),
          {
            color: "success",
          }
      );
      if (confirm) {
        this.overlay = true;
        await this.purgeStorage(selectedChannels);
        await this.getSiteDevices();
        this.storageDialog = false;
        this.overlay = false;
      }
    },
    async getSiteDeviceStatus() {
      const siteId = this.site.site_id;
      const response = await this.$store.dispatch("site/getSiteDevices", siteId);
      if (response) {
        const devices = [...this.$store.state.site.siteDevices];
        if (devices && devices.length > 0) {
          this.siteDevices = devices.map((device) => {
            const _device = {...device};
            const channels = _device.source_channels;
            if (channels) {
              const _channels = [...channels];
              if (_channels.length > 0) {
                let totalOnline = 0;
                let totalOffline = 0;
                _channels.map((channel) => {
                  if (channel.is_verified) {
                    totalOnline += 1;
                  } else {
                    totalOffline += 1;
                  }
                  return channel;
                });
                if (totalOnline === 0 && totalOffline === 0) {
                  device.status = "healthy";
                } else if (totalOnline === 0) {
                  _device.status = "critical - needs attention";
                } else if (totalOffline === 0) {
                  _device.status = "healthy";
                } else if (totalOnline > 0 && totalOffline > 0) {
                  _device.status = "needs attention";
                }
              }
            } else {
              _device.status = "no channels";
            }
            return _device;
          });
        } else {
          clearTimeout(timer);
          this.siteDevices = [];
        }
      }
      // this.runSiteViewInterval();
    },
    async constructTreeView() {
      const siteView = this.$store.state.site.siteView;
      await this.storageTreeView(siteView);
    },
    // runSiteViewInterval() {
    //   const siteId = this.site.site_id;
    //   timer = setTimeout(async () => {
    //     const response = await this.$store.dispatch("site/getSiteDevices", siteId);
    //     if (response) {
    //       await this.getSiteDeviceStatus();
    //     }
    //   }, 60000);
    // },
    getChannelsStatus(channels) {
      // status green if all channels are online.
      // status gold if any one channel is offline.
      // status red if all the channels are offline.
      const theme = this.$vuetify.theme.dark ? "dark" : "light";
      let status = "error";
      let message = "channels not found";
      if (channels && channels.length > 0) {
        const totalChannels = channels.length;
        const filteredChannelsONLINE = channels.filter((channel) => {
          return channel.is_verified && channel;
        });
        const filteredChannelsOFFLINE = channels.filter((channel) => {
          return !channel.is_verified && channel;
        });
        if (totalChannels === filteredChannelsONLINE.length) {
          status = "success";
          message = "healthy";
        } else if (filteredChannelsOFFLINE.length >= 1 && filteredChannelsOFFLINE.length !== totalChannels) {
          status = "warning";
          message = "needs attention";
        } else if (totalChannels === filteredChannelsOFFLINE.length) {
          status = "error";
          message = "critical";
        }
        return `<button type="button" class="v-btn v-btn--outlined theme--${theme} v-size--x-small ${status}--text">
                    <span class="v-btn__content">${message}</span></button>`;
      }
    },
    getChannelsCount(channels) {
      if (channels && channels.length > 0) {
        const filteredChannels = channels.filter((channel) => {
          return channel.usecase_key !== Passthru;
        });
        if (filteredChannels.length === 0) {
          return "-";
        }
        return filteredChannels.length;
      }
    },
    getUsecaseCount(channels) {
      const usecases = {};
      channels.map((channel) => {
        usecases[channel.usecase_name] ? (usecases[channel.usecase_name] += 1) : (usecases[channel.usecase_name] = 1);
        return channel;
      });
      const uniqUsecase = [];
      for (const key in usecases) {
        if (key !== "-") {
          uniqUsecase.push(`${key} - ${usecases[key]}`);
        }
      }
      return uniqUsecase;
    },
    openClearStorageDialog() {
      this.storageDialog = true;
    },
    triggerAction(data) {
      this[data.method]();
    },
    closeDialog() {
      this.selectedChannels = [];
      this.storageDialog = false;
    },
    addRule() {
      this.routePush("/site/rule/add");
    },
    async fetchRules() {
      const response = await this.$store.dispatch("rule/getAllRules", this.site.site_id);
      if (response.status === "success") {
        this.rules = this.$store.state.rule.rules;
      }
    },
    routeToRuleSchedule() {
      this.routePush(`/site/rule/scheduler?sid=${this.site.site_id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-icon {
  text-align: center;
  position: absolute;
  top: -10%;
  left: 36%;
}

.camera-add-title {
  font-weight: 24;
  text-align: center;
}

.camera-add-subtitle {
  text-align: center;
  font-weight: 8;
}
</style>
