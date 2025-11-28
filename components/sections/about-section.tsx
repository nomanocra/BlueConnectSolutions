import { Token, Button } from '@/components/ui';

export function AboutSection() {
  return (
    <section className="w-full py-20 px-20 bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-8">
            <Token label="About Us" />

            <h2 className="text-title-2 font-bold text-foreground-main">
              Driving Innovation with Made-in-France Excellence
            </h2>

            <div className="flex flex-col gap-6">
              <p className="text-text-l text-foreground-secondary leading-relaxed">
                Blue Connect Solutions is a leading provider of digital
                transformation solutions, specializing in IoT, Cybersecurity, and
                Video Broadcasting. Based in Occitanie, France, we combine
                cutting-edge AI technology with premium Made-in-France hardware
                to deliver enterprise-grade solutions.
              </p>

              <p className="text-text-m text-foreground-terciary leading-relaxed">
                Our commitment to innovation, security, and performance has made
                us a trusted partner for organizations looking to modernize their
                digital infrastructure while maintaining the highest standards of
                data protection and compliance.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                label="Learn More"
                variant="primary"
                size="M"
                rightIconVariant="arrow-right"
              />
              <Button
                label="Our Story"
                variant="ghost"
                size="M"
                rightIconVariant="arrow-right"
              />
            </div>
          </div>

          {/* Right Column - Visual Placeholder */}
          <div className="relative w-full h-[500px] rounded-lg bg-background-2 border border-background-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-text-m text-foreground-terciary">
                Visual Content Placeholder
              </p>
              <p className="text-text-s text-foreground-terciary mt-2">
                Image or illustration can be added here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

