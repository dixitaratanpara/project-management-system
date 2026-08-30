import { Link } from "react-router-dom";
import "../style/notfound.css";

function NotFound() {
  return (
    <div className="not-found-page">

      <div className="not-found-card">

        <div className="not-found-code">
          404
        </div>

        <h1>
          Page Not Found
        </h1>

        <p>
          The page you are looking for does not exist
          or may have been moved.
        </p>

        <Link
          to="/dashboard"
          className="not-found-btn"
        >
          ← Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default NotFound;