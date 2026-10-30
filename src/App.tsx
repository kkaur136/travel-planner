import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./Components/layout/Layout";
import Destinations from "./Components/destinations/destinations";
import Activities from "./Components/Activities/Activities";
import SavedDestinations from "./Components/saved-destinations/SavedDestinations";

import { SharedCountProvider } from "./context/SharedCountContext";

function App() {
  return (
    <SharedCountProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<p>Welcome to Travel Planner!</p>}
          />

          <Route
            path="destinations"
            element={<Destinations />}
          />

          <Route
            path="activities"
            element={<Activities />}
          />

          <Route
            path="saved-destinations"
            element={<SavedDestinations />}
          />
        </Route>
      </Routes>
    </SharedCountProvider>
  );
}

export default App;
