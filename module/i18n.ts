import {createResolver, defineNuxtModule} from '@nuxt/kit'

export default defineNuxtModule({
    async setup(options, nuxt) {
        const {resolve} = createResolver(import.meta.url)

        nuxt.hook('i18n:registerModule', register => {
            register({
                // langDir path needs to be resolved
                langDir: resolve('../lang'),
                locales: [
                    {code: "en", iso: "en-US", name: "English", file: "en.js", dir: "ltr"}, // ltr rtl
                    {code: "fr", iso: "fr-FR", name: "French", file: "fr.js", dir: "ltr"},
                ]
            })
        })
    }
})