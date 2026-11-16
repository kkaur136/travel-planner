import type { Destination } from "../types/Destination";
import { destinationsData } from "../data/destinationsData";

let destinations: Destination[] = [...destinationsData];

export function getAllDestinations(): Destination[] {
    return [...destinations];
}

export function createDestination(
    destination: Destination
): Destination {
    destinations.push(destination);
    return destination;
}

export function updateDestination(
    updatedDestination: Destination
): Destination | undefined {
    const index = destinations.findIndex(
        (destination) => destination.id === updatedDestination.id
    );

    if (index === -1) {
        return undefined;
    }

    destinations[index] = updatedDestination;

    return updatedDestination;
}

export function deleteDestination(id: number): boolean {
    const originalLength = destinations.length;

    destinations = destinations.filter(
        (destination) => destination.id !== id
    );

    return destinations.length < originalLength;
}