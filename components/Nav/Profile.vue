<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
    <div>
        <v-menu bottom offset-y style="z-index: 10">
            <template #activator="{ props }">
                <v-btn id="profile_icon" class="mr-1" icon v-bind="props">
                    <v-avatar size="40">
                        <v-img :src="avatar" width="70"></v-img>
                    </v-avatar>
                </v-btn>
            </template>
            <v-card class="mx-auto pb-0" width="400" min-height="240" color="cardBG2">
                <v-card-text class="justify-center">
                    <v-row no-gutters justify="center" align="center">
                        <v-spacer/>
                        <v-avatar size="60">
                            <v-img class="rounded-circle" :src="avatar" width="60"></v-img>
                        </v-avatar>
                        <v-spacer/>
                    </v-row>
                </v-card-text>
                <v-row no-gutters justify="center" align="center">
                    <v-col cols="12" class="title text-center">
                        <span> {{ loggedInUser.first_name }} {{ loggedInUser.last_name }}</span>
                        <br/>
                        <p class="subtitle">{{ loggedInUser.email }}</p>
                    </v-col>
                    <v-col cols="12" class="lastLogin text-center">
                        {{ t("Last Login") }} -
                        {{ lastLoggedInAt }}
                    </v-col>
                </v-row>

                <v-card-actions
                        class="mt-6"
                        :style="{
                backgroundColor: useVuetify().theme.name === 'dark' ? '#393e40' : '#f4e2f3',
              }"
                >
                    <v-btn id="profile_logout" color="formColor" variant="text" size="small"
                           @click="Router().push('/user/profile')">
                        {{ t("Profile") }}
                    </v-btn>
                    <!--<v-btn
                      color="formColor"
                      :style="{ backgroundColor: 'rgba(180,40,40,0.3)' }"
                      outlined
                      text
                      small
                      @click="rtltrToggle"
                    >
                      LTR <> RTL
                    </v-btn>-->
                    <v-spacer/>
                    <v-btn icon class="mx-1" small @click="updateUIConfig('theme')">
                        <v-icon v-if="useVuetify().theme.name === 'dark'"> mdi-weather-night</v-icon>
                        <v-icon v-else color="warning">mdi-weather-sunny</v-icon>
                    </v-btn>
                    <v-btn id="profile_logout" color="formColor" outlined small @click="logout = true">
                        {{ t("Logout") }}
                    </v-btn>
                </v-card-actions>
                <!-- <v-spacer></v-spacer>
                <v-card-actions>
                  <div class="mx-2 caption">
                    <a href="" target="_blank"> Privacy Policy </a>
                  </div>
                  <div class="mx-2 caption">
                    <a href="" target="_blank"> Terms of Service </a>
                  </div>
                  <v-spacer></v-spacer>
                </v-card-actions> -->
            </v-card>
        </v-menu>
        <v-dialog v-model="logout" persistent max-width="400">
            <v-card class="pa-2" color="cardBG2">
                <v-card-title primary-title class="justify-center">
                    <div class="text-center">
                        <div>{{ t("Are you sure you want Logout?") }}</div>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                            id="profile_agree"
                            color="red"
                            :style="{ backgroundColor: 'rgba(180,40,40,0.3)' }"
                            variant="outlined"
                            width="80"
                            @click="logOff"
                    >
                        {{ t("Yes") }}
                    </v-btn>
                    <v-btn id="profile_disagree" color="primary" width="80" @click="logout = false">
                        {{ t("No") }}
                    </v-btn>
                    <v-spacer/>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--    <div v-if="showPasswordResetDialog">-->
        <!--      <PasswordResetCard :user-is-new="true" :logged-in-user="loggedInUser" @updateConfig="updateConfig"/>-->
        <!--    </div>-->
    </div>
</template>

<script lang="ts" setup>
// import UtilDate from "~/mixins/utilDate.js";
// import UtilGeneric from "~/mixins/utilGeneric.js";
import axios from "axios"
import {useTheme} from 'vuetify'
import {useAuthStore} from "~/store/auth"
import {storeToRefs} from "pinia";
import {useGeneric} from "~/composables/helpers/useGeneric";
import {Router} from "~/composables/router/router";
import {useUtilDate} from "~/composables/helpers/useUtilDate";

const i18n = useI18n()

const {t} = useI18n()
// const components = {
//   PasswordResetCard: () => import("@/components/Cards/ResetPassword.vue"),
// };

const authStore = useAuthStore()
const {loggedInUser} = storeToRefs(authStore)
const generic = useGeneric()

const theme = useTheme()

const avatar = ref("")
const profile = ref(false)
const logout = ref(false)
const openOnHover = ref(false)
const closeOnClick = ref(true)
const closeOnContentClick = ref(true)
const offsetX = ref(false)
const offsetY = ref(true)
const showPasswordResetDialog = ref(false)
const lastLoggedInAt = ref("")

