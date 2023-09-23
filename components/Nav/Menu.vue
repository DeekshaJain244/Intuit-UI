<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <VNavigationDrawer
        v-model="drawer"
        :temporary="temporary"
        :rail="rail"
        app
        color="layoutBar"
    >
      <VCard width="100%" class="ma-0 pa-0" rounded="0" elevation="1">
        <VRow
            v-if="!rail"
            no-gutters
            :style="{
            height: '48px',
          }"
            align="center"
            justify="center"
            class="ma-0 pa-0"
        >
          <img :width="40" alt="Brand Watermark" src="/images/brandlogo-watermark.png"/>
        </VRow>
      </VCard>
      <VList dense color="layoutBar" nav density="compact">
        <div v-for="(link, i) in links" :key="i" v-can="link.acl">
          <section v-if="!link.dropDownItems">
            <VTooltip v-if="rail" color="routeBG1" open-delay="200" right :text="link.title">
              <template #activator="{ props }">
                <VListItem :to="localePath(link.to)" active-class="active" exact router v-bind="props"
                           density="compact">
                  <VListItemTitle>
                    <VIcon class="mr-1" color="navIconText" size="22">
                      {{ link.icon }}
                    </VIcon>
                    <span class="ml-2 link_title_text"> {{ link.title }}</span>
                  </VListItemTitle>
                </VListItem>
              </template>
              <!--              <span>{{ link.title }}</span>-->
            </VTooltip>
            <VListItem v-else :to="localePath(link.to)" active-class="active" exact router>
              <VListItemTitle>
                <VIcon class="mr-1" color="navIconText" size="22">
                  {{ link.icon }}
                </VIcon>
                <span class="ml-2 link_title_text">{{ link.title }}</span>
              </VListItemTitle>
            </VListItem>
          </section>
          <div v-else>
            <VMenu
                v-if="!rail"
                offset-x
                transition="scroll-y-transition"
                open-on-hover
                close-delay="500"
                open-delay="180"
            >
              <template #activator="{ props }">
                <VListItem active-class="active" exact router v-bind="props">
                  <VListItemTitle>
                    <VIcon color="navIconText" size="22">
                      {{ link.icon }}
                    </VIcon>
                    <span class="ml-2 link_title_text">{{ link.title }}</span>
                  </VListItemTitle>
                </VListItem>
              </template>
              <VList dense>
                <VListItem
                    v-for="(dropdown, j) in link.dropDownItems"
                    :key="j"
                    :to="localePath(dropdown.to)"
                    active-class="active"
                    color="default"
                >
                  <VListItemTitle>
                    <VIcon color="navIconText" size="22">
                      {{ dropdown.icon }}
                    </VIcon>
                    <span class="ml-2 link_title_text">{{ dropdown.title }}</span>
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
            <VMenu
                v-else
                nudge-right="4"
                offset-x
                transition="scroll-x-transition"
                open-on-hover
                close-delay="500"
                open-delay="180"
            >
              <template #activator="{ props }">
                <VListItem
                    v-bind="props"
                >
                  <VIcon color="navIconText" size="22">
                    {{ link.icon }}
                  </VIcon>
                </VListItem>
              </template>
              <VCard class="ma-0 pa-0" color="routeBG1">
                <VRow no-gutters align="center" justify="center" class="ma-0 pa-1">
                  <span class="subtitle-2 mx-2" :style="{ color: '#ffffff' }">{{ link.title }}</span>
                </VRow>
                <VList dense>
                  <VListItem
                      v-for="(dropdown, j) in link.dropDownItems"
                      :key="j"
                      :to="localePath(dropdown.to)"
                  >
                    <VListItemTitle>
                      <v-icon color="navIconText" size="22">{{ dropdown.icon }}</v-icon>
                      <span class="ml-2 link_title_text">{{ dropdown.title }}</span>
                    </VListItemTitle>
                  </VListItem>
                </VList>
              </VCard>
            </VMenu>
          </div>
          <VDivider></VDivider>
        </div>
        <!--        <VSpacer></VSpacer>-->

        <!--        <VRow no-gutters>-->
        <!--          <VCol v-show="!mini" class="bottom-text body-2 px-2 pt-1" cols="12">-->
        <!--            <span class="text-left about-text" @click="$router.push('/about')">-->
        <!--&lt;!&ndash;              Version {{ $store.state.version }}&ndash;&gt;-->
        <!--            </span>-->
        <!--          </VCol>-->
        <!--          <VCol cols="12">-->
        <!--            <VBtn class="bottom-button rounded-0" small @click="setRail">-->
        <!--              <VIcon class="bottom-icon" size="30">-->
        <!--                {{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}-->
        <!--              </VIcon>-->
        <!--            </VBtn>-->
        <!--          </VCol>-->
        <!--        </VRow>-->
      </VList>
      <template v-slot:append>
        <div class="pa-2">
          <VBtn class="bottom-button rounded-0" small @click="setRail(menuBar)">
            <VIcon class="bottom-icon" size="30">
              {{ rail ? "mdi-chevron-right" : "mdi-chevron-left" }}
            </VIcon>
          </VBtn>
        </div>
      </template>
    </VNavigationDrawer>
    <VAppBar :order="appOrder" app color="layoutBar" density="compact">
      <VAppBarNavIcon v-if="!drawer" @click.stop="openDrawer"></VAppBarNavIcon>
      <VToolbarTitle class="text">
        MEGH VAS Portal
      </VToolbarTitle>
      <ResolveCard/>
      <!--<v-toolbar-title class="text">{{ header }}</v-toolbar-title> -->
      <!--<Actions />-->
      <VSpacer/>
      <!--      <HealthMon />-->
      <ProfileCard/>
    </VAppBar>
  </div>
</template>

<script lang="ts" setup>
import ResolveCard from "~/components/Nav/Resolve.vue"
import ProfileCard from "~/components/Nav/Profile.vue"

const localePath = useLocalePath()

const emit = defineEmits(["toggleOrder"])

const drawer = ref<boolean | null>(false);
let rail = ref<boolean | null>(false) // determines small or extended
const temporary = ref<boolean | false>(true)
const menuBar = ref<boolean>(false)
const links = ref([
  {
    to: "/dashboard",
    title: "Dashboard",
    icon: "mdi-monitor",
    disabled: false,
    acl: "viewer_nav",
  },
  {
    to: "/site",
    title: "Sites",
    icon: "mdi-office-building-marker-outline",
    disabled: false,
    acl: "viewer_nav",
  },
  {
    to: "/site/view",
    title: "Device View",
    icon: "mdi-camera-control",
    disabled: false,
    acl: "viewer_nav",
  },
  {
    to: "/site/view/analytic",
    title: "Analytic View",
    icon: "mdi-poll",
    disabled: false,
    acl: "viewer_nav",
  },
  {
    to: "/site/view/map",
    title: "Map View",
    icon: "mdi-map",
    disabled: false,
    acl: "viewer_nav",
  },
  {
    to: "/configuration",
    title: "Configurations",
    icon: "mdi-hammer-wrench",
    disabled: false,
    acl: "super_nav",
  },
  {
    to: "/deployment",
    title: "Deployment",
    icon: "mdi-office-building-cog-outline",
    disabled: false,
    acl: "admin_nav",
  },
  {
    to: "/site/alert",
    title: "Alerts",
    icon: "mdi-alert-rhombus-outline",
    disabled: false,
    acl: "admin_nav",
  },
  {
    to: "/site/rule",
    title: "Contextual Rule",
    icon: "mdi-google-circles-group",
    disabled: false,
    acl: "admin_nav",
  },
  {
    to: "/site/notification/rule",
    title: "Notifications",
    icon: "mdi-bell-ring-outline",
    disabled: false,
    acl: "super_and_admin_access",
  },
  {
    to: "/settings",
    title: "Settings",
    icon: "mdi-cogs",
    disabled: false,
    acl: "super_nav",
  },
  {
    to: "/user",
    title: "Users",
    icon: "mdi-account-cog",
    disabled: false,
    acl: "admin_nav",
  },
  {
    to: "",
    title: "Reports",
    icon: "mdi-file-excel-outline",
    dropDownItems: [
      {
        to: "/report",
        title: `Site Reports`,
        icon: "mdi-file-excel-outline",
        disabled: false,
      },
      {
        to: "/report/rule",
        title: `Rule Reports`,
        icon: "mdi-file-excel-outline",
        disabled: false,
      },
    ],
    disabled: false,
    acl: "user_nav",
  },
  {
    to: "/trace",
    title: "Trace Logs",
    icon: "mdi-notebook-edit-outline",
    disabled: false,
    acl: "user_nav",
  },
  {
    to: "/license",
    title: "License",
    icon: "mdi-license",
    disabled: false,
    acl: "admin_nav",
  },
  // {
  //   to: "",
  //   title: "Manage",
  //   icon: "mdi-account-cog",
  //   dropDownItems: [
  //     {
  //       to: "/settings",
  //       title: "Settings",
  //       icon: "mdi-cogs",
  //       disabled: true,
  //     },
  //     {
  //       to: "/user",
  //       title: "User",
  //       icon: "mdi-account-outline",
  //       disabled: true,
  //     },
  //   ],
  //   disabled: false,
  //   allowed: ["admin"],
  // },

])
const appOrder = ref<number>(0)

onMounted(() => {
  // if (this.loggedInUser.user_config.ui_config.menu === "hide") {
  //   this.menuBar = false;
  // }
  // this.toggleTop(this.menuBar);
})
const toggleTop = () => {

}

const setRail = (menu: boolean) => {
  const mini = rail.value
  if (mini) {
    temporary.value = true
    rail.value = false
    appOrder.value = 0
    setTimeout(() => {
      emit("toggleOrder", 0)
      drawer.value = true
    })
  } else {
    appOrder.value = -1
    temporary.value = false
    rail.value = true
    emit("toggleOrder", -1)
  }
}

const openDrawer = () => {
  temporary.value = true
  rail.value = false
  drawer.value = true
  emit("toggleOrder", 0)
}

</script>

<style scoped>
.text {
  font-size: 18px;
  font-weight: 400;
  font-family: "Roboto", serif;
  letter-spacing: 0.25em;
  margin: 0 16px;
}

.customer_subtitle {
  color: brown;
}

.card-center {
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.bottom-text {
  position: absolute;
  bottom: 0;
  height: 28px;
}

.bottom-button {
  position: absolute;
  right: 0;
  bottom: 0;
}

.bottom-icon {
  float: right !important;
}

.disabled {
  color: #acacac;
}

.active {
  color: #709ada !important;
}

.active-text {
  color: #f5efef !important;
  caret-color: #f0e7e7 !important;
}

.about-text {
  cursor: pointer;
}
</style>
