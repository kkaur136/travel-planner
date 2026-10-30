
import { useState } from "react";
import type { SavedDestination } from "../types/SavedDestination";
import { savedDestinationService } from "../services/savedDestinationService";

/**
 * Custom hook for managing the saved destinations list.
 * Uses the service layer to retrieve destination data.
 */
export function useSavedDestinationList() {
  const [savedDestinations, setSavedDestinations] = useState<
    SavedDestination[]
  >(() => savedDestinationService.getAll());

  const refreshSavedDestinations = () => {
    setSavedDestinations(savedDestinationService.getAll());
  };

  return {
    savedDestinations,
    refreshSavedDestinations,
  };
}
