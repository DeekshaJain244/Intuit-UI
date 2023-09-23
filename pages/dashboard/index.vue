<template>
  <div>
    <HeaderText :text="'Dashboard'"/>
    <v-card
        class="align-content-center justify-space-around"
        :style="{ marginLeft: '10%', marginRight: '10%' }"
        variant="outlined"
        :color="'#548FEE11'"
    >
      <!--      <v-progress-linear v-if="overlay" color="white" indeterminate></v-progress-linear>-->
      <v-row v-can="'viewer_access'" no-gutters align="center" justify="center" class="rounded-lg">
        <v-col cols="auto">
          <v-row no-gutters class="px-6" align="center" justify="center">
            <div v-for="(item, i) in dashboardItems" :key="i">
              <v-menu
                  v-if="item.link === 'context_menu'"
                  offset-y
                  transition="scroll-y-transition"
                  open-on-hover
              >
                <template #activator="{ props }">
                  <v-card
                      :id="item.id"
                      v-can="item.acl"
                      class="pa-4 ma-6 rounded-lg gradient-border zoom"
                      color="cardBG1"
                      height="120"
                      width="180"
                      v-bind="props"
                  >
                    <div style="text-align: center">
                      <v-avatar
                          v-if="Object.keys(item).includes('animation') && item.animation"
                          :class="`border-${i}`"
                          color="iconBackground"
                          size="50"
                      >
                        <v-icon color="iconColor" size="30">{{ item.icon }}</v-icon>
                      </v-avatar>
                      <v-avatar
                          v-else
                          :class="`border-${i}`"
                          color="iconBackground"
                          size="50"
                          @mouseenter="animate.spinAnimation(`.border-${i}`)"
                      >
                        <v-icon color="iconColor" size="30">{{ item.icon }}</v-icon>
                      </v-avatar>
                      <div class="mt-2">{{ item.title }}</div>
                      <!--                      <div class="my-1 caption">{{ item.subtitle }}</div>-->
                    </div>
                  </v-card>
                </template>
                <!--                <v-list color="layoutBar" dense class="gradient-border">-->
                <!--                  <div v-for="(c, j) in item.context_menu" :key="j">-->
                <!--                    <v-list-item :to="localePath(c.to)">-->
                <!--                      <v-list-item-title>-->
                <!--                        <v-icon color="navIconText" size="22">{{ c.icon }}</v-icon>-->
                <!--                        <span class="ml-2 link_title_text">{{ c.title }}</span>-->
                <!--                      </v-list-item-title>-->
                <!--                    </v-list-item>-->
                <!--                  </div>-->
                <!--                </v-list>-->
              </v-menu>
              <v-card
                  v-else
                  :id="item.id"
                  v-can="item.acl"
                  class="pa-4 ma-6 rounded-lg gradient-border zoom"
                  color="cardBG1"
                  height="120"
                  width="180"
                  hover
                  @click="routePush(item.link)"
              >
                <div style="text-align: center">
                  <v-avatar
                      v-if="Object.keys(item).includes('animation') && item.animation"
                      :class="`border-${i}`"
                      color="iconBackground"
                      size="50"
                  >
                    <v-icon color="iconColor" size="30">{{ item.icon }}</v-icon>
                  </v-avatar>
                  <v-avatar
                      v-else
                      :class="`border-${i}`"
                      color="iconBackground"
                      size="50"
                      @mouseenter="animate.spinAnimation(`.border-${i}`)"
                  >
                    <v-icon color="iconColor" size="30">{{ item.icon }}</v-icon>
                  </v-avatar>
                  <div class="mt-2">{{ item.title }}</div>
                  <!--  <div class="my-1 caption">{{ item.subtitle }}</div>-->
                </div>
              </v-card>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import {BreadCrumbItems} from "~/types";
import HeaderText from "~/components/Text/Header.vue"

// Next are the script level
import {storeToRefs} from "pinia";
import {RouteQuery, RouterPush} from "~/composables/router/router";
import {DashboardItems} from "~/interfaces/props";
import {useCustomerStore} from "~/store/customer";
import {useMainStore} from "~/store";
import {useLicenseStore} from "~/store/license";
import {useConfigurationStore} from "~/store/configurations";
import {useGeneric} from "~/composables/helpers/useGeneric";
import {useAnimate} from "~/composables/useAnimate";

const {t} = useI18n()
useHead({
  title: t('Dashboard')
});
definePageMeta({
  middleware: ["auth", "rbac"],
})

const indexStore = useMainStore()
const licenseStore = useLicenseStore()
const customerStore = useCustomerStore()
const configStore = useConfigurationStore()

const generic = useGeneric()
const animate = useAnimate()


const {customers} = storeToRefs(customerStore)

const response = await customerStore.getCustomers()
if (response.status === "success") {
  console.debug(customers, "customers")
}

