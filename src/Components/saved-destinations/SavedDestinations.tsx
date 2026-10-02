import { useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";

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

type SavedDestination = {
  id: number;
  name: string;
  location: string;
  lastVisited: string;
  rating: string;
  note: string;
};

type SavedDestinationsProps = {
  sharedCount: number;
  setSharedCount: Dispatch<SetStateAction<number>>;
};

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
  >([]);

  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation
    if (!selectedDestination) {
      setError("Please select a destination.");
      return;
    }

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    // Prevent duplicate favourites
    const alreadySaved = savedDestinations.some(
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

    setSavedDestinations([
      ...savedDestinations,
      newSavedDestination,
    ]);

    // Clear the form
    setSelectedDestination("");
    setLastVisited("");
    setRating("");
    setNote("");
    setError("");
  };

  const handleRemove = (id: number) => {
    setSavedDestinations(
      savedDestinations.filter(
        (destination) => destination.id !== id
      )
    );
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

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="destination">
            Destination:
          </label>

          <select
            id="destination"
            value={selectedDestination}
            onChange={(event) =>
              setSelectedDestination(event.target.value)
            }
          >
            <option value="">
              Select a destination
            </option>

            {destinations.map((destination) => (
              <option
                key={destination.id}
                value={destination.name}
              >
                {destination.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lastVisited">
            Last Visited:
          </label>

          <input
            id="lastVisited"
            type="date"
            value={lastVisited}
            onChange={(event) =>
              setLastVisited(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="rating">
            Rating:
          </label>

          <select
            id="rating"
            value={rating}
            onChange={(event) =>
              setRating(event.target.value)
            }
          >
            <option value="">
              Select a rating
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
          <label htmlFor="note">
            Personal Note:
          </label>

          <textarea
            id="note"
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            placeholder="Add a note about this destination"
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">
          Save to Favourites
        </button>
      </form>

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

              <p>
                Location: {destination.location}
              </p>

              <p>
                Last Visited:{" "}
                {destination.lastVisited || "Not provided"}
              </p>

              <p>
                Rating: {destination.rating}/5
              </p>

              <p>
                Personal Note:{" "}
                {destination.note || "No note provided"}
              </p>

              <button
                type="button"
                onClick={() =>
                  handleRemove(destination.id)
                }
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