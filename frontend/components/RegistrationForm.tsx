"use strict";
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Send, CheckCircle2, AlertCircle, Loader2, X, Building2, Phone, Receipt } from "lucide-react";

interface RegistrationFormProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPackage?: string;
}

const packagePrices: Record<string, string> = {
    "King Amor": "70,000 ETB",
    "Diamond Elite": "60,000 ETB",
    "Premium Luxury": "45,000 ETB",
    "Classic Romance": "35,000 ETB"
};

const RegistrationForm = ({ isOpen, onClose, selectedPackage }: RegistrationFormProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        package: selectedPackage || "",
        message: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const packages = Object.keys(packagePrices);

    useEffect(() => {
        if (selectedPackage) {
            setFormData(prev => ({ ...prev, package: selectedPackage }));
        }
    }, [selectedPackage]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("package", formData.package);
            data.append("message", formData.message);
            if (file) {
                data.append("attachment", file);
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/register.php";
            const response = await fetch(apiUrl, {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (result.status === "success") {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", package: "", message: "" });
                setFile(null);
            } else {
                setStatus("error");
                setErrorMessage(result.message || "An unexpected error occurred.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Connection failed. Please ensure the backend is running.");
        }
    };

    const PaymentInstructions = ({ className = "" }: { className?: string }) => (
        <div className={`space-y-6 ${className}`}>
            <h3 className="text-xl font-bold text-gold mb-6 tracking-widest uppercase">Payment Info</h3>
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gold/80">
                        <Building2 className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">CBE Bank</span>
                    </div>
                    <p className="text-sm text-champagne/80 font-mono bg-white/5 p-3 rounded border border-gold/5">
                        Acc: 1000123456789<br />
                        Name: AMOR Events
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gold/80">
                        <Phone className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Telebirr</span>
                    </div>
                    <p className="text-sm text-champagne/80 font-mono bg-white/5 p-3 rounded border border-gold/5">
                        Merchant ID: 123456<br />
                        Phone: +251 911 223 344
                    </p>
                </div>

                <div className="p-4 border border-gold/10 bg-gold/5 italic text-[10px] text-champagne/60 leading-relaxed">
                    * Please ensure you follow the payment instructions and upload a clear screenshot of your receipt.
                </div>
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-charcoal border border-gold/20 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* PC Sidebar: Hidden on mobile */}
                        <div className="hidden md:block md:w-1/3 bg-black/40 p-8 border-r border-gold/10 overflow-y-auto">
                            <PaymentInstructions />
                        </div>

                        {/* Form Side */}
                        <div className="w-full md:w-2/3 p-6 md:p-12 overflow-y-auto relative custom-scrollbar">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-gold/40 hover:text-gold transition-colors z-20"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12"
                                >
                                    <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-4">Registration Sent</h3>
                                    <p className="text-champagne/70 mb-8">
                                        Our concierge team is verifying your payment. You will receive a confirmation shortly.
                                    </p>
                                    <button onClick={onClose} className="gold-button px-12">Close</button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="text-center md:text-left mb-8">
                                        <h2 className="text-3xl font-bold gold-gradient mb-2">Reservation</h2>
                                        <p className="text-xs text-champagne/40 uppercase tracking-[0.3em]">Finalize your luxury experience</p>
                                    </div>

                                    {/* Total Amount Badge */}
                                    {formData.package && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="bg-gold/10 border border-gold/30 p-4 rounded flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Receipt className="w-5 h-5 text-gold" />
                                                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Total Payable</span>
                                            </div>
                                            <span className="text-2xl font-black text-gold">{packagePrices[formData.package]}</span>
                                        </motion.div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] tracking-widest text-gold uppercase font-bold px-1">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white/5 border border-gold/20 focus:border-gold px-4 py-4 text-white outline-none transition-all text-sm rounded-sm"
                                                placeholder="Name"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] tracking-widest text-gold uppercase font-bold px-1">Selected Package</label>
                                            <select
                                                required
                                                value={formData.package}
                                                onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                                                className="w-full bg-white/5 border border-gold/20 focus:border-gold px-4 py-4 text-white outline-none transition-all text-sm appearance-none rounded-sm"
                                            >
                                                <option value="" disabled className="bg-black">Choose Package</option>
                                                {packages.map((pkg) => (
                                                    <option key={pkg} value={pkg} className="bg-black">{pkg}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] tracking-widest text-gold uppercase font-bold px-1">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-gold/20 focus:border-gold px-4 py-4 text-white outline-none transition-all text-sm rounded-sm"
                                                placeholder="Email"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] tracking-widest text-gold uppercase font-bold px-1">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white/5 border border-gold/20 focus:border-gold px-4 py-4 text-white outline-none transition-all text-sm rounded-sm"
                                                placeholder="Phone"
                                            />
                                        </div>
                                    </div>

                                    {/* Mobile Payment Instructions: Visible only on small screens */}
                                    <PaymentInstructions className="md:hidden pt-4 border-t border-gold/10" />

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] tracking-widest text-gold uppercase font-bold px-1">Upload Payment Receipt</label>
                                        <div
                                            className={`border-2 border-dashed transition-all p-8 flex flex-col items-center justify-center gap-4 cursor-pointer rounded-sm ${file ? 'border-gold bg-gold/5' : 'border-gold/20 hover:border-gold/40 hover:bg-white/5'}`}
                                            onClick={() => document.getElementById('pop-file-upload')?.click()}
                                        >
                                            <Upload className={`w-10 h-10 ${file ? 'text-gold' : 'text-gold/40'}`} />
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-champagne tracking-wide">
                                                    {file ? file.name : "Select Receipt Screenshot/PDF"}
                                                </p>
                                                <p className="text-[9px] text-champagne/40 mt-1 uppercase tracking-widest">Max 5MB</p>
                                            </div>
                                            <input
                                                id="pop-file-upload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*,.pdf"
                                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                            />
                                        </div>
                                    </div>

                                    {status === "error" && (
                                        <div className="flex items-center gap-3 text-red-500 bg-red-500/10 p-4 border border-red-500/20 text-xs rounded-sm">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <p>{errorMessage}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full gold-button py-5 text-sm tracking-[0.4em] font-black uppercase rounded-[2px] flex items-center justify-center gap-4 disabled:opacity-50 transition-all shadow-xl"
                                    >
                                        {status === "loading" ? <Loader2 className="w-6 h-6 animate-spin" /> : "Verify & Complete"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationForm;
