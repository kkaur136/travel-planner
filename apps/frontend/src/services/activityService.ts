import * as activityRepository from "../repositories/activityRepository";
import type { ActivityInput } from "../types/Activity";

export function getActivities() {
    return activityRepository.getActivities();
}

export function getDestinations() {
    return activityRepository.getDestinations();
}

export function addActivity(activity: ActivityInput) {
    return activityRepository.addActivity(activity);
}

export function updateActivity(
    id: number,
    activity: ActivityInput
) {
    return activityRepository.updateActivity(id, activity);
}

export function removeActivity(id: number) {
    return activityRepository.removeActivity(id);
}
