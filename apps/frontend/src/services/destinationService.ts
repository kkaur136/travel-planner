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

export async function getDestinations(): Promise<Destination[]> {
    return getAllDestinations();
}

export async function addNewDestination(
    city: string,
    country: string
): Promise<Destination> {
    const validationError = validateDestination(city, country);

    if (validationError) {
        throw new Error(validationError);
    }

    return createDestination({
        city: city.trim(),
        country: country.trim()
    });
}

export async function editDestination(
    id: number,
    city: string,
    country: string
): Promise<Destination | undefined> {
    const validationError = validateDestination(city, country);

    if (validationError) {
        throw new Error(validationError);
    }

    return updateDestination({
        id,
        city: city.trim(),
        country: country.trim()
    });
}

export async function removeDestination(
    id: number
): Promise<boolean> {
    return deleteDestination(id);
}