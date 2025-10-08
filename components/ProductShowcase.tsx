
import React from 'react';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
    </svg>
);


interface ProductShowcaseProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageUrl: string;
  reverse: boolean;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  title,
  subtitle,
  description,
  features,
  imageUrl,
  reverse,
}) => {
  const imageOrder = reverse ? 'md:order-last' : '';

  return (
    <div className="py-20 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className={`${imageOrder}`}>
            <img 
              src={imageUrl} 
              alt={title} 
              className="rounded-2xl shadow-2xl shadow-blue-500/10 object-cover w-full h-full" 
            />
          </div>
          <div>
            <p className="text-base font-semibold leading-7 text-blue-400 mb-2">{subtitle}</p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {description}
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;