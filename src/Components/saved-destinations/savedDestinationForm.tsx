import type {
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";

type Destination = {
  id: number;
  name: string;
};

type SavedDestinationFormProps = {
  destinations: Destination[];

  selectedDestination: string;
  setSelectedDestination: Dispatch<SetStateAction<string>>;

  lastVisited: string;
  setLastVisited: Dispatch<SetStateAction<string>>;

  rating: string;
  setRating: Dispatch<SetStateAction<string>>;

  note: string;
  setNote: Dispatch<SetStateAction<string>>;

  error: string;

  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function SavedDestinationForm({
  destinations,
  selectedDestination,
  setSelectedDestination,
  lastVisited,
  setLastVisited,
  rating,
  setRating,
  note,
  setNote,
  error,
  handleSubmit,
}: SavedDestinationFormProps) {
  return (
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
  );
}

export default SavedDestinationForm;