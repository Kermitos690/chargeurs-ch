
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  type?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  establishmentName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    // Validation de base
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error("Les champs nom, email et message sont obligatoires");
    }
    
    // Préparer le contenu HTML de l'email
    let emailContent = `
      <h2>Nouveau message de contact via le site web</h2>
      <p><strong>Nom:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
    `;
    
    if (formData.phone) {
      emailContent += `<p><strong>Téléphone:</strong> ${formData.phone}</p>`;
    }
    
    emailContent += `
      <p><strong>Sujet:</strong> ${formData.subject || 'Non spécifié'}</p>
      <p><strong>Message:</strong></p>
      <div style="padding: 10px; background: #f7f7f7; border-left: 4px solid #0f766e;">
        ${formData.message.replace(/\n/g, '<br>')}
      </div>
    `;
    
    // Ajouter les informations de rendez-vous si disponibles
    if (formData.appointmentDate || formData.appointmentTime) {
      emailContent += `
        <h3>Informations de rendez-vous</h3>
        <p><strong>Date:</strong> ${formData.appointmentDate || 'Non spécifiée'}</p>
        <p><strong>Heure:</strong> ${formData.appointmentTime || 'Non spécifiée'}</p>
      `;
      
      if (formData.type) {
        emailContent += `<p><strong>Type de rendez-vous:</strong> ${formData.type === 'video' ? 'Visioconférence' : 'Appel téléphonique'}</p>`;
      }
      
      if (formData.establishmentName) {
        emailContent += `<p><strong>Établissement:</strong> ${formData.establishmentName}</p>`;
      }
    }
    
    // Envoyer l'email
    const emailResponse = await resend.emails.send({
      from: "Formulaire Chargeurs.ch <contact@chargeurs.ch>",
      to: ["chargeurs@proton.me"],
      subject: formData.appointmentDate 
        ? `Demande de rendez-vous - ${formData.name}`
        : `Nouveau message de contact - ${formData.subject || 'Sans sujet'}`,
      html: emailContent,
      reply_to: formData.email
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
