import { z } from "zod";

// Phone regex: Brazilian format (11) 98765-4321 or international formats
const phoneRegex = /^[\d\s()+-]+$/;

// Prevent common XSS patterns
const sanitizeString = (value: string) => {
  return value
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .trim();
};

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .transform(sanitizeString),
  
  company: z
    .string()
    .trim()
    .min(2, "Empresa deve ter pelo menos 2 caracteres")
    .max(150, "Empresa deve ter no máximo 150 caracteres")
    .transform(sanitizeString),
  
  phone: z
    .string()
    .trim()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(20, "Telefone deve ter no máximo 20 caracteres")
    .regex(phoneRegex, "Formato de telefone inválido. Use apenas números, espaços, parênteses, + ou -"),
  
  email: z
    .string()
    .trim()
    .email("Email inválido")
    .max(255, "Email deve ter no máximo 255 caracteres")
    .toLowerCase(),
  
  segment: z
    .string()
    .trim()
    .min(2, "Segmento deve ter pelo menos 2 caracteres")
    .max(100, "Segmento deve ter no máximo 100 caracteres")
    .transform(sanitizeString),
  
  challenge: z
    .string()
    .trim()
    .min(10, "Desafio deve ter pelo menos 10 caracteres")
    .max(1000, "Desafio deve ter no máximo 1000 caracteres")
    .transform(sanitizeString),
  
  revenue: z
    .string()
    .trim()
    .max(50, "Faturamento deve ter no máximo 50 caracteres")
    .transform(sanitizeString),
  
  service_type: z
    .enum(["standard", "prime_hub"], {
      errorMap: () => ({ message: "Tipo de serviço inválido" }),
    })
    .default("standard"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// Helper to safely escape HTML for email rendering
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char] || char);
}
