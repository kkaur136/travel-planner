import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Components/layout/Layout";
import Destinations from "./Components/destinations/destinations";
import Activities from "./Components/Activities/Activities";
import SavedDestinations from "./Components/saved-destinations/SavedDestinations";


function App() {
  const [sharedCount, setSharedCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<p>Welcome to Travel Planner!</p>} />

        <Route
          path="destinations"
          element={
            <Destinations
              sharedCount={sharedCount}
              setSharedCount={setSharedCount}
            />
          }
        />

        <Route
          path="activities"
          element={
            <Activities
              sharedCount={sharedCount}
              setSharedCount={setSharedCount}
            />
          }
        />

        <Route
          path="saved-destinations"
          element={
            <SavedDestinations
              sharedCount={sharedCount}
              setSharedCount={setSharedCount}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
