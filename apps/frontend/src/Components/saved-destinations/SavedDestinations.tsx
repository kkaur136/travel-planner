import "./SavedDestinations.css";
import { useState } from "react";
import type { FormEvent } from "react";

import SavedDestinationForm from "./savedDestinationForm";

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

function SavedDestinations() {
  const { sharedCount, setSharedCount } = useSharedCount();

  const formState = useSavedDestinations();

  const {
    selectedDestination,
    lastVisited,
    rating,
    note,
    error,
    setError,
    resetForm,
  } = formState;

  const {
    savedDestinations,
    refreshSavedDestinations,
    loading,
    listError,
  } = useSavedDestinationList();

  const [saving, setSaving] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [actionError, setActionError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving) return;

    setError("");
    setActionError("");

    const destinationDetails = destinations.find(
      (destination) => destination.name === selectedDestination
    );

    if (!destinationDetails) {
      setError("Please select a destination.");
      return;
    }

    const newSavedDestination = {
      name: destinationDetails.name,
      location: destinationDetails.location,
      lastVisited,
      rating,
      note,
    };

    try {
      setSaving(true);

      await savedDestinationService.add(newSavedDestination);
      await refreshSavedDestinations();

      resetForm();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save destination."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id: number) => {
    if (removingId !== null) return;

    try {
      setRemovingId(id);
      setActionError("");

      await savedDestinationService.remove(id);
      await refreshSavedDestinations();
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to remove destination."
      );
    } finally {
      setRemovingId(null);
    }
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

      {saving && <p>Saving destination...</p>}

      {error && <p role="alert">{error}</p>}

      <h3>My Favourites</h3>

      {actionError && <p role="alert">{actionError}</p>}

      {loading ? (
        <p>Loading saved destinations...</p>
      ) : listError ? (
        <p role="alert">{listError}</p>
      ) : savedDestinations.length === 0 ? (
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
                disabled={removingId !== null}
                onClick={() => void handleRemove(destination.id)}
              >
                {removingId === destination.id
                  ? "Removing..."
                  : "Remove"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SavedDestinations;
