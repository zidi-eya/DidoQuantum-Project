<template>
  <header-layout
    :breadcrumbs="[
      {
        label: 'Add Project',
        routeName: RoutePrefixes.ADMIN,
      },
    ]"
    :help_url="DocURLS.ADMIN"
  />
  <div class="row" style="margin: 8px 0 0 -16px">
    <div class="col-12 col-md-3">
      <lazy-history
        :lazyList="lazyList"
        :selectedFilter="selectedFilter"
        subtitle="Select a file from your history"
        createBtnLabel="New Project"
        @create="() => (isModalVisible = true)"
      >
        <template v-slot>
          <q-item class="rounded-sm bg-white q-mb-md q-px-sm q-mx-md shadow-md hidden">
            <q-item-section>
              <q-item-label
                class="text-body2 text-grey-7 text-weight-medium q-mt-xs q-mb-sm"
              >
                Filters
              </q-item-label>
              <div class="row q-gutter-xs">
                <q-chip
                  v-for="(item, index) in filters"
                  :key="index"
                  class="q-px-sm cursor-pointer"
                  outline
                  rounded
                  size="sm"
                  :color="
                    item === 'Private'
                      ? 'grey'
                      : item === 'Draft'
                      ? 'orange'
                      : item === 'Public'
                      ? 'green'
                      : item === 'Published'
                      ? 'blue'
                      : 'red'
                  "
                  :class="
                    item === 'Private'
                      ? 'bg-grey-1'
                      : item === 'Draft'
                      ? 'bg-orange-1'
                      : item === 'Public'
                      ? 'bg-green-1'
                      : item === 'Published'
                      ? 'bg-blue-1'
                      : 'bg-red-1'
                  "
                  :label="item"
                />
              </div>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:item="slotProps">
          <q-item
            :active="slotProps.item === selectedTranslatedFile"
            class="rounded-sm bg-white q-mb-md q-px-sm q-mx-md shadow-md"
            active-class="active-list-card"
            @click="selectedTranslatedFile = slotProps.item"
            clickable
            v-ripple
          >
            <q-item-section>
              <q-item-label class="text-body2 text-black text-weight-medium q-mt-xs">
                {{ slotProps.item.title + " - " + slotProps.item.target_language }}
              </q-item-label>
              <q-item-label caption>
                {{
                  qdate.formatDate(
                    slotProps.item.created_at,
                    userLanguage.date_format.full()
                  )
                }}
              </q-item-label>
              <div class="row q-gutter-sm q-mt-xs">
                <task-status-badge
                  class="q-px-sm q-py-xs"
                  rounded
                  :status="slotProps.item.status"
                  :class="slotProps.item.status ? 'bg-green-1' : 'bg-orange-1'"
                  :error="slotProps.item.error"
                />
                <shared-status-badge
                  class="q-px-sm q-py-xs"
                  rounded
                  :status="
                    slotProps.item.id.length > 0
                      ? SharedStatus.PUBLIC
                      : SharedStatus.PRIVATE
                  "
                  :class="
                    slotProps.item.id.length > 0 ? 'bg-green-1' : 'bg-grey-1 text-grey'
                  "
                />
              </div>
            </q-item-section>
            <q-item-section top side>
              <div class="row items-center q-gutter-xs">
                <q-btn size="12px" flat dense round icon="more_vert">
                  <q-menu>
                    <q-btn
                      icon="eye"
                      label="View"
                      no-caps
                      @click="deleteModalVisible = true"
                    />

                    <q-btn
                      color="negative"
                      icon="delete"
                      label="Delete"
                      no-caps
                      @click="deleteModalVisible = true"
                    />
                  </q-menu>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:skeleton>
          <q-item>
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="200px" />
              </q-item-label>
              <div class="row q-gutter-sm q-mt-xs">
                <q-skeleton type="QBadge" />
                <q-skeleton type="QBadge" />
              </div>
            </q-item-section>
          </q-item>
        </template>
      </lazy-history>
    </div>
    <div class="col-12 col-md-9 q-pl-md-md">
      <q-card class="custom-card q-mb-md">
        <card-header title="New Project to be created" />
        <q-separator class="q-mb-sm-xs q-mb-md q-mx-md" />
        <q-card-section>
          <q-form @submit.prevent="handleSubmit" class="column q-gutter-md">
            <q-input
              v-model="project.title"
              class="custom-field"
              dense
              outlined
              lazy-rules="ondemand"
              :rules="GeneralRules.fieldRequired('Please enter the project Titel')"
              hide-bottom-space
              label="Title"
            >
            </q-input>

            <q-input
              v-model="project.description"
              class="custom-field"
              dense
              multiple
              use-input
              use-chips
              outlined
              lazy-rules="ondemand"
              :rules="GeneralRules.fieldRequired('Please enter your full name')"
              label="Description"
              hide-bottom-space
            >
            </q-input>

            <q-select
              label="required Technologies"
              v-model="project.required_tech"
              outlined
              multiple
              use-input
              use-chips
              dense
              class="custom-field"
              color="primary"
              new-value-mode="add-unique"
              placeholder="Enter required Technologies"
              hide-dropdown-icon
            >
            </q-select>

            <q-input
              v-model="project.goal"
              class="custom-field"
              dense
              outlined
              lazy-rules="ondemand"
              :rules="GeneralRules.fieldRequired('Please enter your full name')"
              hide-bottom-space
              label="Project Goal"
            >
            </q-input>

            <q-btn type="submit" label="Create Project" color="primary" />
          </q-form>

          <q-separator class="q-mt-sm-xs q-mt-md" />
        </q-card-section>
        <div v-for="(lang, index) in selectedLanguages" :key="index">
          <q-card-section v-if="isGenerating"> </q-card-section>
        </div>
        <q-inner-loading color="primary" :showing="isLoading" />
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardHeader from "@/components/CardHeader.vue";
//import RouteNames from '@/modules/tools/router/RouteNames';
import { ref, onMounted } from "vue";
import { DocURLS } from "@/utils/constants/doc-urls";
import {
  useQuasar,
  date as qdate,
  QIcon,
  QCard,
  QInput,
  QInnerLoading,
  QCardSection,
  QSeparator,
  QForm,
  QItemSection,
  QSkeleton,
  QItemLabel,
  QMenu,
  QBtn,
  QChip,
  QItem,
  QSelect,
} from "quasar";
import LazyHistory from "./LazyHistory.vue";
import { usePreferenceStore } from "@/stores/user-preference-store";
import TaskStatusBadge from "./TaskStatusBadge.vue";
import SharedStatusBadge from "./SharedBadge.vue";
import { SharedStatus } from "./shared-status";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import { GeneralRules } from "@/utils/validation/rules";
import { Observer, eventsObservable } from "@/utils/functions/observer-pattern";
import RoutePrefixes from "@/router/RoutePrefixes";
import { useCompanyProjects } from "@/modules/Company_Project/pages/company_projects";
import { companyProjectService } from "@/modules/Company_Project/service/companyService";
import { CompanyProject } from "@/modules/Company_Project/models/companyModels";
const { lazyList, projects } = useCompanyProjects();

