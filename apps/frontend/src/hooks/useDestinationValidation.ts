import { useState } from "react";
import { validateDestination } from "../services/destinationService";

export function useDestinationValidation() {
    const [validationError, setValidationError] = useState("");

    function checkDestination(city: string, country: string): boolean {
        const message = validateDestination(city, country);
        setValidationError(message);
        return message === "";
    }

    function clearValidationError() {
        setValidationError("");
    }

    return {
        validationError,
        checkDestination,
        clearValidationError
    };
}