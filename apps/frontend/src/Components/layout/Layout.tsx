import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Layout() {
  return (
    <>
      <header>
        <h1>Travel Planner</h1>
        <Navigation />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>
          Created by: Khushpreet Kaur, Gurmandeep Kaur, Robinpreet Kaur
        </p>
      </footer>
    </>
  );
}

export default Layout;
