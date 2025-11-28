import { Kpi } from '@/components/ui';

export function KpisSection() {
  return (
    <section className="w-full bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center justify-center pb-[120px] pt-[80px] px-[107px] gap-8">
          {/* Premier wrapper avec les 2 premiers KPIs */}
          <div className="flex flex-wrap items-center justify-center gap-12 flex-1 min-w-[300px] sm:min-w-[400px]">
            <Kpi
              className="flex flex-col gap-[8px] items-center text-center text-nowrap flex-1 min-w-[169px]"
              value="100%"
              label="Project Guarantee"
              description="High quality products and processes"
            />
            <Kpi
              className="flex flex-col gap-[8px] items-center text-center text-nowrap flex-1 min-w-[169px]"
              value="+20"
              label="Years of Experience"
              description="Lightning-fast response times"
            />
          </div>

          {/* Deuxième wrapper avec les 2 derniers KPIs */}
          <div className="flex flex-wrap items-center justify-center gap-12 flex-1 min-w-[300px] sm:min-w-[400px]">
            <Kpi
              className="flex flex-col gap-[8px] items-center text-center text-nowrap flex-1 min-w-[169px]"
              value="24/7"
              label="Support & Monitoring"
              description="Real-time threat detection"
            />
            <Kpi
              className="flex flex-col gap-[8px] items-center text-center text-nowrap flex-1 min-w-[169px]"
              value="150+"
              label="Global Deployments"
              description="Worldwide infrastructure"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
