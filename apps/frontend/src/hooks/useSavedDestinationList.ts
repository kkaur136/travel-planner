import { useEffect, useState } from "react";
import type { SavedDestination } from "../types/SavedDestination";
import { savedDestinationService } from "../services/savedDestinationService";

export function useSavedDestinationList() {
  const [savedDestinations, setSavedDestinations] = useState<
    SavedDestination[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");

  const refreshSavedDestinations = async () => {
    try {
      setLoading(true);
      setListError("");

      const destinations = await savedDestinationService.getAll();
      setSavedDestinations(destinations);
    } catch (error) {
      setListError(
        error instanceof Error
          ? error.message
          : "Unable to load saved destinations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshSavedDestinations();
  }, []);

  return {
    savedDestinations,
    refreshSavedDestinations,
    loading,
    listError,
  };
}
