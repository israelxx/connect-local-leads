import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RECAPTCHA_SECRET_KEY = Deno.env.get("RECAPTCHA_SECRET_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Create Supabase client with service role for rate limiting
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_WINDOW_HOURS = 1;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

// Server-side validation schema
const phoneRegex = /^[\d\s()+-]+$/;

const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  
  company: z
    .string()
    .trim()
    .min(2, "Empresa deve ter pelo menos 2 caracteres")
    .max(150, "Empresa deve ter no máximo 150 caracteres"),
  
  phone: z
    .string()
    .trim()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(20, "Telefone deve ter no máximo 20 caracteres")
    .regex(phoneRegex, "Formato de telefone inválido"),
  
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
    .max(100, "Segmento deve ter no máximo 100 caracteres"),
  
  challenge: z
    .string()
    .trim()
    .min(10, "Desafio deve ter pelo menos 10 caracteres")
    .max(1000, "Desafio deve ter no máximo 1000 caracteres"),
  
  revenue: z
    .string()
    .trim()
    .max(50, "Faturamento deve ter no máximo 50 caracteres"),
  
  social_handle: z
    .string()
    .trim()
    .min(1, "@ da empresa é obrigatório")
    .max(100, "@ deve ter no máximo 100 caracteres")
    .regex(/^@?[\w\-.]+$/, "Formato inválido. Use apenas letras, números, pontos, hífens ou underline")
    .transform((val: string) => val.startsWith('@') ? val : `@${val}`),
  
  service_type: z
    .enum(["standard", "prime_hub"])
    .default("standard"),
  
  recaptchaToken: z
    .string()
    .optional(),
});

// HTML escape function to prevent XSS in emails
function escapeHtml(text: string): string {
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

// Get client IP from request headers
function getClientIP(req: Request): string {
  // Try various headers in order of preference
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  
  const cfConnectingIP = req.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return "unknown";
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string, expectedAction: string = "submit"): Promise<{ success: boolean; score?: number; error?: string }> {
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    
    if (!data.success) {
      console.error("reCAPTCHA verification failed:", data["error-codes"]);
      return { success: false, error: "Falha na verificação reCAPTCHA" };
    }

    // For reCAPTCHA v3, check score (0.0 - 1.0, where 1.0 is very likely a good interaction)
    if (data.score !== undefined && data.score < 0.5) {
      console.warn(`reCAPTCHA score too low: ${data.score}`);
      return { success: false, score: data.score, error: "Score de segurança muito baixo" };
    }

    // Verify action matches
    if (data.action && data.action !== expectedAction) {
      console.warn(`reCAPTCHA action mismatch: expected ${expectedAction}, got ${data.action}`);
      return { success: false, error: "Ação reCAPTCHA inválida" };
    }

    return { success: true, score: data.score };
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return { success: false, error: "Erro ao verificar reCAPTCHA" };
  }
}

// Check rate limit for IP address
async function checkRateLimit(ipAddress: string): Promise<{ allowed: boolean; submissionsCount: number }> {
  try {
    // Calculate time window
    const windowStart = new Date();
    windowStart.setHours(windowStart.getHours() - RATE_LIMIT_WINDOW_HOURS);

    // Count submissions in the time window
    const { data, error } = await supabase
      .from("form_submissions")
      .select("id", { count: "exact", head: false })
      .eq("ip_address", ipAddress)
      .gte("submitted_at", windowStart.toISOString());

    if (error) {
      console.error("Error checking rate limit:", error);
      // On error, allow the submission (fail open)
      return { allowed: true, submissionsCount: 0 };
    }

    const submissionsCount = data?.length || 0;
    const allowed = submissionsCount < MAX_SUBMISSIONS_PER_WINDOW;

    console.log(`Rate limit check for ${ipAddress}: ${submissionsCount}/${MAX_SUBMISSIONS_PER_WINDOW} submissions in last ${RATE_LIMIT_WINDOW_HOURS}h`);

    return { allowed, submissionsCount };
  } catch (error) {
    console.error("Exception in checkRateLimit:", error);
    // On error, allow the submission (fail open)
    return { allowed: true, submissionsCount: 0 };
  }
}

