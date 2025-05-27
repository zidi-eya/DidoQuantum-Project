import axios from 'axios';
import { api } from '@/boot/axios';


export default {
  async generateMatches() {
    return await api.post(`/matching/matches/generate`);
  },

  async getMatchesForResearcher(researcherId:number) {
    const response = await api.get(`/matching/matches/researcher/${researcherId}`);
    return response.data;
  }
};
