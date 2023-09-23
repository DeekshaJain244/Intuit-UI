<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-card v-if="Object.keys(center).length > 0" elevation="0" color="cardBG2" class="ma-0 pa-0">
    <v-row no-gutters align="center" justify="center" class="pa-1">
      <!--      <GMapAutocomplete-->
      <!--          id="gmaps_autocomplete"-->
      <!--          class="ma-2"-->
      <!--          :options="{ fields: ['geometry', 'formatted_address', 'address_components'] }"-->
      <!--          :select-first-on-enter="true"-->
      <!--          @place_changed="setPlace"-->
      <!--      >-->
      <!--        <template #input="slotProps">-->
      <!--          <v-row-->
      <!--              no-gutters-->
      <!--              align="center"-->
      <!--              :style="{-->
      <!--                width: '800px',-->
      <!--              }"-->
      <!--          >-->
      <!--            <v-text-field-->
      <!--                ref="input"-->
      <!--                v-bind="slotProps"-->
      <!--                      variant="outlined"-->
      <!--                      density="compact"-->
      <!--                color="formColor"-->
      <!--                class="ma-2 mb-n2"-->
      <!--                background-color="cardBG2"-->
      <!--                prepend-inner-icon="mdi-map-marker-radius-outline"-->
      <!--                placeholder="Enter the location"-->
      <!--            >-->
      <!--            </v-text-field>-->
      <!--            <v-btn color="default" class="mb-2" small @click="submitGeoLocation">-->
      <!--              {{ t("Select Location") }}-->
      <!--            </v-btn>-->
      <!--          </v-row>-->
      <!--        </template>-->
      <!--      </GMapAutocomplete>-->
      <GMapAutocomplete ref="autocomplete" @place_changed="setPlace">
        <template #input="slotProps">
          <v-text-field
              v-bind="slotProps"
              ref="input"
              class="ma-2 mb-n2"
              prepend-inner-icon="mdi-map-marker"
              variant="outlined"
              density="compact"
              background-color="cardBG2"
              placeholder="Enter the location"
          />
        </template>
      </GMapAutocomplete>
      <v-btn color="default" class="mb-2" small @click="submitGeoLocation">
        {{ t("Select Location") }}
      </v-btn>
      <GMapMap
          ref="mapRef"
          class="pa-2 b1sg mb-2"
          :center="center"
          :zoom="12"
          :options="gmapOptions(true)"
          :map-type-id="mapTypes[2]"
          :map-style-id="mapStyles[2]"
          :style="{ width: '880px', height: '500px' }"
          @click="mark"
      >
        <GMapMarker
            v-for="(m, index) in markers"
            :key="index"
            :position="m.position"
            :draggable="true"
            :clickable="true"
            @click="center = m.position"
            @dragend="updateMarker"
        />
      </GMapMap>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
// import UtilGeneric from "~/mixins/utilGeneric.js";
// import UtilMaps from "~/mixins/utilMaps";
import {gmapOptions, useParseGoogleMapLocation} from "~/composables/useMaps";

const emit = defineEmits(["submit"])
const {t} = useI18n()

const markers = ref([])
const center = ref({
  lat: 45.5428128,
  lng: -122.7244406
})
const text = ref("")
const currentPlace = ref("")
const showMenu = ref(false)
const positionX = ref(0)
const positionY = ref(0)
const address = ref({})
const mapTypes = ref(["terrain", "satellite", "roadmap", "hybrid"])
const mapStyles = ref(["red", "green", "normal"])
const latLng = ref()

const setPlace = (place) => {
  console.debug("setPlace", place)
  currentPlace.value = place;
  markers.value = [];
  const marker = {
    lat: currentPlace.value.geometry.location.lat(),
    lng: currentPlace.value.geometry.location.lng(),
  };
  latLng.value = marker;
  markers.value.push({position: marker});
  center.value = marker;
  const addressComponents = currentPlace.value.address_components;
  console.debug(addressComponents, "addressComponents")
  arrangeData(addressComponents);
}
const arrangeData = (addressComponents) => {
  address.value = useParseGoogleMapLocation(addressComponents);
}
const updateMarker = (data) => {
  getAddressFromPin(data);
}
const mark = (event) => {
  markers.value = [];
  getAddressFromPin(event);
  const _latLng = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  };
  console.debug(_latLng, "_latLng")
  latLng.value = _latLng;
  markers.value.push({position: _latLng});
}
const getAddressFromPin = (data) => {
  // console.debug(data)
  const google = window.google;
  const geocoder = new google.maps.Geocoder();
  const _latLng = {lat: data.latLng.lat(), lng: data.latLng.lng()};
  latLng.value = _latLng;
  geocoder.geocode({location: _latLng}, (results, status) => {
    if (status === "OK") {
      if (results[1]) {
        // console.debug(results, "results");
        arrangeData(results[0].address_components);
      } else {
        // this.$notification.show({
        //   message: this.$t("Error while loading coordinates"),
        //   type: "error",
        // });
      }
    }
  });
}
const submitGeoLocation = () => {
  if (Object.keys(address.value).length === 0) {
    // this.$notification.show({
    //   message: this.$t("Please search a location"),
    //   type: "warning",
    // });
  } else {
    address.value.geo_location = latLng.value;
    emit("submit", address.value);
  }
}

const parseGoogleMapLocationAddress = () => {

}
</script>

<style lang="postcss" scoped>
#heading {
  font-family: "Padauk", sans-serif;
  font-size: 20px;
}

#map {
  width: 100%;
  height: 80vh;
  overflow: hidden;
}

.mapboxgl-popup {
  will-change: auto;
  min-width: 200px;
  max-width: 300px;
}

#map {
  min-height: 75vh;
  padding: 2% !important;
}

/*@screen md {*/
/*	#map {*/
/*		min-height: 85vh;*/
/*	}*/
/*}*/
.marker {
  cursor: pointer;
}

.popup-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
}

.popup-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.popup-container {
  /* color: rgb(208, 55, 55) !important; */
  padding: 2px 16px;
  width: 180px !important;
  height: 120px !important;
}
</style>

<style>
.pop-up-element {
  color: #3a3a32;
  min-width: 150px;
  max-width: 300px;
}

.popup-link {
  position: absolute;
  right: 0;
  top: 1px;
  margin-right: 10px !important;
}

#vuetify-google-autocomplete-id {
  border-top-width: 0 !important;
  border-right-width: 0 !important;
  border-bottom-width: 0 !important;
  border-left-width: 0 !important;
}

.pac-container {
  z-index: 9999999 !important;
}
</style>
