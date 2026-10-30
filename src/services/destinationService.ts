import type { Destination } from "../types/Destination";

import {
    getAllDestinations,
    createDestination,
    updateDestination,
    deleteDestination
} from "../repositories/destinationRepository";

export function validateDestination(
    city: string,
    country: string
): string {
    if (city.trim() === "" && country.trim() === "") {
        return "Please enter a city and country.";
    }

    if (city.trim() === "") {
        return "Please enter a city name.";
    }

    if (country.trim() === "") {
        return "Please enter a country name.";
    }

    return "";
}

export function getDestinations(): Destination[] {
    return getAllDestinations();
}

export function addNewDestination(
    city: string,
    country: string
): Destination {
    const validationError = validateDestination(city, country);

    if (validationError) {
        throw new Error(validationError);
    }

    const newDestination: Destination = {
        id: Date.now(),
        city: city.trim(),
        country: country.trim()
    };

    return createDestination(newDestination);
}

export function editDestination(
    id: number,
    city: string,
    country: string
): Destination | undefined {
    const validationError = validateDestination(city, country);

    if (validationError) {
        throw new Error(validationError);
    }

    const updatedDestination: Destination = {
        id: id,
        city: city.trim(),
        country: country.trim()
    };

    return updateDestination(updatedDestination);
}
export function removeDestination(id: number): boolean {
    return deleteDestination(id);
}