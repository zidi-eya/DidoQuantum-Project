import { api } from 'src/boot/axios';
import { ApiKey } from 'src/modules/auth/models/api';
import { plainToInstance } from 'class-transformer';

class APIService {
  async createAPIKey(
    name: string,
    prompt: boolean,
    collectionIds: number[] | undefined = undefined,
    expiryDate: Date | undefined = undefined
  ): Promise<ApiKey> {
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

  async getAPIKeys(): Promise<ApiKey[]> {
    const response = await api.get('api/auth/api-keys');
    const data = response.data;
    return plainToInstance(ApiKey, data.api_keys, {
      excludeExtraneousValues: true,
    });
  }

  async deleteApiKey(id: number): Promise<void> {
    await api.delete(`api/auth/api-keys/${id}`);
  }
}

const apiService = new APIService();

export default apiService;
