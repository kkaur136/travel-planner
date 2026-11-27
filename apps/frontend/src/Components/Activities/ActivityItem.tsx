import { useState } from "react";
import type { FormEvent } from "react";

import type {
    Activity,
    ActivityInput,
    ActivityDestination
} from "../../types/Activity";

interface ActivityItemProps {
    activity: Activity;
    destinations: ActivityDestination[];
    saving: boolean;
    onRemove: (id: number) => Promise<void>;
    onUpdate: (
        id: number,
        activity: ActivityInput
    ) => Promise<boolean>;
}

export default function ActivityItem({
    activity,
    destinations,
    saving,
    onRemove,
    onUpdate
}: ActivityItemProps) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(activity.name);
    const [duration, setDuration] = useState(activity.duration);

    const [destinationId, setDestinationId] =
        useState(String(activity.destinationId));

    const [error, setError] = useState("");

    function startEditing() {
        setName(activity.name);
        setDuration(activity.duration);
        setDestinationId(String(activity.destinationId));
        setError("");
        setEditing(true);
    }

    async function handleUpdate(event: FormEvent<HTMLFormElement>) {
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

        const success = await onUpdate(activity.id, {
            name: name.trim(),
            duration: duration.trim(),
            destinationId: Number(destinationId)
        });

        if (success) {
            setEditing(false);
        }
    }

    return (
        <div className="activity-item">
            {editing ? (
                <form onSubmit={handleUpdate}>
                    <label>
                        Activity Name
                        <input
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                            minLength={3}
                        />
                    </label>

                    <label>
                        Duration
                        <input
                            value={duration}
                            onChange={(event) =>
                                setDuration(event.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Destination
                        <select
                            value={destinationId}
                            onChange={(event) =>
                                setDestinationId(event.target.value)
                            }
                            required
                        >
                            {destinations.map((destination) => (
                                <option
                                    key={destination.id}
                                    value={destination.id}
                                >
                                    {destination.city}, {destination.country}
                                </option>
                            ))}
                        </select>
                    </label>

                    {error && <p role="alert">{error}</p>}

                    <button type="submit" disabled={saving}>
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={() => setEditing(false)}
                        disabled={saving}
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <>
                    <h3>{activity.name}</h3>
                    <p>Duration: {activity.duration}</p>

                    <button
                        type="button"
                        onClick={startEditing}
                        disabled={saving}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => onRemove(activity.id)}
                        disabled={saving}
                    >
                        Remove
                    </button>
                </>
            )}
        </div>
    );
}
