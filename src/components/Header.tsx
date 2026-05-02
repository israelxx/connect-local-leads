import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-pro-connect.png";

interface HeaderProps {
  onOpenForm: () => void;
}

const navItems = [
  { label: "Início", id: "inicio" },
  { label: "Pilares", id: "pilares" },
  { label: "Serviços", id: "servicos" },
  { label: "Planos", id: "planos" },
  { label: "FAQ", id: "faq" },
];

const tickerItems = ["Crescer é estratégia", "Performance com método", "Marca forte vende mais", "Conteúdo com intenção", "Tráfego sem estratégia é desperdício"];

export const Header = ({ onOpenForm }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 lg:px-8">
        <button onClick={() => scrollToSection("inicio")} className="flex items-center" aria-label="ProConnect início">
          <img src={logo} alt="ProConnect" className="h-7 w-auto" />
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-xs font-bold uppercase text-foreground/75 transition-colors hover:text-primary"
            >
              {item.label}
            </button>
          ))}
        </div>

        <Button onClick={() => scrollToSection("formulario")} size="sm" className="hidden rounded-none bg-primary px-5 text-xs font-extrabold uppercase text-primary-foreground hover:bg-primary/90 md:inline-flex">
          Falar com especialista
        </Button>

        <button className="text-foreground md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-border bg-background px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left font-display text-2xl font-extrabold uppercase text-foreground">
                {item.label}
              </button>
            ))}
            <Button onClick={() => scrollToSection("formulario")} className="mt-2 rounded-none bg-primary font-extrabold uppercase text-primary-foreground hover:bg-primary/90">
              Quero meu diagnóstico
            </Button>
          </div>
        </div>
      )}

      <div className="h-6 overflow-hidden bg-primary text-primary-foreground">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap py-1 text-[10px] font-extrabold uppercase">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </header>
  );
};