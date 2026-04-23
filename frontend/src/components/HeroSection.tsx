import { ArrowDown, Cpu, Shield, Zap } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section id="beranda" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="container relative mx-auto px-4 pt-28 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-foreground mb-6 animate-fade-up">
            <Cpu size={14} />
            <span>Powered by MobileNetV2 • Deep Learning</span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Deteksi Dini{" "}
            <span className="text-gradient">Tuberkulosis</span>{" "}
            dengan AI
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Sistem klasifikasi citra X-ray dada berbasis kecerdasan buatan untuk skrining TBC yang cepat, akurat, dan efisien menggunakan arsitektur MobileNetV2.
          </p>

          <div className="flex flex-wrap gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a href="#klasifikasi" className="gradient-primary text-primary-foreground px-8 py-3.5 rounded-xl text-base font-semibold transition-all hover:shadow-elevated hover:scale-105">
              Mulai Klasifikasi
            </a>
            <a href="#tentang" className="border border-primary-foreground/20 text-primary-foreground px-8 py-3.5 rounded-xl text-base font-semibold transition-all hover:bg-primary-foreground/10">
              Pelajari Lebih Lanjut
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: <Shield size={20} />, label: "Akurasi Tinggi", value: ">95%" },
              { icon: <Zap size={20} />, label: "Inferensi Cepat", value: "<2 dtk" },
              { icon: <Cpu size={20} />, label: "Model Ringan", value: "3.4M" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center text-primary mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-primary-foreground font-heading">{stat.value}</div>
                <div className="text-xs text-primary-foreground/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <a href="#klasifikasi" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/40 animate-bounce">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
