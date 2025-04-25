<template>
  <q-card class="shadow-1  q-pa-md">
    <card-header
      title="API Keys"
      subtitle="Manage your API keys in order to integrate tools into your own applications"
    />

    <q-card-section>
      <div class="q-mb-md row q-gutter-sm">
        <q-btn
          class="bg-primary text-white"
          flat
          rounded
          no-caps
          icon-right="eva-plus-outline"
          @click="isApiAddModalVisible = true"
          >Add new key</q-btn
        >
        <search-input v-model="search" />
      </div>
      <q-table
        flat
        :filter="search"
        :loading="isLoading"
        :rows="apiKeys"
      >

      <!--        :columns="columns"
-->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              flat
              color="negative"
              icon="eva-trash-2-outline"
              @click="
                keyToDelete = props.value;
                isDeleteModalVisible = true;
              "
            />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>

  <api-key-create-modal v-model="isApiAddModalVisible" />
  <confirmation-modal
    v-model="isDeleteModalVisible"
    title="Delete API key"
    description="Are you sure you want to delete this API key?"
    @confirm="deleteApiKey"
  />
</template>

<script setup lang="ts">
import CardHeader from '@/components/CardHeader.vue';
import SearchInput from '@/components/SearchInput.vue';
import ApiKeyCreateModal from '@/modules/auth/components/ApiKeyCreateModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import ApiService from '@/modules/auth/services/ApiService';
import { ApiKey } from '@/modules/auth/models/api';
import { useApiKeys } from '@/modules/auth/composables/api-keys';
//import { DocURLS } from 'src/utils/constants/doc-urls';
import { ref } from 'vue';

const search = ref('');
const isApiAddModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const { apiKeys, isLoading } = useApiKeys();
const keyToDelete = ref<ApiKey | undefined>();

const columns = [
  {
    name: 'name',
    label: 'Name',
   // field: (row: ApiKey) => row.name,
    align: 'left',
    sortable: true,
  },
  {
    name: 'key',
    label: 'Key',
    field: (row: ApiKey) => row.key,
    align: 'left',
    sortable: true,
  },
  {
    name: 'expiry',
    label: 'Expiry date',
    field: (row: ApiKey) => row.validUntil?.toDateString() ?? 'Never',
    align: 'left',
    sortable: true,
  },
  {
    name: 'permissions',
    label: 'Permissions',
    field: (row: ApiKey) => {
      var permissions = '';

      if (row.prompt) {
        permissions += 'prompt';
      }

      return permissions;
    },
    align: 'left',
    sortable: true,
  },
  {
    name: 'scope',
    label: 'Collection scope',
    //field: (row: ApiKey) => row.collectionScope?.join(', ') ?? 'All',
    align: 'left',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Actions',
    field: (row: ApiKey) => row,
    align: 'left',
    sortable: false,
  },
];

async function deleteApiKey() {
  const apiKeyId = keyToDelete.value?.id;
  if (!apiKeyId) return;

  await ApiService.deleteApiKey(apiKeyId);
  apiKeys.value = apiKeys.value?.filter((key) => key.id !== apiKeyId);
  keyToDelete.value = undefined;
}
</script>