const dashboardItems = ref<DashboardItems[]>([
  {
    id: "site",
    title: "Sites",
    icon: "mdi-office-building-marker-outline",
    subtitle: "",
    link: "/site",
    acl: "viewer_nav",
  },
  {
    id: "deviceView",
    title: "Device View",
    icon: "mdi-camera-control",
    subtitle: "",
    link: "/site/view",
    acl: "viewer_nav",
  },
  {
    id: "analyticView",
    title: "Analytic View",
    icon: "mdi-poll",
    subtitle: "",
    link: "/site/view/analytic",
    acl: "viewer_nav",
  },
  {
    id: "mapView",
    title: "Map View",
    icon: "mdi-map",
    subtitle: "",
    link: "/site/view/map",
    acl: "viewer_nav",
  },
  {
    id: "configurations",
    title: "Configurations",
    icon: "mdi-hammer-wrench",
    subtitle: "",
    link: "/configuration",
    acl: "super_nav",
  },
  {
    id: "deployment",
    title: "Deployment",
    icon: "mdi-office-building-cog-outline",
    subtitle: "",
    link: "/deployment",
    acl: "admin_nav",
  },
  {
    id: "alerts",
    title: "Alerts",
    icon: "mdi-alert-rhombus-outline",
    subtitle: "",
    link: "/site/alert",
    acl: "admin_nav",
  },
  {
    id: "contexts",
    title: "Contextual Rule",
    icon: "mdi-google-circles-group",
    subtitle: "",
    link: "/site/rule",
    acl: "admin_nav",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: "mdi-bell-ring-outline",
    subtitle: "",
    link: "/site/notification/rule",
    acl: "super_and_admin_access",
  },
  {
    id: "settings",
    title: "Settings",
    icon: "mdi-cogs",
    subtitle: "",
    link: "/settings",
    acl: "super_nav",
  },
  {
    id: "manage",
    title: "Users",
    icon: "mdi-account-cog",
    subtitle: "",
    link: "/user",
    acl: "admin_nav",
  },
  {
    id: "reports",
    title: "Reports",
    icon: "mdi-file-excel-outline",
    subtitle: "",
    link: "context_menu",
    acl: "user_nav",
    context_menu: [
      {
        to: "/report",
        title: "Site Reports",
        icon: "mdi-file-excel-outline",
        disabled: false,
      },
      {
        to: "/report/rule",
        title: "Rule Reports",
        icon: "mdi-file-excel-outline",
        disabled: false,
      },
    ],
  },
  {
    id: "watchTrace",
    title: "Trace Logs",
    icon: "mdi-notebook-edit-outline",
    subtitle: "",
    link: "/trace",
    acl: "user_nav",
  },
  {
    id: "support",
    title: "Support",
    icon: "mdi-face-agent",
    subtitle: "",
    link: "/support",
    acl: "super_viewer_nav",
  },
  {
    id: "license",
    title: "License",
    icon: "mdi-license",
    subtitle: "",
    link: "/license",
    acl: "super_nav",
  },
])

const breadCrumbItems = ref<BreadCrumbItems[]>([
  {
    text: t("Dashboard"),
    disabled: true,
    href: "/dashboard",
    queryItem: null,
  },
])

const setPageDefaults = () => {
  const routeQuery = RouteQuery()
  const pageInfo = {
    id: "dashboard",
    title: t("Dashboard"),
    message: `<p class="body-1">${t(
        "In the dashboard page you can choose a view which takes to respective page."
    )}</p>`,
  };
  generic.setPageInfoData(pageInfo, []);
  generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value)
}
setPageDefaults()

onMounted(() => {
  animationHelper()
})

const animationHelper = () => {
  console.debug(licenseStore.licenses, "licenses")
  if (!licenseStore.licenses || licenseStore.licenses.length === 0) {
    updateDashboardItems("license");
  }
  if (
      (licenseStore.licenses && licenseStore.licenses.length > 0) &&
      (!configStore.configurations || configStore.configurations.length === 0)
  ) {
    updateDashboardItems("configurations");
  }
  if (
      (licenseStore.licenses && licenseStore.licenses.length > 0) &&
      (!configStore.configurations && configStore.configurations.length === 0) &&
      (!customerStore.customers || customerStore.customers.length === 0)
  ) {
    updateDashboardItems("deployment");
  }
  if (
      (licenseStore.licenses && licenseStore.licenses.length > 0) &&
      (!configStore.configurations && configStore.configurations.length === 0) &&
      (!customerStore.customers || customerStore.customers.length === 0) &&
      (!customerStore.selectedResolveCustomer.customer_sites)

  ) {
    updateDashboardItems("site");
  } else {
    dashboardItems.value = dashboardItems.value.map((di) => {
      if (di.id === "site") {
        di.is_attention = false;
        return {...di};
      } else {
        return {...di};
      }
    });
  }
  dashboardItems.value.map((di, i) => {
    if (Object.keys(di).includes("is_attention"))
      if (di.is_attention) {
        animate.spinLoopAnimation(`.border-${i}`, false);
      } else {
        animate.spinLoopAnimation(`.border-${i}`, true);
      }
    return null;
  });
}
const updateDashboardItems = (value: string) => {
  dashboardItems.value = dashboardItems.value.map((di) => {
    if (di.id === value) {
      di.is_attention = true;
      return {...di};
    } else {
      return {...di};
    }
  });
}

const routePush = async (data: string) => {
  await RouterPush(data)
}
</script>