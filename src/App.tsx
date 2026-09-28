import { useState } from "react";
import "./App.css";
import Destinations from "./Components/destinations/destinations";
import Activities from "./Components/Activities/Activities";
import SavedDestinations from "./Components/saved-destinations/SavedDestinations";

function App() {
  const [sharedCount, setSharedCount] = useState(0);

  return (
    <>
      <header>
        <h1>Travel Planner</h1>
      </header>

      <main>
      <Destinations 
      sharedCount={sharedCount}
  setSharedCount={setSharedCount}
/>

<SavedDestinations
  sharedCount={sharedCount}
  setSharedCount={setSharedCount}
/>

<Activities
  sharedCount={sharedCount}
  setSharedCount={setSharedCount}
  />
      </main>

      <footer>
        <p>Created by: Gurmandeep Kaur, Robinpreet Kaur, Khushpreet Kaur</p>
      </footer>
    </>
  );
}

export default App;
