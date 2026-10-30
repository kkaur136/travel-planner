
import { useState } from "react";

export function useSavedDestinations() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [lastVisited, setLastVisited] = useState("");
  const [rating, setRating] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setSelectedDestination("");
    setLastVisited("");
    setRating("");
    setNote("");
    setError("");
  };

  return {
    selectedDestination,
    setSelectedDestination,
    lastVisited,
    setLastVisited,
    rating,
    setRating,
    note,
    setNote,
    error,
    setError,
    resetForm,
  };
}
