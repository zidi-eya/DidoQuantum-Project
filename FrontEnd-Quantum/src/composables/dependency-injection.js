import { inject } from 'vue';
export function useInjectedValue(key, errorMessage = 'Dependency not found') {
    const value = inject(key, null);
    if (value === null) {
        throw new Error(errorMessage);
    }
    return value;
}
//# sourceMappingURL=dependency-injection.js.map