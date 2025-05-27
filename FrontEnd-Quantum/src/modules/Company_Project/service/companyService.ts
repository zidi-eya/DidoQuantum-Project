import axios from 'axios';
import { CompanyProject } from '@/modules/Company_Project/models/companyModels';
import { api } from '@/boot/axios';

export const companyProjectService = {
  async createProject(project: CompanyProject) {
    const response = await api.post(`/company_projects/projects`, project);
    return response.data;
  },

  async getProject(projectId: number) {
    const response = await api.get(`/company_projects/projects/${projectId}`);
    return response.data;
  },

  async getProjects(skip = 0, limit = 10) {
    const response = await api.get(`/company_projects/projects?skip=${skip}&limit=${limit}`);
    console.log('Fetched projects response:', response);

  return {
    data: response.data ?? [],  // on retourne un champ `data` contenant l'array
    pagination: {
      total: response.data.length ?? 0,
      limit,
      skip,
      page: Math.floor(skip / limit) + 1,
      nextPage: (response.data.length ?? 0) === limit ? Math.floor(skip / limit) + 2 : -1
    }
  };
},

  async updateProject(projectId: number, project: CompanyProject) {
    const response = await axios.put(`/${projectId}`, project);
    return response.data;
  },

  async deleteProject(projectId: number) {
    await axios.delete(`/${projectId}`);
  }
};
