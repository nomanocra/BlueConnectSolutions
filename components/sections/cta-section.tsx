import { Button } from '@/components/ui';

export function CtaSection() {
  return (
    <section className="w-full bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-[80px] items-center justify-center p-[80px]">
          {/* Section Container with blue background and dot pattern */}
          <div
            className="flex flex-col gap-[48px] items-center max-w-[1200px] p-[80px] rounded-[24px] w-full relative overflow-hidden"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.3) 1px, transparent 1px),
                linear-gradient(314deg, #255da4 21.16%, #3576c0 77%)
              `,
              backgroundSize: '24px 24px, 100% 100%',
              backgroundPosition: '0 0, 0 0',
            } as React.CSSProperties}
          >
            {/* Title - single line, h-[110px] for proper spacing */}
            <div className="flex flex-col h-[110px] justify-center max-w-[600px] w-full">
              <h2 className="text-title-2 font-bold text-[#f8f8f8] text-center leading-[48px]">
                Ready to Transform Your Digital Infrastructure?
              </h2>
            </div>

            {/* Description - single line, h-[58.5px] for proper spacing */}
            <div className="flex flex-col h-[58.5px] justify-center max-w-[600px] w-full">
              <p className="text-[20px] font-normal text-[rgba(248,248,248,0.9)] text-center leading-[32.5px]">
                Join leading organizations worldwide who trust Blue Connect. Solutions to power their digital transformation journey.
              </p>
            </div>

            {/* Button - white background with dark text */}
            <Button
              label="Contact Us"
              variant="secondary"
              size="M"
              rightIconVariant="arrow-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

