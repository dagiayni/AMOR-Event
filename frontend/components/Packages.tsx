"use strict";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Heart, Diamond, Crown, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import RegistrationForm from "./RegistrationForm";

const packages = [
    {
        id: "Velvet Night",
        name: "Velvet Night",
        price: "10,000 ETB",
        description: "Perfect for couples who want a beautiful Valentine evening without staying overnight.",
        features: [
            "Elegant Valentine’s dinner for two",
            "Salsa cocktail (welcome drink)",
            "Live salsa performance",
            "Professional couple photography",
            "Romantic ambiance & music"
        ],
        gifts: [
            "2 glasses of Spanish wine",
            "AMOR Loyalty Gift Card"
        ],
        icon: Heart,
    },
    {
        id: "Midnight Bliss",
        name: "Midnight Bliss",
        price: "20,000 ETB",
        description: "Ideal for couples who want dinner, privacy, and a cozy night together.",
        features: [
            "Includes Velvet Night Pkg",
            "Standard hotel room",
            "Romantic room decoration",
            "Comfortable overnight stay"
        ],
        gifts: [
            "2 glasses of Spanish wine",
            "AMOR Loyalty Gift Card"
        ],
        icon: Star,
        popular: true
    },
    {
        id: "Royal Desire",
        name: "Royal Desire",
        price: "25,000 ETB",
        description: "Designed for couples who want a more luxurious and memorable Valentine night.",
        features: [
            "Includes Velvet Night Pkg",
            "King-size bed room",
            "Premium romantic room decoration",
            "Spanish wine (in-room)",
            "Overnight stay"
        ],
        gifts: [
            "2 glasses of Spanish wine",
            "AMOR Loyalty Gift Card"
        ],
        icon: Diamond,
        limited: "Only 8 Tickets Available"
    },
    {
        id: "King Amor",
        name: "King Amor",
        price: "40,000 ETB",
        description: "For couples seeking the ultimate Valentine’s luxury and exclusivity.",
        features: [
            "Includes Velvet Night Pkg",
            "Luxury suite with lounge",
            "High-end pink-themed décor",
            "Spanish champagne",
            "Premium overnight experience"
        ],
        gifts: [
            "Spanish Champagne",
            "AMOR Loyalty Gift Card",
            "Edited video of couple’s history"
        ],
        icon: Crown,
        isKing: true,
        limited: "Only 1 Ticket Available"
    }
];

