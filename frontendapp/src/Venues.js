import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

function Venues() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [verified, setVerified] = useState("Yes");

  const [venues, setVenues] = useState([]);

  const loadVenues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/venues/all");

      setVenues(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadVenues();
  }, []);

  const addVenue = async () => {
    if (!name || !location || !capacity) {
      alert("All fields required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/venues/add", {
        name,
        location,
        capacity,
        verified,
      });

      if (res.data.success) {
        alert("Venue added successfully");

        setName("");
        setLocation("");
        setCapacity("");
        setVerified("Yes");

        loadVenues();
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Venues</h1>

      <input
        type="text"
        placeholder="Venue Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />

      <select value={verified} onChange={(e) => setVerified(e.target.value)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <button onClick={addVenue}>Add Venue</button>

      <h2>All Venues</h2>

      {venues.length === 0 ? (
        <p>No venues available</p>
      ) : (
        venues.map((venue) => (
          <div className="card" key={venue.venue_id}>
            <h3>{venue.name}</h3>

            <p>
              <strong>Location:</strong> {venue.location}
            </p>

            <p>
              <strong>Capacity:</strong> {venue.capacity}
            </p>

            <p>
              <strong>Verified:</strong> {venue.verified}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Venues;
