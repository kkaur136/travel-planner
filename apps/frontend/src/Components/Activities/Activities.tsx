
import "./Activities.css";

import ActivityForm from "./ActivityForm";
import ActivityItem from "./ActivityItem";

import useActivities from "../../hooks/useActivities";
import { useSharedCount } from "../../context/SharedCountContext";
import { destinationsData } from "../../data/destinationsData";

/*
 Sprint 3 Architecture - Activities Feature

 This component is responsible for displaying the Activities page.
 The useActivities hook manages activity state and actions.
 The Activity Service handles validation and business rules.
 The Activity Repository manages activity data.
 Destination test data is imported from a separate file
 instead of being hardcoded in this component.
 SharedCountContext allows the counter to be shared
 between different pages without passing props.
*/

function Activities() {
  // Get activity data and actions from the custom hook.
  const {
    activities,
    handleAddActivity,
    handleRemoveActivity,
  } = useActivities();

  // Get the shared count from Context.
  const { sharedCount, setSharedCount } = useSharedCount();

  // Get destinations from the separate data file.
  const destinations = destinationsData;

  return (
    <section className="activities">
      <h2>Plan Your Activities</h2>

      <p className="activities-intro">
        Add activities for your trip and view them by destination.
      </p>

      {/* Shared count across pages */}
      <div className="activities-shared">
        <p>Shared Count: {sharedCount}</p>

        <button
          type="button"
          onClick={() =>
            setSharedCount((previous) => previous + 1)
          }
        >
          Increase Shared Count
        </button>

        <button
          type="button"
          onClick={() =>
            setSharedCount((previous) => previous - 1)
          }
        >
          Decrease Shared Count
        </button>
      </div>

      {/* Form for adding a new activity */}
      <ActivityForm
        destinations={destinations}
        onAddActivity={handleAddActivity}
      />

      <h2>Activities by Destination</h2>

      <div className="activities-destinations">
        {destinations.map((destination) => {
          // Find activities belonging to this destination.
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
