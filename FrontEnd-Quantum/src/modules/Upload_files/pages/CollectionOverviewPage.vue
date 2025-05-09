<template>
  <breadcrumbs-layout
  :breadcrumbs="[
    {
      label: 'Profile',
      routeName: RouteNames.PROFILE,
    },
  ]"
  :help_url="DocURLS.PROFILE"
>
  >
    <q-expansion-item
      default-opened
      expand-separator
      header-class="text-h5 text-bold q-pl-zero"
      label="Details"
    >
      <q-form greedy id="collection-details-form" @submit.prevent="saveChanges">
        <q-card class="rounded-sm shadow-1 q-mb-md">
          <q-card-section >
            <div class="text-body1 text-bold">Organization</div>
            <div class="text-body2">Organization</div>
          </q-card-section>

          <q-card-section>
            <div class="text-body1 text-bold">Name</div>
            <div v-if="!isEditing" class="text-body2">
              Organization
            </div>
            <q-input
              v-else
              v-model="collectionName"
              dense
              outlined
              class="q-mt-md"
              label="Name"
              lazy-rules="ondemand"
              :rules="GeneralRules.fieldRequired('Please enter a name')"
              hide-bottom-space
            >
              <template v-slot:prepend>
                <q-icon name="eva-text-outline" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-section>
            <div class="text-body1 text-bold">Description</div>
            <div v-if="!isEditing" class="text-body2">
              Description
            </div>
            <q-input
              v-else
              v-model="collectionDescription"
              dense
              outlined
              class="q-mt-md"
              type="textarea"
              label="Description"
            >
              <template v-slot:prepend>
                <q-icon name="eva-text-outline" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-section>
            <div class="text-body1 text-bold">Total sources</div>
            <div class="text-body2">
00            </div>
          </q-card-section>

          <!-- New Email Section
          <q-card-section>
            <div class="text-body1 text-bold">Add data by email</div>
            <div class="text-body2 q-mb-md">
              Send your documents and email contents to this email to enrich your
              knowledge base.
            </div>
            <div class="row items-center q-mt-md">
              <q-input
                v-model="computedEmail"
                dense
                outlined
                readonly
                class="col"
                label="Email"
                hide-bottom-space
              >
                <template v-slot:prepend>
                  <q-icon name="eva-email-outline" />
                </template>
              </q-input>
              <q-btn
                dense
                no-caps
                round
                unelevated
                size="small"
                color="white"
                class="shadow-lg q-ml-md"
                @click="copyEmailToClipboard"
              >
                <copy-icon color="#f67829" />
              </q-btn>
            </div>
          </q-card-section>
           End of New Email Section -->

          <q-card-actions
            class="q-pb-md"
          >
            <q-btn
              v-if="!isEditing"
              outline
              color="primary"
              no-caps
              @click="isEditing = true"
            >
              Edit
            </q-btn>
            <q-btn
              v-else
              no-caps
              flat
              class="bg-primary text-white"
              type="submit"
              form="collection-details-form"
            >
              Save
            </q-btn>

            <q-btn
              outline
              color="negative"
              no-caps
              icon-right="eva-trash-2-outline"
              @click="deleteModalVisible = true"
              >Delete</q-btn
            >
          </q-card-actions>
        </q-card>
      </q-form>
    </q-expansion-item>

    <q-expansion-item
      default-opened
      expand-separator
      header-class="text-h5 text-bold q-pl-zero"
      label="Upload Files"
    >
      <div class="row q-mt-sm q-gutter-sm">
        <q-btn
          icon-right="eva-plus-outline"
          flat
          rounded
          no-caps
          class="bg-primary text-white"
          @click="isReportAddModalVisible = true"
          label="Upload File"
          >
          <report-modal v-model="isReportAddModalVisible" />


          </q-btn
        >
        <search-input v-model="searchKeyword" />
        <q-btn
          rounded
          flat
          :icon="viewGrid ? 'eva-list-outline' : 'eva-grid-outline'"
          @click="viewGrid = !viewGrid"
        />
      </div>
      <div class="table-container">
        <q-table
          :grid="viewGrid"
          class="q-my-md"
          rounded
          :rows="rows"
          :columns="columns"
          row-key="id"
          :filter="searchKeyword"
          :pagination="{
            rowsPerPage: 20,
          }"
        >
          <template v-slot:body-cell-type="props">
            <q-td :props="props">
              <data-source-type-badge :source-type="props.value" />
            </q-td>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <data-source-status-badge :status="props.value" />
            </q-td>
          </template>
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <div class="tableColumnLenth">
                {{ props.value }}
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-description="props">
            <q-td :props="props">
              <div class="tableColumnLenth">
                {{ props.value }}
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-update-status="props">
            <q-td :props="props">
              <data-source-update-status-badge :status="props.value" />
            </q-td>
          </template>

          <template
            v-slot:body-cell-actions="props"
          >
            <q-td :props="props">
              <q-btn
                dense
                flat
                color="primary"
                icon="eva-eye-outline"
                @click="viewDataSourceDetail(props.value)"
              />

              <q-btn
                dense
                flat
                color="negative"
                icon="eva-trash-2-outline"
                @click="markToBeDeleted(props.value)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </q-expansion-item>
  </breadcrumbs-layout>
 <!-- <confirmation-modal
    v-model="deleteModalVisible"
    title="Delete Collection"
    description="You are about to delete this collection. This action cannot be undone. Are you sure you want to continue?"
    @confirm="deleteCollection"
  />

  <confirmation-modal
    v-model="deleteSourceModalVisible"
    title="Delete Data Source"
    :description="`Are you sure you want to delete data source '${dataSourceAction?.name}'?`"
    @confirm="deleteDataSource"
  />
  <data-source-create-modal
    v-model="addDataSourceModalVisible"
    @submit="(dataSource) => collectionDetail?.dataSources.unshift(dataSource)"
  />
  <data-source-detail-modal
    v-model="dataSourceDetailModalVisible"
    :dataSource="dataSourceAction"
    @save="updateDataSource"
  />-->
