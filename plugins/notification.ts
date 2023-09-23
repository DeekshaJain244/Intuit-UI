/*
 * Copyright (c) 2021-2022 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {defineNuxtPlugin} from "nuxt/app";
// import {useVuetify} from "~/composables/useVuetify";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            notification: {
                show: ({...data}) => {
                    if (typeof data.title === "undefined") {
                        data.title = ""; // data.type.toUpperCase()
                    }
                    if (typeof data.timeout === "undefined") {
                        data.timeout = 5000;
                    }
                    data.layout = 1;
                    // useVuetify()
                    // if (data.theme) {
                    //     data.theme = useVuetify().theme.name === "dark";
                    //     // do nothing
                    // } else {
                    // data.theme = useVuetify().theme.name === "dark" ? "dark" : "light";

                    // }

                    function getColor(nType, nTheme) {
                        if (nTheme === "dark") {
                            switch (nType) {
                                case "success":
                                    return "rgba(98,197,142,0.96)";
                                case "error":
                                    return "rgba(211,105,105,0.96)";
                                case "warning":
                                    return "rgba(215,200,107,0.96)";
                                case "info":
                                    return "rgba(101,171,203,0.96)";
                                default:
                                    return "rgba(255,255,255,0.96)";
                            }
                        } else {
                            switch (nType) {
                                case "success":
                                    return "rgba(128,255,171,0.96)";
                                case "error":
                                    return "rgba(255,128,128,0.96)";
                                case "warning":
                                    return "rgba(255,222,128,0.96)";
                                case "info":
                                    return "rgba(127,217,255,0.96)";
                                default:
                                    return "rgba(255,255,255,0.96)";
                            }
                        }
                    }

                    data.color = getColor(data.type, true);
                    return iziToast[data.type](data);
                }
            }
        }
    }
})
