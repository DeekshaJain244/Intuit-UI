<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-row no-gutters class="pa-0" :style="{ minWidth: '100%' }">
    <p class="mx-2 text-h6 font-weight-light grey--text">{{ text }}</p>
    <v-spacer/>
    <div v-for="(chip, i) in chips" :key="i">
      <InfoChip :style="{ marginLeft: '10px' }" :name="chip.name" :value="chip.value"/>
    </div>
  </v-row>
</template>

<script lang="ts" setup>
import InfoChip from "~/components/Chips/Info.vue"

const props = defineProps({
  text: {
    type: String,
    required: false
  },
  chips: {
    type: Array,
    required: false,
    default: () => [],
  },
})
</script>
