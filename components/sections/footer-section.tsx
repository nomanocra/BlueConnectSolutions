'use client';

import Image from 'next/image';
import { Link } from '@/components/ui';
import { useTranslations } from '@/lib/i18n';

export function FooterSection() {
  const t = useTranslations();

  return (
    <footer className="w-full bg-background-3 border-t border-b border-background-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Footer links - hidden for now */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-[80px] items-start justify-items-center px-8 md:px-[80px] py-[40px] w-full">
          ...
        </div> */}

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-0 px-8 md:px-[80px] py-[40px] w-full">
          {/* Logo and Name */}
          <div className="flex gap-4 items-center">
            <div className="relative w-[64px] h-[64px]">
              <Image
                src="/logo.png"
                alt="BlueConnectSolutions"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <p className="text-[20px] font-medium text-[#eaeff5] tracking-[-1px] leading-[24px]">
              BlueConnectSolutions
            </p>
          </div>

          {/* Copyright */}
          <p className="text-text-s text-foreground-terciary leading-[20px] text-center md:text-left pb-8 md:pb-0">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

