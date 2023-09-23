<template>
  <div style="margin: 5px 10px 2px 10px">
    <v-btn
        :id="route.id && route.id"
        :disabled="route_state"
        elevation="2"
        min-width="140"
        max-width="280"
        class="zoom route_text rounded-sm"
        :color="route_background_color"
        @click="directToPage(route.to)"
    >
      <v-icon color="white">{{ route.icon }}</v-icon>
      &nbsp; {{ route.name }}
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from "@vue/runtime-core";
import {RouterPush} from "~/composables/router/router";
import {Route} from "~/interfaces/props"

const props = defineProps({
  route: {
    type: Object as PropType<Route>,
    required: true
  }
})

const route_state = ref(!props.route.state)
const route_background_color = ref(props.route.state ? props.route.background_color : "routeCardBG1")

const directToPage = async (link: string = "") => {
  await RouterPush(link)
}
</script>