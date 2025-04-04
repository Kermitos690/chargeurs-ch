
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentCalendar from '@/components/AppointmentCalendar';
import AppointmentForm from '@/components/AppointmentForm';
import { AvailableTimeSlot, Appointment } from '@/types/api';
import { toast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

const Appointment = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<AvailableTimeSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAppointmentSelected = (date: Date, timeSlot: AvailableTimeSlot) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
  };

  const handleFormSubmit = async (formData: any) => {
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
      // Simuler un appel API pour réserver le rendez-vous
      await new Promise(resolve => setTimeout(resolve, 1500));

      // En conditions réelles, vous feriez un appel API ici
      const appointmentData: Partial<Appointment> = {
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        establishmentName: formData.establishmentName,
        date: selectedDate,
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        status: 'scheduled',
        notes: formData.notes,
        type: formData.type,
      };

      console.log('Rendez-vous créé:', appointmentData);
      
      // Afficher un succès
      setIsSuccess(true);
      toast({
        title: "Rendez-vous confirmé!",
        description: "Vous recevrez un email de confirmation avec les détails de connexion.",
      });

      // Rediriger après quelques secondes
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la réservation. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Rendez-vous confirmé!</h1>
          <p className="text-gray-600 mb-6">
            Votre rendez-vous a été réservé avec succès. Vous recevrez un email de confirmation 
            avec toutes les informations nécessaires pour vous connecter à la visioconférence.
          </p>
          <p className="font-medium">
            Nous vous remercions de votre intérêt et nous avons hâte de discuter de vos besoins.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Prendre rendez-vous</h1>
      <p className="text-gray-600 mb-8">
        Réservez une consultation gratuite de 20 minutes pour discuter de vos besoins pour votre établissement.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AppointmentCalendar onAppointmentSelected={handleAppointmentSelected} />
        <AppointmentForm 
          selectedDate={selectedDate} 
          selectedTimeSlot={selectedTimeSlot}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
      
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-2">À propos de votre consultation gratuite</h3>
        <p className="mb-4">
          Cette consultation de 20 minutes vous permet de discuter avec un expert de vos besoins 
          spécifiques pour votre établissement. Nous pourrons aborder:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Vos besoins en matière de powerbanks</li>
          <li>Le fonctionnement du service de location</li>
          <li>Les avantages pour votre établissement</li>
          <li>Les différentes formules disponibles</li>
          <li>Répondre à toutes vos questions</li>
        </ul>
        <p className="text-sm text-gray-600">
          Note: La confirmation de rendez-vous et les détails de connexion vous seront envoyés par email.
        </p>
      </div>
    </div>
  );
};

export default Appointment;
