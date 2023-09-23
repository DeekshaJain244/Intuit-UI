<template>
  <div>
    <v-row no-gutters align="center" justify="center">
      <v-card class="pa-6 mt-5" width="750" color="cardBG1" elevation="0">
        <v-card-subtitle class="text-center subtitle-1">
          {{ form_name }}
        </v-card-subtitle>
        <v-card-text>
          <v-form ref="licenseForm" @submit.prevent="submitLicense">
            <v-text-field
                id="license_name"
                v-model="license.license_name"
                :label="t('Name')"
                density="compact"
                variant="outlined"
                color="formColor"
                background-color="cardBG2"
                hint="A friendly name for license."
                :rules="[ruleRequired]"
            ></v-text-field>
            <v-text-field
                id="license_customer"
                v-model="license.license_customer"
                :label="t('Customer Key')"
                density="compact"
                variant="outlined"
                color="formColor"
                background-color="cardBG2"
                :rules="[ruleRequired, ruleExactLength]"
            ></v-text-field>
            <div class="text-center mb-3">
              <v-btn
                  id="license_action_submit"
                  :loading="btnSubmitLoading"
                  :disabled="btnSubmitLoading"
                  type="submit"
                  color="primary"
                  size="small"
              >
                {{ t("Submit") }}
              </v-btn>
              <v-btn
                  v-if="showCancel"
                  id="license_action_cancel"
                  class="mx-2"
                  size="small"
                  variant="outlined"
                  color="default"
                  @click="cancel"
              >
                {{ t("Cancel") }}
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import {ModeType} from "~/service/utils/components";

interface license {
  license_name: string | null
  license_customer: string | null
}

const {t} = useI18n()
const {ruleRequired, ruleExactLength} = useFormRules();
const licenseForm = ref()
const btnSubmitLoading = ref(false);

const emit = defineEmits(["closeDialog", "submit"])

const {options, editLicense, showCancel} = defineProps({
  options: {
    type: Object,
    required: false,
    default: () => ({mode: ModeType.create})
  },
  editLicense: {
    type: Object,
    required: false,
    default: () => {
    },
  },
  showCancel: {
    type: Boolean,
    default: () => true,
  },
})

// console.debug(options.mode.value,  ModeType.create, "options")

const form_name = ref<string>(options.mode.value === ModeType.create.value ? t("Create License") : t("Update License"))
const license = ref<object>(options.mode.value === ModeType.update.value ? {...editLicense} : {
  license_name: null,
  license_customer: null,
})

const submitLicense = async () => {
  if (licenseForm.value.validate()) {
    btnSubmitLoading.value = true;
    emit("submit", license.value)
    btnSubmitLoading.value = false;
  }
};

const cancel = () => {
  emit("closeDialog")
}

</script>