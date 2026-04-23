import { ShieldCheck, Wind, Syringe, Stethoscope, Users, Apple } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const tips = [
  {
    icon: <Syringe size={24} />,
    title: "Vaksinasi BCG",
    desc: "Pastikan anak-anak mendapatkan vaksin BCG sejak dini untuk perlindungan awal terhadap TBC.",
  },
  {
    icon: <Wind size={24} />,
    title: "Ventilasi Udara",
    desc: "Jaga sirkulasi udara di dalam ruangan tetap baik. Buka jendela dan gunakan ventilasi yang memadai.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Etika Batuk",
    desc: "Tutup mulut dan hidung saat batuk atau bersin. Gunakan masker jika mengalami gejala pernapasan.",
  },
  {
    icon: <Stethoscope size={24} />,
    title: "Pemeriksaan Rutin",
    desc: "Lakukan skrining TBC secara berkala, terutama jika tinggal di daerah endemis atau kontak dengan penderita.",
  },
  {
    icon: <Users size={24} />,
    title: "Hindari Kerumunan",
    desc: "Kurangi kontak dengan orang yang menunjukkan gejala TBC aktif, terutama di ruang tertutup.",
  },
  {
    icon: <Apple size={24} />,
    title: "Nutrisi & Imunitas",
    desc: "Konsumsi makanan bergizi dan istirahat cukup untuk menjaga daya tahan tubuh tetap optimal.",
  },
];

const PreventionSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="pencegahan" className="py-24 bg-background">
      <div ref={ref} className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Pencegahan <span className="text-gradient">Tuberkulosis</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Langkah-langkah penting yang dapat dilakukan untuk mencegah penularan dan penyebaran penyakit TBC.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tips.map((tip, i) => (
            <div
              key={tip.title}
              className={`gradient-card rounded-2xl p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
                {tip.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreventionSection;
