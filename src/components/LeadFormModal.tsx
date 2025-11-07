import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LeadFormModal = ({ open, onOpenChange }: LeadFormModalProps) => {
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
        title: "Sucesso! 🎉",
        description: "Um especialista entrará em contato em breve.",
      });

      // Reset form and close modal
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        segment: "",
        challenge: "",
      });
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Fale com um Especialista
          </DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo e nossa equipe entrará em contato para apresentar as melhores soluções para o seu negócio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="modal-name">Nome completo *</Label>
            <Input
              id="modal-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Seu nome"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-company">Empresa *</Label>
            <Input
              id="modal-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Nome da sua empresa"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="modal-phone">Telefone *</Label>
              <Input
                id="modal-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-email">E-mail *</Label>
              <Input
                id="modal-email"
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
            <Label htmlFor="modal-segment">Segmento *</Label>
            <Input
              id="modal-segment"
              name="segment"
              value={formData.segment}
              onChange={handleChange}
              required
              placeholder="Qual o segmento do seu negócio?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-challenge">Principal desafio *</Label>
            <Textarea
              id="modal-challenge"
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              required
              placeholder="Conte-nos sobre seu principal desafio ou objetivo..."
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
      </DialogContent>
    </Dialog>
  );
};
