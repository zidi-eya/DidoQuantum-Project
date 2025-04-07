import { api } from '@/boot/axios';
import { ApiKey } from '@/modules/auth/models/api';
import { plainToInstance } from 'class-transformer';
class APIService {
    /* async createAPIKey(
       id:number,
       key:string,
       prompt: boolean,
       valid_until: Date | undefined = undefined
     ): Promise<ApiKey> {
       const response = await api.post('api/auth/api-keys', {
         id:id,
         key:key,
         prompt: prompt,
         valid_until:valid_until,
   
       });
       const data = response.data;
       return plainToInstance(ApiKey, data, {
         excludeExtraneousValues: true,
       });
   
   
     }*/
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