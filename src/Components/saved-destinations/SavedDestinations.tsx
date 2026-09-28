import type { Dispatch, SetStateAction } from "react";

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

function SavedDestinations({
  sharedCount,
  setSharedCount,
}: SavedDestinationsProps) {
  return (
    <section className="saved-destinations">
      <h2>Saved Destinations</h2>
      <p>View the destinations you have saved for future trips.</p>

      <div>
        <p>Shared Count: {sharedCount}</p>

        <button onClick={() => setSharedCount(sharedCount + 1)}>
          Increase Shared Count
        </button>

        <button onClick={() => setSharedCount(sharedCount - 1)}>
          Decrease Shared Count
        </button>
      </div>

      <ul className="saved-destinations__list">
        {destinations.map((destination) => (
          <li
            key={destination.id}
            className="saved-destinations__item"
          >
            <h3>{destination.name}</h3>

            <p className="saved-destinations__location">
              Location: {destination.location}
            </p>

            <p className="saved-destinations__description">
              {destination.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SavedDestinations;