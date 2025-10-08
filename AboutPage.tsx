import React from 'react';
import FadeInSection from './FadeInSection';

// --- ICONS for Process Section ---
const DreamIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375a6.375 6.375 0 006.375-6.375a6.375 6.375 0 00-6.375-6.375a6.375 6.375 0 00-6.375 6.375a6.375 6.375 0 006.375 6.375z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const DesignIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);
const DevelopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
    </svg>
);
const DeployIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.95 14.95 0 00-5.84-2.56m0 0a14.95 14.95 0 01-5.84 2.56m5.84-2.56v-4.82a6 6 0 015.84-7.38m-5.84 7.38l-3.36-2.24a6 6 0 01-5.84-7.38m15.04 14.72a6 6 0 01-5.84-7.38" />
    </svg>
);


interface AboutPageProps {
  setPage: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ setPage }) => {
  return (
    <div className="pt-24 bg-black text-white overflow-x-hidden">
        {/* --- HERO --- */}
        <FadeInSection>
            <section className="relative py-32 md:py-48 flex items-center justify-center text-center px-6">
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
                    style={{ backgroundImage: "url('https://picsum.photos/seed/about-hero/1920/1080')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        We are the architects of the impossible.
                    </span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        Studio Capsul Corp was founded on a simple principle: technology should be a tool for wonder. We are a collective of artists, engineers, and storytellers dedicated to crafting bespoke digital and physical experiences that dissolve the barrier between imagination and reality.
                    </p>
                </div>
            </section>
        </FadeInSection>

        {/* --- PHILOSOPHY --- */}
        <FadeInSection>
             <section className="py-24 sm:py-32">
                <div className="container mx-auto px-6">
                     <div className="mx-auto max-w-2xl lg:text-center">
                        <p className="text-base font-semibold leading-7 text-blue-400">Our Philosophy</p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            The Core of Our Craft
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
                            <p className="text-gray-400">We relentlessly pursue the horizon of what's possible, blending emerging technologies with creative vision to pioneer new forms of interaction and expression.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Collaboration</h3>
                            <p className="text-gray-400">Your vision is our blueprint. We work hand-in-hand with our clients at every step, ensuring the final product is a true co-creation that exceeds every expectation.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Craftsmanship</h3>
                            <p className="text-gray-400">From the first line of code to the final polish, we are obsessed with detail. We believe that true magic lies in the flawless execution of a brilliant idea.</p>
                        </div>
                    </div>
                </div>
            </section>
        </FadeInSection>

        {/* --- PROCESS --- */}
        <FadeInSection>
            <section className="py-24 sm:py-32 bg-gray-900/50">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <p className="text-base font-semibold leading-7 text-blue-400">How We Work</p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            From Vision to Reality
                        </h2>
                    </div>
                    <div className="relative mt-20">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 hidden md:block" aria-hidden="true"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                            {[
                                { icon: DreamIcon, title: '1. Dream', description: "It all starts with your idea. We hold deep-dive sessions to understand your goals, audience, and the story you want to tell." },
                                { icon: DesignIcon, title: '2. Design', description: "Our team translates your concept into a tangible blueprint, creating storyboards, mockups, and technical specifications for a seamless experience." },
                                { icon: DevelopIcon, title: '3. Develop', description: "This is where the magic happens. Our engineers and artists build your project, integrating hardware and software to bring the digital to life." },
                                { icon: DeployIcon, title: '4. Deploy', description: "We oversee the final installation and launch, ensuring a flawless execution and providing support to make sure your experience captivates and inspires." },
                            ].map((step, index) => (
                                <div key={step.title} className={`relative flex items-start space-x-6 ${index % 2 !== 0 ? 'md:ml-auto md:text-right md:space-x-reverse' : ''}`}>
                                    <div className={`flex-shrink-0 w-14 h-14 rounded-full bg-gray-800 border-2 border-blue-500/50 flex items-center justify-center ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                                        <step.icon className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                        <p className="mt-2 text-gray-400">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </FadeInSection>

        {/* --- TEAM --- */}
        <FadeInSection>
            <section className="py-24 sm:py-32">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">The Visionaries</h2>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Meet the minds shaping the future of interactive experiences.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                        {Array.from({ length: 4 }).map((_, i) => (
                             <div key={i} className="group">
                                <div className="aspect-square w-full rounded-full overflow-hidden mx-auto bg-gray-800 mb-4 transition-all duration-300 group-hover:scale-105 group-hover:ring-4 ring-blue-500/50">
                                     <img src={`https://picsum.photos/seed/team${i}/400/400`} alt={`Team Member ${i+1}`} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">Person Name</h3>
                                <p className="text-blue-400">Role Title</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </FadeInSection>

        {/* --- CTA --- */}
        <FadeInSection>
             <div className="py-24 px-6 sm:py-32 lg:px-8 bg-gradient-to-t from-gray-900/50 to-transparent">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Have an idea that feels impossible?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                    That's our specialty. Let's talk about how we can bring it to life together.
                    </p>
                    <div className="mt-10">
                    <button 
                        onClick={() => setPage('create')}
                        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none shadow-lg shadow-blue-500/20"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative">Bring Your Idea to Life</span>
                    </button>
                    </div>
                </div>
            </div>
        </FadeInSection>
    </div>
  );
};

export default AboutPage;
