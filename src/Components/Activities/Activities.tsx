import type { Dispatch, SetStateAction } from "react";
import "./Activities.css";

type ActivitiesProps = {
  sharedCount: number;
  setSharedCount: Dispatch<SetStateAction<number>>;
};

function Activities({
  sharedCount,
  setSharedCount,
}: ActivitiesProps) {
  const activities = [
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
  ];

  return (
    <section className="activities">
      <h2>Travel Activities</h2>
      <p>Explore fun activities available at each destination.</p>

      <div>
        <p>Shared Count: {sharedCount}</p>

        <button onClick={() => setSharedCount(sharedCount + 1)}>
          Increase Shared Count
        </button>

        <button onClick={() => setSharedCount(sharedCount - 1)}>
          Decrease Shared Count
        </button>
      </div>

      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <h3>{activity.name}</h3>
            <p>{activity.city}</p>
            <p>{activity.duration}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;