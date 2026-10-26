type DestinationFormProps = {
    city: string;
    country: string;
    setCity: (city: string) => void;
    setCountry: (country: string) => void;
    addDestination: (event: React.FormEvent) => void;
    error: string;
};

function DestinationForm({
    city,
    country,
    setCity,
    setCountry,
    addDestination,
    error
}: DestinationFormProps) {
    return (
        <form onSubmit={addDestination}>
            <div>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor="country">Country:</label>
                <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                />
            </div>
            {error && <p role="alert" className="validation-error">{error}</p>}

            <button type="submit">Add Destination</button>
        </form>
    );
}

export default DestinationForm;