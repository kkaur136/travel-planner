
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

    function addDestination(event: React.FormEvent) {
    event.preventDefault();
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
                    onClick={() => handleRemoveDestination(destination.id)}
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
