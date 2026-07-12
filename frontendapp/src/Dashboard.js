import "./styles.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div
      className="dashboard-container"
      style={{
        position: "relative",
      }}
    >
      <button
        onClick={logoutUser}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1>FESTA Event Management Dashboard</h1>

      <p>Manage events, bookings, providers and customers.</p>

      <div className="card">
        <h2>Bookings</h2>

        <p>Manage bookings and booking status.</p>

        <button onClick={() => navigate("/bookings")}>View Bookings</button>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Create Event</h2>

          <p>Create and manage weddings, concerts and parties.</p>

          <button onClick={() => navigate("/events")}>Manage Events</button>
        </div>

        <div className="card">
          <h2>Reviews</h2>

          <p>Rate service providers after events.</p>

          <button onClick={() => navigate("/reviews")}>Reviews</button>
        </div>

        <div className="card">
          <h2>Discussion Forum</h2>

          <p>Discuss event planning ideas and tips.</p>

          <button onClick={() => navigate("/forum")}>Open Forum</button>
        </div>

        <div className="card">
          <h2>Venues</h2>

          <p>Browse and add venues for organizing events.</p>

          <button onClick={() => navigate("/venues")}>View Venues</button>
        </div>

        <div className="card">
          <h2>Service Providers</h2>

          <p>Browse caterers, decorators and photographers.</p>

          <button onClick={() => navigate("/providers")}>View Providers</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
