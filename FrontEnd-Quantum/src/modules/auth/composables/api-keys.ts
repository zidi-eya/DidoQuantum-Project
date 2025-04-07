import { ref, onMounted } from 'vue';
import { ApiKey } from '@/modules/auth/models/api';
import apiService from '@/modules/auth/services/ApiService';

export function useApiKeys() {
  const apiKeys = ref<ApiKey[]>([]);
  const isLoading = ref<boolean>(true);

  onMounted(async () => {
    apiKeys.value = await apiService.getAPIKeys();
    isLoading.value = false;
  });

  return { apiKeys, isLoading };
}
