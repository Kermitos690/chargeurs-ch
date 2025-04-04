
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isAfter, isBefore, addWeeks } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { AvailableTimeSlot, Appointment } from "@/types/api";
import { Clock } from "lucide-react";

// Mock de créneaux disponibles (à remplacer par des données réelles)
const generateMockTimeSlots = (date: Date): AvailableTimeSlot[] => {
  // Simuler des créneaux pour la journée sélectionnée
  const slots: AvailableTimeSlot[] = [];
  
  // Heures disponibles: 9h-12h et 14h-17h
  const morningHours = [9, 10, 11];
  const afternoonHours = [14, 15, 16];
  
  // Générer des créneaux de 20 minutes
  [...morningHours, ...afternoonHours].forEach(hour => {
    [0, 20, 40].forEach(minute => {
      slots.push({
        id: `${date.toISOString()}-${hour}-${minute}`,
        date: date,
        startTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        endTime: minute === 40 
          ? `${(hour + 1).toString().padStart(2, '0')}:00` 
          : `${hour.toString().padStart(2, '0')}:${(minute + 20).toString().padStart(2, '0')}`,
        isAvailable: Math.random() > 0.3 // Simuler des créneaux déjà pris (30% indisponibles)
      });
    });
  });
  
  return slots;
};

interface AppointmentCalendarProps {
  onAppointmentSelected: (date: Date, timeSlot: AvailableTimeSlot) => void;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ 
  onAppointmentSelected 
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<AvailableTimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<AvailableTimeSlot | null>(null);
  
  // Fonction pour déterminer les jours désactivés (weekends et jours passés)
  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    // Désactiver samedi et dimanche
    if (day === 0 || day === 6) return true;
    // Désactiver les jours passés
    if (isBefore(date, today) && !isSameDay(date, today)) return true;
    // Désactiver les jours au-delà de 2 semaines
    if (isAfter(date, addWeeks(today, 2))) return true;
    
    return false;
  };
  
  // Helper pour comparer deux dates (seulement jour/mois/année)
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  };
  
  // Quand une date est sélectionnée, charger les créneaux disponibles
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    
    if (date) {
      // Ici, vous feriez un appel API pour obtenir les créneaux réels
      const slots = generateMockTimeSlots(date);
      setAvailableTimeSlots(slots);
    } else {
      setAvailableTimeSlots([]);
    }
  };
  
  const handleTimeSlotSelect = (timeSlot: AvailableTimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    if (selectedDate) {
      onAppointmentSelected(selectedDate, timeSlot);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-4">Sélectionner une date</h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={isDateDisabled}
          locale={fr}
          fromDate={today}
          toDate={addWeeks(today, 2)}
          className="rounded-md border p-3 pointer-events-auto"
        />
      </div>
      
      {selectedDate && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">
            Créneaux disponibles pour le {format(selectedDate, 'EEEE dd MMMM yyyy', { locale: fr })}
          </h3>
          
          {availableTimeSlots.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Chargement des créneaux...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableTimeSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                  disabled={!slot.isAvailable}
                  className={`flex items-center justify-center ${!slot.isAvailable ? 'opacity-50' : ''}`}
                  onClick={() => slot.isAvailable && handleTimeSlotSelect(slot)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  <span>
                    {slot.startTime} - {slot.endTime}
                  </span>
                </Button>
              ))}
            </div>
          )}
          
          {availableTimeSlots.every(slot => !slot.isAvailable) && (
            <p className="text-center text-yellow-600 mt-4">
              Tous les créneaux sont pris pour cette journée. Veuillez sélectionner une autre date.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
