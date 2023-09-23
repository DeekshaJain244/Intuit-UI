import {createVuetify} from "vuetify";
import * as directives from 'vuetify/directives'
import {VDataTable} from 'vuetify/labs/VDataTable'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
// import {VDataTableServer} from 'vuetify/labs/VDataTableServer'
// import {VDataTableVirtual} from 'vuetify/labs/VDataTableVirtual'
// import {en} from "vuetify/locale";
import {aliases, mdi} from "vuetify/lib/iconsets/mdi";
import '@mdi/font/css/materialdesignicons.css'
import {DARK_THEME, LIGHT_THEME} from "~/utils/themes";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: DARK_THEME,
            themes: {
                light,
                dark,
            },
            // add color variations
            //   variations: {
            //     colors: ["primary", "secondary"],
            //     lighten: 3,
            //     darken: 3,
            //   },
        },
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi
            }
        },
        defaults: {
            nuxt: true,
        },
        components: {
            VDataTable,
            VSkeletonLoader,
            // VDataTableServer,
            // VDataTableVirtual,
        },
        directives,
    });

    nuxtApp.vueApp.use(vuetify);
});