import type {
    Activity,
    ActivityInput,
    ActivityDestination
} from "../types/Activity";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ACTIVITY_URL = `${
    import.meta.env.VITE_API_URL || "http://localhost:3002"
}/api/activities`;
const DESTINATION_URL = `${API_BASE_URL}/api/destinations`;

export async function getActivities(): Promise<Activity[]> {
    const response = await fetch(ACTIVITY_URL);

    if (!response.ok) {
        throw new Error("Failed to retrieve activities.");
    }

    return response.json();
}

export async function getDestinations(): Promise<ActivityDestination[]> {
    const response = await fetch(DESTINATION_URL);

    if (!response.ok) {
        throw new Error("Failed to retrieve destinations.");
    }

    return response.json();
}

export async function addActivity(
    activity: ActivityInput
): Promise<Activity> {
    const response = await fetch(ACTIVITY_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(activity)
    });

    if (!response.ok) {
        const errorMessage = await response.text();

        console.error("Status:", response.status);
        console.error("Backend response:", errorMessage);

        throw new Error(
            errorMessage || "Failed to add activity."
        );
    }

    return response.json();
}

export async function updateActivity(
    id: number,
    activity: ActivityInput
): Promise<Activity> {
    const response = await fetch(`${ACTIVITY_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(activity)
    });

    if (!response.ok) {
        throw new Error("Failed to update activity.");
    }

    return response.json();
}

export async function removeActivity(id: number): Promise<void> {
    const response = await fetch(`${ACTIVITY_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to remove activity.");
    }
}
