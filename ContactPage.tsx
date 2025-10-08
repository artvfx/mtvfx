import React, { useState } from 'react';
import FadeInSection from './FadeInSection';

// --- ICONS ---
const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);
const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);
const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
);


const ContactPage: React.FC = () => {
    const [formStatus, setFormStatus] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('Your message has been sent. Thank you!');
        // In a real app, you would handle form submission here.
        // e.g., send data to an API endpoint.
    };

    return (
        <div className="pt-24 bg-black text-white">
            {/* --- HERO --- */}
            <FadeInSection>
                <section className="py-24 md:py-32 text-center px-6 bg-gray-900/50">
                    <div className="container mx-auto max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                                Let's Build the Future Together
                            </span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                            Have a project in mind, a question about our technology, or just want to say hello? We'd love to hear from you.
                        </p>
                    </div>
                </section>
            </FadeInSection>

            {/* --- CONTENT SECTION --- */}
            <FadeInSection>
                <section className="py-24 sm:py-32">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start">
                            {/* --- Left Column: Form & Info --- */}
                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                                    <div className="space-y-4 text-lg">
                                        <div className="flex items-start">
                                            <LocationIcon className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                                            <span className="text-gray-300">Studio Capsul Corp, Cyberparc de Sidi Abdellah, Algiers, Algeria</span>
                                        </div>
                                        <div className="flex items-center">
                                            <EmailIcon className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                                            <a href="mailto:contact@capsulcorp.studio" className="text-gray-300 hover:text-blue-400 transition-colors">contact@capsulcorp.studio</a>
                                        </div>
                                        <div className="flex items-center">
                                            <PhoneIcon className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                                            <a href="tel:+213794427506" className="text-gray-300 hover:text-blue-400 transition-colors">+213 (0) 794 427 506</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-800 pt-12">
                                     <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
                                     <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="sr-only">Name</label>
                                            