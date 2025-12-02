import Image from 'next/image';
import { Token } from '@/components/ui';

export function AboutSection() {
  return (
    <section className="w-full pt-20 pb-40 px-2 md:px-20 bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-8">
            <Token label="Technologie Française" className="self-start" />
            <h2 className="text-title-2 md:text-title-tablet lg:text-title-2 font-bold text-foreground-main">
              Driving Innovation with Made-in-France Excellence
            </h2>

            <div className="flex flex-col gap-6">
              <p className="text-text-l text-foreground-secondary leading-relaxed">
                Blue Connect Solutions is a leading provider of digital
                transformation solutions, specializing in IoT, Cybersecurity,
                and Video Broadcasting. Based in Occitanie, France, we combine
                cutting-edge AI technology with premium Made-in-France hardware
                to deliver enterprise-grade solutions.
              </p>

              <p className="text-text-m text-foreground-terciary leading-relaxed">
                Our commitment to innovation, security, and performance has made
                us a trusted partner for organizations looking to modernize
                their digital infrastructure while maintaining the highest
                standards of data protection and compliance.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/aboutus.png"
              alt="About Blue Connect Solutions"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
