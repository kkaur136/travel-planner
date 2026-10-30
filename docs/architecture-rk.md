# Saved Destinations Architecture

File: src/hooks/useSavedDestinations.ts

The useSavedDestinations custom hook manages the presentation state of the Saved Destinations form.

It uses React's useState to manage the selected destination, last visited date, rating, personal note, and error   message.

The hook also provides a resetForm() function that clears the form fields after a destination is successfully saved.

The hook does not directly access the repository or perform business validation.

Used in: SavedDestinations.tsx

# Saved Destinations Architecture

## 1. Custom Hook

**File:** src/hooks/useSavedDestinations.ts`

The useSavedDestinations` custom hook manages presentation state for the Saved Destinations form.

It uses React's useState` to manage the selected destination, last visited date, rating, personal note, and error message.

The hook provides a resetForm()` function to clear form fields after a destination is successfully saved.

The hook does not directly access the repository or perform business validation.

**Used in:** SavedDestinations.tsx`

## 2. Service Layer

**File:** src/services/savedDestinationService.ts`

The savedDestinationService` handles business rules for saved destinations.

Its responsibilities include:

- Retrieving all saved destinations.
- Validating the selected destination and rating.
- Preventing duplicate saved destinations.
- Adding a new saved destination.
- Removing an existing saved destination.

The service communicates with the repository instead of storing data directly.

**Used in:** SavedDestinations.tsx`

## 3. Repository Layer

**File:** src/repositories/savedDestinationRepository.ts`

The repository manages the Saved Destination data.

It provides the following CRUD operations:

- `getSavedDestinations()` — Retrieve all destinations.
- `getSavedDestinationById()` — Retrieve one destination by ID.
- `createSavedDestination()` — Create a destination.
- `updateSavedDestination()` — Update destination details.
- `deleteSavedDestination()` — Delete a destination.

The repository currently uses an in-memory array initialized with test data.

## 4. Test Data

**File:** `src/data/savedDestinationsData.ts`

The test data file contains 10 sample saved destinations.

These objects use the `SavedDestination` type defined in `src/types/SavedDestination.ts`.

The repository imports this data to initialize its collection.

## 5. Context and Shared State

**Files:**
- src/context/SavedDestinationContext.ts`
- src/context/SharedCountContext.tsx`

SavedDestinationContext` shares the form state between the Saved Destinations component and its form component.

SharedCountContext` manages the shared counter used by the Destinations, Activities, and Saved Destinations pages.

The SharedCountProvider` wraps the application's routes so the counter remains available when navigating between pages.

React Router's Link` component allows navigation without reloading the application.

## 6. Architecture Integration

The Saved Destinations feature separates presentation logic, business rules, and data access.

**Data flow:**

1. The user interacts with the Saved Destination form.
2. The custom hook manages the form values.
3. The Saved Destinations component handles form submission.
4. The service validates the submitted destination.
5. The repository stores or removes destination data.
6. The component retrieves the updated data and refreshes the displayed list.

This separation makes the application easier to maintain, test, and extend.

## 7. Testing

The Saved Destinations feature can be tested by:

- Displaying the initial 10 saved destinations.
- Adding a valid destination.
- Preventing duplicate destinations.
- Rejecting an invalid rating.
- Removing a saved destination.
- Confirming that the shared counter remains synchronized across the three feature pages.

The application was successfully compiled using npm run build`.