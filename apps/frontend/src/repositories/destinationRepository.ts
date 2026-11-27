import type { Destination } from "../types/Destination";

const API_URL = `${
    import.meta.env.VITE_API_URL || "http://localhost:3002"
}/api/destinations`;

export async function getAllDestinations(): Promise<Destination[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to retrieve destinations.");
    }

    return response.json();
}

export async function createDestination(
    destination: Omit<Destination, "id">
): Promise<Destination> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(destination)
    });

    if (!response.ok) {
        throw new Error("Failed to create destination.");
    }

    return response.json();
}

export async function updateDestination(
    updatedDestination: Destination
): Promise<Destination | undefined> {
    const response = await fetch(
        `${API_URL}/${updatedDestination.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                city: updatedDestination.city,
                country: updatedDestination.country
            })
        }
    );

    if (response.status === 404) {
        return undefined;
    }

    if (!response.ok) {
        throw new Error("Failed to update destination.");
    }

    return response.json();
}

export async function deleteDestination(
    id: number
): Promise<boolean> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (response.status === 404) {
        return false;
    }

    if (!response.ok) {
        throw new Error("Failed to delete destination.");
    }

    return true;
}