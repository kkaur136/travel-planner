import { useActivities } from "../../hooks/useActivities";
import ActivityForm from "./ActivityForm";
import ActivityItem from "./ActivityItem";
import "./Activities.css";

export default function Activities() {
    const {
        activities,
        destinations,
        loading,
        saving,
        error,
        handleAddActivity,
        handleUpdateActivity,
        handleRemoveActivity
    } = useActivities();

    if (loading) {
        return <p>Loading activities...</p>;
    }

    return (
        <section className="activities">
            <h1>Activities</h1>

            {error && <p role="alert">{error}</p>}

            <ActivityForm
                destinations={destinations}
                saving={saving}
                onAddActivity={handleAddActivity}
            />

            <h2>Activities by Destination</h2>

            {destinations.length === 0 && (
                <p>Please add a destination first.</p>
            )}

            {destinations.map((destination) => {
                const destinationActivities = activities.filter(
                    (activity) =>
                        activity.destinationId === destination.id
                );

                return (
                    <div
                        key={destination.id}
                        className="destination-group"
                    >
                        <h2>{destination.name}</h2>

                        {destinationActivities.length === 0 && (
                            <p>No activities added yet.</p>
                        )}

                        {destinationActivities.map((activity) => (
                            <ActivityItem
                                key={activity.id}
                                activity={activity}
                                destinations={destinations}
                                saving={saving}
                                onRemove={handleRemoveActivity}
                                onUpdate={handleUpdateActivity}
                            />
                        ))}
                    </div>
                );
            })}
        </section>
    );
}
