<!--
  - Copyright (c) 2022 Megh Computing, Inc.
  -
  - All rights reserved. No warranty, explicit or implied, provided.
  - Unauthorized use, modification, or distribution is strictly prohibited.
  -->

<template>
  <v-row no-gutters align="center" justify="center">
    <v-breadcrumbs class="pa-0 mx-1 float-left" :items="breadCrumbs && breadCrumbs" density="compact">
      <template #title="{ item }">
        <v-breadcrumbs-item v-if="item.disabled" >
          <v-btn size="small" color="grey" variant="text">{{ item.text }}</v-btn>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item v-else :to="localePath(item.href)">
          <v-btn size="small" color="breadText" variant="text">
            {{ item.text }}
          </v-btn>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <v-spacer/>
    <!-- <v-btn v-if="displayTour()" small icon color="default" @click="openTour()">
      <v-icon>mdi-help-circle-outline</v-icon>
    </v-btn> -->
    <v-btn v-show="indexStore.display_info" variant="text" icon="mdi-information" size="small" color="grey"
           @click="showInfo = true">
    </v-btn>
    <InformationCard v-show="showInfo" :show-info="showInfo" @closeInfoDialog="showInfo = !showInfo"/>
    <!-- <v-dialog
      v-model="tourDialog"
      fullscreen
      width="100%"
      class="ma-0"
      transition="dialog-bottom-transition"
    >
      <v-card
        elevation="0"
        class="ma-0"
        min-width="100%"
        min-height="100%"
        color="transparent"
        :ripple="false"
      >
      <div
        class="ma-0"
        :style="{ width: '100%', minHeight: '100vh', bottom: '0px' }"
      >
        <v-row no-gutters justify="center">
          <v-btn small @click="closeTour()" class="ma-1"> Close tour </v-btn>
        </v-row>
        <v-row no-gutters justify="center">
          <canvas id="canvas" :height="canH" :width="canW"></canvas>
          <v-menu
            v-model="showTour"
            :position-x="menX"
            :position-y="menY"
            absolute
          >
            <v-card class="pa-5" elevation="0" :width="carW" color="cardBG3">
             :height="carH"
              <v-card-text> {{ tourDataText }} </v-card-text>
              <v-progress-linear
                absolute
                bottom
                :value="Math.floor(100 * (currentTime / timeout))"
              />
            </v-card>
          </v-menu>
        </v-row>
      </div>
      </v-card>
    </v-dialog> -->
    <!--    <TourCard name="help" :steps="tourData" :start-tour="startTour" @setTourBool="startTour = false"></TourCard>-->
  </v-row>
</template>

<script lang="ts" setup>
import InformationCard from "~/components/Cards/Information.vue"
import {RouterPush} from "~/composables/router/router";
import {useMainStore} from "~/store";

const localePath = useLocalePath()

const indexStore = useMainStore()
const breadCrumbs = ref(indexStore.items)
const tourData = ref(indexStore.tourData)
const showTour = ref<Boolean>(false)
const showInfo = ref<Boolean>(false)
const startTour = ref<Boolean>(false)
const tourDialog = ref<Boolean>(false)
const tourDataText = ref("")

watch(() => indexStore.items, (n, o) => {
  if (n) {
    breadCrumbs.value = n
  }
})

watch(indexStore.tours, (n, o) => {
  tourData.value = n;
})

// const goTo = async (item) => {
//   await RouterPush(item.href);
// }

// const syncLoading = () => {
//   setTimeout(() => {
//     this.currentTime += 100;
//     if (this.timeout <= this.currentTime) {
//       this.currentTime = 0;
//     } else {
//       syncLoading();
//     }
//   }, 100);
// }

// const tourIt = () => {
//   tourDialog.value = true;
//   // const self = this;
//   for (let i = 0; i < tourData.value.length; i++) {
//     if (tourDialog.value) {
//       setTimeout(() => {
//         this.currentTime = 0;
//         syncLoading();
//         show(tourData.value[i]);
//         tourDataText.value = tourData.value[i].text;
//       }, i * this.timeout);
//     }
//   }
// }

// watch -> showTour: {
//   handler(n, o) {
//     if (n) {
//       const canvas = document.getElementById("canvas");
//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.beginPath();
//       ctx.fillStyle = "rgba(255,255,255,0.01)";
//       ctx.strokeRect(0, 0, canvas.width, canvas.height);
//       var maskCanvas = document.createElement("canvas");
//       maskCanvas.width = canvas.width;
//       maskCanvas.height = canvas.height;
//       var maskCtx = maskCanvas.getContext("2d");
//       maskCtx.fillStyle = this.$vuetify.dark ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)";
//       maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
//       maskCtx.globalCompositeOperation = "xor";
//       maskCtx.rect(this.x, this.y, this.w, this.h);
//       maskCtx.fill();
//       ctx.drawImage(maskCanvas, 0, 0);
//     }
//   },
// },

// openTour() {
//   this.startTour = !this.startTour;
// },
// displayTour() {
//   if (this.tourData.length > 0) {
//     return true;
//   } else {
//     return false;
//   }
// },
// show(data) {
//   if (data.id == "tourClose") {
//     this.showTour = false;
//     this.tourDialog = false;
//   } else {
//     let ch = window.$(document).height();
//     ch = ch - ch * 0.05;
//     let cw = window.$(document).width();
//     let h = window.$(`#${data.id}`).outerHeight() + 90;
//     let w = window.$(`#${data.id}`).outerWidth() + 90;
//     let offset = window.$(`#${data.id}`).offset();
//     this.showTour = false;
//     let x = offset.left - 40;
//     if (x < 0) {
//       x = 0;
//     }
//     let y = offset.top - 80;
//     if (y < 0) {
//       y = 0;
//     }
//     this.x = x;
//     this.y = y;
//     this.menX = x;
//     this.menY = y;
//     if (x + w > cw) {
//       this.menX = cw - 2 * w;
//     }
//     if (y + h > ch) {
//       this.menY = ch - 2 * h;
//     }
//     this.w = w;
//     this.h = h;
//     this.carH = h;
//     this.carW = w;
//     this.canH = ch;
//     this.canW = cw;
//     this.$nextTick(() => {
//       this.showTour = true;
//     });
//   }
// },
// closeTour() {
//   this.tourDialog = false;
//   this.tourData = [];
// },
</script>

<!--<style lang="scss" scoped>-->
<!--.v-step {-->
<!--  background-color: rgba(125, 125, 125, 0.4) !important;-->

<!--.v-step__arrow {-->
<!--  width: 0;-->
<!--  height: 0;-->
<!--  border-style: solid;-->
<!--  position: absolute;-->
<!--  margin: 0.5rem;-->
<!--}-->

<!--.v-step__arrow&#45;&#45;dark {-->
<!--  border-color: #ffffff !important;-->

<!--/* #ffc107, #35495e */-->
<!--&-->
<!--&#45;&#45;dark {-->
<!--  border-color: #ffffff !important;-->
<!--}-->

<!--}-->
<!--}-->
<!--</style>-->

<style lang="css" scoped>
.v-step {
  background-color: rgba(125, 125, 125, 0.4) !important;
}

.v-step .v-step__arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 0.5rem;
}

.v-step .v-step__arrow--dark {
  border-color: #fff !important;
  /* #ffc107, #35495e */
}

.v-step .v-step__arrow--dark --dark {
  border-color: #fff !important;
}
</style>
