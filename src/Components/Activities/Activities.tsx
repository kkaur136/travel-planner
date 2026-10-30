
import type { Dispatch, SetStateAction } from "react";
import "./Activities.css";

import ActivityForm from "./ActivityForm";
import ActivityItem from "./ActivityItem";
import useActivities from "../../hooks/useActivities";

type ActivitiesProps = {
  sharedCount: number;
  setSharedCount: Dispatch<SetStateAction<number>>;
};

const destinations = [
  { id: 1, city: "Paris", country: "France" },
  { id: 2, city: "Nice", country: "France" },
  { id: 3, city: "Lyon", country: "France" },
  { id: 4, city: "Bordeaux", country: "France" },
  { id: 5, city: "Marseille", country: "France" },
  { id: 6, city: "Toulouse", country: "France" },
  { id: 7, city: "Strasbourg", country: "France" },
  { id: 8, city: "Lille", country: "France" },
  { id: 9, city: "Nantes", country: "France" },
  { id: 10, city: "Montpellier", country: "France" },
];

/**
 * Activities is the presentation component.
 *
 * It uses the useActivities hook to display activities
 * and respond when the user adds or removes an activity.
 *
 * The hook calls the Activity service, which handles
 * business rules and uses the Activity repository for data.
 *
 * This separates presentation, business and data-access logic.
 */
function Activities({
  sharedCount,
  setSharedCount,
}: ActivitiesProps) {
  const {
    activities,
    handleAddActivity,
    handleRemoveActivity,
  } = useActivities();

  return (
    <section className="activities">
      <h2>Plan Your Activities</h2>

      <p className="activities-intro">
        Add activities for your trip and view them by destination.
      </p>

      <div className="activities-shared">
        <p>Shared Count: {sharedCount}</p>

        <button
          type="button"
          onClick={() => setSharedCount(sharedCount + 1)}
        >
          Increase Shared Count
        </button>

        <button
          type="button"
          onClick={() => setSharedCount(sharedCount - 1)}
        >
          Decrease Shared Count
        </button>
      </div>

      <ActivityForm
        destinations={destinations}
        onAddActivity={handleAddActivity}
      />

      <h2>Activities by Destination</h2>

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
