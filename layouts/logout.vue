<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-app :class="useVuetify().theme.name === 'dark' ? 'app-dark' : 'app-light'">
    <v-main>
      <v-container class="fill-height ma-0 pa-0" fluid>
        <v-card
            :class="useVuetify().theme.name === 'dark' ? 'glass-dark' : 'glass-light'"
            class="pa-1 layout-card"
            elevation="0"
            min-height="100%"
            min-width="100%"
        >
          <slot/>
        </v-card>
      </v-container>
    </v-main>
    <Footer :footerOrder="footerOrder"/>
  </v-app>
</template>

<script lang="ts" setup>
import Footer from "~/components/Nav/Footer.vue"

const footerOrder = ref<number>(0)
</script>

<style lang="scss" scoped>
@import "assets/css/main.scss";

.theme--dark.v-application {
  background: $app-dark-background;
}

.theme--light.v-application {
  background: $app-light-background;
}
</style>
