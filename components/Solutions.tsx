
import React from 'react';

const EducationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12l5.318-2.955A12.062 12.062 0 0112 8.055a12.062 12.062 0 015.682.99L23 12" />
    </svg>
);
const RetailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h2.64m-13.5 0L12 14.25 7.5 21m6.5-13.5L12 4.25 7.5 7.5" />
    </svg>
);
const EventsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
);


const solutions = [
  {
    name: 'Education',
    description: 'Transform learning with immersive 3D models and remote guest lecturers appearing as if they are in the room.',
    icon: EducationIcon,
  },
  {
    name: 'Retail & Advertising',
    description: 'Capture attention and showcase products like never before with stunning holographic displays that stop customers in their tracks.',
    icon: RetailIcon,
  },
  {
    name: 'Events & Conferences',
    description: 'Beam keynote speakers from anywhere in the world onto your stage, creating a hybrid event that wows your audience.',
    icon: EventsIcon,
  },
];

const Solutions: React.FC = () => {
  return (
    <div className="py-24 sm:py-32 bg-gray-900/50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold leading-7 text-blue-400">Endless Possibilities</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Solutions for Every Industry
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our technology is versatile, powerful, and ready to be integrated into your workflow, no matter the field.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {solutions.map((solution) => (
              <div key={solution.name} className="group flex flex-col p-8 bg-black rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <solution.icon 
                    className={`
                      h-8 w-8 flex-none text-blue-400 transition-transform duration-300
                      ${solution.name === 'Education' ? 'animate-pulse' : ''}
                      ${solution.name === 'Retail & Advertising' ? 'group-hover:scale-110' : ''}
                      ${solution.name === 'Events & Conferences' ? 'group-hover:rotate-12' : ''}
                    `} 
                    aria-hidden="true" 
                  />
                  {solution.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{solution.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
