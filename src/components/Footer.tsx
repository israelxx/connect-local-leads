import { Instagram, Linkedin, Mail } from "lucide-react";
import logo from "@/assets/logo-pro-connect.png";

const links = [
  ["Início", "inicio"],
  ["Pilares", "pilares"],
  ["Serviços", "servicos"],
  ["Planos", "planos"],
  ["FAQ", "faq"],
];

export const Footer = () => {
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <img src={logo} alt="ProConnect" className="h-8 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Marketing estruturado para marcas que querem crescer com estratégia, conteúdo, tráfego e processo comercial.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-extrabold text-foreground">Navegação</h3>
            <div className="mt-4 grid gap-2">
              {links.map(([label, id]) => (
                <button key={id} onClick={() => scrollToSection(id)} className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary">
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-lg font-extrabold text-foreground">Redes</h3>
            <div className="mt-4 flex gap-3">
              <a href="mailto:pro.conectt@gmail.com" className="text-muted-foreground hover:text-primary" aria-label="Email"><Mail className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/proconnectagency_/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} ProConnect. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};