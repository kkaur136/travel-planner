type DestinationFormProps = {
    city: string;
    country: string;
    setCity: (city: string) => void;
    setCountry: (country: string) => void;
    addDestination: (event: React.FormEvent) => void;
};

function DestinationForm({
    city,
    country,
    setCity,
    setCountry,
    addDestination
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

            <button type="submit">Add Destination</button>
        </form>
    );
}

export default DestinationForm;