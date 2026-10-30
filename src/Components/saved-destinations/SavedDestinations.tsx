import "./SavedDestinations.css";
import type { FormEvent } from "react";

import SavedDestinationForm from "./savedDestinationForm";
import type { SavedDestination } from "../../types/SavedDestination";

import { useSavedDestinations } from "../../hooks/useSavedDestinations";
import { useSavedDestinationList } from "../../hooks/useSavedDestinationList";

import { savedDestinationService } from "../../services/savedDestinationService";
import { SavedDestinationContext } from "../../context/SavedDestinationContext";
import { useSharedCount } from "../../context/SharedCountContext";

const destinations = [
  {
    id: 1,
    name: "Banff National Park",
    location: "Alberta, Canada",
  },
  {
    id: 2,
    name: "Paris",
    location: "France",
  },
  {
    id: 3,
    name: "Tokyo",
    location: "Japan",
  },
];

/**
 * Saved Destinations component.
 *
 * Presentation: Displays the form and saved destinations.
 * Hook: Manages form state and error messages.
 * List Hook: Retrieves saved destinations through the service.
 * Context: Shares form state with the form component.
 * Service: Handles validation and business rules.
 * Repository: Handles CRUD operations and data storage.
 * SharedCountContext: Shares counter state across feature pages.
 */
function SavedDestinations() {
  const { sharedCount, setSharedCount } = useSharedCount();

  const formState = useSavedDestinations();

  const {
    selectedDestination,
    lastVisited,
    rating,
    note,
    setError,
    resetForm,
  } = formState;

  const {
    savedDestinations,
    refreshSavedDestinations,
  } = useSavedDestinationList();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const destinationDetails = destinations.find(
      (destination) => destination.name === selectedDestination
    );

    if (!destinationDetails) {
      setError("Please select a destination.");
      return;
    }

    const newSavedDestination: SavedDestination = {
      id: Date.now(),
      name: destinationDetails.name,
      location: destinationDetails.location,
      lastVisited,
      rating,
      note,
    };

    try {
      savedDestinationService.add(newSavedDestination);
      refreshSavedDestinations();
      resetForm();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save destination."
      );
    }
  };

  const handleRemove = (id: number) => {
    savedDestinationService.remove(id);
    refreshSavedDestinations();
  };

  return (
    <section className="saved-destinations">
      <h2>Saved Destinations</h2>

      <p>
        Save your favourite destinations and add personal details.
      </p>

      <div>
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

      <h3>Add to Favourites</h3>

      <SavedDestinationContext.Provider value={formState}>
        <SavedDestinationForm
          destinations={destinations}
          handleSubmit={handleSubmit}
        />
      </SavedDestinationContext.Provider>

      <h3>My Favourites</h3>

      {savedDestinations.length === 0 ? (
        <p>No favourite destinations saved yet.</p>
      ) : (
        <ul className="saved-destinations__list">
          {savedDestinations.map((destination) => (
            <li
              key={destination.id}
              className="saved-destinations__item"
            >
              <h3>{destination.name}</h3>

              <p>Location: {destination.location}</p>

              <p>
                Last Visited:{" "}
                {destination.lastVisited || "Not provided"}
              </p>

              <p>Rating: {destination.rating}/5</p>

              <p>
                Personal Note:{" "}
                {destination.note || "No note provided"}
              </p>

              <button
                type="button"
                onClick={() => handleRemove(destination.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SavedDestinations;
