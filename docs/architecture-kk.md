Sprint 3 Architecture Document

Student: Khushpreet Kaur  
Project: Travel Planner  
Feature: Activities  
Course: COMP-4002 Full-Stack Development

## 1. Overview

For Sprint 3, I worked on improving my Activities feature using the Hook-Service-Repository architecture.
The main goal was to organize my existing code into separate layers so it is easier to understand, maintain, and update. I also improved the CSS to make the Activities page look more presentable.
The Activities feature allows users to view activities grouped by destination, add new activities, and remove activities.

## 2. Activity Type and Test Data

Files: `src/types/Activity.ts` and `src/data/activities.ts`

What does it do: I created an Activity TypeScript type with four fields: `id`, `name`, `city`, and `duration`. I also created 10 sample activities using the same cities as the Destinations feature.

Why is it separated: Keeping the Activity type and test data in separate files makes the code more organized. I don't need to store all the sample activities directly inside my components.

Where is it used: The Activity type is used in the repository, service, hook, and components. The test data is imported into the Activity repository.

## 3. Activity Repository

File: `src/apis/activityRepository.ts`

What does it do: I created an Activity repository with CRUD methods to:

- Get all activities.
- Get an activity by its ID.
- Add a new activity.
- Update an existing activity.
- Delete an activity.

Why does this logic belong here: The repository is responsible for accessing and updating Activity data. Keeping this logic separate means my components do not need to manage the data directly.

Where is it used: The Activity service calls the repository methods whenever Activity data needs to be retrieved or changed.

## 4. Activity Service

**File:** `src/services/activityService.ts`

What does it do: I created an Activity service to handle business logic. For example, it checks that the activity name, destination, and duration are not empty before adding an activity.

Why does this logic belong here: Validation is part of the business rules. Keeping it in the service makes the code easier to maintain and prevents the components from handling too much logic.

Where is it used: The `useActivities` hook calls the Activity service when loading, adding, or removing activities.

## 5. Custom Hook

**File:** `src/hooks/useActivities.ts`

What does it do: I created the `useActivities` custom hook to manage Activity state. It returns:

- `activities`: the list of activities displayed on the page.
- `handleAddActivity`: a function to add an activity.
- `handleRemoveActivity`: a function to remove an activity.

Why does this logic belong here: The hook handles React state and connects the components with the service. This keeps state management separate from the user interface.

Where is it used: The `Activities.tsx` component calls the hook to display activities and handle user actions.

## 6. Activities Components

**Files:** `Activities.tsx`, `ActivityForm.tsx`, and `ActivityItem.tsx`

What do they do: `Activities.tsx` displays the Activities page and groups activities under their destinations. `ActivityForm.tsx` provides a form where users can select a destination, enter an activity name and duration, and add the activity.
`ActivityItem.tsx` displays an individual activity with a Remove button.

Why is the code separated: Each component has its own responsibility. The components focus on displaying information and handling user interactions, while the hook, service, and repository handle the other logic.

Where are they used: All three components work together on the Activities page.

## 7. CSS Improvements

**File:** `src/Components/Activities/Activities.css`

I updated the CSS to improve the appearance of my Activities page.
I changed the colors to a dark teal, sage green, and warm sand theme. I also improved the form, buttons, spacing, and activity cards to make the page easier to read and use.
I also worked on improving the overall website styling through `App.css` and `index.css` so the pages have a more consistent appearance.

## 8. Architecture Flow

When a user adds an activity, the form sends the information to the Activities component. The component uses the hook, which calls the service to validate the information. The service then uses the repository to save the activity.
The same structure is used when activities are loaded or removed.

## 9. Data Relationships

Each activity has a unique `id`.
I used the `city` field to connect activities with destinations. My test data uses the same city names as Gurmandeep's Destinations data.
Our team also discussed using `destinationID` in the future to connect Activities with Destinations more directly.

## 10. Conclusion

In Sprint 3, I focused on improving the structure and appearance of my existing Activities feature instead of adding unnecessary new features.
Using the Hook-Service-Repository architecture helped me understand how to separate presentation logic, business logic, and data-access logic.
The feature still allows users to view, add, and remove activities, but the code is now more organized and easier to maintain.
