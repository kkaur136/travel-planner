
import type { FormEvent } from "react";
import { useSavedDestinationContext } from "../../context/SavedDestinationContext";

type Destination = {
  id: number;
  name: string;
};

type SavedDestinationFormProps = {
  destinations: Destination[];
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

/**
 * Displays the Saved Destination form.
 * Reads shared presentation state from Context.
 * Validation and data operations are handled by the parent
 * component through the service layer.
 */
function SavedDestinationForm({
  destinations,
  handleSubmit,
}: SavedDestinationFormProps) {
  const {
    selectedDestination,
    setSelectedDestination,
    lastVisited,
    setLastVisited,
    rating,
    setRating,
    note,
    setNote,
    error,
  } = useSavedDestinationContext();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="destination">Destination:</label>
        <select
          id="destination"
          value={selectedDestination}
          onChange={(event) =>
            setSelectedDestination(event.target.value)
          }
        >
          <option value="">Select a destination</option>
          {destinations.map((destination) => (
            <option key={destination.id} value={destination.name}>
              {destination.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="lastVisited">Last Visited:</label>
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
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(event) =>
            setRating(event.target.value)
          }
        >
          <option value="">Select a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div>
        <label htmlFor="note">Personal Note:</label>
        <textarea
          id="note"
          value={note}
          onChange={(event) =>
            setNote(event.target.value)
          }
          placeholder="Add a note about this destination"
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit">Save to Favourites</button>
    </form>
  );
}

export default SavedDestinationForm;