</template>
<script setup lang="ts">
import { QTable, QCard ,QTd,QExpansionItem, QBtn, QCardSection, QIcon, QInput, QCardActions, QForm } from 'quasar';
import BreadcrumbsLayout from "@/layouts/BreadcrumbsLayout.vue";
import CopyIcon from "@/components/icons/CopyIcon.vue";

import RouteNames from "@/modules/profile/router/RouteNames";
import { DocURLS } from "@/utils/constants/doc-urls";
import { ref, computed } from "vue";
import {  GeneralRules } from '@/utils/validation/rules';
import { useQuasar } from "quasar";
import SearchInput from "@/components/SearchInput.vue";
import ReportModal from '@/modules/Upload_files/pages/ReportModal.vue';

const rows = computed(() =>  []);

const $q = useQuasar();
const collectionName = ref("");
const collectionDescription = ref("");
const isEditing = ref(false);
const searchKeyword = ref("");
const deleteModalVisible = ref(false);
const addDataSourceModalVisible = ref(false);
const viewGrid = ref(false);
const computedEmail=  computed(() => {
  return  "";
});
const isReportAddModalVisible = ref(false);

function copyEmailToClipboard() {
  navigator.clipboard
    .writeText(computedEmail.value)
    .then(() => {
      $q.notify({
        message: "Email copied to clipboard",
        color: "positive",
        timeout: 2000,
      });
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

const columns = [
  {
    name: "id",
    required: true,
    align: "left",
    label: "ID",
    field:  "Pdf",
    sortable: true,
  },
  {
    name: "type",
    required: true,
    align: "left",
    label: "Type",
    field: "Pdf",
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field:  "Pdf",
    sortable: true,
  },


  {
    name: "actions",
    label: "Actions",
    align: "left",
    field:  "Pdf",
  },
];




async function saveChanges() {

}

async function markToBeDeleted(dataSource: any) {

}

function viewDataSourceDetail(dataSource: any) {

}



</script>




<style lang="sass">
.table-container
  display: flex
  flex-direction: column
  height: 100vh
  width: 100%
  max-width: 100%


.q-table
  flex-grow: 1
  overflow-y: auto
  overflow-x: auto

@media (max-width: 768px)
  .table-container
    height: 100%

  .q-table
    font-size: 14px
</style>
