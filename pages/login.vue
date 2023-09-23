<template>
  <div>
    <v-row no-gutters align="center" justify="center" :style="{ height: '96vh' }">
      <v-col class="pa-4" cols="auto" align-self="center">
        <v-card class="ma-4" color="transparent" elevation="0" width="650">
          <v-card-title class="text-center pa-0 ma-0">
            <img alt="MEGH Video Analytics Solution" class="pa-4" src="/images/brandlogo-lg.png" :width="'450'"/>
          </v-card-title>
          <v-row no-gutters class="pa-0 ma-0">
            <p class="pa-4 text-center">
            <span class="text-h4 font-weight-light">
              {{ t("Actionable Insights based on operationally-reliable accuracy") }}
            </span>
              <br/><br/>
              <span class="body-1">
              {{
                  t(
                      "Turn any IP camera into a smart camera, with optimized AI for every video stream and real-time performance that takes your business to the next level."
                  )
                }}
            </span>
            </p>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="pa-4" cols="auto">
        <v-card color="cardBG1" elevation="1" width="650" class="ma-4">
          <v-row no-gutters class="logo-lg" justify="center" align="center">
            <img class="pa-4" src="/images/brandlogo.png" width="180" alt="Brand Logo"/>
          </v-row>
          <v-card-text class="pa-10">
            <br/>
            <br/>
            <VForm ref="loginForm" @submit.prevent="submit">
              <VTextField
                  id="login_form_email"
                  v-model="email"
                  background-color="cardBG2"
                  color="formColor"
                  density="compact"
                  name="email"
                  variant="outlined"
                  placeholder="Email"
                  label="Email"
                  prepend-icon="mdi-account"
                  type="email"
                  :rules="[ruleRequired, ruleEmail]"
              ></VTextField>
              <VTextField
                  id="login_form_password"
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  color="formColor"
                  name="password"
                  variant="outlined"
                  label="Password"
                  density="compact"
                  placeholder="Password"
                  prepend-icon="mdi-lock"
                  @click:append="showPassword = !showPassword"
                  :rules="[ruleRequired, rulePassLen]"
              ></VTextField>
              <VRow no-gutters justify="center">
                <VBtn
                    id="login_action_submit"
                    color="primary"
                    type="submit"
                    width="240"
                >
                  Login
                </VBtn>
              </VRow>
            </VForm>
            <!--            <div v-show="$store.state.status.auth_providers && $store.state.status.auth_providers.length > 0">-->
            <!--              <v-divider></v-divider>-->
            <!--              <v-row no-gutters justify="center" class="mt-4 px-10">-->
            <!--                <v-btn-->
            <!--                    v-if="$store.state.status.auth_providers && $store.state.status.auth_providers.includes('google')"-->
            <!--                    color="default"-->
            <!--                    width="240"-->
            <!--                    @click="googleLogin()"-->
            <!--                >-->
            <!--                  <v-icon>mdi-google</v-icon>-->
            <!--                  <span class="pl-4">{{ $t("LOGIN WITH Google") }}</span>-->
            <!--                </v-btn>-->
            <!--              </v-row>-->
            <!--            </div>-->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--    <VRow no-gutters align="center" justify="center" :style="{ height: '96vh' }">-->
    <!--      <VCol class="pa-4" cols="auto">-->
    <!--        <VCard elevation="1" width="650" class="ma-4">-->
    <!--          <VCardText class="pa-10">-->
    <!--            <VForm ref="loginForm" @submit.prevent="submit">-->
    <!--              <VTextField-->
    <!--                  id="login_form_email"-->
    <!--                  v-model="email"-->
    <!--                  background-color="cardBG2"-->
    <!--                  color="formColor"-->
    <!--                  density="compact"-->
    <!--                  name="email"-->
    <!--                  variant="outlined"-->
    <!--                  placeholder="Email"-->
    <!--                  label="Email"-->
    <!--                  prepend-icon="mdi-account"-->
    <!--                  type="email"-->
    <!--                  :rules="[ruleRequired, ruleEmail]"-->
    <!--              ></VTextField>-->
    <!--              <VTextField-->
    <!--                  id="login_form_password"-->
    <!--                  v-model="password"-->
    <!--                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"-->
    <!--                  :type="showPassword ? 'text' : 'password'"-->
    <!--                  color="formColor"-->
    <!--                  name="password"-->
    <!--                  variant="outlined"-->
    <!--                  label="Password"-->
    <!--                  density="compact"-->
    <!--                  placeholder="Password"-->
    <!--                  prepend-icon="mdi-lock"-->
    <!--                  @click:append="showPassword = !showPassword"-->
    <!--                  :rules="[ruleRequired, rulePassLen]"-->
    <!--              ></VTextField>-->
    <!--              <VRow no-gutters justify="center">-->
    <!--                <VBtn-->
    <!--                    id="login_action_submit"-->
    <!--                    color="primary"-->
    <!--                    type="submit"-->
    <!--                    width="240"-->
    <!--                >-->
    <!--                  Login-->
    <!--                </VBtn>-->
    <!--              </VRow>-->
    <!--            </VForm>-->
    <!--          </VCardText>-->
    <!--        </VCard>-->
    <!--      </VCol>-->
    <!--    </VRow>-->
  </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useAuthStore} from "~/store/auth";
import { RouterPush} from "~/composables/router/router";

const {$notification} = useNuxtApp()
const {t} = useI18n()
useHead({
  title: t('Login')
});

definePageMeta({
  layout: "no",
});
const {ruleEmail, rulePassLen, ruleRequired} = useFormRules();

const authStore = useAuthStore()

const {authenticated, loggedInUser} = storeToRefs(authStore);


const loginForm = reactive({
  email: '',
  password: '',
  showPassword: false,
});


const email = ref<string>("");
const password = ref<string>("");
const showPassword = ref(false)

const submit = async () => {
  let response = await authStore.signIn(email.value, password.value)
  if (response) {
    if (authenticated.value) {
      response = await authStore.userInfo()
      if (response) {
        localStorage.clear();
        // response = await this.$store.dispatch("rbac/getAllModules");
        $notification.show({
          title: t("Welcome back !!"),
          message: `${loggedInUser.value.first_name}  ${loggedInUser.value.last_name}`,
          type: "success",
        });
        await RouterPush("/")
      } else {
        console.debug("Error while logging in")
      }
    }
  }
};
</script>

<style scoped>
.logout-card {
  margin-top: 10%;
}

.logo {
  padding-top: 30px;
}

.logo-lg {
  border-radius: 0% 0% 100% 100%;
  background-color: rgb(255, 255, 255);
  padding-top: 20px;
}
</style>