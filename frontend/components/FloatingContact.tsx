"use client";

import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const FloatingContact = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-8 right-8 z-50 flex flex-col gap-4"
        >
            {/* Phone Call Button */}
            <motion.a
                href="tel:+251911223344"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-shadow border border-white/20 group relative"
            >
                <span className="absolute right-16 bg-black/80 text-gold text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-sm border border-gold/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Concierge
                </span>
                <Phone className="w-6 h-6" />
                <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-20"></span>
            </motion.a>
        </motion.div>
    );
};

export default FloatingContact;
