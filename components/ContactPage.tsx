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
                                            <span className="text-gray-300">Scc studio Capsule corps, P2JR+5XM, Birkhadem, Algiers, Algeria</span>
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
                                            <input type="text" name="name" id="name" required placeholder="Your Name" className="w-full bg-gray-900/50 border border-gray-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="sr-only">Email</label>
                                            <input type="email" name="email" id="email" required placeholder="Your Email" className="w-full bg-gray-900/50 border border-gray-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                                        </div>
                                         <div>
                                            <label htmlFor="subject" className="sr-only">Subject</label>
                                            <input type="text" name="subject" id="subject" required placeholder="Subject" className="w-full bg-gray-900/50 border border-gray-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="sr-only">Message</label>
                                            <textarea name="message" id="message" rows={5} required placeholder="Your Message" className="w-full bg-gray-900/50 border border-gray-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                                                Send Message
                                            </button>
                                        </div>
                                        {formStatus && (
                                            <p className="text-center text-green-400">{formStatus}</p>
                                        )}
                                     </form>
                                </div>
                            </div>
                            
                            {/* --- Right Column: Map --- */}
                            <div className="relative h-96 lg:h-full w-full rounded-2xl overflow-hidden border-2 border-gray-800 group">
                                <iframe
                                    className="pointer-events-none"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.240026245348!2d3.040180876316975!3d36.71691367227489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad004b9e90f9%3A0xb8508445a22d111f!2sScc%20studio%20Capsule%20corps!5e0!3m2!1sen!2sdz!4v1719946825701!5m2!1sen!2sdz"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.9)' }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Studio Capsul Corp Location"
                                ></iframe>
                                 <a
                                    href="https://maps.app.goo.gl/j49UfJ8uDk2fX4JDA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <span className="bg-black/50 backdrop-blur-sm text-white font-bold py-2 px-4 rounded-lg border border-white/20">
                                        Open in Google Maps
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeInSection>
        </div>
    );
};

export default ContactPage;