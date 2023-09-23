<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-card
      min-height="100"
      max-width="500"
      color="cardBG2"
      :outlined="configuration.state"
      class="ma-0 pa-2 gradient-border"
      @click="openConfiguration"
  >
    <v-card-title no-gutters class="ma-0 pa-1">
      <v-row no-gutters>
        <span class="font-weight-medium title">{{ configuration.nimble_name }}</span>
        <v-spacer/>
        <v-badge
            inline
            dot
            class="ml-2 pa-1 body-2 font-weight-light channel-badge"
            :color="configuration.nimble_status > 0 ? 'statusOnline' : 'statusOffline'"
        >
        </v-badge>
        <span>
          {{ configuration.nimble_status > 0 ? "Online" : "Offline" }}
        </span>
      </v-row>
    </v-card-title>
    <v-card-text class="ma-0 pa-1">
      <v-row no-gutters align="center">
        <div class="font-weight-regular subtitle-1">{{ configuration.nimble_version }}</div>
        <v-spacer/>
        <div class="font-weight-medium subtitle-1">{{ configuration.nimble_address }}</div>
        :
        <div class="font-weight-medium subtitle-1">{{ configuration.nimble_port }}</div>
      </v-row>
    </v-card-text>
    <v-divider class="ma-2"></v-divider>
    <v-card-actions class="ma-0 pa-1">
      <v-spacer/>
      <v-tooltip bottom :text="t('Refresh Nimble Catalog')">
        <template #activator="{ props }">
          <v-btn
              v-can="'super_admin_access'"
              v-bind="props"
              size="x-small"
              class="mx-2"
              variant="elevated"
              color="primary"
              :disabled="configuration.nimble_status === 0"
              @click.stop="refreshDetails"
          >
            Refresh
          </v-btn>
        </template>
      </v-tooltip>

      <v-btn v-can="'super_admin_access'" size="x-small" variant="elevated" class="mr-2" color="success"
             @click="editConfiguration"> Edit
      </v-btn>
      <v-btn
          v-can="'super_admin_access'"
          size="x-small"
          class="mx-2"
          variant="elevated"
          :color="disabled ? 'default' : 'error'"
          @click.stop="deleteConfiguration"
      >Delete
      </v-btn>
      <v-chip
          v-can="'super_admin_access'"
          class="ml-2 pa-0 py-2"
          size="small"
          color="default"
          @click.stop="overrideConfiguration"
      >
        <span class="mx-2 my-2"> Manual Override</span>
        <span class="mr-1">
          <v-icon v-if="!configuration.nimble_is_override" color="warning" size="20"> mdi-close-circle</v-icon>
          <v-icon v-else color="success" size="20">mdi-check-circle</v-icon>
        </span>
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import {useConfigurationStore} from "~/store/configurations";

const emit = defineEmits(["refresh", "open", "edit", "delete", "override"])
const {t} = useI18n()

const props = defineProps({
  configuration: {
    type: Object, default: () => {
    }
  },
  disabled: {type: Boolean, required: false},
  deleteableNimbleID: {type: String, default: ""},
})
const configurationStore = useConfigurationStore()

const is_active = ref(false)

const getNimbleStatus = async () => {
  const response = await configurationStore.getNimbleStatus(props.configuration.nimble_id)
  if (response.status) {
    const nimble = response.data;
    is_active.value = !!(nimble && nimble.nimble_status === 1);
  }
}
const refreshDetails = () => {
  emit("refresh");
}
const openConfiguration = () => {
  emit("open");
}
const editConfiguration = () => {
  emit("edit");
}
const deleteConfiguration = () => {
  emit("delete");
}
const overrideConfiguration = () => {
  emit("override");
}
</script>

<style scoped>
.fixed-height {
  height: 40px !important;
}

.rows-data {
  background-color: rgba(208, 208, 208, 0.35);
  border-radius: 6px;
}
</style>
