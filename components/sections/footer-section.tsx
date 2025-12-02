import Image from 'next/image';
import { Link } from '@/components/ui';

export function FooterSection() {
  return (
    <footer className="w-full bg-background-3 border-t border-b border-background-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-[80px] items-start justify-items-center px-8 md:px-[80px] py-[40px] w-full">
          {/* Solutions Column */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h3 className="text-text-m font-semibold text-[#eaeff5] leading-[24px]">
              Solutions
            </h3>
            <div className="flex flex-col gap-3 items-center md:items-start text-text-s text-foreground-terciary">
              <Link href="#" className="leading-[20px]">
                Edge Computing
              </Link>
              <Link href="#" className="leading-[20px]">
                Cyber-Security
              </Link>
              <Link href="#" className="leading-[20px]">
                Edge AI
              </Link>
              <Link href="#" className="leading-[20px]">
                Smart Infrastructure
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h3 className="text-text-m font-semibold text-[#eaeff5] leading-[24px]">
              Company
            </h3>
            <div className="flex flex-col gap-3 items-center md:items-start text-text-s text-foreground-terciary">
              <Link href="/about" className="leading-[20px]">
                About Us
              </Link>
              <Link href="#" className="leading-[20px]">
                Careers
              </Link>
              <Link href="#" className="leading-[20px]">
                Partners
              </Link>
              <Link href="/contact" className="leading-[20px]">
                Contact
              </Link>
            </div>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h3 className="text-text-m font-semibold text-[#eaeff5] leading-[24px]">
              Resources
            </h3>
            <div className="flex flex-col gap-3 items-center md:items-start text-text-s text-foreground-terciary">
              <Link href="#" className="leading-[20px]">
                Documentation
              </Link>
              <Link href="#" className="leading-[20px]">
                Blog
              </Link>
              <Link href="#" className="leading-[20px]">
                Case Studies
              </Link>
              <Link href="#" className="leading-[20px]">
                Support
              </Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h3 className="text-text-m font-semibold text-[#eaeff5] leading-[24px]">
              Legal
            </h3>
            <div className="flex flex-col gap-3 items-center md:items-start text-text-s text-foreground-terciary">
              <Link href="#" className="leading-[20px]">
                Privacy Policy
              </Link>
              <Link href="#" className="leading-[20px]">
                Terms of Service
              </Link>
              <Link href="#" className="leading-[20px]">
                Security
              </Link>
              <Link href="#" className="leading-[20px]">
                Compliance
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
            © 2025 Blue Connect Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

