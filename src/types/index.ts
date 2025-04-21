
import { Station } from "./api";

export interface NavItem {
  path: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface MainNavItem {
  title: string;
  href: string;
  name?: string;
}

export interface LeafletMapProps {
  stations: Station[];
  selectedStation?: string;
  onMarkerClick: (id: string) => void;
  userPosition: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}

export interface StationSearchProps {
  stationsList: Station[];
  onSelect: (id: string) => void;
}

export interface StationsListProps {
  stationsList: Station[];
  selectedStationId: string | null;
  onSelect: (id: string) => void;
  userPosition: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}
