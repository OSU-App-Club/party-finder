import { User } from './User';

interface Coordinate {
    latitude: number;
    longitude: number;
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
