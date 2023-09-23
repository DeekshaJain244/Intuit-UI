/*
 * Copyright (c) 2021-2023 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

// TODO:: The nuxti18n is a beta version added just for the lang files. When stable version is out upgrade to that version.

import en from "../lang/en.js";
import fr from "../lang/fr.js";

// export default {
//     locale: "en",
//     fallbackLocale: "en",
//     messages: {en, fr},
// };

export default defineI18nConfig(() => ({
    legacy: false,
    fallbackLocale: "en",
    globalInjection: true,
    locale: 'en',
    messages: {
        en,
        fr
    }
}))
