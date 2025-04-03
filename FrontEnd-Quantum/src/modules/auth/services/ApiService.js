import { api } from 'src/boot/axios';
import { ApiKey } from 'src/modules/auth/models/api';
import { plainToInstance } from 'class-transformer';
class APIService {
    async createAPIKey(name, prompt, collectionIds = undefined, expiryDate = undefined) {
        const response = await api.post('api/auth/api-keys', {
            name: name,
            prompt: prompt,
            read_collections: true,
            ...(collectionIds && { collection_ids: collectionIds }),
            ...(expiryDate && {
                valid_until: expiryDate.toISOString().split('T')[0],
            }),
        });
        const data = response.data;
        return plainToInstance(ApiKey, data, {
            excludeExtraneousValues: true,
        });
    }
    async getAPIKeys() {
        const response = await api.get('api/auth/api-keys');
        const data = response.data;
        return plainToInstance(ApiKey, data.api_keys, {
            excludeExtraneousValues: true,
        });
    }
    async deleteApiKey(id) {
        await api.delete(`api/auth/api-keys/${id}`);
    }
}
const apiService = new APIService();
export default apiService;
//# sourceMappingURL=ApiService.js.map