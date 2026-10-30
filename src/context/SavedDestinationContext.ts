
import { createContext, useContext } from "react";
import type { useSavedDestinations } from "../hooks/useSavedDestinations";

export type SavedDestinationFormState = ReturnType<
  typeof useSavedDestinations
>;

export const SavedDestinationContext =
  createContext<SavedDestinationFormState | null>(null);

export function useSavedDestinationContext() {
  const context = useContext(SavedDestinationContext);

  if (!context) {
    throw new Error(
      "SavedDestinationContext must be used inside its provider"
    );
  }

  return context;
}
