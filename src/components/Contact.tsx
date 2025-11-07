import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactProps {
  onOpenForm: () => void;
}

export const Contact = ({ onOpenForm }: ContactProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    segment: "",
    challenge: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Email inválido",
          description: "Por favor, insira um email válido.",
          variant: "destructive",
        });
        return;
      }

      // Save lead to database
      const { error: dbError } = await supabase
        .from("leads")
        .insert([formData]);

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Erro ao salvar os dados");
      }

      // Send confirmation emails
      const { error: emailError } = await supabase.functions.invoke(
        "send-lead-email",
        {
          body: formData,
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
        // Continue anyway, as the lead was saved
      }

      toast({
        title: "Mensagem enviada!",
        description: "Em breve um especialista entrará em contato.",
      });

      // Reset form
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        segment: "",
        challenge: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato diretamente.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contato" className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Fale com nossa equipe
          </h2>
          <p className="text-xl text-muted-foreground">
            Estamos prontos para transformar seu negócio
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Entre em contato
              </h3>
              <p className="text-muted-foreground mb-8">
                Preencha o formulário ou entre em contato diretamente pelos canais abaixo.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a
                    href="mailto:pro.conectt@gmail.com"
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    pro.conectt@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Telefone</div>
                  <a
                    href="tel:+5574999981122"
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    (74) 99998-1122
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">
                Pronto para crescer?
              </h4>
              <p className="text-sm text-muted-foreground">
                Preencha o formulário e um especialista entrará em contato para entender suas necessidades e apresentar as melhores soluções.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Nome da sua empresa"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="segment">Segmento</Label>
                <Input
                  id="segment"
                  name="segment"
                  value={formData.segment}
                  onChange={handleChange}
                  required
                  placeholder="Qual o segmento do seu negócio?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenge">Principal desafio</Label>
                <Textarea
                  id="challenge"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  required
                  placeholder="Conte-nos sobre seu principal desafio..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
              >
                Enviar para um especialista
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
