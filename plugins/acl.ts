/*
 * Copyright (c) 2022-2023 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

import {createAcl, defineAclRules} from "vue-simple-acl";


export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      acl: {
        can: function (user) {
          const rules = () => defineAclRules((setRule) => {
            setRule("super_admin_access", (user) => user?.role_key === "super_admin");
            setRule("admin_access", (user) => user?.role_key === "super_admin" || user?.role_key === "admin");
            setRule("user_access", (user) => user?.role_key === "super_admin" || user?.role_key === "admin" || user?.role_key === "user");
            setRule("super_viewer_access", (user) => user?.role_key === "super_admin" || user?.role_key === "admin" || user?.role_key === "user" || user?.role_key === "super_viewer");
            setRule("viewer_access", (user) => user?.role_key === "super_admin" || user?.role_key === "admin" || user?.role_key === "user" || user?.role_key === "super_viewer" || user?.role_key === "viewer");
            setRule("super_access", (user) => user?.role_key === "super_admin" || user?.role_key === "super_viewer");
            setRule("edit", (user) => user?.role_key === "super_admin" || user?.role_key === "admin");
            setRule("delete", (user) => user?.role_key === "super_admin");
            setRule("super_admin_add", (user) => user?.role_key === "super_admin");
            setRule("super_admin_delete", (user) => user?.role_key === "super_admin");
            setRule("super_admin_edit", (user) => user?.role_key === "super_admin");
            setRule("admin_add", (user) => user?.role_key === "super_admin" || user?.role_key === "admin");
            setRule("admin_edit", (user) => user?.role_key === "super_admin" || user?.role_key === "admin");
            setRule("admin_delete", (user) => user?.role_key === "super_admin" || user?.role_key === "admin");
            setRule("user_edit", (user) => user?.role_key === "super_admin" || user?.role_key === "admin" || user?.role_key === "user");
            setRule("super_nav", (user) => user?.role_key === "super_admin" || user?.role_key === "super_viewer");
            setRule("super_admin_nav", (user) => user?.role_key === "super_admin");
            setRule("admin_nav", (user) => user?.role_key === "super_admin" || user?.role_key === "admin");
            setRule("user_nav", (user) => user?.role_key === "super_admin" || user?.role_key === "admin" || user?.role_key === "user" || user?.role_key === "super_viewer");
            setRule("viewer_nav", (user) => user?.role_key === "super_admin" || user?.role_key === "admin" || user?.role_key === "user" || user?.role_key === "super_viewer" || user?.role_key === "viewer");
            setRule("super_and_admin_access", (user) => user?.role_key === "super_admin" || user?.role_key === "admin" || user?.role_key === "super_viewer");
            setRule("user_activate_alert", (user) => user?.role_key === "super_admin" || user?.role_key === "admin" || user?.role_key === "user")

          })
          const simpleAcl = createAcl({
            user,
            rules,
          })
          nuxtApp.vueApp.use(simpleAcl);
        }
      }
    }
  }
})
