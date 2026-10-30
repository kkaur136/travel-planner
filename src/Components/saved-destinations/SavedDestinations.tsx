
import { useState } from "react";
import type {
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";

import SavedDestinationForm from "./savedDestinationForm";

import type { SavedDestination } from "../../types/SavedDestination";

import {
  getSavedDestinations,
  createSavedDestination,
  deleteSavedDestination,
} from "../../repositories/savedDestinationRepository";

const destinations = [
  {
    id: 1,
    name: "Banff National Park",
    location: "Alberta, Canada",
    description:
      "A beautiful destination known for mountains, lakes, and outdoor activities.",
  },
  {
    id: 2,
    name: "Paris",
    location: "France",
    description:
      "A popular destination known for the Eiffel Tower, museums, and historic streets.",
  },
  {
    id: 3,
    name: "Tokyo",
    location: "Japan",
    description:
      "A vibrant city known for technology, culture, food, and famous attractions.",
  },
];

type SavedDestinationsProps = {
  sharedCount: number;
  setSharedCount: Dispatch<SetStateAction<number>>;
};

/**
 * Saved Destinations component.
 *
 * Displays saved destinations and the form for adding favourites.
 * Uses repository methods for reading, creating, and deleting
 * saved destination records.
 *
 * In the next refactoring stage, presentation state will move
 * into a custom hook and validation into a service.
 */
function SavedDestinations({
  sharedCount,
  setSharedCount,
}: SavedDestinationsProps) {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [lastVisited, setLastVisited] = useState("");
  const [rating, setRating] = useState("");
  const [note, setNote] = useState("");

  const [savedDestinations, setSavedDestinations] = useState<
    SavedDestination[]
  >(() => getSavedDestinations());

  const [error, setError] = useState("");

  const refreshSavedDestinations = () => {
    setSavedDestinations(getSavedDestinations());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedDestination) {
      setError("Please select a destination.");
      return;
    }

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    const alreadySaved = getSavedDestinations().some(
      (destination) => destination.name === selectedDestination
    );

    if (alreadySaved) {
      setError("This destination is already in your favourites.");
      return;
    }

    const destinationDetails = destinations.find(
      (destination) => destination.name === selectedDestination
    );

    if (!destinationDetails) {
      setError("Destination could not be found.");
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

    createSavedDestination(newSavedDestination);
    refreshSavedDestinations();

    setSelectedDestination("");
    setLastVisited("");
    setRating("");
    setNote("");
    setError("");
  };

  const handleRemove = (id: number) => {
    deleteSavedDestination(id);
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
          onClick={() => setSharedCount(sharedCount + 1)}
        >
          Increase Shared Count
        </button>

        <button
          type="button"
          onClick={() => setSharedCount(sharedCount - 1)}
        >
          Decrease Shared Count
        </button>
      </div>

      <h3>Add to Favourites</h3>

      <SavedDestinationForm
        destinations={destinations}
        selectedDestination={selectedDestination}
        setSelectedDestination={setSelectedDestination}
        lastVisited={lastVisited}
        setLastVisited={setLastVisited}
        rating={rating}
        setRating={setRating}
        note={note}
        setNote={setNote}
        error={error}
        handleSubmit={handleSubmit}
      />

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
