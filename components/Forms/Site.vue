<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <v-row no-gutters align="center" justify="center">
      <v-card class="pa-6 mt-5" width="750" color="cardBG1" elevation="0">
        <v-card-subtitle class="text-center subtitle-1">
          {{ form_name }}
        </v-card-subtitle>
        <v-card-text>
          <v-form ref="siteFormRef" @submit.prevent="validateSite">
            <v-text-field
                id="site_form_name"
                v-model="site.site_name"
                :label="t('Name')"
                density="compact"
                variant="outlined"
                color="formColor"
                background-color="cardBG2"
                :rules="[ruleRequired, ruleNoSpacingInStart]"
            ></v-text-field>
            <!-- <v-row no-gutters>
              <v-text-field
                v-model="site.site_icon"
                class="mr-2"
                label="Icon"
                density="compact"
                variant="outlined"
                color="formColor"
                background-color="cardBG2"
                :rules="[ruleRequired]"
              ></v-text-field>
              <v-text-field
                v-model="site.site_key"
                class="ml-2"
                label="Key"
                density="compact"
                variant="outlined"
                color="formColor"
                background-color="cardBG2"
                :rules="[ruleRequired]"
              ></v-text-field>
            </v-row> -->
            <v-text-field
                id="site_form_description"
                v-model="site.site_description"
                :label="t('Description')"
                density="compact"
                variant="outlined"
                color="formColor"
                background-color="cardBG2"
            ></v-text-field>
            <!-- <v-text-field
              v-model="site.site_image"
              label="Image"
              density="compact"
                variant="outlined"
              color="formColor"
              background-color="cardBG2"
              :rules="[ruleRequired, rules.spacing]"
            ></v-text-field> -->
            <v-row no-gutters>
              <div class="subtitle-2">{{ t("Address") }}</div>
              <v-spacer/>
              <v-btn id="site_btn_address" color="default" class="mb-2" small @click="showMapDialog = true">
                {{ t("Search Address") }}
                <v-icon size="16" class="ml-2">mdi-google</v-icon>
              </v-btn>
            </v-row>
            <v-row no-gutters>
              <v-text-field
                  id="site_form_unit"
                  v-model="site_address.site_unit"
                  :label="t('Unit')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
                  @focus="openMapDialog($event)"
              ></v-text-field>
              <v-text-field
                  id="site_form_street"
                  v-model="site_address.site_street"
                  class="mx-2"
                  :label="t('Street')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
              ></v-text-field>
              <v-text-field
                  id="site_form_area"
                  v-model="site_address.site_area"
                  :label="t('Area')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
              ></v-text-field>
            </v-row>
            <v-row no-gutters>
              <v-text-field
                  id="site_form_city"
                  v-model="site_address.site_city"
                  class="mr-2"
                  :label="t('City')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
                  :rules="[ruleRequired]"
              ></v-text-field>
              <v-text-field
                  id="site_form_state"
                  v-model="site_address.site_state"
                  class="ml-2"
                  :label="t('State')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
                  :rules="[ruleRequired]"
              ></v-text-field>
            </v-row>
            <v-row no-gutters>
              <v-text-field
                  id="site_form_country"
                  v-model="site_address.site_country"
                  class="mr-2"
                  :label="t('Country')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
                  :rules="[ruleRequired]"
              ></v-text-field>
              <v-text-field
                  id="site_form_zip"
                  v-model="site_address.site_zip"
                  class="ml-2"
                  :label="t('Zip Code')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
                  :rules="[ruleRequired, ruleZipCode]"
              ></v-text-field>
            </v-row>
            <v-row no-gutters class="mb-4">
              <!--							<span class="float-left ma-2 caption">-->
              <!--								{{ $t("forms.site.text.timezone") }}-->
              <!--								{{ site_address.site_timezone }}-->
              <!--							</span>-->
              <v-autocomplete
                  v-model="site_address.site_timezone"
                  :items="timezones"
                  :label="t('Timezone')"
                  item-value="name"
                  item-title="name"
                  density="compact"
                  variant="outlined"
                  :rules="[ruleRequired]"
              ></v-autocomplete>
            </v-row>
            <v-row no-gutters class="mb-4">
              <span class="float-left ma-2 caption">
                {{ t("Latitude") }}
                {{ site_address.site_geolocation.lat }}
              </span>
              <span class="float-left ma-2 caption">
                {{ t("Longitude") }}
                {{ site_address.site_geolocation.long }}
              </span>
            </v-row>
            <v-radio-group id="site_form_image" v-model="default_upload_radio" inline
                           prepend-icon="mdi-panorama-outline">
              <v-radio id="site_form_select_image" :label="t('Use Default Image')" value="default"></v-radio>
              <v-radio id="site_form_upload_image" :label="t('Upload logo / image')" value="userDefined"></v-radio>
            </v-radio-group>
            <div v-if="default_upload_radio === 'userDefined'" class="mt-1">
              <input
                  id="site_form_image_upload"
                  type="file"
                  name="file"
                  class="file-upload mt-1"
                  accept=".png, .jpg, .jpeg"
                  @change="onFileSelected"
              />
              <v-input
                  v-model="site.site_image"
                  class="mt-0 ml-3 mb-5"
                  hint=".png, .jpg, .jpeg - max 2 MB"
                  persistent-hint
                  :rules="[ruleImageRule]"
              />
            </div>
            <v-row v-if="local_image.length > 0" no-gutters class="ma-2">
              <img alt="site-image" :src="local_image" class="float-left site-image"/>
            </v-row>
            <v-card-actions class="text-center ma-4">
              <v-spacer/>
              <v-btn
                  id="site_action_submit"
                  type="submit"
                  :loading="btnSubmitLoading"
                  :disabled="btnSubmitLoading"
                  color="primary"
                  size="small"
              >
                {{ t("Submit") }}
              </v-btn>
              <v-btn id="site_action_cancel" class="mx-2" size="small" variant="outlined" color="default"
                     @click="cancel">
                {{ t("Cancel") }}
              </v-btn>
              <v-spacer/>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
    <v-dialog v-model="showMapDialog" width="900" persistent>
      <v-card elevation="0" color="cardBG2">
        <v-card-title class="ma-0 pa-0">
          <v-row no-gutters>
            <v-spacer/>
            <v-btn id="gmap_close" variant="text" color="grey" icon="mdi-close" @click="showMapDialog = false">
            </v-btn>
          </v-row>
        </v-card-title>
        <GMapsSelectionCard @submit="addAddress"/>
      </v-card>
    </v-dialog>
    <ConfirmCard ref="Confirm"/>
  </div>
