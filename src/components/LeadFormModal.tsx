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
import { Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { leadFormSchema } from "@/lib/validation";
import { ZodError } from "zod";

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType?: 'standard' | 'prime_hub';
}

export const LeadFormModal = ({ open, onOpenChange, serviceType = 'standard' }: LeadFormModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    segment: "",
    challenge: "",
    revenue: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    
    try {
      // Get reCAPTCHA token
      const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      
      if (!siteKey) {
        throw new Error("reCAPTCHA não configurado");
      }

      // Wait for grecaptcha to be ready
      if (typeof window.grecaptcha === 'undefined') {
        throw new Error("reCAPTCHA ainda não carregou. Por favor, aguarde e tente novamente.");
      }

      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(siteKey, { action: 'submit' })
            .then(resolve)
            .catch(reject);
        });
      });

      // Validate form data with zod schema
      const validatedData = leadFormSchema.parse({
        ...formData,
        service_type: serviceType,
        recaptchaToken,
      });

      // Save lead to database - zod already validated and transformed the data
      const { error: dbError } = await supabase
        .from("leads")
        .insert([{
          name: validatedData.name,
          company: validatedData.company,
          phone: validatedData.phone,
          email: validatedData.email,
          segment: validatedData.segment,
          challenge: validatedData.challenge,
          revenue: validatedData.revenue,
          service_type: validatedData.service_type,
        }]);

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Erro ao salvar os dados");
      }

      // Send confirmation emails with validated data
      const { error: emailError } = await supabase.functions.invoke(
        "send-lead-email",
        {
          body: validatedData,
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
        
        // Handle specific error codes
        const errorData = emailError as any;
        
        if (errorData.context?.status === 429) {
          toast({
            title: "Limite de envios excedido",
            description: "Você pode enviar no máximo 5 formulários por hora. Por favor, tente novamente mais tarde.",
            variant: "destructive",
          });
          return;
        }
        
        if (errorData.context?.status === 403) {
          toast({
            title: "Verificação de segurança falhou",
            description: "Por favor, recarregue a página e tente novamente.",
            variant: "destructive",
          });
          return;
        }
        
        // For other errors, show generic message but continue since lead was saved
        toast({
          title: "Aviso",
          description: "Seu lead foi salvo, mas houve um problema ao enviar o email. Entraremos em contato em breve.",
        });
      } else {
        // Only show success if no email error
        toast({
          title: "Sucesso! 🎉",
          description: "Um especialista entrará em contato em breve.",
        });
      }

      // Reset form and close modal (only if not rate limited or CAPTCHA failed)
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        segment: "",
        challenge: "",
        revenue: "",
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Erro de validação",
          description: "Por favor, corrija os erros no formulário.",
          variant: "destructive",
        });
      } else if (error instanceof Error) {
        // Handle specific error types
        if (error.message.includes("reCAPTCHA")) {
          toast({
            title: "Erro de segurança",
            description: error.message,
            variant: "destructive",
          });
        } else {
          console.error("Submit error:", error);
          toast({
            title: "Erro ao enviar",
            description: error.message || "Tente novamente ou entre em contato diretamente.",
            variant: "destructive",
          });
        }
      } else {
        console.error("Submit error:", error);
        toast({
          title: "Erro ao enviar",
          description: "Tente novamente ou entre em contato diretamente.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
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
            {serviceType === 'prime_hub' ? 'Consultoria PRIME HUB' : 'Fale com um Especialista'}
          </DialogTitle>
          <DialogDescription>
            {serviceType === 'prime_hub' 
              ? 'Preencha o formulário para agendar sua consultoria estratégica exclusiva com nosso CEO.'
              : 'Preencha o formulário abaixo e nossa equipe entrará em contato para apresentar as melhores soluções para o seu negócio.'}
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
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
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
              className={errors.company ? "border-destructive" : ""}
            />
            {errors.company && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.company}
              </p>
            )}
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
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone}
                </p>
              )}
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
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
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
              className={errors.segment ? "border-destructive" : ""}
            />
            {errors.segment && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.segment}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-revenue">Faturamento mensal *</Label>
            <Input
              id="modal-revenue"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              required
              placeholder="Ex: R$ 50.000/mês"
              className={errors.revenue ? "border-destructive" : ""}
            />
            {errors.revenue && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.revenue}
              </p>
            )}
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
              className={errors.challenge ? "border-destructive" : ""}
            />
            {errors.challenge && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.challenge}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Enviar para um especialista"}
            <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            Este site é protegido pelo reCAPTCHA e aplicam-se a{" "}
            <a 
              href="https://policies.google.com/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Política de Privacidade
            </a>
            {" "}e os{" "}
            <a 
              href="https://policies.google.com/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Termos de Serviço
            </a>
            {" "}do Google.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
