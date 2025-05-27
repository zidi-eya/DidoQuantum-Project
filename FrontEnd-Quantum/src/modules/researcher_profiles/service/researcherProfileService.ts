import axios from 'axios';
import type { ResearcherProfileCreate, ResearcherProfileOut } from '@/modules/researcher_profiles/models/researcherProfileModel';
import { api } from '@/boot/axios';

const API_URL = '/api'; // adapte selon ton backend

export const researcherProfileService = {
  async createProfile(data: ResearcherProfileCreate): Promise<ResearcherProfileOut> {
    const response = await api.post(`/researcher_profile/users/researchers/`, data);
    return response.data;
  },

  async getProfile(id: number): Promise<ResearcherProfileOut> {
    const response = await api.get(`/researcher_profile/researchers/${id}`);
    return response.data;
  },

  async getProfiles(skip = 0, limit = 10): Promise<ResearcherProfileOut[]> {
    const response = await api.get(`/researcher_profile/researchers?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  async updateProfile(id: number, data: ResearcherProfileCreate): Promise<ResearcherProfileOut> {
    const response = await api.put(`/researcher_profile/researchers/${id}`, data);
    return response.data;
  },

  async deleteProfile(id: number): Promise<void> {
    await api.delete(`/researcher_profile/researchers/${id}`);
  },
};
