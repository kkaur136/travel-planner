import { useState, useEffect } from "react";
import type { Destination } from "../types/Destination";
import {
    getDestinations,
    addNewDestination,
    removeDestination,
    editDestination
} from "../services/destinationService";

export function useDestinations() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        const loadDestinations = async () => {
            try {
                const data = await getDestinations();
                setDestinations(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        loadDestinations();
    }, []);

    const handleStartEdit = (destination: Destination) => {
        setEditingId(destination.id);
        setCity(destination.city);
        setCountry(destination.country);
        setError("");
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setCity("");
        setCountry("");
        setError("");
    };

    const handleAddDestination = async () => {
        try {
            if (editingId !== null) {
                const updatedDestination = await editDestination(
                    editingId,
                    city,
                    country
                );

                if (!updatedDestination) {
                    setError("Destination not found.");
                    return;
                }

                setDestinations(previous =>
                    previous.map(destination =>
                        destination.id === editingId
                            ? updatedDestination
                            : destination
                    )
                );
            } else {
                const newDestination = await addNewDestination(
                    city,
                    country
                );

                setDestinations(previous => [
                    ...previous,
                    newDestination
                ]);
            }

            handleCancelEdit();

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const handleRemoveDestination = async (id: number) => {
        try {
            const deleted = await removeDestination(id);

            if (deleted) {
                setDestinations(previous =>
                    previous.filter(destination => destination.id !== id)
                );

                if (editingId === id) {
                    handleCancelEdit();
                }

                setError("");
            } else {
                setError("Destination not found.");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
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
        loading,
        editingId,
        handleStartEdit,
        handleCancelEdit,
        handleAddDestination,
        handleRemoveDestination
    };
}