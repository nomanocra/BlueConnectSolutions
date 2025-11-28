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

          {/* Logos with opacity and fade gradients */}
          <div className="w-full opacity-50 relative">
            {/* Gradient fade à gauche */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(2, 3, 6, 1) 0%, rgba(2, 3, 6, 0) 100%)'
              }}
            />
            
            {/* Logos */}
            <Logos gap={200} paddingX={80} />
            
            {/* Gradient fade à droite */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to left, rgba(2, 3, 6, 1) 0%, rgba(2, 3, 6, 0) 100%)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

