import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/i18n';

type Language = 'fr' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: (localStorage.getItem('language') as Language) || 'fr',
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
        set({ language: lang });
      },
      toggleLanguage: () => {
        const newLang = get().language === 'fr' ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
        localStorage.setItem('language', newLang);
        set({ language: newLang });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);
