<!--
  - Copyright (c) 2023 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <span>
    <v-chip
        v-for="(d, index) in deviceTypes"
        :key="index"
        class="pa-1"
        :class="mode === ModeType.legendIconString ? 'mr-1' : ''"
        :x-small="isLittle"
    >
      <span v-if="mode === ModeType.legendIconString">
        <v-avatar
            :size="isLittle ? '16' : '22'"
            :style="{
            background: d.bgColor(useVuetify().theme.name === 'dark' ? true : false),
          }"
        >
          <v-icon :size="isLittle ? '16' : '22'"
                  :color="d.iconColor(useVuetify().theme.name === 'dark' ? true : false)"> {{ d.icon() }}</v-icon>
        </v-avatar>
        <span class="mr-1 font-weight-medium"> {{ d.toString() }} </span>
      </span>
      <v-tooltip v-else-if="mode === ModeType.legendIcon" bottom :text="d.toString()">
        <template #activator="{ props}">
          <v-avatar :color="d.bgColor(useVuetify().theme.name === 'dark' ? true : false)" v-bind="props">
            <v-icon size="20" :color="d.iconColor(useVuetify().theme.name === 'dark' ? true : false)">
              {{ d.icon() }}
            </v-icon>
          </v-avatar>
        </template>
      </v-tooltip>
    </v-chip>
  </span>
</template>

<script lang="ts" setup>
import {DeviceType, ModeType} from "~/service/utils/components";

const props = defineProps({
  type: {
    type: [Array, String],
    default: () => [],
  },
  mode: {
    type: ModeType,
    default: () => ModeType.legendIcon,
  },
  isLittle: {
    type: Boolean,
    default: false,
  },
})

let deviceTypes = ref(new DeviceType().list());
if (typeof props.type === "string") {
  deviceTypes.value = [new DeviceType(props.type)];
} else if (Array.isArray(props.type)) {
  if (props.type.length > 0) {
    deviceTypes.value = [];
  }
  props.type.forEach((t) => {
    deviceTypes.value.push(new DeviceType(t));
  });
}

// const ModeType = computed(() => {
//   return ModeType;
// })
// const DeviceType = computed(() => {
//   return DeviceType;
// })
</script>
