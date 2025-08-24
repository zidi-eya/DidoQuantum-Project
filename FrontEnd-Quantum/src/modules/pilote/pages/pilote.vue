<template>
  <div class="q-pa-md">
    <q-card class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">Pilot Reports Generator</div>
      </q-card-section>

      <!-- Upload CSV -->
      <q-card-section>
        <q-file
          v-model="csvFile"
          label="Upload Pilots CSV"
          filled
          accept=".csv"
          @update:model-value="onFileSelect"
        />
      </q-card-section>

      <!-- Actions -->
      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Generate Reports"
          :disable="!csvFile"
          @click="generateReports"
        />
      </q-card-actions>

      <!-- Generated Reports List -->
      <q-card-section v-if="reports.length">
        <div class="text-subtitle1">Generated Reports</div>
        <q-list bordered>
          <q-item v-for="report in reports" :key="report.id">
            <q-item-section>{{ report.name }}</q-item-section>
            <q-item-section side>
              <q-btn flat icon="download" @click="downloadReport(report.id)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
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
import { api } from "@/boot/axios";

const csvFile = ref<File | null>(null);
const reports = ref<any[]>([]);

const onFileSelect = (file: File) => {
  csvFile.value = file;
};

// Upload CSV + trigger backend report generation
const generateReports = async () => {
  if (!csvFile.value) return;

  const formData = new FormData();
  formData.append("file", csvFile.value);

  try {
    await api.post("/Pilote/reports/generated", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Call API to generate reports
    const res = await api.post("/Pilote/reports/generated");
    reports.value = res.data;
  } catch (error) {
    console.error("Error generating reports:", error);
  }
};

// Download a report
const downloadReport = async (id: number) => {
  try {
    const res = await axios.get(`http://localhost:8000/reports/${id}/download`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Download error:", error);
  }
};
</script>
