
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = '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';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audio, prompt } = await req.json();

    if (!audio && !prompt) {
      return new Response(
        JSON.stringify({ error: "Veuillez fournir un fichier audio ou une question textuelle" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Requête reçue:", audio ? "Avec audio" : "Avec texte:", prompt);

    // Comportement différent selon si on a un audio ou un texte
    if (audio) {
      // Traitement de l'audio
      const formData = new FormData();
      
      // Convertir la base64 en blob
      const byteCharacters = atob(audio.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/webm' });
      
      formData.append('file', blob, 'audio.webm');
      formData.append('model', 'whisper-1');

      console.log("Envoi de l'audio à OpenAI pour transcription...");

      const transcriptResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: formData,
      });

      if (!transcriptResponse.ok) {
        const errorData = await transcriptResponse.json();
        console.error("Erreur de transcription:", errorData);
        throw new Error(`Erreur de transcription: ${errorData.error?.message || transcriptResponse.statusText}`);
      }

      const { text: transcribedText } = await transcriptResponse.json();
      console.log("Texte transcrit:", transcribedText);
      
      // Envoi du texte transcrit à l'API ChatGPT avec contexte sur chargeurs.ch
      return await processText(transcribedText);
    } else {
      // Traitement direct du texte
      console.log("Traitement direct du texte:", prompt);
      return await processText(prompt);
    }
  } catch (error) {
    console.error("Erreur:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function processText(text) {
    try {
      console.log("Traitement du texte par ChatGPT:", text);
      
      // Requête ChatGPT avec contexte sur chargeurs.ch
      const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Tu es l'assistant virtuel de chargeurs.ch, une entreprise spécialisée dans les solutions de recharge pour véhicules électriques. 
              Tu dois aider les utilisateurs avec leurs questions concernant:
              - Les produits de recharge résidentiels, entreprises et publiques
              - Les services d'installation et de maintenance 
              - Les accessoires 
              - Les abonnements pour clients
              - Les locations de power banks
              - L'assistance concernant les bornes de recharge
              Réponds de manière précise, concise et conviviale. Utilise toujours le français. Sois poli et chaleureux.`
            },
            { role: 'user', content: text }
          ],
          max_tokens: 1000,
        }),
      });

      if (!chatResponse.ok) {
        const errorData = await chatResponse.json();
        console.error("Erreur ChatGPT:", errorData);
        throw new Error(`Erreur ChatGPT: ${errorData.error?.message || chatResponse.statusText}`);
      }

      const chatData = await chatResponse.json();
      const textResponse = chatData.choices[0].message.content;
      console.log("Réponse textuelle générée:", textResponse.substring(0, 100) + "...");
      
      // Maintenant, convertir cette réponse en audio avec TTS
      console.log("Conversion en audio avec TTS...");
      const ttsResponse = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          voice: 'alloy',
          input: textResponse,
        }),
      });

      if (!ttsResponse.ok) {
        const errorData = await ttsResponse.json();
        console.error("Erreur TTS:", errorData);
        throw new Error(`Erreur TTS: ${errorData.error?.message || ttsResponse.statusText}`);
      }

      // Convertir l'audio en base64
      const audioBuffer = await ttsResponse.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
      console.log("Audio généré avec succès");

      return new Response(
        JSON.stringify({ 
          text: textResponse, 
          audio: `data:audio/mp3;base64,${base64Audio}` 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error("Erreur de traitement:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
});
