import { Logos } from '@/components/ui';

export function LogosSection() {
  return (
    <section className="w-full bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-[40px] items-center justify-end px-0 py-[80px]">
          {/* Title */}
          <p className="text-text-s text-foreground-terciary text-center w-[278px]">
            Trusted by leading organizations worldwide
          </p>

          {/* Logos with opacity */}
          <div className="w-full opacity-50">
            <Logos gap={200} paddingX={80} />
          </div>
        </div>
      </div>
    </section>
  );
}

