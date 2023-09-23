<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-dialog v-model="dialog" :style="{ zIndex: options.zIndex }" max-width="600" @keydown.esc="cancel">
    <v-card class="pa-1" color="cardBG3" max-height="300">
      <v-card-text class="text-center title">
        <p class="ma-2 body-1" v-html="message"></p>
      </v-card-text>
      <v-card-actions class="ma-2">
        <v-spacer/>
        <v-btn id="confirm_btn_submit" :color="options.color"  variant="text" size="small" width="80" @click="agree">
          {{ isDefault ? t("Yes") : t("Submit") }}
        </v-btn>
        <v-btn id="confirm_btn_submit" variant="outlined" color="default" size="small" width="80" @click="cancel">
          {{ isDefault ? t("No") : t("Cancel") }}
        </v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const {t} = useI18n()
const props = defineProps({
  isDefault: {
    type: Boolean,
    required: false,
  },
})

const resolve = ref(null)
const reject = ref(null)
const dialog = ref<boolean>(false)
const message = ref<string>("")
const title = ref<string>("")
const options = ref({color: "primary", zIndex: 0})

const open = (_title: string, _message: string, options: object) => {
  dialog.value = true;
  title.value = _title;
  message.value = _message;
  // options.value = Object.assign(this.options, options);
  return new Promise((_resolve, _reject) => {
    resolve.value = _resolve;
    reject.value = _reject;
  });
}
const agree = () => {
  resolve.value(true);
  dialog.value = false;
}
const cancel = () => {
  resolve.value(false);
  dialog.value = false;
}

defineExpose({
  open
})
</script>
