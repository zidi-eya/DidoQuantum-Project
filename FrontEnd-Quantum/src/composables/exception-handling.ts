import { ref } from 'vue';
import { z } from 'zod';
import { HttpException } from 'src/exceptions/http-exceptions';
import { AxiosError } from 'axios';

export function useExceptionHandling() {
  const errors = ref<string[]>([]);

  async function safeExecute(action: () => Promise<void>) {
    try {
      await action();
    } catch (e) {
      if (e instanceof z.ZodError) {
        errors.value = e.issues.map((issue) => issue.message);
      } else if (e instanceof HttpException) {
        errors.value = [e.message];
      } else if (e instanceof AxiosError) {
        const message = e.response?.data.detail || e.message;
        errors.value = [message];
      }
    }
  }

  return { safeExecute, errors };
}