</template>

<script lang="ts" setup>
import {getTimeZones} from "@vvo/tzdb";
import {ModeType} from "~/service/utils/components";
import GMapsSelectionCard from "~/components/Cards/GMapSelectionCard.vue"
import ConfirmCard from "~/components/Notify/Confirm.vue"
import {useGeneric} from "~/composables/helpers/useGeneric";
import {useGenericStore} from "~/store/generic"
import {Router} from "~/composables/router/router";


const emit = defineEmits(["submit"])
const siteFormRef = ref()
const Confirm = ref()

const genericHelper = useGeneric()
const genericStore = useGenericStore()

const {t} = useI18n()
const {ruleNoSpacingInStart, ruleRequired, ruleZipCode, ruleImageRule} = useFormRules();

const props = defineProps({
  options: {
    type: Object, required: false, default: () => {
    }
  },
  disableLoading: {type: Boolean, required: false},
  editSite: {
    type: Object, required: false, default: () => {
    }
  },
})

const timezones = ref(getTimeZones());
const form_name = ref(props.options.mode === ModeType.create ? t("Create Site") : t("Update Site"))
const site = ref(props.editSite
    ? {...props.editSite}
    : {
      site_name: "",
      site_icon: "mdi-office-building-marker-outline",
      site_key: "0",
      site_description: "",
      site_image: "/api/v1/generic/asset?path=default-site.png&type=default-img",
      site_type: "test",
    })
const site_address = ref(props.editSite
    ? {...props.editSite.site_address}
    : {
      site_unit: "",
      site_street: "",
      site_area: "",
      site_city: "",
      site_state: "",
      site_country: "",
      site_zip: null,
      site_geolocation: {
        lat: 0,
        long: 0,
      },
      site_timezone: "",
    })

const profileImg = ref({})
const default_image = ref("/generic/asset?path=default-site.png&type=default-img")
const uploaded_image = ref("")
const showMapDialog = ref(false)
const default_upload_radio = ref("default")

const local_image = ref(props.editSite
    ? genericHelper.getURL() + props.editSite.site_image.replace("/api/v1", "")
    : genericHelper.getURL() + "/generic/asset?path=default-site.png&type=default-img")

const btnSubmitLoading = ref(false)
const center = ref({lat: 45.5428128, lng: -122.7244406})

watch(default_upload_radio, (n, o) => {
  if (n === "default") {
    site.value.site_image = default_image.value;
    local_image.value = genericHelper.getURL() + default_image.value;
  } else {
    site.value.site_image = "";
    local_image.value = "";
    if (uploaded_image.value) {
      site.value.site_image = uploaded_image.value;
      local_image.value = genericHelper.getURL() + this.uploaded_image;
    }
  }
})

