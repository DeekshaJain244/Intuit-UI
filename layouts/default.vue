<template>
  <NuxtLoadingIndicator :throttle="0" height="5" color="grey"/>
  <VApp id="megh-app">
    <NavMenu @toggleOrder="toggleOrder"/>
    <VMain>
      <VContainer fluid class="fill-height ma-0 pa-0">
        <TrailNav/>
        <v-card
            class="pa-1"
            elevation="0"
            min-height="88vh"
            min-width="100%"
        >
          <slot/>
        </v-card>
      </VContainer>
    </VMain>
    <Footer :footerOrder="footerOrder"/>
  </VApp>
</template>

<script lang="ts" setup>
import NavMenu from "~/components/Nav/Menu.vue"
import TrailNav from "~/components/Nav/Trail.vue"
import Footer from "~/components/Nav/Footer.vue"
import {useAuthStore} from "~/store/auth";
import {Router} from "~/composables/router/router";
import {storeToRefs} from "pinia";

//Injecting acl.can() by passing loggedIn user details
// const {$acl} = useNuxtApp()
const authStore = useAuthStore()
const {loggedInUser} = storeToRefs(authStore);


const drawer = ref<boolean | null>(null);
const footerOrder = ref<number>(0)

watch(loggedInUser, (n,o)=>{
  console.debug(n, "watch loggedInUser")
})

onMounted(() => {
  // $acl.can(loggedInUser.value)
})

const logout = async () => {
  const response = await authStore.userLogout()
  if (response) {
    await Router().push({path: "/"})
  }
}

const toggleOrder = (data: number) => {
  footerOrder.value = data
}
</script>

<style lang="css">

</style>