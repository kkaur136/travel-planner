import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>
        <h1>Travel Planner</h1>
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
