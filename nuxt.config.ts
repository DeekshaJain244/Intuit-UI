import vuetify from "vite-plugin-vuetify";
import i18n from "./module/i18n";

export default defineNuxtConfig({
    ssr: false,
    typescript: {
        strict: true,
    },
    build: {transpile: ["vuetify", "vue-google-maps-community-fork", '@googlemaps/markercluster']},
    runtimeConfig: {
        public: {
            isDebug: process.env.NODE_ENV == "development",
            baseURL:
                process.env.API_URL || "http://localhost:8000/api/v1",
            apiAuthURL: process.env.API_AUTH_URL || "http://localhost:8002/api/v1",
            socketURL: process.env.SOCKET_URL || "ws://localhost:5000",
        },
    },
    css: ["vuetify/styles", '~/assets/css/main.scss'],
    vite: {
        // @ts-ignore
        // currently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
        ssr: {
            noExternal: ["vuetify"],
        },
        optimizeDeps: {
            include: [
                // 'vue-google-maps-community-fork',
                'fast-deep-equal',
            ],
        }
    },
    modules: [
        ['@pinia/nuxt', {autoImports: ["defineStore", "acceptHMRUpdate"]}],
        '@hypernym/nuxt-anime',
        i18n,
        '@nuxtjs/i18n',
        async (options, nuxt) => {
            nuxt.hooks.hook("vite:extendConfig", (config: any) => {
                config.plugins.push(vuetify(
                    //     {
                    //     styles: {
                    //         configFile: "assets/main.scss",
                    //     }
                    // }
                ));
            });
        },
        ['@nuxtjs/google-fonts', {
            families: {
                Roboto: true,
                'Josefin+Sans': true,
                Lato: [100, 300],
                Raleway: {
                    wght: [100, 400],
                    ital: [100]
                },
            }
        }],
    ],
    imports: {
        dirs: ['store']
    },
    app: {
        head: {
            title: "Portal Next level",
            titleTemplate: "%s",
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [
                {rel: "stylesheet", href: "https://rsms.me/inter/inter.css"},
                {rel: "preconnect", href: "https://rsms.me/"},
                {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
                {rel: "canonical", href: ""},
            ],
            meta: [],
        },
    },

    i18n: {
        locales: [
            {code: "en", iso: "en-US", name: "English", file: "en.js", dir: "ltr"}, // ltr rtl
            {code: "fr", iso: "fr-FR", name: "French", file: "fr.js", dir: "ltr"},
        ],
        langDir: "lang",
        lazy: true,
        strategy: "prefix_except_default",
        defaultLocale: "en",
        vueI18n: "./config/i18n.ts",
    },
    anime: {
        composables: true,
        provide: true
    },
    spaLoadingTemplate: true,
});