import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import "./Activities.css";
import ActivityForm from "./ActivityForm";
import ActivityItem from "./ActivityItem";

type FeaturePageProps = {
  tripName: string;
  setTripName: Dispatch<SetStateAction<string>>;
};

type Activity = {
  id: number;
  name: string;
  city: string;
  duration: string;
};

function Activities({
  tripName,
  setTripName,
}: FeaturePageProps) {
  const destinations = [
    { id: 1, city: "Paris", country: "France" },
    { id: 2, city: "Nice", country: "France" },
    { id: 3, city: "Lyon", country: "France" },
    { id: 4, city: "Bordeaux", country: "France" },
  ];

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      name: "Eiffel Tower Visit",
      city: "Paris",
      duration: "2 hours",
    },
    {
      id: 2,
      name: "Beach Walk",
      city: "Nice",
      duration: "1 hour",
    },
    {
      id: 3,
      name: "Old Town Tour",
      city: "Lyon",
      duration: "3 hours",
    },
    {
      id: 4,
      name: "Wine Museum Visit",
      city: "Bordeaux",
      duration: "2 hours",
    },
  ]);

  function removeActivity(id: number) {
    setActivities((currentActivities) =>
      currentActivities.filter(
        (activity) => activity.id !== id
      )
    );
  }

  return (
    <section className="activities">
      <h2>Activities for {tripName}</h2>

      <label htmlFor="activity-trip-name">
        Trip Name:
      </label>

      <input
        id="activity-trip-name"
        type="text"
        value={tripName}
        onChange={(event) => setTripName(event.target.value)}
      />

      <ActivityForm
        destinations={destinations}
        activities={activities}
        setActivities={setActivities}
      />

      <h2>Activities by Destination</h2>

      {destinations.map((destination) => {
        const destinationActivities = activities.filter(
          (activity) =>
            activity.city === destination.city
        );

        return (
          <section key={destination.id}>
            <h3>{destination.city}</h3>

            {destinationActivities.length === 0 ? (
              <p>No activities added.</p>
            ) : (
              <ul>
                {destinationActivities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    id={activity.id}
                    name={activity.name}
                    duration={activity.duration}
                    removeActivity={removeActivity}
                  />
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </section>
  );
}

export default Activities;
