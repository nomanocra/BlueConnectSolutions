import { Button } from '@/components/ui';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-title-1 font-bold text-center mb-8">
          Driving the next <br /> wave of{' '}
          <span className="text-primary-3">
            Digital <br />
            Transformation
          </span>
        </h1>
        <p className="text-text-m text-foreground-terciary text-center max-w-2xl mx-auto mb-12">
          Blue Connect Solutions drives digital transformation through 3
          pillars: IoT, Cybersecurity, and Video Broadcasting — Empowered by AI
          and Made-in-France hardware. We bring together innovation, trust, and
          performance to shape a smarter and more secure digital world.
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button label="Contact Us" variant="primary" size="M" />
            <Button label="Learn More" variant="secondary" size="M" />
            <Button label="Get Started" variant="ghost" size="M" />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button label="Small Button" variant="primary" size="S" />
            <Button label="XS Button" variant="primary" size="XS" />
          </div>
        </div>
      </div>
    </main>
  );
}
