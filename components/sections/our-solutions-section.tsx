import { Pillar, PillarIcon } from '@/components/ui';

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
            <h2 className="text-title-2 font-bold text-[#eaeff5] leading-[48px]">
              Our Tree Pilars
            </h2>
            <p className="text-text-l text-foreground-terciary text-center w-[572px]">
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

            {/* Right Side - Description Card */}
            <div className="flex-1 h-full border border-background-4 rounded-[12px] overflow-hidden relative">
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-100"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(6,10,15,1) 53.526%, rgba(10,14,20,1) 100%)',
                }}
              />

              {/* Card Content */}
              <div className="relative flex flex-col gap-[24px] h-full p-[32px]">
                {/* Icon */}
                <div className="bg-[rgba(91,149,213,0.2)] flex items-center justify-center rounded-[8px] w-[48px] h-[48px]">
                  <PillarIcon iconVariant={solution.iconVariant} size={40} />
                </div>

                {/* Title */}
                <h3 className="text-title-3 font-semibold text-[#eaeff5] leading-[32px]">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-text-m text-foreground-terciary">
                  {solution.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
