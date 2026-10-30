# Sprint 3 – Architecture Documentation

**Feature:** Destinations  
**Project:** Travel Planner

## 1. Introduction

For Sprint 3, I worked on the Destinations feature of our Travel Planner application. I separated the code into hooks, a service, and a repository to make it easier to understand, maintain, and update.

The hooks manage the destination list, form inputs, and validation messages. The service handles validation and destination operations, while the repository manages the destination data.

This structure keeps the UI components simple and separates the different responsibilities of the application.

## 2. Custom Hooks

### useDestinations Hook

**What it does:**
The useDestinations hook manages the destination list, city and country inputs, and error messages. It also handles adding and removing destinations.

**Why I separated this logic:**
I moved this logic into a custom hook to keep the Destinations component simple. This makes the code easier to read and maintain.

**Where and how it is used:**
It is used in destinations.tsx. The component gets destination data and functions from the hook. The hook calls the Destination Service to get, add, or remove destinations.

### useDestinationValidation Hook

**What it does:**
This hook checks whether the user entered a city and country. It also manages validation error messages.

**Why I separated this logic:**
I created this hook so the same validation logic can be reused in different components without repeating the code.

**Where and how it is used:**
It is used in DestinationForm.tsx and destinations.tsx. Both components use the hook to validate city and country inputs before adding a destination.

## 3. Destination Service

**What it does:**
The Destination Service handles the business logic for destinations. It validates city and country inputs and provides functions to get, add, update, and remove destinations.

**Why I separated this logic:**
I created a separate service so validation and business rules are not written directly inside the UI components. This makes the code easier to maintain and reuse.

**Where and how it is used:**
The service is located in src/services/destinationService.ts. It is used by the useDestinations and useDestinationValidation hooks.

The useDestinations hook calls the service to retrieve, add, and remove destinations. The useDestinationValidation hook calls the service to check user inputs.

The service communicates with the Destination Repository to access and update destination data.

## 4. Destination Repository

**What it does:**
The Destination Repository manages the destination data. It provides CRUD operations to create, read, update, and delete destinations.

**Why I separated this logic:**
I created a separate repository to keep data management away from the UI components and business logic. This makes the application easier to maintain and allows the data storage method to be changed later.

**Where and how it is used:**
The repository is located in src/repositories/destinationRepository.ts.

It is used by the Destination Service to retrieve, add, update, and delete destinations.

The repository imports 10 sample destinations from src/data/destinationsData.ts. Each destination follows the Destination interface defined in src/types/Destination.ts.

The repository stores the destinations in a temporary in-memory array. Changes are not saved permanently when the page is refreshed.