import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Em poucos meses, dobramos o número de leads com a Pro Connect.",
    author: "Cliente do setor de serviços",
  },
  {
    quote: "Estratégias práticas, comunicação clara e resultados sólidos.",
    author: "Empresário local",
  },
  {
    quote: "A Pro Connect entende as necessidades de negócios locais como ninguém.",
    author: "Gestor de marketing",
  },
];

export const Results = () => {
  return (
    <section id="resultados" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Resultados que Falam
          </h2>
          <p className="text-xl text-muted-foreground">
            Veja o que nossos clientes têm a dizer sobre nossa parceria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-8 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg text-foreground leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  — {testimonial.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
