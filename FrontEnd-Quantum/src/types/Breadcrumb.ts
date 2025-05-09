export type BreadcrumbItem = {
    label: string;
    routeName?: string;
    params?: Record<string, string | number>;
  };