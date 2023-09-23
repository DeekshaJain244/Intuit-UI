<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-footer :order="footerOrder" class="footer" padless app height="33px">
    <v-row no-gutters>
      <v-flex class="grey--text body-2 text-left pa-1 mx-2"> &copy; {{ new Date().getFullYear() }}</v-flex>
    </v-row>
    <v-row no-gutters align="center" justify="center" class="watermark pa-1">
      <img :width="30" src="/images/brandlogo-watermark.png" alt="Brand Watermark"/>
    </v-row>
  </v-footer>
</template>

<script lang="ts" setup>
const {footerOrder} = defineProps({
  footerOrder: {
    type: Number,
    required: true
  }
})
</script>

<style>
.footer {
  background-color: rgb(48, 48, 48, 0.8) !important;
}

.watermark {
  z-index: 0;
  right: 10px;
  bottom: 3px;
  position: absolute;
  border-radius: 4px;
}
</style>
