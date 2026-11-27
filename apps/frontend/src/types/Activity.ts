import type { Destination } from "./Destination";
export interface Activity {
    id: number;
    name: string;
    duration: string;
    destinationId: number;
}

export interface ActivityInput {
    name: string;
    duration: string;
    destinationId: number;
}

export type ActivityDestination = Destination;
