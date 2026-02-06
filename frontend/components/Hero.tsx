"use strict";
"use client";

import { motion } from "framer-motion";

const Hero = ({ onReserve }: { onReserve?: () => void }) => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
                    style={{ backgroundImage: "url('/hero-bg.jpg')" }} // I will move the generated image to this path
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 md:px-0 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <span className="text-gold tracking-[0.3em] text-sm md:text-base mb-4 block uppercase font-light">
                        Sowirad Hotel Presents
                    </span>
                    <h1 className="text-7xl md:text-9xl font-bold mb-6 gold-gradient tracking-widest uppercase">
                        AMOR
                    </h1>
                    <p className="text-lg md:text-2xl text-champagne/80 font-light max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide">
                        An exclusive evening of elegance, luxury, and unparalleled romance.
                        Join us for a Valentine's celebration that transcends the ordinary.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="gold-button px-10 py-4 text-sm tracking-[0.2em] font-bold uppercase rounded-sm w-full md:w-auto"
                            onClick={() => onReserve ? onReserve() : document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Reserve Now
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 text-sm tracking-[0.2em] font-bold uppercase border border-gold/30 text-gold hover:bg-gold/10 transition-colors rounded-sm w-full md:w-auto"
                            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore Packages
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-gold/50 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
