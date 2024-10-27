import { Party } from './Party';
import { Ticket } from './Ticket';

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
