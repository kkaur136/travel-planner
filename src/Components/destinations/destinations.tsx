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

    /*
    * Sprint 3 Architecture:
    * This component uses the useDestinations custom hook to manage
    * destination data, form inputs, and add/remove actions.
 
    * The hook calls the Destination Service, which handles validation
    * and business logic. The service communicates with the Destination
    * Repository to access and update destination data.
    
    * This separation keeps the component focused on displaying the UI
    * instead of managing business logic or data storage.
    */

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
    /*
  The DestinationForm receives input values and functions from this
  component, which gets them from the useDestinations hook.

  When the user submits the form, the hook uses the Destination
  Service and Repository to validate and save the new destination.

  This keeps the form focused on user input and displaying errors.
    */
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
                /*
                When the user clicks Remove, the custom hook handles the action.
                The hook calls the Destination Service, which uses the Repository
                to delete the selected destination.

                This keeps data deletion logic outside the UI component.
                */

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
