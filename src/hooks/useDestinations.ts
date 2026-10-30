import { useState } from "react";
import type { Destination } from "../types/Destination";
import {
    getDestinations,
    addNewDestination,
    removeDestination
} from "../services/destinationService";

export function useDestinations() {
    const [destinations, setDestinations] = useState<Destination[]>(
        () => getDestinations()
    );

    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleAddDestination = () => {
    try {
        const newDestination = addNewDestination(city, country);

        setDestinations((previous) => [...previous, newDestination]);

        setCity("");
        setCountry("");
        setError("");
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        }
    }
};
    const handleRemoveDestination = (id: number) => {
    const deleted = removeDestination(id);

    if (deleted) {
        setDestinations((previous) =>
            previous.filter((destination) => destination.id !== id)
        );
    }
};

    return {
        destinations,
        setDestinations,
        city,
        setCity,
        country,
        setCountry,
        error,
        setError,
        handleAddDestination,
        handleRemoveDestination
    };
}