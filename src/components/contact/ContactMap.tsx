
import React from 'react';
import LeafletMap from '@/components/LeafletMap';
import { Station } from '@/types/api';

interface ContactMapProps {
  location: Station[];
}

const ContactMap = ({ location }: ContactMapProps) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Où nous trouver</h2>
      <div className="h-96 rounded-xl overflow-hidden">
        <LeafletMap 
          stations={location}
          selectedStation={null}
          onStationSelect={() => {}}
          height="100%"
        />
      </div>
    </div>
  );
};

export default ContactMap;
