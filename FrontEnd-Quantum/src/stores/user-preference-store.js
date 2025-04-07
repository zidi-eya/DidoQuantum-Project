import { defineStore } from 'pinia';
import { languages } from '@/i18n';
export const usePreferenceStore = defineStore('preferences', {
    state: () => ({
        language: languages[0]
    }),
    getters: {},
    actions: {
        setLanguage(language) {
            this.language = language;
        }
    },
});
//# sourceMappingURL=user-preference-store.js.map