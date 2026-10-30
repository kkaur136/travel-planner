
import type { Activity } from "../types/Activity";

import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../repositories/activityRepository";

// Business rule: required fields cannot be empty.
function isActivityValid(activity: Activity): boolean {
  return (
    activity.name.trim() !== "" &&
    activity.city.trim() !== "" &&
    activity.duration.trim() !== ""
  );
}

function fetchActivities(): Activity[] {
  return getActivities();
}

function fetchActivityById(id: number): Activity | undefined {
  return getActivityById(id);
}

function addActivity(activity: Activity): boolean {
  if (!isActivityValid(activity)) {
    return false;
  }

  createActivity(activity);
  return true;
}

function editActivity(activity: Activity): boolean {
  if (!isActivityValid(activity)) {
    return false;
  }

  updateActivity(activity);
  return true;
}

function removeActivity(id: number): void {
  deleteActivity(id);
}

export {
  isActivityValid,
  fetchActivities,
  fetchActivityById,
  addActivity,
  editActivity,
  removeActivity,
};
