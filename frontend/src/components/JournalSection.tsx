import { ExternalLink, BookOpen, Calendar, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const journals = [
  {
    title: "MobileNetV2: Inverted Residuals and Linear Bottlenecks",
    authors: "Sandler, M., Howard, A., Zhu, M., et al.",
    year: "2018",
    source: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    doi: "https://doi.org/10.1109/CVPR.2018.00474",
    summary: "Memperkenalkan arsitektur MobileNetV2 dengan inverted residuals dan linear bottlenecks yang menjadi dasar model klasifikasi ringan.",
  },
  {
    title: "Deep Learning for Chest Radiograph Diagnosis: A Retrospective Analysis",
    authors: "Rajpurkar, P., Irvin, J., Ball, R. L., et al.",
    year: "2018",
    source: "PLOS Medicine",
    doi: "https://doi.org/10.1371/journal.pmed.1002686",
    summary: "Studi retrospektif tentang penggunaan deep learning untuk diagnosis penyakit pada citra X-ray dada dengan performa setara radiologis.",
  },
  {
    title: "Tuberculosis Detection from Chest X-rays Using Deep Transfer Learning",
    authors: "Rahman, T., Khandakar, A., Kadir, M. A., et al.",
    year: "2020",
    source: "IEEE Access",
    doi: "https://doi.org/10.1109/ACCESS.2020.3010287",
    summary: "Menerapkan transfer learning dengan berbagai arsitektur CNN termasuk MobileNet untuk deteksi TBC pada citra X-ray dada.",
  },
  {
    title: "A Systematic Review of Transfer Learning for Medical Image Classification",
    authors: "Morid, M. A., Borjali, A., & Del Fiol, G.",
    year: "2021",
    source: "Computers in Biology and Medicine",
    doi: "https://doi.org/10.1016/j.compbiomed.2021.104115",
    summary: "Tinjauan sistematis tentang efektivitas transfer learning dalam klasifikasi citra medis termasuk deteksi penyakit paru.",
  },
  {
    title: "Automated Tuberculosis Screening Using Deep Learning on Chest X-Ray Images",
    authors: "Lakhani, P., & Sundaram, B.",
    year: "2017",
    source: "Radiology",
    doi: "https://doi.org/10.1148/radiol.2017162326",
    summary: "Salah satu studi awal yang menunjukkan kemampuan deep learning dalam mendeteksi TBC pada citra radiografi dada.",
  },
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
