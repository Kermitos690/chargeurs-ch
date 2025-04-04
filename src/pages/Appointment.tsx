
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentCalendar from '@/components/AppointmentCalendar';
import { Appointment as AppointmentType, AvailableTimeSlot } from '@/types/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const AppointmentPage = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<AvailableTimeSlot | null>(null);
  
  const handleAppointmentSelected = (date: Date, timeSlot: AvailableTimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };
  
  const handleAppointmentCreated = (appointment: AppointmentType) => {
    setAppointments([...appointments, appointment]);
    toast({
      title: "Rendez-vous confirmé",
      description: `Votre rendez-vous a été réservé avec succès pour le ${appointment.startTime}.`,
    });
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-1 py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Prendre rendez-vous</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Calendrier de disponibilités</h2>
            <AppointmentCalendar 
              selectedDate={selectedDate} 
              onSelectDate={setSelectedDate} 
              appointments={appointments}
              onAppointmentSelected={handleAppointmentSelected}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Formulaire de rendez-vous</h2>
            <AppointmentForm 
              selectedDate={selectedDate} 
              selectedTimeSlot={selectedTimeSlot}
              onAppointmentCreated={handleAppointmentCreated} 
            />
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">À propos de nos rendez-vous</h2>
          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="process">Déroulement</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="py-4">
              <p>Nos rendez-vous de consultation sont conçus pour vous aider à déterminer les meilleures solutions de recharge pour vos besoins spécifiques. Lors de la consultation, nous discuterons de :</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Vos besoins et habitudes de recharge</li>
                <li>Les différentes options de chargeurs disponibles</li>
                <li>L'installation et les exigences techniques</li>
                <li>Les coûts et options de financement</li>
              </ul>
            </TabsContent>
            <TabsContent value="process" className="py-4">
              <ol className="list-decimal pl-6 space-y-2">
                <li>Choisissez une date et une heure de rendez-vous</li>
                <li>Remplissez le formulaire avec vos coordonnées</li>
                <li>Recevez une confirmation par e-mail</li>
                <li>Préparez-vous au rendez-vous en notant vos questions</li>
                <li>Participez à la consultation (en personne ou en ligne)</li>
                <li>Recevez une proposition personnalisée après le rendez-vous</li>
              </ol>
            </TabsContent>
            <TabsContent value="faq" className="py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Combien de temps dure un rendez-vous ?</h3>
                  <p>Généralement, nos consultations durent environ 30 à 45 minutes.</p>
                </div>
                <div>
                  <h3 className="font-medium">Puis-je annuler ou reporter mon rendez-vous ?</h3>
                  <p>Oui, vous pouvez annuler ou reporter jusqu'à 24 heures avant l'heure prévue.</p>
                </div>
                <div>
                  <h3 className="font-medium">Le rendez-vous est-il gratuit ?</h3>
                  <p>Oui, nos consultations initiales sont entièrement gratuites et sans engagement.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppointmentPage;
