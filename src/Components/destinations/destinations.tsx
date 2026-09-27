import { useState } from "react";
import "./destinations.css";

function Destinations() {
    const [destinations, setDestinations] = useState([
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
    ]);

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    function addDestination(event: React.FormEvent) {
    event.preventDefault();

    if (city.trim() === "" || country.trim() === "") {
        return;
    }

    const newDestination = {
        id: Date.now(),
        city: city,
        country: country,
    };

    setDestinations([...destinations, newDestination]);

    setCity("");
    setCountry("");
}

    return (
    <section className="destinations">
        <h2>Destinations for My France Trip</h2>
        <p>Destinations planned for my France trip.</p>

        <form onSubmit={addDestination}>
            <div>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor="country">Country:</label>
                <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                />
            </div>

            <button type="submit">Add Destination</button>
        </form>

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