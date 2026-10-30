
import type { Activity } from "../types/Activity";
import activityData from "../data/activities";

let activities: Activity[] = [...activityData];

// READ all activities
function getActivities(): Activity[] {
  return [...activities];
}

// READ one activity
function getActivityById(id: number): Activity | undefined {
  return activities.find((activity) => activity.id === id);
}

// CREATE an activity
function createActivity(activity: Activity): void {
  activities = [...activities, activity];
}

// UPDATE an activity
function updateActivity(updatedActivity: Activity): void {
  activities = activities.map((activity) =>
    activity.id === updatedActivity.id
      ? updatedActivity
      : activity
  );
}

// DELETE an activity
function deleteActivity(id: number): void {
  activities = activities.filter(
    (activity) => activity.id !== id
  );
}

export {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
