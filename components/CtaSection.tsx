import React, { useState, useEffect, useRef } from 'react';

interface CtaSectionProps {
  setPage: (page: string) => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ setPage }) => {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [startPosition, setStartPosition] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setStartPosition(sectionRef.current.offsetTop);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = (offsetY - startPosition) * 0.2;

  return (
    <div ref={sectionRef} className="relative isolate overflow-hidden py-24 px-6 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-gray-900/80 to-black"></div>
       <div 
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-10"
        style={{ 
          backgroundImage: "url('https://picsum.photos/seed/cta-bg/1920/1080')",
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform',
        }}
      ></div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to build your dream?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          Let's collaborate. Schedule a consultation with our creative technologists and explore how we can tailor a unique holographic solution just for you.
        </p>
        <div className="mt-10">
          <button 
            onClick={() => setPage('create')}
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none shadow-lg shadow-blue-500/20"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Create Your Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;