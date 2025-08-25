// src/modules/files/services/fileService.ts
import axios from 'axios';
import { AxiosError } from 'axios';
import { api } from '@/boot/axios';
export const uploadFile = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/add-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

    },
    // no need for withCredentials again if it's already in boot config
  });

  return response.data;
};

export const listFiles = async (): Promise<string[]> => {
  const response = await api.get('/list');
  return response.data.files;
};

export const deleteFile = async (filename: string): Promise<any> => {
  const response = await api.delete(`/delete-file/${filename}`);
  return response.data;
};
