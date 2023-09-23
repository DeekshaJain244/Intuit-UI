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
          <v-form ref="customerFormRef" @submit.prevent="submitCustomer">
            <v-text-field
                id="customer_form_name"
                v-model="customer.customer_name"
                :label="t('Name')"
                density="compact"
                variant="outlined"
                color="formColor"
                background-color="cardBG2"
                :rules="[ruleRequired, ruleNoSpacingInStart]"
            ></v-text-field>
            <!-- <v-text-field
              v-model="customer.customer_icon"
              label="Icon"
              density="compact"
              variant="outlined"
              color="formColor"
              background-color="cardBG2"
              :rules="[ruleRequired, rules.spacing]"
            ></v-text-field>
            <v-text-field
              v-model="customer.customer_key"
              label="Key"
              density="compact"
              variant="outlined"
              color="formColor"
              background-color="cardBG2"
              :rules="[ruleRequired, rules.spacing]"
            ></v-text-field> -->
            <v-text-field
                id="customer_form_description"
                v-model="customer.customer_description"
                :label="t('Description')"
                density="compact"
                variant="outlined"
                color="formColor"
                background-color="cardBG2"
            ></v-text-field>
            <v-row no-gutters>
              <div class="subtitle-2">{{ t("Address") }}</div>
              <v-spacer/>
              <v-btn id="customer_btn_map" color="default" class="mb-2" size="small" @click="showMapDialog = true">
                {{ t("Search Address") }}
                <v-icon size="16" class="ml-2">mdi-google</v-icon>
              </v-btn>
            </v-row>
            <v-row no-gutters justify="space-around">
              <v-text-field
                  id="customer_form_unit"
                  v-model="customerAddress.customer_unit"
                  :label="t('Unit')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
              ></v-text-field>
              <v-text-field
                  id="customer_form_street"
                  v-model="customerAddress.customer_street"
                  class="mx-2"
                  :label="t('Street')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
              ></v-text-field>
              <v-text-field
                  id="customer_form_area"
                  v-model="customerAddress.customer_area"
                  :label="t('Area')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
              ></v-text-field>
            </v-row>
            <v-row no-gutters>
              <v-text-field
                  id="customer_form_city"
                  v-model="customerAddress.customer_city"
                  class="mr-2"
                  :label="t('City')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
                  :rules="[ruleRequired]"
              ></v-text-field>
              <v-text-field
                  id="customer_form_state"
                  v-model="customerAddress.customer_state"
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
                  id="customer_form_country"
                  v-model="customerAddress.customer_country"
                  class="mr-2"
                  :label="t('Country')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
                  :rules="[ruleRequired]"
              ></v-text-field>
              <v-text-field
                  id="customer_form_zip"
                  v-model="customerAddress.customer_zip"
                  class="ml-2"
                  :label="t('Zip Code')"
                  density="compact"
                  variant="outlined"
                  color="formColor"
                  background-color="cardBG2"
                  :rules="[ruleRequired, ruleZipCode]"
              ></v-text-field>
            </v-row>
            <v-combobox
                id="customer_form_contact"
                v-model="customer.customer_contact"
                multiple
                variant="outlined"
                chips
                density="compact"
                :label="t('Phone Number')"
                :delimiters="[',', ' ']"
                :hint="t(`Add Phone Number by giving ' , ' or space separated values.`)"
                persistent-hint
                color="formColor"
                background-color="cardBG2"
                :rules="[rulePhoneNumber]"
                @update:model-value="delimitPhoneNumber"
            >
              <template #selection="data">
                <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    class="my-1"
                    variant="outlined"
                    @click="data.select"
                    @click:close="removePhoneNumber(data.item)"
                >
                  {{ data.item }}
                </v-chip>
              </template>
            </v-combobox>
            <div>
              <v-icon>mdi-panorama-outline</v-icon>
              <label for="file" class="subtitle-2 pa-2"> {{ t("Upload image") }} </label>
              <br/>
              <span class="float-left ma-2 caption"> .png, .jpg, .jpeg </span>
              <input
                  type="file"
                  name="file"
                  class="file-upload mt-2"
                  accept=".png, .jpg, .jpeg"
                  @change="onFileSelected"
              />
              <v-input class="mt-0 ml-3 mb-5" :rules="[imageRule]"/>
            </div>
            <div class="text-center mb-3">
              <v-btn
                  id="customer_action_submit"
                  type="submit"
                  :loading="btnSubmitLoading"
                  :disabled="btnSubmitLoading"
                  color="primary"
                  small
              >
                {{ t("Submit") }}
              </v-btn>
              <v-btn id="customer_action_cancel" class="mx-2" small variant="outlined" color="default" @click="cancel">
                {{ t("Cancel") }}
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
    <v-dialog v-model="showMapDialog" width="900" persistent>
      <v-card elevation="0" color="cardBG2" class="pa-1">
        <v-card-title class="ma-0 pa-0">
          <v-row no-gutters>
            <v-spacer/>
            <v-btn id="gmap_close" icon @click="showMapDialog = false">
              <v-icon color="grey">mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-card-title>
        <GMapsSelectionCard @submit="addAddress"/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import GMapsSelectionCard from "~/components/Cards/GMapSelectionCard.vue"
