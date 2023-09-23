<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-dialog v-model="openInfo" max-width="1000" hide-overlay class="pa-0" @click:outside="closeInfoDialog">
    <v-card elevation="0">
      <v-card-subtitle class="subtitle-1 pa-2 ma-0">
        <v-row no-gutters>
          <span>
            <v-icon>mdi-information</v-icon>
            <!-- Information -->
          </span>
          <v-spacer/>
          <v-btn small icon @click="closeInfoDialog">
            <v-icon color="grey">mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-card-subtitle>
      <div class="text-center">
        <img src="/images/brandlogo-lg.png" :width="150" alt="Brand-Logo"/>
      </div>
      <v-card-title class="text-center">{{ pageInfo.title && pageInfo.title }}</v-card-title>
      <!-- eslint-disable -->
      <v-card-text class="text-center mt-2" v-html="pageInfo.message && pageInfo.message"></v-card-text>
      <!--eslint-enable-->
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const emit = defineEmits(["closeInfoDialog"])
import {useMainStore} from "~/store";

const userStore = useMainStore()

const props = defineProps({
  showInfo: {type: Boolean, required: false},
})
const pageInfo = ref(userStore.page_info)
const openInfo = ref(false)

watch(() => props.showInfo, (n, o) => {
  openInfo.value = !!n
})

watch(() => userStore.page_info, (n, o) => {
  console.debug("pageInfo ", n)
  pageInfo.value = n
})

const closeInfoDialog = () => {
  emit("closeInfoDialog");
}
</script>

<style></style>
