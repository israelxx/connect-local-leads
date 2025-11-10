import { useEffect, useRef, useState } from "react";
import structure1 from "@/assets/structure-1.jpg";
import structure2 from "@/assets/structure-2.jpg";
import structure3 from "@/assets/structure-3.jpg";
import structure4 from "@/assets/structure-4.jpg";
import structure5 from "@/assets/structure-5.jpg";
import structure6 from "@/assets/structure-6.jpg";
import structure7 from "@/assets/structure-7.jpg";

export const OurStructure = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const images = [
    { 
      src: structure1, 
      alt: "Estrutura Pro Connect - Ambiente 1",
      title: "Espaço de Trabalho",
      description: "Ambiente moderno e equipado para desenvolvimento de projetos"
    },
    { 
      src: structure2, 
      alt: "Estrutura Pro Connect - Ambiente 2",
      title: "Sala de Reuniões",
      description: "Espaço ideal para alinhamentos estratégicos e apresentações"
    },
    { 
      src: structure3, 
      alt: "Estrutura Pro Connect - Ambiente 3",
      title: "Estúdio de Criação",
      description: "Equipado com tecnologia de ponta para produção de conteúdo"
    },
    { 
      src: structure4, 
      alt: "Estrutura Pro Connect - Ambiente 4",
      title: "Área de Colaboração",
      description: "Espaço projetado para brainstorming e trabalho em equipe"
    },
    { 
      src: structure5, 
      alt: "Estrutura Pro Connect - Ambiente 5",
      title: "Estação de Design",
      description: "Área dedicada à criação visual e desenvolvimento criativo"
    },
    { 
      src: structure6, 
      alt: "Estrutura Pro Connect - Ambiente 6",
      title: "Centro de Operações",
      description: "Monitoramento e gestão de campanhas em tempo real"
    },
    { 
      src: structure7, 
      alt: "Estrutura Pro Connect - Ambiente 7",
      title: "Espaço Corporativo",
      description: "Ambiente profissional para atendimento e consultorias"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = imageRefs.current.findIndex((ref) => ref === entry.target);
          if (entry.isIntersecting && index !== -1) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenter - windowHeight / 2;
        const parallaxStrength = 0.05;
        const translateY = distanceFromCenter * parallaxStrength;
        
        const scale = Math.max(0.85, Math.min(1, 1 - Math.abs(distanceFromCenter) / windowHeight * 0.15));
        
        if (visibleItems.has(index)) {
          ref.style.transform = `translateY(${translateY}px) scale(${scale})`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleItems]);

  return (
    <section id="estrutura" className="py-24 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Nossa Estrutura
          </h2>
          <p className="text-xl text-muted-foreground">
            Conheça o ambiente preparado para transformar suas ideias em resultados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 aspect-[4/3] ${
                visibleItems.has(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${index * 0.15}s`,
                willChange: "transform, opacity",
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-xl transition-all duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {image.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
