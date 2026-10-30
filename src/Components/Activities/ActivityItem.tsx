type ActivityItemProps = {
  id: number;
  name: string;
  duration: string;
  removeActivity: (id: number) => void;
};

/**
 * ActivityItem displays one activity.
 *
 * The Remove button calls the function passed by Activities.
 * The parent uses the hook, service and repository
 * to remove the selected activity.
 */
function ActivityItem({
  id,
  name,
  duration,
  removeActivity,
}: ActivityItemProps) {
  return (
    <li className="activity-item">
      <div className="activity-item-details">
        <h4>{name}</h4>
        <p>Duration: {duration}</p>
      </div>

      <button
        type="button"
        className="activity-remove"
        onClick={() => removeActivity(id)}
      >
        Remove
      </button>
    </li>
  );
}

export default ActivityItem;
