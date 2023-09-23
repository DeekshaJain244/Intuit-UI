<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <div>
    <v-overlay class="align-center justify-center" :model-value="overlay" opacity="0.65" persistent>
      <div style="text-align: center">
        <div class="text-center pa-2 stripes">{{ message }}</div>
      </div>
      <v-progress-linear indeterminate size="64" color="overlayColor"></v-progress-linear>
    </v-overlay>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["verifyTransaction"])

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  overlay: {
    type: Boolean,
    required: true,
  },
  overLayTimeout: {
    type: Boolean,
  },
  overlayTimeOutMessage: {
    type: String,
  },
})

watch(() => props.overLayTimeout, (n, o) => {
  if (n) {
    useNuxtApp().$notification.show({
      title: "",
      message: overlayTimeOutMessage.value,
      type: "warning",
      position: "topCenter",
      timeout: false,
      close: false,
      buttons: [
        // true to focus
        [
          "<button>Close</button>",
          (instance, toast) => {
            instance.hide(
                {
                  transitionOut: "fadeOutUp",
                  onClosing: (instance, toast, closedBy) => {
                    emit("verifyTransaction");
                  },
                },
                toast,
                "buttonName"
            );
          },
        ],
      ],
    });
  }
})
</script>

<style scoped>
.shade {
  background: rgba(255, 140, 0, 0.5);
  color: bisque;
}

.stripes {
  width: 350px;
  margin-bottom: 10px;
  border-radius: 4px;
  background: rgba(77, 77, 77, 0.705);
}
</style>
