import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <Hero />

      {/* Highlights Section */}
      <section className="bg-charcoal py-16 border-y border-gold/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-around gap-12 text-center md:text-left">
            <div className="group">
              <h3 className="text-gold text-2xl mb-1 transition-transform group-hover:scale-110">Feb 14, 2026</h3>
              <p className="text-champagne/40 text-[10px] tracking-[0.3em] uppercase">The Date</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-gold/20" />
            <div className="group">
              <h3 className="text-gold text-2xl mb-1 transition-transform group-hover:scale-110">Grand Ballroom</h3>
              <p className="text-champagne/40 text-[10px] tracking-[0.3em] uppercase">The Venue</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-gold/20" />
            <div className="group">
              <h3 className="text-gold text-2xl mb-1 transition-transform group-hover:scale-110">Black Tie / Gold</h3>
              <p className="text-champagne/40 text-[10px] tracking-[0.3em] uppercase">Dress Code</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction / Description */}
      <section className="py-24 bg-black overflow-hidden border-b border-gold/10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <MoveRight className="w-12 h-12 text-gold/20 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-wider">
            A Night of <span className="gold-gradient italic">Infinite</span> Romance
          </h2>
          <p className="text-champagne/70 text-lg md:text-xl font-light leading-relaxed mb-12">
            AMOR is more than just an event; it is a curated journey designed for those who celebrate love at its highest form.
            From the moment you arrive, every detail – from the scent of rare orchids to the vintage champagne –
            has been meticulously crafted to create an atmosphere of pure enchantment.
          </p>
          <div className="w-24 h-[1px] bg-gold/50 mx-auto" />
        </div>
      </section>

      {/* Packages Section (RegistrationForm is now a popup inside here) */}
      <Packages />

      {/* Footer */}
      <footer className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold gold-gradient tracking-[0.4em] mb-4 select-none">AMOR</h2>
          <p className="text-champagne/30 text-[10px] tracking-[0.5em] uppercase mb-12 italic">Luxury • Passion • Excellence</p>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12 text-gold/60 text-[10px] tracking-[0.3em] uppercase font-bold">
            <a href="#" className="hover:text-gold transition-colors">Digital Concierge</a>
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>

          <p className="text-champagne/20 text-[10px] tracking-widest uppercase">&copy; 2026 SOWIRAD HOTEL. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </main>
  );
}
