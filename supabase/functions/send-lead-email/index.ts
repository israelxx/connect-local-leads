import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadEmailRequest {
  name: string;
  company: string;
  phone: string;
  email: string;
  segment: string;
  challenge: string;
  revenue: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-lead-email function");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadEmailRequest = await req.json();
    console.log("Processing lead for:", leadData.email);

    // Send confirmation email to the lead using Resend API
    const confirmationEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Pro Connect <onboarding@resend.dev>",
        to: [leadData.email],
        subject: "Recebemos seu contato! | Pro Connect",
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
                  <h1>Obrigado pelo seu contato!</h1>
                </div>
                <div class="content">
                  <p>Olá <strong>${leadData.name}</strong>,</p>
                  
                  <p>Recebemos sua solicitação e estamos animados em conhecer mais sobre <strong>${leadData.company}</strong>!</p>
                  
                  <p>Nossa equipe de especialistas irá analisar seu desafio e entrar em contato em breve com as melhores soluções para o seu negócio.</p>
                  
                  <p><strong>Resumo da sua solicitação:</strong></p>
                  <ul>
                    <li><strong>Empresa:</strong> ${leadData.company}</li>
                    <li><strong>Segmento:</strong> ${leadData.segment}</li>
                    <li><strong>Faturamento:</strong> ${leadData.revenue}</li>
                    <li><strong>Telefone:</strong> ${leadData.phone}</li>
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
        subject: `Novo Lead: ${leadData.company}`,
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
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🎯 Novo Lead Recebido!</h2>
                </div>
                <div class="content">
                  <div class="lead-info">
                    <p><span class="label">Nome:</span> ${leadData.name}</p>
                    <p><span class="label">Empresa:</span> ${leadData.company}</p>
                    <p><span class="label">Email:</span> ${leadData.email}</p>
                    <p><span class="label">Telefone:</span> ${leadData.phone}</p>
                    <p><span class="label">Segmento:</span> ${leadData.segment}</p>
                    <p><span class="label">Faturamento mensal:</span> ${leadData.revenue}</p>
                    <p><span class="label">Principal desafio:</span></p>
                    <p style="background: #f5f5f5; padding: 15px; border-radius: 6px;">${leadData.challenge}</p>
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
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