const $q = useQuasar();

//const isHistoryLoading = ref(false);
const userPreferenceStore = usePreferenceStore();
const userLanguage = userPreferenceStore.language;
const selectedFilter = ref("All"); // Add this line

const selectedLanguages = ref([]);

const deleteModalVisible = ref(false);
const selectedTranslatedFile = ref([]);
const isModalVisible = ref(false);
const isLoading = ref(false);
const isGenerating = ref(false);
const fileUpload = ref();

const filters = ref(["Private", "Draft", "Public", "Published"]);

const observer_file = new Observer("translate_file_generated", async () => {
  isGenerating.value = false;
  fileUpload.value = [];
  selectedLanguages.value = [];
});

eventsObservable.addObserver(observer_file);

const observer_file2 = new Observer("translate_file_failed", async () => {
  isGenerating.value = false;
  fileUpload.value = [];
  selectedLanguages.value = [];
});

eventsObservable.addObserver(observer_file2);

const fetchProjects = async () => {
  try {
    const result = await companyProjectService.getProjects();
    if (Array.isArray(result)) {
      projects.value = result;
    } else {
      console.error("API did not return an array:", result);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProjects);

const loading = ref(true);

const project = ref<CompanyProject>({
  title: "",
  description: "",
  required_tech: [],
  goal: "",
});

const handleSubmit = async () => {
  const payload = {
    ...project.value,
    required_tech: project.value.required_tech.join(","),
  };
  try {
    await companyProjectService.createProject(payload);
    console.log("Payload:", project.value);

    $q.notify({ type: "positive", message: "Project created successfully!" });
  } catch (err) {
    $q.notify({ type: "negative", message: "Error creating project." });
  }
};
</script>
