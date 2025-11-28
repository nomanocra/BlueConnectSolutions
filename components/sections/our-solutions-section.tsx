import { Pillar, PillarTileDescription } from '@/components/ui';

export function OurSolutionsSection() {
  const solution = {
    number: '1',
    title: 'Cyber-Security',
    description:
      'Enterprise-grade security solutions with real-time threat detection, automated response, and comprehensive compliance management.',
    iconVariant: 'security' as const,
    pillarLabel: 'Cyber Security',
  };

  return (
    <section className="w-full bg-background-2 border-t border-b border-background-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-[120px] items-start px-[80px] py-[120px] w-full">
          {/* Header */}
          <div className="flex flex-col gap-[10px] items-start w-full">
            <h2 className="text-title-2 font-bold text-foreground-main leading-[48px]">
              Our Tree Pilars
            </h2>
            <p className="text-text-l text-foreground-terciary w-[572px]">
              Everything you need to build, secure, and scale your digital
              operations
            </p>
          </div>

          {/* Solution - Single Pillar */}
          <div className="flex gap-[120px] h-[396px] items-center w-full">
            {/* Left Side - Number and Pillar */}
            <div className="flex flex-col gap-[20px] h-full items-center justify-center">
              {/* Number */}
              <div className="flex flex-col h-[56px] justify-center">
                <span className="text-[40px] font-black text-white leading-[32px]">
                  {solution.number}
                </span>
              </div>

              {/* Pillar */}
              <div className="opacity-60">
                <Pillar label={solution.pillarLabel} height={250} />
              </div>

              {/* Spacer */}
              <div className="h-[49px] w-[126px]" />
            </div>

            {/* Right Side - Description Card using PillarTileDescription */}
            <PillarTileDescription
              title={solution.title}
              description={solution.description}
              iconVariant={solution.iconVariant}
              width="100%"
              height="100%"
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
