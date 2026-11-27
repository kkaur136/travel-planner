import { useState } from "react";
import type { FormEvent } from "react";

import type {
    ActivityInput,
    ActivityDestination
} from "../../types/Activity";

interface ActivityFormProps {
    destinations: ActivityDestination[];
    saving: boolean;
    onAddActivity: (activity: ActivityInput) => Promise<boolean>;
}

export default function ActivityForm({
    destinations,
    saving,
    onAddActivity
}: ActivityFormProps) {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [destinationId, setDestinationId] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (
            name.trim().length < 3 ||
            duration.trim() === "" ||
            destinationId === ""
        ) {
            setError("Please enter valid activity details.");
            return;
        }

        const success = await onAddActivity({
            name: name.trim(),
            duration: duration.trim(),
            destinationId: Number(destinationId)
        });

        if (success) {
            setName("");
            setDuration("");
            setDestinationId("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="activity-form">
            <h2>Add Activity</h2>

            <label htmlFor="activity-name">Activity Name</label>
            <input
                id="activity-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={3}
            />

            <label htmlFor="activity-duration">Duration</label>
            <input
                id="activity-duration"
                type="text"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                placeholder="Example: 2 hours"
                required
            />

            <label htmlFor="activity-destination">Destination</label>
            <select
                id="activity-destination"
                value={destinationId}
                onChange={(event) =>
                    setDestinationId(event.target.value)
                }
                required
            >
                <option value="">Select a destination</option>

                {destinations.map((destination) => (
                    <option
                        key={destination.id}
                        value={destination.id}
                    >
                        {destination.city}, {destination.country}
                    </option>
                ))}
            </select>

            {error && <p role="alert">{error}</p>}

            <button
                type="submit"
                disabled={saving || destinations.length === 0}
            >
                {saving ? "Saving..." : "Add Activity"}
            </button>
        </form>
    );
}
