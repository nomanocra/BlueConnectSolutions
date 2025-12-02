'use client';

import { Button, DotsCanvas } from '@/components/ui';

export function CtaSection() {
  return (
    <section className="w-full bg-background-1 relative overflow-hidden my-40">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-12 items-center justify-center py-20 px-8 md:px-20 relative z-10">
          {/* Background with animated dots canvas */}
          <DotsCanvas />

          {/* Content */}
          <div className="flex flex-col gap-8 items-center max-w-[800px] w-full relative z-10">
            {/* Title */}
            <h2 className="text-title-1 md:text-title-2 font-bold text-white text-center leading-tight">
              Ready to Transform Your Digital Infrastructure?
            </h2>

            {/* Description */}
            <p className="text-text-l md:text-text-xl text-[rgba(255,255,255,0.8)] text-center leading-relaxed max-w-[600px]">
              Join leading organizations worldwide who trust Blue Connect
              Solutions to power their digital transformation journey.
            </p>

            {/* Button */}
            <Button
              label="Contact Us"
              variant="secondary"
              size="M"
              rightIconVariant="arrow-right"
              href="/contact"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
