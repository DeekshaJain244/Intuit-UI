<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <v-row no-gutters align="center" justify="center">
      <v-card elevation="0" class="pa-6 mt-5" color="cardBG1" width="750">
        <v-card-subtitle class="text-center subtitle-1">
          {{ form_name }}
        </v-card-subtitle>
        <v-card-text>
          <v-form ref="nimbleForm" @submit.prevent="selectLicense">
            <v-text-field
                id="nimble_form_name"
                v-model="nimble.nimble_name"
                :label="t('Name')"
                density="compact"
                variant="outlined"
                color="formColor"
                background-color="cardBG2"
                :rules="[ruleRequired, ruleNoSpaces]"
            ></v-text-field>
            <v-row class="pa-1">
              <v-col cols="12" md="8">
                <v-row>
                  <v-text-field
                      id="nimble_form_address"
                      v-model="nimble.nimble_address"
                      class="ma-2"
                      density="compact"
                      variant="outlined"
                      :label="t('Address')"
                      hint="IP address or hostname"
                      color="formColor"
                      background-color="cardBG2"
                      :disabled="options.mode === ModeType.update && !nimble.nimble_is_override"
                      :rules="[ruleRequired, ruleIPAddress, ruleNoSpaces]"
                  ></v-text-field>
                  <span class="mt-3 my-2 headline">:</span>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <v-row>
                  <v-text-field
                      id="nimble_form_port"
                      v-model.number="nimble.nimble_port"
                      class="ma-2"
                      density="compact"
                      variant="outlined"
                      type="Number"
                      :label="t('Port')"
                      color="formColor"
                      background-color="cardBG2"
                      :disabled="options.mode === ModeType.update && !nimble.nimble_is_override"
                      :rules="[ruleRequired,ruleNumberType, ruleCheckPort]"
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="pa-1 mt-2 mb-4">
              <v-col cols="12" md="12">
                <v-row>
                  <v-switch
                      v-model="nimble.nimble_is_secure"
                      color="success"
                      :label="nimble.nimble_is_secure ? t('https') : t('http')"
                      class="ma-3"
                      disabled
                  ></v-switch>
                  <v-text-field
                      id="nimble_form_timeout"
                      v-model="nimble.nimble_timeout"
                      class="ma-3"
                      density="compact"
                      variant="outlined"
                      :label="t('Connection Timeout')"
                      :hint="t('in seconds')"
                      color="formColor"
                      background-color="cardBG2"
                      :disabled="options.mode === ModeType.update && !nimble.nimble_is_override"
                      :rules="[ruleRequired, ruleTimeout]"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="12" md="12">
                <v-row>
                  <!--                <v-switch-->
                  <!--                  v-model="nimble_retry.disable_backoff"-->
                  <!--                  id="nimble_form_disable_backoff"-->
                  <!--                  color="success"-->
                  <!--                  :label="-->
                  <!--                    nimble_retry.disable_backoff ? 'Retry' : 'Don\'t Retry'-->
                  <!--                  "-->
                  <!--                  class="ma-3"-->
                  <!--                  disabled-->
                  <!--                ></v-switch>-->
                  <v-text-field
                      id="nimble_form_wait_base"
                      v-model="nimble_retry.wait_base"
                      class="ma-3"
                      density="compact"
                      variant="outlined"
                      :label="t('Wait between Retry')"
                      :hint="t('in seconds')"
                      color="formColor"
                      background-color="cardBG2"
                      :disabled="options.mode === ModeType.update && !nimble.nimble_is_override"
                      :rules="[ruleRequired]"
                  ></v-text-field>
                  <v-text-field
                      id="nimble_form_times"
                      v-model="nimble_retry.times"
                      class="ma-3"
                      density="compact"
                      variant="outlined"
                      :label="t('Retry times')"
                      :hint="t('-1 to try indefinitely')"
                      persistent-hint
                      color="formColor"
                      background-color="cardBG2"
                      :disabled="options.mode === ModeType.update && !nimble.nimble_is_override"
                      :rules="[ruleRequired]"
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
            <!-- <v-select
            v-model="nimble.site_ids"
            outlined
            dense
            :items="sites"
            label="Select Site"
            item-text="site_name"
            item-value="site_id"
            :disabled="disableInput"
            :rules="[rules.required]"
          ></v-select> -->
            <!-- <v-btn @click="testNimble">Test</v-btn> -->
            <div class="text-center mb-3">
              <v-btn
                  id="nimble_action_submit"
                  type="submit"
                  :loading="btnSubmitLoading"
                  :disabled="btnSubmitLoading"
                  color="primary"
                  size="small"
              >
                {{ t("Submit") }}
              </v-btn>
              <v-btn id="nimble_action_cancel" class="mx-2" size="small" variant="outlined" color="default"
                     @click="cancel">
                {{ t("Cancel") }}
              </v-btn>
            </div>
          </v-form>
        </v-card-text>

      </v-card>
    </v-row>
    <v-dialog v-model="showLicenseDialog" width="600">
      <v-card color="cardBG2" elevation="0" class="pa-1">
        <v-row no-gutters justify="center" align="center">
          <v-card
              v-for="(license, i) in licenses"
              :key="i"
              class="ma-2 pa-4"
              color="cardBG3"
              @click.stop="attachLicenseToNimble(license)"
          >
            <v-card-subtitle class="pa-0 ma-0 mb-4 body-1 font-weight-medium">
              <v-row no-gutters align="center" justify="center">
                <span class="ml-2">{{ license.license_name }}</span>
                <v-spacer/>
                <v-icon
                    v-if="options.mode === ModeType.update && nimble.license.license_uuid === license.license_uuid"
                    size="28"
                    color="success"
                >
                  mdi-check-circle
                </v-icon>
                <v-icon v-else size="28" color="default">mdi-circle-outline</v-icon>
              </v-row>
            </v-card-subtitle>
            <v-card-text class="pa-1 ma-0 b1sg">
              <LicenseCard :license="license" :is-context-menu="false" :mode="'view'"/>
            </v-card-text>
          </v-card>
        </v-row>
      </v-card>
    </v-dialog>
    <ConfirmCard ref="Confirm" :is-default="true"/>
  </div>
