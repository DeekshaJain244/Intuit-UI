<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-overlay
      :model-value="loading"
      class="align-center justify-center"
      color="cardBG1"
      persistent
  >
    <v-progress-circular
        color="overlayColor"
        indeterminate
        size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts" setup>
import {useMainStore} from "~/store"

const indexStore = useMainStore()

const props = defineProps({
  overlay: {
    type: Boolean,
    required: true,
  },
})

const loading = ref<boolean>(props.overlay)

watch(() => props.overlay, (n, o) => {
  loading.value = n
})

watch(() => indexStore.overlay, (n, o) => {
  loading.value = n
})
</script>
