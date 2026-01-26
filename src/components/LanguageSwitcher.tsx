import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '@/stores';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
      <button
        onClick={() => setLanguage('fr')}
        className={cn(
          'lang-switch',
          language === 'fr' && 'active'
        )}
        aria-label="Français"
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'lang-switch',
          language === 'en' && 'active'
        )}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
