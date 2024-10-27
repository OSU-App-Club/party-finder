import { useQuery } from '@tanstack/react-query';
import eventMarkers from './mock-data/eventMarkers.json';
import { Party } from '@/types/Party';

interface PartyData {
    markers: Party[];
}

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
