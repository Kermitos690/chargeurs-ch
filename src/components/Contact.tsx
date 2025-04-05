
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });
      
      if (error) throw error;
      
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h6 className="text-sm uppercase tracking-wider text-primary font-medium mb-2">Contactez-nous</h6>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à passer à la location de powerbanks?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-2 glass-panel rounded-2xl p-6 md:p-8 shadow-elevation animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-semibold mb-6">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-muted-foreground">
                      1000 Lausanne, Suisse
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:chargeurs@proton.me" className="text-primary hover:underline">
                      chargeurs@proton.me
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <a href="tel:+41786336777" className="text-primary hover:underline">
                      +41 78 633 67 77
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-medium mb-4">Heures d'ouverture</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi:</span>
                    <span>08:30 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi:</span>
                    <span>09:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche:</span>
                    <span>Fermé</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8 border border-border/60 shadow-subtle animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h3>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Votre email"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Sujet de votre message"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Votre message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
