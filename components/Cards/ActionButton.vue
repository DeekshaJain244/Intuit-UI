/*
* Copyright (c) 2022-2023 Megh Computing, Inc.
*
* All rights reserved. No warranty, explicit or implied, provided.
* Unauthorized use, modification, or distribution is strictly prohibited.
*/

<template>
  <div style="margin: 5px 10px 2px 10px">
    <v-btn
        :id="action.id && action.id"
        :disabled="action_state"
        elevation="2"
        min-width="140"
        max-width="280"
        class="zoom route_text rounded-sm"
        :color="action_background_color"
        @click="triggerAction"
    >
      <v-icon color="white">{{ action.icon }}</v-icon>
      &nbsp; {{ action.name }}
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
const {t} = useI18n()
const action_state = ref(false)
const action_background_color = ref("cardBG1")

const emit = defineEmits(["triggerAction"])

const {action} = defineProps({
  action: {
    type: Object,
    required: false,
    default: () => {
      return {
        id: "",
        name: "",
        icon: "",
        state: false,
        background_color: "",
      };
    },
  }
});


action_state.value = !action.state;
action_background_color.value = action.state ? action.background_color : "cardBG1";

const triggerAction = () => {
  emit("triggerAction", action);
}

</script>

<style scoped>
.zoom {
  transition: transform 0.2s;
  border-radius: 8px;
  margin: 0 auto;
}

.zoom:hover {
  -ms-transform: scale(1.1); /* IE 9 */
  -webkit-transform: scale(1.1); /* Safari 3-8 */
  transform: scale(1.1);
  z-index: 1;
}

.v-btn--outlined {
  border: thin solid #cccccc69;
}
</style>
