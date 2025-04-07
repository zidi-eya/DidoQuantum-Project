import { ref, onMounted } from 'vue';
import apiService from '@/modules/auth/services/ApiService';
export function useApiKeys() {
    const apiKeys = ref([]);
    const isLoading = ref(true);
    onMounted(async () => {
        apiKeys.value = await apiService.getAPIKeys();
        isLoading.value = false;
    });
    return { apiKeys, isLoading };
}
//# sourceMappingURL=api-keys.js.map