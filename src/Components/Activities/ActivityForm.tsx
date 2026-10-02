import { useState } from "react";

type Destination = {
  id: number;
  city: string;
  country: string;
};

type Activity = {
  id: number;
  name: string;
  city: string;
  duration: string;
};

type ActivityFormProps = {
  destinations: Destination[];
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
};

function ActivityForm({
  destinations,
  activities,
  setActivities,
}: ActivityFormProps) {
  const [destination, setDestination] = useState("");
  const [activityName, setActivityName] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (
      destination === "" ||
      activityName.trim() === "" ||
      duration.trim() === ""
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const newActivity: Activity = {
      id: Date.now(),
      name: activityName,
      city: destination,
      duration: duration,
    };

    setActivities([...activities, newActivity]);

    setDestination("");
    setActivityName("");
    setDuration("");
  }

  return (
    <section>
      <h2>Add Activity</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="destination">Destination:</label>

          <select
            id="destination"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          >
            <option value="">Select a destination</option>

            {destinations.map((destinationItem) => (
              <option
                key={destinationItem.id}
                value={destinationItem.city}
              >
                {destinationItem.city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="activity-name">Activity:</label>

          <input
            id="activity-name"
            type="text"
            value={activityName}
            onChange={(event) => setActivityName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="duration">Duration:</label>

          <input
            id="duration"
            type="text"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Add Activity</button>
      </form>
    </section>
  );
}

export default ActivityForm;