const Packages = ({
    isFormOpen,
    setIsFormOpen,
    selectedPkg,
    setSelectedPkg
}: {
    isFormOpen: boolean;
    setIsFormOpen: (v: boolean) => void;
    selectedPkg: string;
    setSelectedPkg: (v: string) => void;
}) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const openReserve = (pkgName: string) => {
        setSelectedPkg(pkgName);
        setIsFormOpen(true);
    };

    return (
        <section id="packages" className="py-24 bg-black relative border-y border-gold/5">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-gold tracking-[0.4em] text-[10px] uppercase mb-4 block font-bold"
                    >
                        Curated Experiences
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        Luxury <span className="gold-gradient italic">Packages</span>
                    </motion.h2>
                    <div className="w-20 h-[1px] bg-gold/30 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {/* Other Packages */}
                    {packages.filter(p => !p.isKing).map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`card-luxury p-8 rounded-[4px] relative flex flex-col ${pkg.popular ? 'border-gold/40 z-10' : ''}`}
                            style={{ overflow: 'visible' }}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-6 py-1.5 text-[9px] uppercase font-black tracking-[0.2em] shadow-xl z-50 whitespace-nowrap">
                                    Most Popular
                                </div>
                            )}

                            {pkg.limited && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-6 py-1.5 text-[9px] uppercase font-black tracking-[0.2em] shadow-xl z-50 whitespace-nowrap">
                                    {pkg.limited}
                                </div>
                            )}

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-6">
                                    {pkg.icon && <pkg.icon className="w-8 h-8 text-gold stroke-[1px]" />}
                                    <div className="flex flex-col items-end">
                                        <span className="text-2xl font-bold text-gold tracking-tight">{pkg.price}</span>
                                        <span className="text-[9px] text-champagne/50 uppercase tracking-widest">/ Couple</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                                <p className="text-champagne/50 text-xs font-light leading-relaxed min-h-[3rem] mb-6">{pkg.description}</p>

                                {/* Desktop features (visible by default) */}
                                <div className="hidden md:block mb-8">
                                    <ul className="space-y-4 mb-6">
                                        {pkg.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-3 text-[11px] text-champagne/80 font-light group/item">
                                                <Check className="w-3.5 h-3.5 text-gold/60 shrink-0 mt-0.5 group-hover/item:text-gold transition-colors" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Gifts Section */}
                                    <div className="border-t border-gold/10 pt-4 mt-4">
                                        <h4 className="text-gold text-[10px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                                            <Sparkles className="w-3 h-3" /> Gift from Sowirad
                                        </h4>
                                        <ul className="space-y-3">
                                            {pkg.gifts.map((gift, gIndex) => (
                                                <li key={gIndex} className="flex items-start gap-3 text-[11px] text-champagne/80 font-light group/item">
                                                    <Diamond className="w-3 h-3 text-gold/60 shrink-0 mt-0.5 group-hover/item:text-gold transition-colors" />
                                                    <span>{gift}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile "See More" only */}
                            <div className="md:hidden mt-auto">
                                <button
                                    onClick={() => toggleExpand(pkg.name)}
                                    className="flex items-center justify-between w-full text-gold/60 text-[10px] font-bold uppercase tracking-widest py-3 border-y border-gold/10 mb-4 transition-colors"
                                >
                                    {expandedId === pkg.name ? "Show Less" : "See Details"}
                                    {expandedId === pkg.name ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </button>

                                <AnimatePresence>
                                    {expandedId === pkg.name && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden mb-6"
                                        >
                                            <ul className="space-y-4 py-2">
                                                {pkg.features.map((feature, fIndex) => (
                                                    <li key={fIndex} className="flex items-start gap-4 text-xs text-champagne/80 font-light">
                                                        <Check className="w-4 h-4 text-gold/60 shrink-0 mt-0.5" />
                                                        <span className="tracking-wide">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Mobile Gifts */}
                                            <div className="border-t border-gold/10 pt-4 mt-4">
                                                <h4 className="text-gold text-[10px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                                                    <Sparkles className="w-3 h-3" /> Gift from Sowirad
                                                </h4>
                                                <ul className="space-y-3">
                                                    {pkg.gifts.map((gift, gIndex) => (
                                                        <li key={gIndex} className="flex items-start gap-4 text-xs text-champagne/80 font-light">
                                                            <Diamond className="w-4 h-4 text-gold/60 shrink-0 mt-0.5" />
                                                            <span className="tracking-wide">{gift}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                className={`w-full py-5 text-[10px] tracking-[0.3em] font-black uppercase rounded-[2px] mt-auto gold-button`}
                                onClick={() => openReserve(pkg.name)}
                            >
                                Secure Place
                            </button>
                        </motion.div>
                    ))}

                    {/* King Amor Package */}
                    {packages.filter(p => p.isKing).map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className={`card-luxury card-glare md:col-span-3 p-8 md:p-12 border-gold/50 relative group overflow-hidden bg-black`}
                        >
                            <div className="absolute top-6 right-6">
                                <Crown className="w-12 h-12 text-gold animate-pulse opacity-50" />
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
                                <div className="max-w-xl">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="bg-gold text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                                            <Sparkles className="w-3 h-3" />
                                            {pkg.limited}
                                        </span>
                                    </div>
                                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 gold-gradient leading-tight">{pkg.name}</h3>
                                    <p className="text-champagne/60 text-sm md:text-lg font-light italic mb-8">{pkg.description}</p>

                                    {/* Features visible by default on desktop for King */}
                                    <div className="hidden md:block">
                                        <ul className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
                                            {pkg.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-start gap-3 text-xs text-champagne/80 font-light border-l border-gold/20 pl-4 hover:border-gold transition-colors">
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* King Gifts */}
                                        <div className="border-t border-gold/10 pt-6">
                                            <h4 className="text-gold text-[10px] uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                                                <Sparkles className="w-3 h-3" /> Gift from Sowirad
                                            </h4>
                                            <ul className="grid grid-cols-2 gap-x-12 gap-y-4">
                                                {pkg.gifts.map((gift, gIndex) => (
                                                    <li key={gIndex} className="flex items-start gap-3 text-xs text-champagne/80 font-light border-l border-gold/20 pl-4 hover:border-gold transition-colors">
                                                        <span>{gift}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-left md:text-right shrink-0">
                                    <div className="mb-8">
                                        <span className="text-4xl md:text-6xl font-black text-gold tracking-tighter drop-shadow-2xl">{pkg.price}</span>
                                        <span className="text-champagne/30 text-[10px] block lg:inline lg:ml-2 uppercase tracking-[0.3em] font-bold">/ Couple</span>
                                    </div>
                                    <button
                                        className="gold-button w-full lg:w-auto px-16 group transition-all"
                                        onClick={() => openReserve(pkg.name)}
                                    >
                                        <span className="relative z-10">Secure the Throne</span>
                                    </button>
                                </div>
                            </div>

                            {/* Mobile "See More" only */}
                            <div className="md:hidden mt-8 border-t border-gold/10 pt-6">
                                <button
                                    onClick={() => toggleExpand(pkg.id)}
                                    className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-4 transition-opacity"
                                >
                                    {expandedId === pkg.id ? "Hide Details" : "View Royal Details"}
                                    {expandedId === pkg.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                <AnimatePresence>
                                    {expandedId === pkg.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <ul className="space-y-4 py-4">
                                                {pkg.features.map((feature, fIndex) => (
                                                    <li key={fIndex} className="flex items-start gap-3 text-xs text-champagne/80 font-light">
                                                        <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Mobile King Gifts */}
                                            <div className="border-t border-gold/10 pt-4 mt-4">
                                                <h4 className="text-gold text-[10px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                                                    <Sparkles className="w-3 h-3" /> Gift from Sowirad
                                                </h4>
                                                <ul className="space-y-4">
                                                    {pkg.gifts.map((gift, gIndex) => (
                                                        <li key={gIndex} className="flex items-start gap-3 text-xs text-champagne/80 font-light">
                                                            <Diamond className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                                                            <span>{gift}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Pop-up Form Component */}
            <RegistrationForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                selectedPackage={selectedPkg}
            />
        </section>
    );
};

export default Packages;
