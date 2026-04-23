import { Brain, Layers, Smartphone, BarChart3 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  {
    icon: <Brain size={24} />,
    title: "Transfer Learning",
    desc: "Menggunakan model MobileNetV2 yang telah di-pretrain pada ImageNet, kemudian disesuaikan untuk klasifikasi TBC.",
  },
  {
    icon: <Smartphone size={24} />,
    title: "Arsitektur Ringan",
    desc: "MobileNetV2 dirancang khusus untuk perangkat dengan sumber daya terbatas, menggunakan depthwise separable convolutions.",
  },
  {
    icon: <Layers size={24} />,
    title: "Inverted Residuals",
    desc: "Teknik inverted residual bottleneck memungkinkan representasi fitur yang kaya dengan komputasi minimal.",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Evaluasi Komprehensif",
    desc: "Model dievaluasi menggunakan metrik akurasi, presisi, recall, dan F1-Score untuk memastikan keandalan.",
  },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="tentang" className="py-24 bg-background">
      <div ref={ref} className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
          {/* Text */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tentang <span className="text-gradient">Sistem Ini</span>
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Sistem ini dikembangkan sebagai implementasi model deep learning MobileNetV2 untuk klasifikasi penyakit Tuberkulosis pada citra X-ray dada. Proyek ini merupakan bagian dari penelitian skripsi yang bertujuan mengevaluasi efektivitas arsitektur lightweight CNN dalam domain medis.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Dengan pendekatan <strong className="text-foreground">Transfer Learning</strong>, model yang telah dilatih pada dataset ImageNet disesuaikan (fine-tuned) untuk mengenali pola-pola spesifik TBC pada citra radiografi dada, menghasilkan sistem skrining yang cepat dan akurat.
            </p>

            <div className="gradient-card rounded-2xl p-5 shadow-card border border-border/50">
              <h4 className="font-heading text-sm font-semibold text-foreground mb-2">Alur Kerja Sistem</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                {["Upload X-Ray", "Preprocessing", "Inferensi MobileNetV2", "Hasil Klasifikasi"].map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="gradient-primary text-primary-foreground px-2.5 py-1 rounded-md font-medium">{step}</span>
                    {i < 3 && <span className="text-primary">→</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={f.title} className={`gradient-card rounded-2xl p-5 shadow-card hover:shadow-elevated hover:-translate-y-1 group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
                  {f.icon}
                </div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
