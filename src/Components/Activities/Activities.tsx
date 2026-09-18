import "./activities.css";

function Activities() {
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
        }
    ];

    return (
        <section className="activities">
            <h2>Travel Activities</h2>
            <p>Explore fun activities available at each destination.</p>

            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        <h3>{activity.name}</h3>
                        <p>City: {activity.city}</p>
                        <p>Duration: {activity.duration}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Activities;