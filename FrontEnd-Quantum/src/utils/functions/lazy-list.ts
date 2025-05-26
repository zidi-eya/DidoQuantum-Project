import { Pagination } from '@/modules/models/pagination';
import { LazyData } from '@/modules/models/pagination';
import { Ref, ref } from 'vue';

const LIMIT = 10;
export class LazyList<T> {
  canStillFetch: Ref<boolean> = ref(true);
  isLoading: Ref<boolean> = ref(false);
  data: Ref<T[]> = ref([]);
  pagination: Pagination = new Pagination(0, 0, 0, 1, -1);

  private fetch: (page: number, limit: number) => Promise<LazyData<T>>;

  constructor(fetch: (page: number, limit: number) => Promise<LazyData<T>>) {
    this.fetch = fetch;
  }

  async fetchMore() {
    if (this.canStillFetch.value && !this.isLoading.value) {
      this.isLoading.value = true;
      const response = await this.fetch(this.pagination.nextPage, LIMIT);
      //this.reset();
      this.data.value.push(...response.data);
      this.pagination = response.pagination;
      if (response.pagination == undefined) this.canStillFetch.value = false;
      else if (response.pagination.nextPage < 0) {
        this.canStillFetch.value = false;
      }
      this.isLoading.value = false;
    }
  }

  reset() {
    this.pagination = new Pagination(0, 0, 0, 1, -1);
    this.canStillFetch.value = true;
    this.isLoading.value = false;
    this.data.value = [];
  }
}
