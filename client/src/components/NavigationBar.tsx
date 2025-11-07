import { Link, useLocation } from "react-router-dom";
import "../assets/css/NavigationBar.css";

export function NavigationBar() {
  const location = useLocation();

  return (
    <nav className="navigation-bar">
      <div className="navigation-bar-content">
        <Link
          to="/"
          className={`navigation-bar-link ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/words"
          className={`navigation-bar-link ${
            location.pathname === "/words" ? "active" : ""
          }`}
        >
          Words
        </Link>
      </div>
    </nav>
  );
}