onMounted(async () => {
    if(Object.keys(loggedInUser.value).length>0){
        console.debug(loggedInUser.value, "User")
        theme.global.name.value = loggedInUser.value.user_config.ui_config.dark ? 'dark' : 'light'
        await i18n.setLocale(loggedInUser.value.user_config.ui_config.lang)
        avatar.value = await resolveAvatar();
        lastLoggedInAt.value = useUtilDate().lastLoginTimeString(loggedInUser.value.last_logged_in_at)
        if (loggedInUser.value.user_config.ui_config && loggedInUser.value.user_config.ui_config.is_new_user) {
            showPasswordResetDialog.value = true;
        }
    }
})

const resolveAvatar = async () => {
    if (loggedInUser.value.image) {
        const url = generic.getURL() + loggedInUser.value.image;
        console.debug(url, "resolveAvatar")
        const res = await axios.get(url);
        if (res.status === 200) {
            return url;
        }
    }
    return "/images/default-user.png";
}

watch(loggedInUser, async (n, o) => {
    if (n) {
        theme.global.name.value = n.user_config.ui_config.dark ? 'dark' : 'light'
        await i18n.setLocale(n.user_config.ui_config.lang)
        avatar.value = await resolveAvatar();
        lastLoggedInAt.value = useUtilDate().lastLoginTimeString(n.last_logged_in_at)
        if (n.user_config.ui_config && n.user_config.ui_config.is_new_user) {
            showPasswordResetDialog.value = true;
        }
    }
})

const updateConfig = async (data: string) => {
    await updateUIConfig(data);
}

const updateUIConfig = async (type: string) => {
    const uiConfig = JSON.parse(JSON.stringify(loggedInUser.value.user_config.ui_config));
    if (type === "password_reset") {
        uiConfig.is_new_user = false;
    } else if (type === "theme") {
        uiConfig.dark = !uiConfig.dark;
        theme.global.name.value = uiConfig.dark ? 'dark' : 'light'
    }
    const payload = {
        user_id: loggedInUser.value.user_id,
        user_config: {
            ui_config: uiConfig,
        },
    };
    let response = await authStore.updateUserConfig(payload)
    if (response.status === "success") {
        response = await authStore.userInfo()
        console.debug(response, "response")
    }
}

const logOff = () => {
    profile.value = false;
    Router().push("/logout");
}

// export default {
//   // name: "ProfileCard",
//   // components,
//   // mixins: [UtilDate, UtilGeneric],
//   data() {
//     const loggedInUser = this.$store.state.auth.user;
//     const date = this.lastLoginTimeString(loggedInUser.last_logged_in_at);
//     return {
//       avatar: "",
//       profile: false,
//       logout: false,
//       disabled: false,
//       absolute: false,
//       openOnHover: false,
//       closeOnClick: true,
//       closeOnContentClick: true,
//       offsetX: false,
//       offsetY: true,
//       loggedInUser,
//       lastLoggedInAt: date,
//       showPasswordResetDialog: false,
//     };
//   },
//   watch: {
//     "$store.state.auth.user": {
//       async handler(n, o) {
//         if (n) {
//           // console.debug(n, "user");
//           this.loggedInUser = n;
//           this.$vuetify.theme.dark = n.user_config.ui_config.dark;
//           this.$i18n.locale = n.user_config.ui_config.lang;
//           this.avatar = await this.resolveAvatar(n);
//         }
//       },
//       deep: true,
//     },
//   },
//
//   methods: {
//     async updateUIConfig(type) {
//       const uiConfig = JSON.parse(JSON.stringify(this.loggedInUser.user_config.ui_config));
//       if (type === "password_reset") {
//         uiConfig.is_new_user = false;
//       } else if (type === "theme") {
//         uiConfig.dark = !this.$vuetify.theme.dark;
//         this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
//       }
//       const payload = {
//         user_id: this.loggedInUser.user_id,
//         user_config: {
//           ui_config: uiConfig, // { dark: !this.$vuetify.theme.dark, lang: this.$i18n.locale, is_new_user: false },
//         },
//       };
//       await this.$store.dispatch("updateUIConfig", payload);
//     },
//     // async resetPassword(data) {
//     //   const payload = {
//     //     password: data.password,
//     //     confirm_password: data.confirm_password,
//     //   };
//     //   const response = await this.$store.dispatch("user/userPasswordReset", payload);
//     //   if (response) {
//     //     await this.$router.push("/logout");
//     //   }
//     // },
//     updateConfig(data) {
//       this.updateUIConfig(data, null);
//     },
//   },
// };
</script>

<style scoped>
.profile {
    margin-top: 30px !important;
}

.subtitle {
    font-size: 18px !important;
}

.lastLogin {
    color: rgb(190, 190, 190);
    padding: 8px;
    font-size: 14px;
}

.textWrap {
    word-break: normal;
    overflow-wrap: break-word;
}
</style>
