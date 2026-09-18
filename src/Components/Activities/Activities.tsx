function Activities() {
  const activities = [
    {
      id: 1,
      name: "Hiking",
      location: "Banff National Park",
      duration: "3 hours",
    },
    {
      id: 2,
      name: "Kayaking",
      location: "Lake Louise",
      duration: "2 hours",
    },
    {
      id: 3,
      name: "Gondola Ride",
      location: "Banff",
      duration: "1 hour",
    },
    {
      id: 4,
      name: "Sightseeing",
      location: "Downtown Banff",
      duration: "2 hours",
    },
  ];

  return (
    <section className="activities">
      <h2>Travel Activities</h2>

      <p>Explore activities you can enjoy during your trip.</p>

      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <h3>{activity.name}</h3>
            <p>Location: {activity.location}</p>
            <p>Duration: {activity.duration}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;