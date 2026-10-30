
import { useEffect, useState } from "react";
import type { Activity } from "../types/Activity";

import {
  fetchActivities,
  addActivity,
  removeActivity,
} from "../services/activityService";

/**
 * useActivities
 *
 * Returns:
 * activities - Activities currently displayed on the page.
 * handleAddActivity - Adds an activity and refreshes the list.
 * handleRemoveActivity - Removes an activity and refreshes the list.
 *
 * The hook manages presentation state.
 * Business rules are handled by the Activity service.
 */
function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  function loadActivities() {
    setActivities(fetchActivities());
  }

  function handleAddActivity(activity: Activity): boolean {
    const added = addActivity(activity);

    if (added) {
      loadActivities();
    }

    return added;
  }

  function handleRemoveActivity(id: number) {
    removeActivity(id);
    loadActivities();
  }

  useEffect(() => {
    loadActivities();
  }, []);

  return {
    activities,
    handleAddActivity,
    handleRemoveActivity,
  };
}

export default useActivities;
