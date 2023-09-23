import VueGoogleMaps from 'vue-google-maps-community-fork';
import {defineNuxtPlugin, NuxtApp} from "nuxt/app";


export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
    nuxtApp.vueApp.use(VueGoogleMaps, {
        load: {
            key: "AIzaSyAnTWrbJT9KOjJ_DiKAtarIDHDvLvcSflk",
            libraries: "places",
            autoBindAllEvents: false,
        },
        installComponents: true,
        dynamicLoad: false,
    })
})