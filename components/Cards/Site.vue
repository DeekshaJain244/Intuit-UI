<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-card class="ma-2 pa-1 gradient-border" color="cardBG2" min-width="480" min-height="180" @click="siteDevices(site)">
    <v-row no-gutters justify="center" align="center">
      <v-col :cols="type.includes('map') ? 4 : 12">
        <v-row no-gutters class="ma-0" align="center" justify="center">
          <v-col cols="auto" class="pa-1">
            <img :src="site_image" class="float-left custom-image" alt="site-logo"/>
          </v-col>
          <v-col class="pa-1 ma-0 align-start">
            <v-card-title class="pa-1 title-1">
              <v-row no-gutters>
                <span
                    class="font-weight-medium"
                    :class="useVuetify().theme.name === 'dark' ? 'custom-title-dark' : 'custom-title-light'"
                >
                {{ generic.getStringRoundOff(site.site_name) }}
              </span>
                <v-spacer/>
                <v-tooltip bottom :text="site.status">
                  <template #activator="{ props }">
<!--                    <v-btn-->
<!--                        v-if="type.includes('status')"-->
<!--                        :color="generic.getColor(site.status)"-->
<!--                        icon="mdi-checkbox-blank-circle"-->
<!--                        class="body-2 font-weight-light channel-badge"-->
<!--                        style="float: right"-->
<!--                        v-bind="props"-->
<!--                        size="10"-->
<!--                        variant="text"-->
<!--                    >-->
<!--                    </v-btn>-->
                    <v-badge
                        dot
                        class="ml-2 pa-1 body-2 font-weight-light channel-badge"
                        :color="generic.getColor(site.status)"
                        v-bind="props"
                    >
                    </v-badge>
                  </template>
                </v-tooltip>
              </v-row>
            </v-card-title>
            <v-card-subtitle class="pa-1 my-2">
              <span>
                <span v-if="site.site_address.site_unit">{{ site.site_address.site_unit }},</span>
                <span v-if="site.site_address.site_street">{{ site.site_address.site_street }},</span>
                <span v-if="site.site_address.site_area">{{ site.site_address.site_area }},</span>
                <br/>
                {{ site.site_address.site_city }}, {{ site.site_address.site_state }}, <br/>
                {{ site.site_address.site_country }},
                {{ site.site_address.site_zip }}
              </span>
            </v-card-subtitle>
          </v-col>
        </v-row>
        <section v-if="mode !== ModeType.info.toString()">
          <v-divider></v-divider>
          <v-card-actions class="pa-0 ma-0">
            <v-row no-gutters class="mt-2">
              <v-spacer/>
              <div>
                <v-btn v-can="'user_access'" variant="elevated" size="x-small" class="mx-2" color="info" @click.stop="siteEdit(site)">
                  Edit
                </v-btn>
                <v-btn
                    v-can="'super_admin_access'"
                    :disabled="site.site_devices && site.site_devices.length > 0"
                    size="x-small"
                    class="mx-2"
                    color="error"
                    variant="elevated"
                    @click.stop="siteDelete(site)"
                >
                  Delete
                </v-btn>
              </div>
              <!--            <v-col v-if="type.includes('device')" class="ma-2 caption font-weight-light">-->
              <!--              <v-btn :style="{ float: 'right' }" color="cardBG2" @click="siteCameraView(site)">-->
              <!--                <v-icon class="mr-2" size="20"> mdi-cctv</v-icon>-->
              <!--                <span class="body-2"> Camera View </span>-->
              <!--              </v-btn>-->
              <!--            </v-col>-->
            </v-row>
          </v-card-actions>
        </section>
      </v-col>
      <v-col v-if="type.includes('map')" cols="8">
        <div class="mx-6 mt-2" :style="{ float: 'left', position: 'absolute', zIndex: '1' }">
          <v-btn id="gmap_refresh" x-small elevation="0" :color="'rgba(0,0,0,0.45)'" @click="resetPosition">
            <v-icon size="16" color="amber">mdi-refresh</v-icon>
            <span class="amber--text"> {{ t("Re-Center") }} </span>
          </v-btn>
        </div>
        <v-row no-gutters class="ma-1 b1sg" justify="center">
          <GMapMap
              ref="mapRef"
              :center="center"
              :zoom="17"
              :options="gmapOptions(useVuetify().theme.name === 'dark' ? true : false)"
              map-type-id="terrain"
              :style="{ width: '100%', minHeight: '150px' }"
          >
            <GMapMarker v-for="(m, index) in markers" :key="index" :position="m.position" :draggable="false"/>
          </GMapMap>
        </v-row>
      </v-col>
    </v-row>
    <v-card-actions class="ma-0 pa-0">
      <v-spacer/>
      <div v-if="type.includes('device')">
        <v-btn
            id="site_camera_view"
            :style="{ float: 'right' }"
            color="cardBG3"
            class="my-2"
            @click="siteDeviceView(site)"
        >
          <v-icon class="mr-2" size="20">mdi-camera-control</v-icon>
          <span class="body-2"> {{ t("Device View") }} </span>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import {ModeType} from "~/service/utils/components";
import {useStatusStore} from "~/store/status";
import {useGeneric} from "~/composables/helpers/useGeneric";
import {gmapOptions} from "~/composables/useMaps";

const generic = useGeneric()

const emit = defineEmits(["siteDevices", "siteEdit", "siteDelete", "siteDeviceView"])
const {t} = useI18n()
const mapRef = ref()

const props = defineProps({
  site: {
    type: Object,
    default: () => {
    },
  },
  storage: {
    type: Object,
    default: () => {
    },
  },
  type: {type: Array, default: () => []},
  devices: {type: Array, default: () => []},
  mode: {type: String, default: ModeType.info.toString(), required: true},
})

const statusStore = useStatusStore()

const status = ref(statusStore.status)
const count = ref(0)

const markers =
    Object.keys(props.site).length > 0
        ? [
          {
            position: {
              lat: props.site.site_address.site_geolocation.lat,
              lng: props.site.site_address.site_geolocation.long,
            },
          },
        ]
        : [];
const center =
    Object.keys(props.site).length > 0
        ? {
          lat: props.site.site_address.site_geolocation.lat,
          lng: props.site.site_address.site_geolocation.long,
        }
        : {};
console.debug(props.site.site_image, "site_image")
const site_image = ref(props.site.site_image ? generic.getURL() + props.site.site_image.replace("/api/v1", "") : "/images/site-default.png")

watch(() => props.site, (n, o) => {
  site_image.value = n.site_image ? generic.getURL() + n.site_image.replace("/api/v1", "") : "/images/site-default.png";
})

const siteDevices = (site) => {
  if (props.type.includes("id")) {
    emit("siteDevices", site);
  }
}
const siteEdit = (site) => {
  emit("siteEdit", site);
}
const siteDelete = (site) => {
  emit("siteDelete", site);
}
const siteDeviceView = (site) => {
  emit("siteDeviceView", site);
}
const resetPosition = () => {
  mapRef.$mapPromise.then((map) => {
    map.panTo(center.value);
  });
}
</script>
