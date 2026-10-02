type ActivityItemProps = {
  id: number;
  name: string;
  duration: string;
  removeActivity: (id: number) => void;
};

function ActivityItem({
  id,
  name,
  duration,
  removeActivity,
}: ActivityItemProps) {
  return (
    <li>
      <h4>{name}</h4>
      <p>{duration}</p>

      <button
        type="button"
        onClick={() => removeActivity(id)}
      >
        Remove
      </button>
    </li>
  );
}

export default ActivityItem;
