
import React from 'react';

const FeaturedOn: React.FC = () => {
  const technologies = [
    { name: 'HOLOGRAM', imageUrl: 'https://picsum.photos/seed/hologramtech/600/400' },
    { name: 'Interactive', imageUrl: 'https://picsum.photos/seed/interactivetech/600/400' },
    { name: 'MAPPING', imageUrl: 'https://picsum.photos/seed/mappingtech/600/400' },
    { name: 'LED / LED TRANSPARENT', imageUrl: 'https://picsum.photos/seed/ledtech/600/400' },
    { name: 'APP/GAME', imageUrl: 'https://picsum.photos/seed/gametech/600/400' },
  ];

  // Duplicate the array for a seamless loop
  const marqueeItems = [...technologies, ...technologies];

  return (
    <div className="py-16 bg-black sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-12">
          Our Core Technologies
        </h2>
        <div className="relative w-full overflow-hidden group">
          {/* Fade overlays */}
          <div className="absolute inset-y-0 left-0 z-10 w-16 md:w-24 bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute inset-y-0 right-0 z-10 w-16 md:w-24 bg-gradient-to-l from-black to-transparent"></div>
          
          <div className="flex animate-marquee whitespace-nowrap">
            {marqueeItems.map((tech, index) => (
              <div key={index} className="mx-4 w-80 flex-shrink-0">
                <div className="group/item relative h-56 w-full rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
                  <img src={tech.imageUrl} alt={tech.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                    {tech.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedOn;
