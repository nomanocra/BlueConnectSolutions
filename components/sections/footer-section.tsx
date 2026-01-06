'use client';

import Image from 'next/image';
import { Link } from '@/components/ui';
import { useTranslations } from '@/lib/i18n';

export function FooterSection() {
  const t = useTranslations();

  return (
    <footer className="w-full bg-background-3 border-t border-b border-background-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-[80px] items-start justify-items-center px-8 md:px-[80px] py-[40px] w-full">
          {/* Solutions Column */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h3 className="text-text-m font-semibold text-[#eaeff5] leading-[24px]">
              {t.footer.solutions.title}
            </h3>
            <div className="flex flex-col gap-3 items-center md:items-start text-text-s text-foreground-terciary">
              <Link href="#" className="leading-[20px]">
                {t.footer.solutions.edgeComputing}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.solutions.cyberSecurity}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.solutions.edgeAI}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.solutions.smartInfrastructure}
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h3 className="text-text-m font-semibold text-[#eaeff5] leading-[24px]">
              {t.footer.company.title}
            </h3>
            <div className="flex flex-col gap-3 items-center md:items-start text-text-s text-foreground-terciary">
              <Link href="/about" className="leading-[20px]">
                {t.footer.company.aboutUs}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.company.careers}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.company.partners}
              </Link>
              <Link href="/contact" className="leading-[20px]">
                {t.footer.company.contact}
              </Link>
            </div>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h3 className="text-text-m font-semibold text-[#eaeff5] leading-[24px]">
              {t.footer.resources.title}
            </h3>
            <div className="flex flex-col gap-3 items-center md:items-start text-text-s text-foreground-terciary">
              <Link href="#" className="leading-[20px]">
                {t.footer.resources.documentation}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.resources.blog}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.resources.caseStudies}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.resources.support}
              </Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h3 className="text-text-m font-semibold text-[#eaeff5] leading-[24px]">
              {t.footer.legal.title}
            </h3>
            <div className="flex flex-col gap-3 items-center md:items-start text-text-s text-foreground-terciary">
              <Link href="#" className="leading-[20px]">
                {t.footer.legal.privacyPolicy}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.legal.termsOfService}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.legal.security}
              </Link>
              <Link href="#" className="leading-[20px]">
                {t.footer.legal.compliance}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-0 px-8 md:px-[80px] py-[40px] w-full">
          {/* Logo and Name */}
          <div className="flex gap-4 items-center">
            <div className="relative w-[40px] h-[40px]">
              <Image
                src="/logo.png"
                alt="Blue Connect Solutions"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-[20px] font-medium text-[#eaeff5] tracking-[-1px] leading-[24px]">
              Blue Connect Solutions
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