// Record submission for rate limiting
async function recordSubmission(ipAddress: string, userAgent: string | null): Promise<void> {
  try {
    const { error } = await supabase
      .from("form_submissions")
      .insert({
        ip_address: ipAddress,
        user_agent: userAgent,
        form_type: "lead",
        submitted_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Error recording submission:", error);
    }
  } catch (error) {
    console.error("Exception in recordSubmission:", error);
  }
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-lead-email function");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP and user agent
    const clientIP = getClientIP(req);
    const userAgent = req.headers.get("user-agent");
    console.log("Request from IP:", clientIP);

    // Parse and validate request body with zod
    const body = await req.json();
    console.log("Validating lead data...");
    
    const validatedData = leadFormSchema.parse(body);
    console.log("Lead data validated successfully for:", validatedData.email);

    // Verify reCAPTCHA token (optional - skip if not provided or not configured)
    if (validatedData.recaptchaToken && RECAPTCHA_SECRET_KEY) {
      console.log("Verifying reCAPTCHA token...");
      const recaptchaResult = await verifyRecaptcha(validatedData.recaptchaToken, "submit");
      
      if (!recaptchaResult.success) {
        console.warn("reCAPTCHA verification failed, but continuing:", recaptchaResult.error);
        // Continue without blocking - reCAPTCHA failure shouldn't block form submission
      } else {
        console.log("reCAPTCHA verified successfully. Score:", recaptchaResult.score);
      }
    } else {
      console.log("Skipping reCAPTCHA verification - token or secret not provided");
    }

    // Check rate limit
    console.log("Checking rate limit...");
    const rateLimitResult = await checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for IP ${clientIP}: ${rateLimitResult.submissionsCount} submissions`);
      return new Response(
        JSON.stringify({ 
          error: "Limite de envios excedido",
          details: `Você pode enviar no máximo ${MAX_SUBMISSIONS_PER_WINDOW} formulários por hora. Por favor, tente novamente mais tarde.`,
          code: "RATE_LIMIT_EXCEEDED",
          retryAfter: RATE_LIMIT_WINDOW_HOURS * 3600 // seconds
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": String(RATE_LIMIT_WINDOW_HOURS * 3600),
            ...corsHeaders 
          },
        }
      );
    }
    
    console.log("Rate limit check passed");

    // Record this submission for rate limiting
    await recordSubmission(clientIP, userAgent);

    // Escape all user inputs for HTML safety
    const safeName = escapeHtml(validatedData.name);
    const safeCompany = escapeHtml(validatedData.company);
    const safePhone = escapeHtml(validatedData.phone);
    const safeEmail = escapeHtml(validatedData.email);
    const safeSegment = escapeHtml(validatedData.segment);
    const safeChallenge = escapeHtml(validatedData.challenge);
    const safeRevenue = escapeHtml(validatedData.revenue);
    const safeSocialHandle = escapeHtml(validatedData.social_handle);
    const serviceLabel = validatedData.service_type === "prime_hub" ? "PRIME HUB" : "Padrão";

    // Send confirmation email to the lead using Resend API
    const confirmationEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Pro Connect <onboarding@resend.dev>",
        to: [validatedData.email],
        subject: validatedData.service_type === 'prime_hub' 
          ? "Sua Consultoria PRIME HUB foi agendada! | Pro Connect"
          : "Recebemos seu contato! | Pro Connect",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>${validatedData.service_type === 'prime_hub' 
                    ? '🎯 Consultoria PRIME HUB Agendada!'
                    : 'Obrigado pelo seu contato!'}</h1>
                </div>
                <div class="content">
                  <p>Olá <strong>${safeName}</strong>,</p>
                  
                  <p>${validatedData.service_type === 'prime_hub'
                    ? `Recebemos sua solicitação para a <strong>Consultoria Estratégica PRIME HUB</strong>! Nossa equipe irá entrar em contato em breve para agendar sua sessão exclusiva com o CEO Fellipe de Sá.`
                    : `Recebemos sua solicitação e estamos animados em conhecer mais sobre <strong>${safeCompany}</strong>!`}
                  </p>
                  
                  <p>Nossa equipe de especialistas irá analisar seu desafio e entrar em contato em breve com as melhores soluções para o seu negócio.</p>
                  
                  <p><strong>Resumo da sua solicitação:</strong></p>
                  <ul>
                    <li><strong>Empresa:</strong> ${safeCompany}</li>
                    <li><strong>@ da empresa:</strong> ${safeSocialHandle}</li>
                    <li><strong>Segmento:</strong> ${safeSegment}</li>
                    <li><strong>Faturamento:</strong> ${safeRevenue}</li>
                    <li><strong>Telefone:</strong> ${safePhone}</li>
                  </ul>
                  
                  <p>Enquanto isso, você pode conhecer mais sobre nossos serviços e resultados no nosso site.</p>
                  
                  <p>Até breve!</p>
                  <p><strong>Equipe Pro Connect</strong><br>
                  Email: pro.conectt@gmail.com<br>
                  Telefone: (74) 99998-1122</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Pro Connect. Todos os direitos reservados.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    const confirmationEmail = await confirmationEmailResponse.json();
    console.log("Confirmation email sent:", confirmationEmail);

    // Send notification email to Pro Connect team
    const notificationEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Pro Connect Leads <onboarding@resend.dev>",
        to: ["pro.conectt@gmail.com"],
        subject: validatedData.service_type === 'prime_hub'
          ? `🌟 PRIME HUB: ${safeCompany}`
          : `Novo Lead: ${safeCompany}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #0EA5E9; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 30px; }
                .lead-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .label { font-weight: bold; color: #0EA5E9; }
                .challenge-box { background: #f5f5f5; padding: 15px; border-radius: 6px; white-space: pre-wrap; word-wrap: break-word; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>${validatedData.service_type === 'prime_hub' ? '🌟 Novo Lead PRIME HUB!' : '🎯 Novo Lead Recebido!'}</h2>
                </div>
                <div class="content">
                  <div class="lead-info">
                    <p><span class="label">Tipo de Serviço:</span> <strong style="color: ${validatedData.service_type === 'prime_hub' ? '#0EA5E9' : '#666'};">${serviceLabel}</strong></p>
                    <p><span class="label">Nome:</span> ${safeName}</p>
                    <p><span class="label">Empresa:</span> ${safeCompany}</p>
                    <p><span class="label">@ da empresa:</span> ${safeSocialHandle}</p>
                    <p><span class="label">Email:</span> ${safeEmail}</p>
                    <p><span class="label">Telefone:</span> ${safePhone}</p>
                    <p><span class="label">Segmento:</span> ${safeSegment}</p>
                    <p><span class="label">Faturamento mensal:</span> ${safeRevenue}</p>
                    <p><span class="label">Principal desafio:</span></p>
                    <div class="challenge-box">${safeChallenge}</div>
                  </div>
                  <p style="color: #666; font-size: 12px;">Lead recebido em: ${new Date().toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    const notificationEmail = await notificationEmailResponse.json();
    console.log("Notification email sent to Pro Connect:", notificationEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        confirmationId: confirmationEmail.id,
        notificationId: notificationEmail.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-lead-email function:", error);
    
    // Handle validation errors specifically
    if (error.name === "ZodError") {
      console.error("Validation errors:", error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Dados inválidos", 
          details: error.errors,
          message: "Os dados enviados não passaram na validação de segurança"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Erro ao enviar emails",
        type: error.name 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