</template>

<script lang="ts" setup>
import {ModeType} from "~/service/utils/components";
import {Router} from "~/composables/router/router";
import ConfirmCard from "~/components/Notify/Confirm.vue"
import LicenseCard from "~/components/Cards/License.vue"

const {t} = useI18n()
const props = defineProps({
  options: {type: Object, required: false},
  edit_nimble: {type: Object, required: false},
  disableLoading: {type: Boolean, required: false},
  configurations: {
    type: Array,
    default: () => [],
  },
  licenses: {type: Array, default: () => []},
})

const nimbleForm = ref()
const Confirm = ref()

const emit = defineEmits(["submit"])

const form_name = ref(
    props.options.mode === ModeType.update
        ? t("Update Nimble configuration")
        : t("Create Nimble configuration"))

const nimble = ref(props.edit_nimble
    ? {...props.edit_nimble}
    : {
      nimble_key: "",
      nimble_name: "",
      nimble_address: "nimble",
      nimble_port: 6344,
      nimble_is_secure: false,
      nimble_timeout: "60",
      license_id: "",
      site_ids: [],
    })

let nimbleRetry;
if (props.options.mode === ModeType.update) {
  nimbleRetry = {...props.edit_nimble.nimble_retry};
}

const nimble_retry = ref(props.edit_nimble
    ? {...nimbleRetry}
    : {
      wait_base: 20,
      disable_backoff: false,
      times: -1,
    })

const sites = ref([])
const btnSubmitLoading = ref(false)
const showLicenseDialog = ref(false)
const createNimble = ref(false)
// const ModeType = ref()

onMounted(async () => {
  // if (this.$store.state.site.customer_id) {
  //   const response = await this.$store.dispatch("site/getAllSites");
  //   if (response) {
  //     const sites = this.$store.state.site.sites;
  //     this.sites = [...sites];
  //   } else {
  //     this.sites = [];
  //   }
  // }
})

watch(() => props.disableLoading, (n, o) => {
  if (n) {
    btnSubmitLoading.value = false;
  }
})

const selectLicense = () => {
  const validate = nimbleForm.value.validate();
  console.debug(props.edit_nimble, "edit_nimble")
  if (validate) {
    if (props.options.mode === ModeType.create) {
      showLicenseDialog.value = true;
    } else if (props.options.mode === ModeType.update && props.edit_nimble.nimble_is_override) {
      const confirm = Confirm.value.open(
          "",
          t("Do you also want to update license for this nimble?"),
          {
            color: "success",
          }
      );
      if (confirm) {
        showLicenseDialog.value = true;
      } else {
        submitNimble();
      }
    } else {
      showLicenseDialog.value = false;
      submitNimble();
    }
  }
}

const submitNimble = () => {
  const validate = matchData();
  if (validate) {
    const _nimble = {...nimble.value};
    nimble_retry.value.wait_base = Number(nimble_retry.value.wait_base);
    nimble_retry.value.times = Number(nimble_retry.value.times);
    _nimble.nimble_retry = nimble_retry.value;
    _nimble.nimble_port = Number(_nimble.nimble_port);
    // console.debug(this.nimble, nimble, "nimble");
    emit("submit", _nimble);
  }
}

const matchData = () => {
  const validate = nimbleForm.value.validate();
  if (validate) {
    if (props.options.mode === ModeType.create) {
      const name = nimble.value.nimble_name;
      // console.debug(props.configurations, "configurations");
      const nimbleNameMatch = props.configurations.find((config) => {
        return config.nimble_name === name && true;
      });
      if (nimbleNameMatch) {
        useNuxtApp().$notification.show({
          message: t("Nimble name must be unique."),
          type: "warning",
        });
        return false;
      }
      const port = nimble.value.nimble_port;
      const address = nimble.value.nimble_address;
      const configFind = props.configurations.find((config) => {
        return config.nimble_address === address && config.nimble_port === Number(port) && true;
      });
      if (configFind) {
        useNuxtApp().$notification.show({
          message: t("Nimble Address and port already exists"),
          type: "warning",
        });
        return false;
      } else {
        return true;
      }
    } else if (props.options.mode === ModeType.update) {
      nimble.value.license_id = nimble.value.license_id ? nimble.value.license_id : nimble.value.license.license_id;
      if (nimble.value.nimble_is_override) {
        const port = nimble.value.nimble_port;
        const address = nimble.value.nimble_address;
        const configFind = props.configurations.find((config) => {
          return (
              config.nimble_id !== nimble.value.nimble_id &&
              config.nimble_address === address &&
              config.nimble_port === Number(port)
          );
        });
        if (configFind) {
          useNuxtApp().$notification.show({
            message: t("Nimble Address and port already exists"),
            type: "warning",
          });
          return false;
        } else {
          return true;
        }
      }
      return true;
    }
    return true;
  } else {
    useNuxtApp().$notification.show({
      message: t("Error(s) in form fields"),
      type: "warning",
    });
    return false;
  }
}

const attachLicenseToNimble = (license) => {
  nimble.value.license_id = license.license_id;
  showLicenseDialog.value = false;
  submitNimble();
}

const cancel = () => {
  // this.$router.back();
  Router().back()
}
</script>

<style></style>
