import "./destinations.css";

function Destinations() {
    const destinations = [
        {
            id: 1,
            city: "Paris",
            country: "France",
        },
        {
            id: 2,
            city: "Nice",
            country: "France",
        },
        {
            id: 3,
            city: "Lyon",
            country: "France",
        },
        {
            id: 4,
            city: "Bordeaux",
            country: "France",
        }
    ];

    return (
        <section className="destinations">
            <h2>Destinations for My France Trip</h2>
            <p>Destinations planned for my France trip.</p>

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