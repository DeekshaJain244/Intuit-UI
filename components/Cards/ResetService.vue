/*
* Copyright (c) 2022-2023 Megh Computing, Inc.
*
* All rights reserved. No warranty, explicit or implied, provided.
* Unauthorized use, modification, or distribution is strictly prohibited.
*/

<template>
    <div>
        <OverlayLinear
                :message="message"
                :overlay="overlayLinear"
                :over-lay-timeout="false"
                :overlay-time-out-message="''"
        />
    </div>
</template>

<script lang="ts" setup>
import OverlayLinear from "~/components/Nav/Overlay.vue"
import {ref} from "@vue/reactivity";
//import {useGenericStore} from "~/store/generic";
import {useStatusStore} from "~/store/status";
let interval;
const statusStore = useStatusStore()
// const configResetStore = useGenericStore()
const overlayLinear = ref<Boolean>(false)
const emit = defineEmits(["close"])
const {message} = defineProps({
    message: {
        type: String,
        required: true,
    },
})

const mounted = async () => {
    overlayLinear.value = true;
    await configReset()
    getStatus()
}
const getStatus=()=> {
    interval = setInterval(async () => {
        //const response = await this.$store.dispatch("getStatus", false, false);
        const response = await statusStore.getStatus(false, false);
        if (response) {
            clearInterval(interval);
            overlayLinear.value = false;
            emit("close");
        }
    }, 5000);
}

const configReset=async()=>{
    // await this.$store.dispatch("generic/configReset");
    // await configResetStore.configReset();
}

</script>
