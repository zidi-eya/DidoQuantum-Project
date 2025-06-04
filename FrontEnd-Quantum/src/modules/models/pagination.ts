import { Exclude, Expose, Type } from 'class-transformer';

export class Pagination {
  @Expose({ name: 'total_records' })
  totalRecords: number;

  @Expose({ name: 'current_page' })
  currentPage: number;

  @Expose({ name: 'total_pages' })
  totalPages: number;

  @Expose({ name: 'next_page' })
  nextPage: number;

  @Expose({ name: 'previous_page' })
  previousPage: number;

  constructor(
    totalRecords: number,
    currentPage: number,
    totalPages: number,
    nextPage: number,
    previousPage: number
  ) {
    this.totalRecords = totalRecords;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.nextPage = nextPage;
    this.previousPage = previousPage;
  }
}

export class LazyData<T> {
  @Exclude()
  private type: any;

  @Expose({ name: 'data' })
  @Type((options) => {
    return (options?.newObject as LazyData<T>).type;
  })
  data: T[];

  @Expose()
  @Type(() => Pagination)
  pagination: Pagination;

  constructor(type: any, data?: T[], pagination?: Pagination);
  constructor(type: any, data: T[], pagination: Pagination) {
    this.data = data;
    this.pagination = pagination;
    this.type = type;
  }
}
