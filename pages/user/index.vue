<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
    <div>
        <div id="userManagement"></div>
        <HeaderText :text="t('User')"/>
        <v-row v-can="'admin_access'" class="pa-2" no-gutters align-content="space-between">
            <div v-for="route in routes" :key="route.id">
                <RouteCard v-can="route.acl" class="mx-3" :route="route"/>
            </div>
        </v-row>
        <v-row v-can="'admin_access'" class="pa-4" dense align-content="start">
            <v-col v-for="user in users" :key="user.user_id" cols="12" sm="6" md="4" lg="2" style="float: left">
                <v-menu absolute content-class="elevation-1" style="max-width: 600px">
                    <template #activator="{ on, attrs }">
                        <v-card class="ml-8" max-width="280" min-height="160" color="cardBG1" v-bind="attrs" v-on="on">
                            <v-card-text align="center">
                                <v-avatar v-if="user.avatar || user.image" size="50">
                                    <v-img class="rounded-circle" :src="user.image ? getURL() + user.image : user.avatar"></v-img>
                                </v-avatar>
                                <v-avatar v-else size="40">
                                    <v-icon size="60">mdi-account-circle</v-icon>
                                </v-avatar>
                            </v-card-text>
                            <v-list-item two-line align="center">
                                <v-list-item-content>
                                    <v-list-item-title class="title mb-1"> {{ user.first_name }} {{ user.last_name }}</v-list-item-title>
                                    <br/>
                                    <p class="subtitle mb-1">{{ user.email }}</p>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </template>
                    <v-list v-can="'admin_nav'" dense width="110" style="padding: 2px" color="cardBG2">
                        <div v-for="(item, i) in context_menu_items" :key="i">
                            <v-list-item
                                    v-can="item.acl"
                                    style="padding-left: 2px"
                                    :disabled="!item.state"
                                    @click="contextHandler(item.click, user)"
                            >
                                <v-list-item-icon style="margin-left: 4px; margin-right: 4px">
                                    <v-icon size="20">{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <center style="margin-top: 2px; margin-left: 0px">
                                    {{ item.title }}
                                </center>
                            </v-list-item>
                        </div>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
        <OverlayCard :overlay="overlay"/>
        <div>
            <ConfirmCard ref="Confirm"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useGeneric} from "~/composables/helpers/useGeneric";
import {useUserStore} from "~/store/user";
import {useRuleStore} from "~/store/rule";
import {RouteQuery, Router} from "~/composables/router/router";

const {t} = useI18n()
const generic = useGeneric()
const userStore = useUserStore()
const ruleStore = useRuleStore()

const overlay = ref(true)
const users = ref([])
const user = ref({})

definePageMeta({
  middleware: ["auth", "rbac"],
})
useHead({
  title: t('User')
});
const routes = ref([
  {
    id: 0,
    state: true,
    isNew: true,
    icon: "mdi-plus",
    name: t("Add User"),
    background_color: "routeCardBG1",
    to: "/user/add",
    acl: "admin_nav",
  },

  // {
  //   id: 0,
  //   state: true,
  //   isNew: true,
  //   icon: "mdi-office-building",
  //   name: "Manage User",
  //   background_color: "routeCardBG1",
  //   to: "/user/manage",
  //   role: ["admin"],
  // },
])
const tours = ref([
  {
    target: "#userManagement",
    header: {
      title: "User Management",
    },
    params: {
      placement: "top",
    },
    content: "Displays the list of Configured Users.<br> Click on <b>Add User </b>to configure user",
  },
])
const show_menu = ref(false)
const context_menu_items = ref([
  {
    state: true,
    icon: "mdi-pencil-outline",
    title: "Edit",
    click: "editUser",
    color: "primary",
    acl: "admin_edit",
  },
  {
    state: true,
    icon: "mdi-delete-outline",
    title: "Delete",
    click: "deleteUser",
    color: "error",
    acl: "admin_delete",
  },
  {
    state: true,
    icon: "mdi-clipboard-list-outline",
    title: "Manage",
    click: "manageUser",
    color: "error",
    acl: "admin_access",
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
    text: t("User"),
    disabled: true,
    href: "/user",
    queryItem: null,
  },
])
const role_key = userStore.user.role_key  //this.$store.state.auth.user.role_key,

//fetch data section
const routeQuery = RouteQuery()
generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value);
generic.setPageInfoData(null, null);
users.value = userStore.user.users //this.$store.state.user.users;
overlay.value = false;

// beforeDestroy() {
//     this.clearStoreBeforePageLeave();
// }
const contextHandler = (f, {...a}) => {
  f(a);
}

const deleteUser = async (user) => {
  const name = `${user.first_name} ${user.last_name}`;
  const confirm = await Confirm.value.open("Unassign", t("Are you sure you want to delete", [name]), {
    color: "success",
  });
  if (confirm) {
    const payload = {
      user_id: user.user_id,
    };
    let response = await ruleStore.removeUserAssociationFromRule(payload)
    if (response) {
     // response = await this.$store.dispatch("user/deleteUser", user);
        response = await userStore.deleteUser(payload.user_id)
      if (response) {
        response = await userStore.getUsers()
        if (response) {
          users.value = userStore.users
        }
      }
    }
  }
}
const manageUser = async(user)=>{
   // const response = await this.$store.dispatch("user/setUserManage", user);
    const response = await userStore.setUserManage(user)
    if (response) {
        await Router().push("/user/manage")
    }
}

const editUser = async(user)=>{
    const response = await userStore.setUserEdit(user)
    if (response) {
        await Router().push("/user/edit")
    }
}
</script>

<style lang="scss" scoped>
    .icon > img {
    width: 20px !important;
}
</style>


