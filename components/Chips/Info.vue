<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-tooltip top open-delay="1000" :text="tooltipLocal">
    <template #activator="{ props }">
      <v-chip class="mx-1" v-bind="props">
        {{ nameLocal }} - &nbsp;
        <span class="body-1 font-weight-bold">
          {{ valueLocal }}
        </span>
        <v-btn v-if="button" v-can="'super_admin_access'" variant="text" :icon="icon" size="20" @click="callParent()">
        </v-btn>
      </v-chip>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
import {TimerCountDown} from "~/service/utils/constants";
import {useUtilDate} from "~/composables/helpers/useUtilDate"

const props = defineProps({
  name: {required: true, type: String},
  value: {required: true, type: String},
  button: {default: false, type: Boolean},
  icon: {default: "mdi-pencil", type: String},
})

const utilDate = useUtilDate()

const emit = defineEmits(["buttonClick"])

const nameLocal = ref(props.name === TimerCountDown ? "Time" : props.name);
const valueLocal = ref(props.value)
const tooltipLocal = ref(props.name === TimerCountDown ? props.value : props.name);

if (props.name === TimerCountDown) {
  utilDate.timerCountDown()
}

const callParent = () => {
  emit("buttonClick");
}

watch(utilDate.timerCountDownTS, (n, o) => {
  if (n) {
    valueLocal.value = n;
  }
})
</script>

<style></style>
