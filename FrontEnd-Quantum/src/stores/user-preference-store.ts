import { defineStore } from 'pinia';
import { Language, languages } from 'src/i18n';

export const usePreferenceStore = defineStore('preferences', {
  state: () => ({
    language: languages[0]
  }),
  getters: {

  },

  actions: {
    setLanguage(language: Language) {
        this.language = language
    }
  },
});
