<template>
  <div class="q-pa-md">
    <!-- Upload + Generate -->
    <q-card class="q-pa-lg q-mb-md">
      <q-card-section>
        <div class="text-h6">Pilot Reports Generator</div>
      </q-card-section>

      <q-card-section>
        <q-file
          v-model="csvFile"
          label="Upload Pilots CSV"
          filled
          accept=".csv"
          @update:model-value="onFileSelect"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Generate Reports"
          :disable="!csvFile"
          @click="generateReports"
        />
        <q-btn flat color="secondary" label="Refresh" @click="fetchGenerated" />
      </q-card-actions>
    </q-card>

    <!-- Subfolders List -->
    <q-card class="q-pa-lg" v-if="folders.length">
      <q-card-section>
        <div class="text-subtitle1">Available Folders</div>
        <q-list bordered>
          <q-item v-for="folder in folders" :key="folder.name">
            <q-item-section>{{ folder.name }}</q-item-section>
            <q-item-section side>
              <q-btn
                flat
                icon="folder_open"
                color="primary"
                @click="openFolder(folder.name)"
              />
              <q-btn
                flat
                icon="download"
                color="secondary"
                @click="downloadFolder(folder.name)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Files List -->
    <q-card class="q-pa-lg" v-if="files.length">
      <q-card-section>
        <div class="text-subtitle1">Files</div>
        <q-list bordered>
          <q-item v-for="file in files" :key="file.name">
            <q-item-section>{{ file.name }}</q-item-section>
            <q-item-section side>
              <q-btn flat icon="download" @click="downloadReport(file.name)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { api } from "@/boot/axios";
import {
  QCard,
  QCardSection,
  QFile,
  QCardActions,
  QList,
  QItemSection,
  QBtn,
  QItem,
} from "quasar";
const csvFile = ref<File | null>(null);
const items = ref<{ name: string; type: string }[]>([]);

const onFileSelect = (file: File) => {
  csvFile.value = file;
};

// Upload CSV + trigger backend report generation
const generateReports = async () => {
  if (!csvFile.value) return;

  const formData = new FormData();
  formData.append("file", csvFile.value);

  try {
    await api.post("/Pilote/reports", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    await api.post("/Pilote/reports/generate");

    await fetchGenerated();
  } catch (error) {
    console.error("Error generating reports:", error);
  }
};

// Fetch files & folders
const fetchGenerated = async () => {
  try {
    const res = await api.get("/Pilote/reports/generated");
    items.value = res.data; // [{ name, type }]
  } catch (error) {
    console.error("Error fetching generated:", error);
  }
};

// Computed: split files & folders
const folders = computed(() => items.value.filter((i) => i.type === "folder"));
const files = computed(() => items.value.filter((i) => i.type === "file"));

// Open a folder (later: call API /reports/{folder}/files)
const openFolder = async (folder: string) => {
  console.log("Selected folder:", folder);
};

// Download a file
const downloadReport = async (filename: string) => {
  try {
    const res = await api.get(`/Pilote/reports/${filename}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Download error:", error);
  }
};

const downloadFolder = async (folderName: any) => {
  try {
    const response = await api.get(`/Pilote/reports/download/${folderName}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${folderName}.zip`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Download folder error:", error);
  }
};

onMounted(() => {
  fetchGenerated();
});
</script>
