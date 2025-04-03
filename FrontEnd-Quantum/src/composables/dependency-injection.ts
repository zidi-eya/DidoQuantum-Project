import { inject } from 'vue';

export function useInjectedValue<T>(
  key: string,
  errorMessage = 'Dependency not found'
): T {
  const value = inject<T | null>(key, null);

  if (value === null) {
    throw new Error(errorMessage);
  }

  return value;
}
