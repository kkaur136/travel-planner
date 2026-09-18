import "./App.css";
import Destinations from "./components/destinations/destinations";
import Activities from "./components/activities/Activities";
import SavedDestinations from "./components/saved-destinations/SavedDestinations";

function App() {
  return (
    <>
      <header>
        <h1>Travel Planner</h1>
      </header>

      <main>
        <Destinations />
        <SavedDestinations />
        <Activities />
      </main>

      <footer>
        <p>Created by: Gurmandeep Kaur, Robinpreet Kaur, Khushpreet Kaur</p>
      </footer>
    </>
  );
}

export default App;