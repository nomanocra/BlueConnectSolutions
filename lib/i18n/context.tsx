'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { translations, Locale, Translations } from './translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'preferred-locale';

function detectSystemLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language || navigator.languages?.[0] || '';
  return browserLang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'fr') {
    return stored;
  }
  return null;
}

function storeLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, locale);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check stored preference first, then detect system locale
    const storedLocale = getStoredLocale();
    const detectedLocale = storedLocale ?? detectSystemLocale();
    setLocaleState(detectedLocale);
    setIsInitialized(true);

    // Update HTML lang attribute
    document.documentElement.lang = detectedLocale;
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    storeLocale(newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = translations[locale];

  // Prevent hydration mismatch by rendering with default locale until initialized
  if (!isInitialized) {
    return (
      <I18nContext.Provider value={{ locale: 'en', setLocale, t: translations.en }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function useTranslations() {
  const { t } = useI18n();
  return t;
}

export function useLocale() {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}
