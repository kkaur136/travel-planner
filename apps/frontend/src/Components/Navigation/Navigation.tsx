
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/destinations">Destinations</Link>
      <Link to="/saved-destinations">Saved Destinations</Link>
      <Link to="/activities">Activities</Link>
    </nav>
  );
}

export default Navigation;
