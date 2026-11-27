import { useEffect, useState } from "react";

import type {
    Activity,
    ActivityInput,
    ActivityDestination
} from "../types/Activity";

import * as activityService from "../services/activityService";

import { getAllDestinations } from "../repositories/destinationRepository";

export function useActivities() {
    const [activities, setActivities] = useState<Activity[]>([]);

    const [destinations, setDestinations] =
        useState<ActivityDestination[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            setError("");

            try {
                const destinationData =
                    await getAllDestinations();

                setDestinations(destinationData);
            } catch (error) {
                console.error("Destination loading error:", error);
                setError("Failed to load destinations.");
            }

            try {
                const activityData =
                    await activityService.getActivities();

                setActivities(activityData);
            } catch (error) {
                console.error("Activity loading error:", error);
                setError((previousError) =>
                    previousError
                        ? `${previousError} Failed to load activities.`
                        : "Failed to load activities."
                );
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
