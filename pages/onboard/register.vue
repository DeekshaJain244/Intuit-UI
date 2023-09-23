<template>
  <div class="bg onboard-card">
    <v-row no-gutters justify="center" align="center" class="logo">
      <img alt="MEGH Video Analytics Solution" src="/images/brandlogo-lg.png" width="250"/>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="10" md="4" sm="8">
        <v-card class="elevation-2 pa-4">

          <v-card-title class="text-center"> Register User</v-card-title>
          <v-card-text>
            <br/>
            <v-form ref="registerRef" action method="post" @submit.prevent="submitForm()">
              <v-text-field
                  id="register_form_first_name"
                  v-model="registerForm.first_name"
                  background-color="cardBG2"
                  color="formColor"
                  density="compact"
                  name="first_name"
                  outlined
                  placeholder="FirstName"
                  prepend-icon="mdi-account"
                  type="text"
                  :rules="[ruleRequired, ruleNoSpaces, ruleSpecialCharacters]"
              ></v-text-field>
              <v-text-field
                  id="register_form_last_name"
                  v-model="registerForm.last_name"
                  background-color="cardBG2"
                  color="formColor"
                  density="compact"
                  name="last_name"
                  outlined
                  placeholder="LastName"
                  prepend-icon="mdi-account-outline"
                  type="text"
                  :rules="[ruleRequired, ruleNoSpaces, ruleSpecialCharacters, ruleMinLastName]"
              ></v-text-field>
              <v-text-field
                  id="register_form_email"
                  v-model="registerForm.email"
                  background-color="cardBG2"
                  color="formColor"
                  density="compact"
                  name="email"
                  outlined
                  placeholder="Email"
                  prepend-icon="mdi-email"
                  type="email"
                  :rules="[ruleRequired, ruleEmail]"
              ></v-text-field>
              <v-text-field
                  id="register_form_password"
                  v-model="registerForm.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  background-color="cardBG2"
                  color="formColor"
                  density="compact"
                  name="password"
                  outlined
                  placeholder="Password"
                  prepend-icon="mdi-lock"
                  hint="Allowed special characters @#$%^&*+="
                  persistent-hint
                  :rules="[ruleRequired, rulePasswordRegex]"
                  @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                  id="register_form_cnf_password"
                  v-model="registerForm.confirm_password"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  background-color="cardBG2"
                  color="formColor"
                  density="compact"
                  name="confirm_password"
                  outlined
                  placeholder="ConfirmPassword"
                  prepend-icon="mdi-lock"
                  :rules="[ruleRequired,rules.matchPassword]"
                  @click:append="showConfirmPassword = !showConfirmPassword"
              ></v-text-field>
              <br/>
              <v-card-actions>
                <v-spacer/>
                <v-tooltip bottom>
                  <template #activator="{ props }">
                    <v-btn
                        id="register_action_submit"
                        color="primary"
                        type="submit"
                        v-bind="props"
                    >
                      Register
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-btn
                    id="register_action_cancel"
                    class="ml-2"
                    color="default"
                    outlined
                    @click="cancel"
                >
                  Cancel
                </v-btn>
                <v-spacer/>
              </v-card-actions>
              <br/>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import {useAuthStore} from "~/store/auth";
import {Router} from "~/composables/router/router";

definePageMeta({
  layout: "no",
});

interface registerForm {
  first_name: string | null
  last_name: string | null
  email: string | null
  password: string | null
  confirm_password: string | null
}

const {ruleEmail, ruleRequired, ruleNoSpaces, ruleSpecialCharacters, ruleMinLastName, rulePasswordRegex} = useFormRules();
const authStore = useAuthStore()
const registerRef = ref()
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const rules: object = {
  matchPassword: (v) => registerForm.value.password === v || "Password do not match"
}

const registerForm = ref<registerForm>({
  first_name: null,
  last_name: null,
  email: null,
  password: null,
  confirm_password: null,
})

const submitForm = async () => {
  if (registerRef.value.validate()) {
    console.debug("Inside Register")
    if (registerForm.value.password === registerForm.value.confirm_password) {
      let response;
      const data = {
        firstname: registerForm.value.first_name,
        lastname: registerForm.value.last_name,
        email: registerForm.value.email,
        password: registerForm.value.password,
        confirm_password: registerForm.value.password,
        username: `megh-${registerForm.value.first_name.toLowerCase()}_${registerForm.value.last_name.toLowerCase()}`,
        role: "super_admin",
      };
      response = await authStore.userRegister(data)
      if (response) {
        await Router().push({path: "/login"});
      }
    } else {
      console.debug("Password and Confirm Password do not match, Please try with the right inputs")
    }
  } else {
    console.debug("Error in inputs. User registration failed, Please try with the right inputs");
  }
};

const cancel = () => {
  Router().push({path: '/login'})
}

</script>