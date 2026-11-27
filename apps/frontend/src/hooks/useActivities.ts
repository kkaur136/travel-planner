import { useEffect, useState } from "react";

import type {
    Activity,
    ActivityInput,
    ActivityDestination
} from "../types/Activity";

import * as activityService from "../services/activityService";

export function useActivities() {
    const [activities, setActivities] = useState<Activity[]>([]);

    const [destinations, setDestinations] =
        useState<ActivityDestination[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const activityData =
                    await activityService.getActivities();

                const destinationData =
                    await activityService.getDestinations();

                setActivities(activityData);
                setDestinations(destinationData);
            } catch (error) {
                setError("Failed to load activities or destinations.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    async function loadActivities() {
        const data = await activityService.getActivities();
        setActivities(data);
    }

    async function handleAddActivity(
        activity: ActivityInput
    ): Promise<boolean> {
        setSaving(true);
        setError("");

        try {
            await activityService.addActivity(activity);
            await loadActivities();

            return true;
        } catch (error) {
            setError("Failed to add activity.");
            return false;
        } finally {
            setSaving(false);
        }
    }

    async function handleUpdateActivity(
        id: number,
        activity: ActivityInput
    ): Promise<boolean> {
        setSaving(true);
        setError("");

        try {
            await activityService.updateActivity(id, activity);
            await loadActivities();

            return true;
        } catch (error) {
            setError("Failed to update activity.");
            return false;
        } finally {
            setSaving(false);
        }
    }

    async function handleRemoveActivity(id: number) {
        setSaving(true);
        setError("");

        try {
            await activityService.removeActivity(id);
            await loadActivities();
        } catch (error) {
            setError("Failed to remove activity.");
        } finally {
            setSaving(false);
        }
    }

    return {
        activities,
        destinations,
        loading,
        saving,
        error,
        handleAddActivity,
        handleUpdateActivity,
        handleRemoveActivity
    };
}
