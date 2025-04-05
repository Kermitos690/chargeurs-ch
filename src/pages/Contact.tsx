
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MapPin, Phone, Mail } from 'lucide-react';
import LeafletMap from '@/components/LeafletMap';
import { Station } from '@/types/api';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Adresse email invalide' }),
  subject: z.string().min(5, { message: 'Le sujet doit contenir au moins 5 caractères' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères' }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Envoyer l'email via la fonction edge
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data
      });
      
      if (error) throw error;
      
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      form.reset();
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

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Adresse",
      details: ["1000 Lausanne", "Suisse"]
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Téléphone",
      details: ["+41 78 633 67 77"]
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      details: ["chargeurs@proton.me"]
    }
  ];

  // Définir l'emplacement de l'entreprise pour la carte avec le type correct
  const officeLocation: Station[] = [{
    id: "office",
    name: "chargeurs.ch - Siège",
    location: "1000 Lausanne",
    latitude: 46.519, // Coordonnées pour Lausanne
    longitude: 6.633,
    status: "online", 
    availablePowerBanks: 0,
    totalSlots: 0
  }];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des questions ou des suggestions ? Nous sommes là pour vous aider. Contactez-nous et nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sujet</FormLabel>
                        <FormControl>
                          <Input placeholder="Sujet de votre message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <textarea 
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            rows={5}
                            placeholder="Votre message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
              <div className="bg-accent p-8 rounded-xl h-full">
                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 mt-1">{info.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h3 className="font-semibold text-lg mb-4">Heures d'ouverture</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span>10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span>Fermé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Où nous trouver</h2>
            <div className="h-96 rounded-xl overflow-hidden">
              <LeafletMap 
                stations={officeLocation}
                selectedStation={null}
                onStationSelect={() => {}}
                height="100%"
              />
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Besoin d'un rendez-vous ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Vous préférez discuter directement avec un de nos conseillers ? Prenez rendez-vous pour un appel téléphonique ou une visioconférence.
            </p>
            <Button 
              size="lg" 
              className="rounded-full"
              onClick={() => window.location.href = '/appointment'}
            >
              Prendre rendez-vous
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
