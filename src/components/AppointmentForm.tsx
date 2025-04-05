
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvailableTimeSlot, Appointment } from '@/types/api';

const formSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  establishmentName: z.string().min(2, "Nom d'établissement requis"),
  type: z.enum(["video", "phone"]),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AppointmentFormProps {
  selectedDate: Date | undefined;
  selectedTimeSlot?: AvailableTimeSlot | null;
  onSubmit?: (values: FormValues) => void;
  isSubmitting?: boolean;
  onAppointmentCreated?: (appointment: Appointment) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedDate,
  selectedTimeSlot,
  onSubmit,
  isSubmitting: parentIsSubmitting = false,
  onAppointmentCreated
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      establishmentName: "",
      type: "video",
      notes: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date et un créneau horaire.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Formater les données de rendez-vous pour l'email
      const formattedDate = format(selectedDate, 'EEEE dd MMMM yyyy', { locale: fr });
      
      const emailData = {
        ...values,
        appointmentDate: formattedDate,
        appointmentTime: `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`,
        subject: `Demande de rendez-vous - ${values.establishmentName}`
      };
      
      // Envoyer l'email via la fonction edge
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: emailData
      });
      
      if (error) throw error;
      
      toast({
        title: "Rendez-vous confirmé",
        description: "Votre demande de rendez-vous a été envoyée avec succès. Nous vous contacterons pour confirmation.",
      });
      
      // Créer un mock de rendez-vous pour l'affichage local
      if (onAppointmentCreated) {
        const mockAppointment: Appointment = {
          id: `appointment-${Date.now()}`,
          userId: "mock-user-id",
          userName: values.name,
          userEmail: values.email,
          userPhone: values.phone,
          establishmentName: values.establishmentName,
          date: selectedDate,
          startTime: selectedTimeSlot?.startTime || "00:00",
          endTime: selectedTimeSlot?.endTime || "00:00",
          status: "scheduled",
          notes: values.notes,
          type: values.type,
          createdAt: new Date()
        };
        
        onAppointmentCreated(mockAppointment);
      }
      
      form.reset();
    } catch (error) {
      console.error("Erreur lors de la réservation du rendez-vous:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la réservation du rendez-vous. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
    
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium mb-4">Vos informations</h3>
      
      {selectedDate && selectedTimeSlot ? (
        <div className="mb-6 p-4 bg-blue-50 rounded-md">
          <p className="font-medium">Rendez-vous sélectionné:</p>
          <p>
            {format(selectedDate, 'EEEE dd MMMM yyyy', { locale: fr })} de {selectedTimeSlot.startTime} à {selectedTimeSlot.endTime}
          </p>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-yellow-50 rounded-md">
          <p>Veuillez sélectionner une date et un créneau horaire.</p>
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="vous@exemple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="0612345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="establishmentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de votre établissement</FormLabel>
                <FormControl>
                  <Input placeholder="Bar du Centre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de rendez-vous</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="video">Visioconférence</SelectItem>
                    <SelectItem value="phone">Appel téléphonique</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes ou questions (optionnel)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Partagez vos besoins ou questions que vous aimeriez discuter pendant le rendez-vous" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || parentIsSubmitting || !selectedDate || !selectedTimeSlot}
          >
            {isSubmitting || parentIsSubmitting ? "Réservation en cours..." : "Réserver le rendez-vous"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
