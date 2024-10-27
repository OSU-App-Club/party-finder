import { useQuery } from '@tanstack/react-query';
import eventMarkers from './mock-data/eventMarkers.json';

const fetchCloseParties = async (latitude: number, longitude: number, radius: number) => {
  // This is how we will mock data fetching until our backend team is ready
  return Promise.resolve(eventMarkers.markers as Party[]);
};

export const useFetchCloseParties = (latitude: number, longitude: number, radius: number) => {
  return useQuery({
    queryKey: ['parties', latitude, longitude, radius],
    queryFn: () => fetchCloseParties(latitude, longitude, radius),
  });
};

export interface Ticket {
  id: number;
  userId: number;
  partyId: number;
  paid: boolean;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  dateOfBirth: Date;
  isAdmin: boolean;
  campus: 'OregonStateUniversity';
  ownedParties: Party[];
  tickets: Ticket[];
}

export interface Party {
  id: number;
  type: 'private' | 'public';
  startDate: string;
  endDate: string;
  entryCost: number;
  title: string;
  description: string;
  adminId: number;
  location: Coordinate;
  attendees: User[];
}

export interface PartyData {
  markers: Party[];
}
