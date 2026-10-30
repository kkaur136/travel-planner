export function validateDestination(
    city: string,
    country: string
): string {
    if (city.trim() === "" && country.trim() === "") {
        return "Please enter a city and country.";
    }

    if (city.trim() === "") {
        return "Please enter a city name.";
    }

    if (country.trim() === "") {
        return "Please enter a country name.";
    }

    return "";
}