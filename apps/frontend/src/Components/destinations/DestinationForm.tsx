import { useDestinationValidation } from "../../hooks/useDestinationValidation";

type DestinationFormProps = {
    city: string;
    country: string;
    setCity: (city: string) => void;
    setCountry: (country: string) => void;
    addDestination: (event: React.FormEvent) => void;
    error: string;
    isEditing?: boolean;
    cancelEdit?: () => void;
};

function DestinationForm({
    city,
    country,
    setCity,
    setCountry,
    addDestination,
    error,
    isEditing = false,
    cancelEdit
}: DestinationFormProps) {
    const { checkDestination, validationError } =
        useDestinationValidation();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!checkDestination(city, country)) {
            return;
        }

        addDestination(event);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(event) =>
                        setCity(event.target.value)
                    }
                />
            </div>

            <div>
                <label htmlFor="country">Country:</label>
                <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(event) =>
                        setCountry(event.target.value)
                    }
                />
            </div>

            {(error || validationError) && (
                <p role="alert" className="validation-error">
                    {error || validationError}
                </p>
            )}

            <button type="submit">
                {isEditing ? "Update Destination" : "Add Destination"}
            </button>

            {isEditing && (
                <button type="button" onClick={cancelEdit}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default DestinationForm;