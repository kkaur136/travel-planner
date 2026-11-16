
import { useState } from "react";
import type { FormEvent } from "react";
import type { Activity } from "../../types/Activity";

type Destination = {
  id: number;
  city: string;
  country: string;
};

type ActivityFormProps = {
  destinations: Destination[];
  onAddActivity: (activity: Activity) => boolean;
};

/**
 * ActivityForm handles user input and displays validation messages.
 *
 * It sends the completed Activity to the parent component.
 * The parent uses the hook and service to add the activity.
 *
 * Business validation is handled by the Activity service.
 */
function ActivityForm({
  destinations,
  onAddActivity,
}: ActivityFormProps) {
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const activity: Activity = {
      id: Date.now(),
      name: name.trim(),
      city: city,
      duration: duration.trim(),
    };

    const added = onAddActivity(activity);

    if (!added) {
      setError("Please complete all required fields.");
      return;
    }

    setCity("");
    setName("");
    setDuration("");
    setError("");
  }

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <h3>Add New Activity</h3>

      <label htmlFor="activity-destination">
        Destination
      </label>

      <select
        id="activity-destination"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      >
        <option value="">Select a destination</option>

        {destinations.map((destination) => (
          <option
            key={destination.id}
            value={destination.city}
          >
            {destination.city}
          </option>
        ))}
      </select>

      <label htmlFor="activity-name">
        Activity Name
      </label>

      <input
        id="activity-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter activity name"
      />

      <label htmlFor="activity-duration">
        Duration
      </label>

      <input
        id="activity-duration"
        type="text"
        value={duration}
        onChange={(event) => setDuration(event.target.value)}
        placeholder="Example: 2 hours"
      />

      {error && <p className="activity-error">{error}</p>}

      <button type="submit">
        Add Activity
      </button>
    </form>
  );
}

export default ActivityForm;
