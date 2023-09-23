<template>
  <div>
    <HeaderText :text="License" :chips="[]"/>
    <v-row no-gutters class="px-2" align="center">
      <div v-for="route in routes" :key="route.id">
        <RouteCard v-can="route.acl" class="mx-3" :route="route"/>
      </div>
      <div v-for="action in actionButtons" :key="action.id">
        <ActionButton v-can="action.acl" class="mr-3" :action="action" @triggerAction="triggerAction"/>
      </div>
    </v-row>
    <v-row no-gutters align="start" justify="start" class="ma-2">
      <div v-for="(license, i) in licenses" :key="i">
        <LicenseCard
            :license="license"
            :is-context-menu="false"
            @editLicense="editLicense"
            @deleteLicense="deleteLicense"
        />
      </div>
    </v-row>
    <v-dialog v-model="showLicenceForm" width="600" persistent>
      <LicenseForm
          v-if="showLicenceForm"
          :show-cancal="true"
          :options="options"
          :edit-license="license"
          @submit="submitLicense"
          @closeDialog="showLicenceForm = false"
      />
    </v-dialog>
    <!--        <ResetServiceCard v-if="resetService" :message="resetServiceMessage" @close="resetService = false"/>-->
    <OverlayCard :overlay="overlay"/>
  </div>
</template>

<script lang="ts" setup>
import LicenseForm from "~/components/Forms/License.vue"
import LicenseCard from "~/components/Cards/License.vue"
import HeaderText from "~/components/Text/Header.vue"
import RouteCard from "~/components/Cards/Route.vue"
import ActionButton from "~/components/Cards/ActionButton.vue"
import OverlayCard from "~/components/Nav/Overlay.vue"
import {useGeneric} from "~/composables/helpers/useGeneric";
import {storeToRefs} from "pinia";
import {ModeType} from "~/service/utils/components";
import {useLicenseStore} from "~/store/license";
import {useStatusStore} from "~/store/status";
import {useConfigurationStore} from "~/store/configurations";
import {useNimbleStore} from "~/store/nimble";
import {RouteQuery} from "~/composables/router/router";

const {t} = useI18n()

definePageMeta({
  middleware: ["auth", "rbac"],
})

useHead({
  title: t('License')
});

const licenseStore = useLicenseStore()
const statusStore = useStatusStore()
const configurationStore = useConfigurationStore()
const nimbleStore = useNimbleStore()
const {licenses, license, resolve} = storeToRefs(licenseStore)
const {license_count} = storeToRefs(statusStore)
const {configuration_licence_status} = storeToRefs(configurationStore)

const routes = ref([])
const showLicenceForm = ref(false);
const overlay = ref(false);
const resetService = ref(false);
const resetServiceMessage = ref("");
const generic = useGeneric()
const configLicenseStatus = ref(false);

const breadCrumbItems = ref([
  {
    text: t("Dashboard"),
    disabled: false,
    href: "/dashboard",
    queryItem: null,
  },
  {
    text: t("License"),
    disabled: true,
    href: "/license",
    queryItem: null,
  },
])

const actionButtons = ref<ActionButton>([
  {
    id: "addLicenseAction",
    state: true,
    isNew: true,
    icon: "mdi-plus",
    name: t("Add License"),
    background_color: "routeCardBG1",
    method: "openLicenseDialog",
    acl: "super_admin_access",
  },
])

const options = ref({
  mode: "create",
})
const fetchData = async () => {
  if (licenses.value.length > 0) {
    overlay.value = true;
    licenses.value = await licenseStore.getLicenses()
    overlay.value = false;
  } else {
    licenses.value = licenses;
  }
}
// computed(() => {
//   ModeType()
//   return ModeType;
// })

onMounted(async () => {
  const routeQuery = RouteQuery()
  generic.constructBreadcrumbs(routeQuery, breadCrumbItems.value)
})

const getLicenses = async () => {
  const response = await licenseStore.getLicenses(false)
  if (response) {
    licenses.value = licenses;
    return licenses;
  }
  return [];
}

const triggerAction = (data) => {
  console.debug("data", data.value)
  //data["method"]();
  openLicenseDialog()
}


const openLicenseDialog = async (data) => {
  options.value.mode = ModeType.create;
  if (data) {
    options.value.mode = ModeType.update;
  } else {
    license.value = {};
  }
  showLicenceForm.value = true;
}

const submitLicense = async (data) => {
  let getStatus = false;
  overlay.value = true;
  if (!licenses.value || licenses.value.length === 0) {
    getStatus = true;
  }
  let response = await licenseStore.createLicense(data)
  if (response.status === "success") {
    response = await licenseStore.getLicenses();
    if (response.status === "success" && licenses.value.length > 0 && getStatus) {
      showLicenceForm.value = false;
      overlay.value = false;
      // if (license_count.value === 0) {
      // response = await configurationStore.getNimbleConfigurations(false)
      //response = await this.$store.dispatch("configuration/getNimbleConfigurations", {
      //     isStatus: false,
      //     isLoading: false,
      //     showNotification: false,
      // });
      // }
      // if (!response) {
      //     configLicenseStatus.value = configuration_licence_status;
      //     if (configLicenseStatus) {
      //         resetServiceMessage.value = t("Updating license to services please wait.");
      //         const data = {
      //             license_id: licenses[0].license_id,
      //         };
      //         response = await nimbleStore.nimbleLicenceUpsert(data)
      //         if (response.status === "success") {
      //             resetService.value = true;
      //         }
      //     }
      // }
    }
    await statusStore.getStatus(false, true)
    // await this.$store.dispatch("getStatus", false, true);
  }
  showLicenceForm.value = false;
  overlay.value = false;
}

const editLicense = (data) => {
  license.value = data
  openLicenseDialog("edit")
}

const deleteLicense = (data) => {
  console.debug(data, "deleteLicense");
}

</script>