// src/modules/companyProjects/composables/useCompanyProjects.ts

import { onMounted, ref } from 'vue';
import { LazyList } from '@/utils/functions/lazy-list';
import { Observer, eventsObservable } from '@/utils/functions/observer-pattern';
import {companyProjectService} from '@/modules/Company_Project/service/companyService';

export function useCompanyProjects() {
  const isLoadingProjects = ref(false);

  const lazyList = new LazyList(async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const response = await companyProjectService.getProjects(skip, limit);
    return response;
  });

  const projects = lazyList.data;

  const observer_project_created = new Observer('company_project_created', async () => {
    lazyList.reset();
    await lazyList.fetchMore();
  });
  eventsObservable.addObserver(observer_project_created);

  const observer_project_deleted = new Observer('company_project_deleted', async () => {
    lazyList.reset();
    await lazyList.fetchMore();
  });
  eventsObservable.addObserver(observer_project_deleted);

  onMounted(async () => {
    isLoadingProjects.value = true;
    await lazyList.fetchMore();
    isLoadingProjects.value = false;
  });

  return {
    lazyList,
    projects,
    isLoadingProjects
  };
}
