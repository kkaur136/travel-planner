# Saved Destinations Architecture

File: src/hooks/useSavedDestinations.ts

The useSavedDestinations custom hook manages the presentation state of the Saved Destinations form.

It uses React's useState to manage the selected destination, last visited date, rating, personal note, and error   message.

The hook also provides a resetForm() function that clears the form fields after a destination is successfully saved.

The hook does not directly access the repository or perform business validation.

Used in: SavedDestinations.tsx

# 