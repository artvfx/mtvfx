import React, { useState } from 'react';
import FadeInSection from './FadeInSection';

// --- ICONS for Slider ---
const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);


// --- Slider Component ---
interface SliderProps {
    slides: {
        imageUrl: string;
        title: string;
        description: string;
    }[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent(curr => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () => setCurrent(curr => (curr === slides.length - 1 ? 0 : curr + 1));

    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10">
            <div
                className="flex transition-transform ease-out duration-500 h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map(slide => (
                    <div key={slide.imageUrl} className="relative w-full flex-shrink-0 h-full">
                        <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white">{slide.title}</h3>
                            <p className="mt-2 text-sm md:text-base text-gray-300 max-w-lg">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prev}
                    className="p-2 rounded-full shadow bg-white/30 text-white hover:bg-white/50 backdrop-blur-sm transition"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                    onClick={next}
                    className="p-2 rounded-full shadow bg-white/30 text-white hover:bg-white/50 backdrop-blur-sm transition"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
             <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`transition-all w-3 h-1 bg-white rounded-full ${current === i ? "w-8" : "bg-opacity-50"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Page Data ---
const solutionsData = {
    education: {
        title: "Transforming Education",
        description: "We are revolutionizing the classroom by transforming standard curriculum into interactive, three-dimensional learning experiences. Our holographic solutions allow students to explore complex subjects like human anatomy or molecular structures in stunning detail, fostering deeper understanding and engagement. Imagine remote guest lecturers appearing as if they are physically in the room, or historical artifacts materializing for students to examine from every angle.",
        slides: [
            { imageUrl: 'https://picsum.photos/seed/edu-project1/1280/720', title: 'Interactive Anatomy Lesson', description: 'A life-sized human circulatory system hologram for medical students.' },
            { imageUrl: 'https://picsum.photos/seed/edu-project2/1280/720', title: 'Virtual Field Trip to Mars', description: 'An immersive holographic environment of the Martian surface for a school science fair.' },
            { imageUrl: 'https://picsum.photos/seed/edu-project3/1280/720', title: 'Holographic Guest Speaker', description: 'Beaming in a world-renowned physicist for a live university lecture.' },
        ]
    },
    retail: {
        title: "Redefining Retail & Advertising",
        description: "In a crowded marketplace, capturing customer attention is everything. Our holographic displays cut through the noise, creating unforgettable brand moments and showcasing products in a way that flat screens simply cannot. From floating, rotating 3D models of luxury watches to interactive holographic menus in restaurants, we provide retail solutions that not only stop customers in their tracks but also drive sales and create significant social media buzz.",
        slides: [
            { imageUrl: 'https://picsum.photos/seed/retail-project1/1280/720', title: 'Floating Sneaker Display', description: 'A 360-degree holographic view of a new limited-edition sneaker for a flagship store.' },
            { imageUrl: 'https://picsum.photos/seed/retail-project2/1280/720', title: 'Automotive Showroom Concept', description: 'A full-scale car hologram allowing customers to customize features in real-time.' },
            { imageUrl: 'https://picsum.photos/seed/retail-project3/1280/720', title: 'Interactive Product Catalogue', description: 'A holographic catalogue for a high-end cosmetics brand in a shopping mall.' },
        ]
    },
    events: {
        title: "Innovating Events & Conferences",
        description: "Elevate your live events from memorable to truly spectacular. We specialize in creating high-impact holographic experiences, including 'holographic teleportation' that allows keynote speakers to be beamed onto your stage from anywhere in the world. Our solutions extend to mesmerizing stage backdrops, interactive brand activations, and holographic product reveals that will leave your audience breathless and talking about your event for years to come.",
        slides: [
            { imageUrl: 'https://picsum.photos/seed/event-project1/1280/720', title: 'Holographic CEO Keynote', description: 'A CEO beamed in from New York to a tech conference in Tokyo.' },
            { imageUrl: 'https://picsum.photos/seed/event-project2/1280/720', title: 'Music Festival Visuals', description: 'Stunning holographic stage effects for a world-famous DJ set.' },
            { imageUrl: 'https://picsum.photos/seed/event-project3/1280/720', title: 'Product Launch Reveal', description: 'A new smartphone materializing from light and particles on stage.' },
        ]
    }
};

interface SolutionsPageProps {
  setPage: (page: string) => void;
}

const SolutionsPage: React.FC<SolutionsPageProps> = ({ setPage }) => {
    return (
        <div className="pt-24 bg-black text-white">
            {/* --- HERO --- */}
            <FadeInSection>
                <section className="relative py-32 md:py-40 flex items-center justify-center text-center px-6 bg-gray-900/50">
                     <div 
                        className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
                        style={{ backgroundImage: "url('https://picsum.photos/seed/solutions-hero/1920/1080')" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    </div>
                    <div className="relative z-10 container mx-auto max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                                Tailored Solutions for Visionary Brands
                            </span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                            We don’t just offer technology; we craft bespoke experiences. Our versatile platforms are adapted to solve unique challenges and create powerful connections across every industry.
                        </p>
                    </div>
                </section>
            </FadeInSection>

            {/* --- SOLUTIONS SECTIONS --- */}
            <div className="py-24 sm:py-32 space-y-24 sm:space-y-32">
                <FadeInSection>
                    <section className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{solutionsData.education.title}</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-300">{solutionsData.education.description}</p>
                            </div>
                            <Slider slides={solutionsData.education.slides} />
                        </div>
                    </section>
                </FadeInSection>

                <FadeInSection>
                    <section className="container mx-auto px-6">
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <div className="lg:order-last">
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{solutionsData.retail.title}</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-300">{solutionsData.retail.description}</p>
                            </div>
                            <Slider slides={solutionsData.retail.slides} />
                        </div>
                    </section>
                </FadeInSection>

                <FadeInSection>
                    <section className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{solutionsData.events.title}</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-300">{solutionsData.events.description}</p>
                            </div>
                             <Slider slides={solutionsData.events.slides} />
                        </div>
                    </section>
                </FadeInSection>
            </div>

            {/* --- CTA --- */}
            <FadeInSection>
                 <div className="py-24 px-6 sm:py-32 lg:px-8 bg-gradient-to-t from-gray-900/50 to-transparent">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        See Your Vision in a New Light
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                        Ready to apply this technology to your unique challenge? Let's build your custom solution together.
                        </p>
                        <div className="mt-10">
                        <button 
                            onClick={() => setPage('create')}
                            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none shadow-lg shadow-blue-500/20"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative">Start Your Project</span>
                        </button>
                        </div>
                    </div>
                </div>
            </FadeInSection>
        </div>
    );
};

export default SolutionsPage;