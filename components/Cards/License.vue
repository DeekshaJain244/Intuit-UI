<template>
  <div>
    <v-card
        width="450"
        min-height="220"
        color="cardBG3"
        class="ma-2"
        @click="selectLicense"
        @contextmenu="toggleContextMenu"
    >
      <v-card-title :class="useVuetify().theme.name === 'dark' ? 'black' : 'white'" class="ma-0 pa-2">
        <v-row no-gutters align="center">
          <img :width="40" src="~/assets/images/license.png" alt="Brand Watermark"/>
          <v-spacer/>
          <v-chip class="ma-1 pa-1" color="default">
            <span class="ml-2 body-2"> Expires on - </span>
            <span class="ml-2 mr-4" :style="{ fontSize: '18px' }">
              {{ utilDate.convertTimeString(license.license_expires_at) }}
            </span>
          </v-chip>
          <v-spacer/>
          <v-chip class="ma-1 pa-1" :color="useVuetify().theme.name === 'dark' ? '#0c5d24' : '#c7f6ce'">
            <v-icon color="success">mdi-check-decagram</v-icon>
          </v-chip>
        </v-row>
      </v-card-title>
      <v-divider class="mx-2"></v-divider>
      <v-row no-gutters align="center" class="ma-2">
        <span v-if="mode != 'view'" class="font-weight-medium">
          {{ license.license_name }}
        </span>
      </v-row>
      <v-divider class="mx-2"></v-divider>
      <v-card-text class="pa-4">
        {{ t("This license is registered to the following customer id and is valid for the current version.") }}
        <br/>
        <v-row no-gutters align="center" justify="center" class="ma-2">
          <span
              class="text-lg-h5 font-weight-bold pt-1"
              :style="{
              textDecorationColor: '#FFC107',
              borderBottom: '4px solid #FFC107',
              paddingBottom: '1px',
              color: useVuetify().theme.name === 'dark' ? 'white' : 'black',
            }"
          >&nbsp;{{ license.license_customer }}&nbsp;
          </span>
        </v-row>
      </v-card-text>
      <v-divider class="mx-2"></v-divider>
      <v-row no-gutters class="ma-0 px-2" justify="space-between">
        <v-col align-self="center">
          <span class="font-weight-light caption">Created - {{
              utilDate.convertTimeString(license.license_created_at)
            }}</span>
        </v-col>
        <v-col align-self="center">
          <span class="ml-1 font-weight-light caption">
            Last modified - {{ utilDate.convertTimeString(license.license_updated_at) }}
          </span>
        </v-col>
      </v-row>
    </v-card>
    <v-menu v-model="contextMenu" :position-x="x" :position-y="y" absolute offset-y content-class="elevation-1">
      <v-list v-can="'user_access'" dense width="140" style="padding: 2px">
        <v-list-item
            v-for="(item, i) in context_menu_items"
            :id="`alert_action_${i}`"
            :key="i"
            v-can="item.acl"
            style="padding-left: 2px"
            :disabled="!item.state"
            @click="contextHandler(item.click, license)"
        >
          <v-list-item-icon style="margin-left: 4px; margin-right: 4px">
            <v-icon size="20">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <div style="margin-top: 2px; margin-left: 0; text-align: center">
            {{ item.title }}
          </div>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script lang="ts" setup>
import {useUtilDate} from "~/composables/helpers/useUtilDate";
const {t} = useI18n()
const utilDate = useUtilDate()
const emit = defineEmits(["editLicense", "deleteLicense", "selectedLicense"])
const {license, isContextMenu, mode} = defineProps({
  license: {
    type: Object,
    required: true,
  },
  isContextMenu: {
    type: Boolean,
    required: true,
  },
  mode: {
    type: String,
    required: false,
  },
});
const x = ref(0)
const y = ref(0)
const contextMenu = ref(false)
const context_menu_items = ref([])
//{
//     id: 1,
//     state: true,
//     icon: "mdi-pencil-outline",
//     title: this.$t("Edit"),
//     click: "editLicense",
//     color: "primary",
//     acl: "user_access",
//     allowed: ["super_admin"],
//   },
//   {
//     id: 2,
//     state: true,
//     icon: "mdi-delete-outline",
//     title: this.$t("Delete"),
//     click: "deleteLicence",
//     color: "error",
//     acl: "admin_delete",
//     allowed: ["super_admin"],
//}

const toggleContextMenu = (e) => {
  if (isContextMenu) {
    e.preventDefault();
    x.value = e.clientX;
    y.value = e.clientY;
    contextMenu.value = true;
  }
};
const contextHandler = (f, {...a}) => {
  f(a);
}
const editLicense = (data) => {
  emit("editLicense", data);
}
const deleteLicence = (data) => {
  emit("deleteLicense", data);
}
const selectLicense = () => {
  if (!isContextMenu) {
    emit("selectedLicense", license);
  }
}

</script>