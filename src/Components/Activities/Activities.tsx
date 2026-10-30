import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import "./Activities.css";

import ActivityForm from "./ActivityForm";
import ActivityItem from "./ActivityItem";
import { useSharedCount } from "../../context/SharedCountContext";

import useActivities from "../../hooks/useActivities";
import { destinationsData } from "../../data/destinationsData";

type ActivitiesProps = {
  sharedCount: number;
  setSharedCount: Dispatch<SetStateAction<number>>;
};

/*
 Sprint 3 Architecture:
 The Activities component uses the useActivities hook
 to manage activity state and user actions.

 The hook calls the Activity Service for business logic.
 The service communicates with the Activity Repository
 to access and update activity data.

 Destination test data is imported from a separate file
 instead of being hardcoded in this component.
*/

function Activities() {
  const { sharedCount, setSharedCount } = useSharedCount();

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

function Activities({
  sharedCount,
  setSharedCount,
}: ActivitiesProps) {
  const {
    activities,
    handleAddActivity,
    handleRemoveActivity,
  } = useActivities();

  const destinations = destinationsData;


  return (
    <section className="activities">
      <h2>Plan Your Activities</h2>

      <p className="activities-intro">
        Add activities for your trip and view them by destination.
      </p>

      {/* Shared state from App.tsx */}
      <div className="activities-shared">
        <p>Shared Count: {sharedCount}</p>

        <button
          type="button"

          onClick={() =>
            setSharedCount((previous) => previous + 1)
          }

          onClick={() => setSharedCount((count) => count + 1)}
          
        >
          Increase Shared Count
        </button>

        <button
          type="button"

          onClick={() =>
            setSharedCount((previous) => previous - 1)
          }

          onClick={() => setSharedCount((count) => count - 1)}

        >
          Decrease Shared Count
        </button>
      </div>

      {/* Form for adding activities */}
      <ActivityForm
        destinations={destinations}
        onAddActivity={handleAddActivity}
      />

      <h2>Activities by Destination</h2>

      {destinations.map((destination) => {
        const destinationActivities = activities.filter(
          (activity) => activity.city === destination.city
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

      <div className="activities-destinations">
        {destinations.map((destination) => {
          const destinationActivities = activities.filter(
            (activity) => activity.city === destination.city
          );

          return (
            <section
              key={destination.id}
              className="activities-destination"
            >
              <h3>
                {destination.city}, {destination.country}
              </h3>

              {destinationActivities.length === 0 ? (
                <p>No activities added yet.</p>
              ) : (
                <ul className="activities-list">
                  {destinationActivities.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      id={activity.id}
                      name={activity.name}
                      duration={activity.duration}
                      removeActivity={handleRemoveActivity}
                    />
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

    </section>
  );
}

export default Activities;
