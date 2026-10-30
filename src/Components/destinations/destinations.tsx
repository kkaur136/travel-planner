import { useState } from "react";
import "./destinations.css";
import DestinationForm from "./DestinationForm";
import { useSharedCount } from "../../context/SharedCountContext";

function Destinations() {
    const { sharedCount, setSharedCount } = useSharedCount();

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

import { useDestinationValidation } from "../../hooks/useDestinationValidation";
import "./destinations.css";
import DestinationForm from "./DestinationForm";
import { useDestinations } from "../../hooks/useDestinations";

type DestinationsProps = {
    sharedCount: number;
    setSharedCount: React.Dispatch<React.SetStateAction<number>>;
};
function Destinations({
    sharedCount,
    setSharedCount,
}: DestinationsProps) {

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

    function removeDestination(id: number) {
        const updatedDestinations = destinations.filter(
            (destination) => destination.id !== id
        );

        setDestinations(updatedDestinations);
    }

    return (
        <section className="destinations">
            <h2>Destinations for My France Trip</h2>
            <p>Destinations planned for my France trip.</p>

            <div>
                <p>Shared Count: {sharedCount}</p>

        const {
        destinations,
        city,
        setCity,
        country,
        setCountry,
        error,
        handleAddDestination,
        handleRemoveDestination
    } = useDestinations();

    const { checkDestination } = useDestinationValidation();

    function addDestination(event: React.FormEvent) {
    event.preventDefault();

    if (!checkDestination(city, country)) {
        return;
    }

    handleAddDestination();
}

    return (
    <section className="destinations">
        <h2>Destinations for My France Trip</h2>
        <p>Destinations planned for my France trip.</p>
        <div>
    <p>Shared Count: {sharedCount}</p>

    <button
        type="button"
        onClick={() => setSharedCount(sharedCount + 1)}
    >
        Increase Shared Count
    </button>
</div>

    <DestinationForm
    city={city}
    country={country}
    setCity={setCity}
    setCountry={setCountry}
    addDestination={addDestination}
    error={error}
/>

        <ul>
            {destinations.map((destination) => (
                <li key={destination.id}>
                <h3>{destination.city}</h3>
                <p>{destination.country}</p>

                <button
                    type="button"

                    onClick={() =>
                        setSharedCount(sharedCount + 1)
                    }

                    onClick={() => handleRemoveDestination(destination.id)}

                >
                    Increase Shared Count
                </button>
            </div>

            <DestinationForm
                city={city}
                country={country}
                setCity={setCity}
                setCountry={setCountry}
                addDestination={addDestination}
            />

            <ul>
                {destinations.map((destination) => (
                    <li key={destination.id}>
                        <h3>{destination.city}</h3>
                        <p>{destination.country}</p>

                        <button
                            type="button"
                            onClick={() =>
                                removeDestination(destination.id)
                            }
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Destinations;
