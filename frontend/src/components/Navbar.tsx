import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Klasifikasi", href: "#klasifikasi" },
  { label: "Pencegahan", href: "#pencegahan" },
  { label: "Jurnal", href: "#jurnal" },
  { label: "Tentang", href: "#tentang" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#beranda" onClick={(e) => handleClick(e, "#beranda")} className="flex items-center gap-2">
          <img src={logoIcon} alt="TBScan Logo" className="h-9 w-9" />
          <span className="font-heading text-xl font-bold text-gradient">TBScan AI</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#klasifikasi" onClick={(e) => handleClick(e, "#klasifikasi")} className="hidden md:inline-flex gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 hover:shadow-elevated">
          Mulai Skrining
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
          <ul className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#klasifikasi" onClick={(e) => handleClick(e, "#klasifikasi")} className="block gradient-primary text-primary-foreground text-center px-5 py-2.5 rounded-lg text-sm font-semibold mt-2">
                Mulai Skrining
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
