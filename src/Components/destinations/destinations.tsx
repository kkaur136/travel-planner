import "./destinations.css";

function Destinations() {
    const destinations = [
        {
            id: 1,
            city: "Toronto",
            country: "Canada",
        },
        {
            id: 2,
            city: "New York",
            country: "USA",
        },
        {
            id: 3,
            city: "London",
            country: "UK",
        },
    ];

    return (
        <section className="destinations">
            <h2>Destinations</h2>
            <p>Explore destinations for your next trip.</p>

            <ul>
                {destinations.map((destination) => (
                    <li key={destination.id}>
                        <h3>{destination.city}</h3>
                        <p>{destination.country}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Destinations;