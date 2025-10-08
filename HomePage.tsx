import React from 'react';
import Hero from './Hero';
import FeaturedOn from './FeaturedOn';
import ProductShowcase from './ProductShowcase';
import Solutions from './Solutions';
import CtaSection from './CtaSection';
import FadeInSection from './FadeInSection';

interface HomePageProps {
  setPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  return (
    <>
      <FadeInSection>
        <Hero setPage={setPage} />
      </FadeInSection>
      <FadeInSection>
        <FeaturedOn />
      </FadeInSection>
      <section id="products">
        <FadeInSection>
          <ProductShowcase
            title="HOLOBOX"
            subtitle="YOUR VISION IN LIFE-SIZE"
            description="Our flagship display, designed to bring your grandest visions to life. The HOLOBOX projects stunning, life-sized 4K holograms, creating immersive experiences that are fully customizable to your needs."
            features={[
              "Crystal-clear 4K resolution",
              "Fully bespoke content integration",
              "Plug-and-play setup",
              "Interactive touchscreen capabilities"
            ]}
            imageUrl="https://picsum.photos/seed/holobox/800/600"
            reverse={false}
          />
        </FadeInSection>
        <FadeInSection>
          <ProductShowcase
            title="MINIHOLO"
            subtitle="CREATIVITY UNBOUND, ANYWHERE"
            description="The power of immersive holography in a sleek, portable form. The MINIHOLO is perfect for intimate showcases, interactive displays, and bringing your creative concepts to any environment."
            features={[
              "Portable and lightweight design",
              "Stunning 3D visuals",
              "AI-powered content integration",
              "Ideal for product showcases and personal use"
            ]}
            imageUrl="https://picsum.photos/seed/holomini/800/600"
            reverse={true}
          />
        </FadeInSection>
      </section>
      <section id="solutions">
        <FadeInSection>
          <Solutions />
        </FadeInSection>
      </section>
      <FadeInSection>
        <CtaSection setPage={setPage} />
      </FadeInSection>
    </>
  );
};

export default HomePage;