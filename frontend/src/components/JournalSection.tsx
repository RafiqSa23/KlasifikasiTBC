import { ExternalLink, BookOpen, Calendar, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const journals = [
   {
    title: "Enhancing Tuberculosis Detection from Chest X-Ray Images Using Deep Learning: Evaluating Multi-Architecture Performance and Efficiency",
    authors: "Witarsyah, D., et al.",
    year: "2026",
    source: "Engineering, Technology & Applied Science Research (ETASR)",
    doi: "https://doi.org/10.48084/etasr.16321",
    summary:
      "Penelitian membandingkan beberapa arsitektur deep learning untuk mendeteksi tuberkulosis dari citra Chest X-Ray dengan fokus pada performa dan efisiensi model."
  },
  {
    title: "Reliable Tuberculosis Detection Using Chest X-Ray With Deep Learning Segmentation and Visualization",
    authors: "Rahman T., et al.",
    year: "2020",
    source: "IEEE Xplore",
    doi: "https://doi.org/10.1109/ACCESS.2020.3031384",
    summary:
      "Mengembangkan metode deteksi tuberkulosis menggunakan segmentasi citra dan visualisasi untuk meningkatkan interpretasi hasil klasifikasi."
  },
  {
    title: "Improving Early Detection and Classification of Lung Diseases With Innovative MobileNetV2 Framework",
    authors: "Tripathi, A., et al.",
    year: "2024",
    source: "IEEE Xplore",
    doi: "https://doi.org/10.1109/ACCESS.2024.3440577",
    summary:
      "Mengusulkan framework berbasis MobileNetV2 untuk meningkatkan akurasi deteksi dini penyakit paru, termasuk tuberkulosis."
  },
  {
  title: "Deep Learning Classification of Active Tuberculosis Lung Zones Wise Manifestations Using Chest X-Rays: A Multi Label Approach",
  authors: "Devasia, J., Goswami, H., Lakshminarayanan, S., et al.",
  year: "2023",
  source: "Scientific Reports (Nature) - Open Access",
  doi: "https://doi.org/10.1038/s41598-023-28079-0",
  summary:
    "Mengembangkan model deep learning untuk mengidentifikasi manifestasi tuberkulosis aktif pada berbagai zona paru menggunakan citra Chest X-Ray. Penelitian menunjukkan bahwa pendekatan deep learning mampu membantu proses skrining TB secara otomatis dengan performa yang tinggi."
},
{
  title: "A Deep Learning Model Using Chest X-Ray for Identifying TB and NTM-LD Patients: A Cross-Sectional Study",
  authors: "Lee, H., et al.",
  year: "2023",
  source: "Insights into Imaging",
  doi: "https://doi.org/10.1186/s13244-023-01395-9",
  summary:
    "Mengembangkan model deep learning untuk membedakan pasien Tuberkulosis (TB) dan Non-Tuberculous Mycobacterial Lung Disease (NTM-LD) menggunakan citra Chest X-Ray. Hasil penelitian menunjukkan bahwa model AI mampu meningkatkan akurasi identifikasi penyakit paru yang memiliki karakteristik radiologi serupa."
}
];

const JournalSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="jurnal" className="py-24 gradient-section">
      <div ref={ref} className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Referensi <span className="text-gradient">Jurnal Ilmiah</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Daftar jurnal dan publikasi ilmiah yang menjadi rujukan dalam pengembangan sistem klasifikasi TBC ini.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-5">
          {journals.map((j, i) => (
            <article
              key={i}
              className={`gradient-card rounded-2xl p-6 shadow-card hover:shadow-elevated group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={16} className="text-primary shrink-0" />
                    <span className="text-xs font-medium text-primary">{j.source}</span>
                  </div>
                  <h3 className="font-heading text-base md:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {j.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{j.summary}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {j.authors}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {j.year}
                    </span>
                  </div>
                </div>
                <a
                  href={j.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-all hover:gradient-primary hover:text-primary-foreground"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
