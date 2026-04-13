'use client';

import { ReactNode } from 'react';
import { I18nProvider } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n/translations';

export function Providers({
  children,
  locale,
}: {
  children: ReactNode;
  locale?: Locale;
}) {
  return <I18nProvider initialLocale={locale}>{children}</I18nProvider>;
}
