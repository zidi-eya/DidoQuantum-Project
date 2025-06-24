<template>
  <!--<breadcrumbs-layout
    :breadcrumbs="[
      { label: 'Admin' },
      { label: 'Users', routeName: RouteNames.USERS_OVERVIEW },
    ]"
    :help_url="DocURLS.ADMIN"
  />-->
  <header-layout
    :breadcrumbs="[
      { label: 'Admin' },
      { label: 'Subscription', routeName: RouteNames.USERS_OVERVIEW },
    ]"
    :help_url="DocURLS.ADMIN"
  />
  <centered-spinner v-if="isLoading" />
  <template v-else>
    <div class="row q-gutter-md">
      <q-btn
        class="bg-primary text-white"
        rounded
        flat
        no-caps
        label="Create user"
        @click="isCreateUserModalVisible = true"
      />
      <search-input v-model="search" />
    </div>
    <q-table class="q-mt-md" :rows="users" :columns="columns" :filter="search">
      <template v-slot:body-cell-name="props">
        <q-td :props="props" class="cursor-pointer">
          {{ props.value }}
          <q-popup-edit
            v-model="props.row.fullName"
            title="Edit name"
            v-slot="scope"
            @save="(value) => userService.updateUser(props.row.id, { fullName: value })"
          >
            <q-input
              v-model="scope.value"
              dense
              outlined
              @keyup.enter="scope.set"
              :rules="GeneralRules.fieldRequired('Please enter a name')"
            >
              <template v-slot:prepend>
                <q-icon name="eva-text-outline" />
              </template>
            </q-input>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-isActive="props">
        <q-td :props="props" class="cursor-pointer">
          {{ props.value ? "Yes" : "No" }}
          <q-popup-edit
            v-model="props.row.isActive"
            title="Enable or disable account"
            auto-save
            v-slot="scope"
            @save="(value) => userService.updateUser(props.row.id, { isActive: value })"
          >
            <span>Active:</span>
            <q-checkbox v-model="scope.value" />
          </q-popup-edit>
        </q-td>
      </template>
    </q-table>
  </template>
  <create-user-modal
    v-model="isCreateUserModalVisible"
    @created="(newUser) => users.unshift(newUser)"
  />
</template>

<script setup lang="ts">
import CenteredSpinner from "@/components/CenteredSpinner.vue";
import RouteNames from "@/modules/admin/router/RouteNames";
import BreadcrumbsLayout from "@/layouts/BreadcrumbsLayout.vue";
import SearchInput from "@/components/SearchInput.vue";
import userService from "@/modules/admin/services/UserService";
import CreateUserModal from "@/modules/admin/components/CreateUserModal.vue";
import { User } from "@/modules/auth/models/user";
import { useUsers } from "@/modules/admin/composables/users";
import { ref } from "vue";
import { GeneralRules } from "@/utils/validation/rules";
import { DocURLS } from "@/utils/constants/doc-urls";
import HeaderLayout from "@/layouts/HeaderLayout.vue";

import { QCheckbox, QPopupEdit, QTd, QInput, QTable, QBtn, QIcon } from "quasar";

const isCreateUserModalVisible = ref(false);
const { users, isLoading } = useUsers();
const search = ref("");
const columns = [
  {
    name: "id",
    label: "ID",
    field: (row: User) => row.id,
    align: "left",
    sortable: true,
  },
  {
    name: "name",
    label: "Name",
    field: (row: User) => row.fullName,
    align: "left",
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    field: (row: User) => row.email,
    align: "left",
    sortable: true,
  },
  {
    name: "roles",
    label: "Roles",
    field: (row: User) => row.roles.map((role) => role).join(", "),
    align: "left",
    sortable: true,
  },
  {
    name: "isActive",
    label: "Active",
    field: (row: User) => row.isActive,
    align: "left",
    sortable: true,
  },
];
</script>