import {Router} from "~/composables/router/router";
import {useGenericStore} from "~/store/generic"

const genericStore = useGenericStore()

const emit = defineEmits(["submit"])
const {t} = useI18n()
const {ruleNoSpacingInStart, ruleRequired, ruleZipCode, rulePhoneNumber} = useFormRules();

const props = defineProps({
  options: {type: Object, required: false},
  disableLoading: {type: Boolean, required: false},
  editCustomer: {type: Object, required: false},
})

const customerFormRef = ref()
const form_name = ref<string>(props.options.mode === "create" ? t("Create Customer") : t("Update Customer"))
const customer = ref<object>(props.options.mode === "update" ? props.editCustomer : {
  customer_name: "",
  customer_icon: "mdi-user",
  customer_key: "",
  customer_description: "",
  customer_contact: [],
  customer_image: "/api/v1/generic/asset?path=default-site.png&type=default-img",
})
const customerAddress = ref<object>(props.options.mode === "update" ? props.editCustomer.customer_address : {
  customer_unit: "",
  customer_street: "",
  customer_area: "",
  customer_city: "",
  customer_state: "",
  customer_country: "",
  customer_zip: "",
})


const showMapDialog = ref<boolean>(false)
const btnSubmitLoading = ref<boolean>(false)

const imageRule = computed(() => {
  if (customer.value.customer_image) {
    return true;
  } else {
    return t("Image required");
  }
})

watch(() => props.disableLoading, (n, o) => {
  if (n) {
    btnSubmitLoading.value = false;
  }
})

const delimitPhoneNumber = (v) => {
  console.debug(v, "delimitPhoneNumber")
  const reducer = (a, e) => [...a, ...e.split(/[, ]+/)];
  console.debug(v.reduce(reducer, []))
  customer.value.customer_contact = [...new Set(v.reduce(reducer, []))];
}
const removePhoneNumber = (data) => {
  customer.value.customer_contact = customer.value.customer_contact.filter((al) => {
    return al !== data;
  });
}
const addAddress = (data) => {
  const _customerAddress = {...customerAddress.value};
  _customerAddress.customer_street = data.street_name ? data.street_name : "";
  _customerAddress.customer_area = data.sub_locality ? data.sub_locality : "";
  _customerAddress.customer_city = data.city ? data.city : "";
  _customerAddress.customer_state = data.state ? data.state : "";
  _customerAddress.customer_country = data.country ? data.country : "";
  _customerAddress.customer_zip = data.postal_code ? data.postal_code : "";

  customerAddress.value = {
    ...customerAddress.value,
    ..._customerAddress,
  };

  showMapDialog.value = false;
}

const submitCustomer = () => {
  btnSubmitLoading.value = true;
  if (customerFormRef.value.validate()) {
    const _customer = {...customer.value};
    if (props.options.mode === "create") {
      _customer.customer_icon = "mdi-user";
      _customer.customer_key = _customer.customer_name.toLowerCase().replace(" ", "-");
    }
    console.debug(customerAddress.value, "customerAddress")
    _customer.customer_address = customerAddress.value;
    if (!_customer.customer_contact) {
      _customer.customer_contact = [];
    }
    console.debug(_customer, "_customer")
    emit("submit", _customer);
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
      customer.value.customer_image = path;
    }
  } else {
    // this.$notification.show({
    //   message: this.$t("Image size should be less than 2 MB!"),
    //   type: "warning",
    // });
  }
}
const cancel = () => {
  Router().back();
}

</script>

<style scoped>
.file-upload {
  color: gray;
  cursor: pointer;
}
</style>
