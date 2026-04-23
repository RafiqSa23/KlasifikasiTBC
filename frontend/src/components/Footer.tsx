import logoIcon from "@/assets/logo-icon.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <footer className="gradient-hero py-12">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logoIcon} alt="TBScan Logo" className="h-8 w-8" />
            <span className="font-heading text-lg font-bold text-primary-foreground">
              TBScan AI
            </span>
          </div>
          <p className="text-sm text-primary-foreground/50 text-center">
            Proyek Skripsi — Implementasi MobileNetV2 untuk Klasifikasi TBC pada
            Citra X-Ray Dada
          </p>
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Skripsi Rafiq Setyo Aji
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