// watch(disableLoading, (n, o) => {
//   if (n) {
//     btnSubmitLoading.value = false;
//   }
// })

watch(() => site_address.value.site_country, (n, o) => {
  console.debug(n, "site_country");
  const timeZones = getTimeZones();
  console.debug(timeZones, "timeZones")
  const _timezones = timeZones.filter((tz) => {
    return tz.countryName === n && {...tz};
  });
  console.debug(_timezones, "_timezones")
  if (_timezones.length > 0) {
    timezones.value = _timezones;
  } else {
    timezones.value = timezones;
  }
})

const validateSite = async () => {
  btnSubmitLoading.value = true;
  if (siteFormRef.value.validate()) {
    try {
      if (!site_address.value.site_geolocation.lat && !site_address.value.site_geolocation.long) {
        if (site_address.value.site_zip) {
          const google = window.google;
          const geocoder = new google.maps.Geocoder();
          const address = this.site_address.site_zip;
          await geocoder.geocode({address}, async (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              // console.debug(results, "results")
              const latitude = results[0].geometry.location.lat();
              const longitude = results[0].geometry.location.lng();
              site_address.value.site_geolocation.lat = latitude;
              site_address.value.site_geolocation.long = longitude;
              // console.debug(latitude, longitude)
              // alert("Latitude: " + latitude + "\nLongitude: " + longitude);
            } else {
              $notification.show({
                message: t("Please check your zipcode."),
                type: "error",
              });
              btnSubmitLoading.value = false;
              await openConfirmBox();
            }
          });
        }
      }
      submitSite();
    } catch (error) {
      console.debug(error);
      // if (this.checkZipValidationLevel >= 2) {
      // }
      btnSubmitLoading.value = false;
    }
  } else {
    btnSubmitLoading.value = false;
  }
}

const openConfirmBox = async () => {
  const confirm = await Confirm.value.open(
      "",
      t("Error fetching location from zipcode will use default location."),
      {
        color: "success",
      }
  );
  if (confirm) {
    site_address.value.site_geolocation.lat = center.value.lat;
    site_address.value.site_geolocation.long = center.value.lng;
    submitSite();
  }
}

const submitSite = () => {
  if (site_address.value.site_geolocation.lat && site_address.value.site_geolocation.long) {
    site_address.value.site_geolocation.lat = Number(site_address.value.site_geolocation.lat);
    site_address.value.site_geolocation.long = Number(site_address.value.site_geolocation.long);
    if (props.options.mode === ModeType.create) {
      site.value.site_icon = "mdi-office-building-outline";
      site.value.site_key = site.value.site_name.toLowerCase().replace(" ", "-");
    }
    site.value.site_address = site_address.value;
    emit("submit", site.value);
  } else {
    btnSubmitLoading.value = false;
  }
}

const onFileSelected = async (e) => {
  const profileImg = e.target.files[0];
  const formData = new FormData();
  formData.append("image", profileImg);
  formData.append("isBase64", "1");
  formData.append("base64Image", "false")
  if (profileImg.size < 2000000) {
    const response = await genericStore.fileUpload(formData)
    if (response.status === "success") {
      const path = `/api/v1/generic/asset?path=${response.data}&type=img`;
      site.value.site_image = path;
      uploaded_image.value = path;
      local_image.value = genericHelper.getURL() + path;
    }
  } else {
    $notification.show({
      message: t("Image size should be less than 2 MB!"),
      type: "warning",
    });
  }
}

const addAddress = (data) => {
  const siteAddress = {...site_address.value};
  siteAddress.site_street = data.street_name ? data.street_name : "";
  siteAddress.site_area = data.sub_locality ? data.sub_locality : "";
  siteAddress.site_city = data.city ? data.city : "";
  siteAddress.site_state = data.state ? data.state : "";
  siteAddress.site_country = data.country ? data.country : "";
  siteAddress.site_zip = data.postal_code ? data.postal_code : "";
  siteAddress.site_geolocation = {
    lat: data.geo_location.lat,
    long: data.geo_location.lng,
  };
  site_address.value = {...site_address.value, ...siteAddress};
  showMapDialog.value = false;
}

const cancel = () => {
  Router().back();
}
const openMapDialog = (event) => {
  if (!site_address.value.site_zip) {
    showMapDialog.value = true;
    event.target.blur();
  }
}
</script>

<style scoped>
.file-upload {
  color: #efeeee;
  cursor: pointer;
}

.site-image {
  width: 100px;
  height: 100px;
  border-radius: 6px;
}
</style>
