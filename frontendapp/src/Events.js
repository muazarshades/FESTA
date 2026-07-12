import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function Events() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");

  const [events, setEvents] = useState([]);

  // LOAD EVENTS
  const loadEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events/all");

      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // CREATE EVENT
  const createEvent = async () => {
    if (
      !title ||
      !description ||
      !eventDate ||
      !location ||
      !budget ||
      !totalSeats ||
      !ticketPrice
    ) {
      alert("All fields required");
      return;
    }

    if (budget < 0) {
      alert("Budget cannot be negative");
      return;
    }

    if (totalSeats <= 0) {
      alert("Seats must be greater than 0");
      return;
    }

    if (ticketPrice < 0) {
      alert("Ticket price cannot be negative");
      return;
    }

    // GET LOGGED IN USER
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(user);

    if (!user) {
      alert("Please login first");
      return;
    }

    if (user.role !== "Organizer") {
      alert("Only organizers can create events");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/events/create", {
        organizer_id: user.user_id,
        title: title,
        description: description,
        event_date: eventDate,
        location: location,
        budget: budget,
        total_seats: totalSeats,
        ticket_price: ticketPrice,
      });

      if (res.data.success) {
        alert("Event created successfully");

        setTitle("");
        setDescription("");
        setEventDate("");
        setLocation("");
        setBudget("");
        setTotalSeats("");
        setTicketPrice("");

        loadEvents();
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
      <h1>Event Management</h1>

      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <input
        type="number"
        placeholder="Total Seats"
        value={totalSeats}
        onChange={(e) => setTotalSeats(e.target.value)}
      />

      <input
        type="number"
        placeholder="Ticket Price"
        value={ticketPrice}
        onChange={(e) => setTicketPrice(e.target.value)}
      />

      <button onClick={createEvent}>Create Event</button>

      <h2>All Events</h2>

      {events.map((event) => (
        <div key={event.event_id} className="card">
          <h3>{event.title}</h3>

          <p>
            <strong>Description:</strong> {event.description}
          </p>

          <p>
            <strong>Date:</strong> {event.event_date}
          </p>

          <p>
            <strong>Location:</strong> {event.location}
          </p>

          <p>
            <strong>Budget:</strong> Rs. {event.budget}
          </p>

          <p>
            <strong>Total Seats:</strong> {event.total_seats}
          </p>

          <p>
            <strong>Booked Seats:</strong> {event.booked_seats}
          </p>

          <p>
            <strong>Available Seats:</strong> {event.available_seats}
          </p>

          <p>
            <strong>Ticket Price:</strong> Rs. {event.ticket_price}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Events;
