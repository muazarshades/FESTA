import { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [form, setForm] = useState({
    phone_number: "",
    cnic: "",
    total_persons: 1,
  });

  // LOAD EVENTS
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events/all");

      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // OPEN BOOKING FORM
  const openBooking = (event) => {
    setSelectedEvent(event);
  };

  // PAY + BOOK
  const payNow = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    if (user.role !== "Customer") {
      alert("Only customers can book tickets");
      return;
    }

    // VALIDATION
    if (!form.phone_number || !form.cnic) {
      alert("All fields are required");
      return;
    }

    if (form.phone_number.length < 6) {
      alert("Invalid phone number");
      return;
    }

    if (form.cnic.length < 5) {
      alert("Invalid CNIC");
      return;
    }

    if (form.total_persons <= 0) {
      alert("Invalid persons count");
      return;
    }

    const availableSeats =
      selectedEvent.total_seats - selectedEvent.booked_seats;

    if (form.total_persons > availableSeats) {
      alert("Not enough seats available");
      return;
    }

    const totalAmount = selectedEvent.ticket_price * form.total_persons;

    try {
      // CREATE BOOKING
      const res = await axios.post(
        "http://localhost:5000/api/bookings/create",
        {
          event_id: selectedEvent.event_id,

          customer_id: user.user_id,

          phone_number: form.phone_number,

          cnic: form.cnic,

          total_persons: form.total_persons,

          total_amount: totalAmount,

          payment_status: "Paid",

          status: "Confirmed",
        },
      );

      if (res.data.success) {
        alert("Payment successful and seats booked");

        setSelectedEvent(null);

        setForm({
          phone_number: "",
          cnic: "",
          total_persons: 1,
        });

        fetchEvents();
      } else {
        alert("Booking failed");
      }
    } catch (err) {
      console.log(err);

      alert("Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upcoming Events</h1>

      {events.map((event) => {
        const availableSeats = event.total_seats - event.booked_seats;

        return (
          <div
            key={event.event_id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h2>{event.title}</h2>

            <p>{event.description}</p>

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
              <strong>Available Seats:</strong> {availableSeats}
            </p>

            <p>
              <strong>Ticket Price:</strong> Rs. {event.ticket_price}
            </p>

            {availableSeats > 0 ? (
              <button onClick={() => openBooking(event)}>Book Ticket</button>
            ) : (
              <button disabled>Sold Out</button>
            )}
          </div>
        );
      })}

      {/* BOOKING FORM */}
      {selectedEvent && (
        <div
          style={{
            border: "2px solid black",
            padding: "20px",
            marginTop: "30px",
          }}
        >
          <h2>Booking Bill</h2>

          <p>
            <strong>Event:</strong> {selectedEvent.title}
          </p>

          <p>
            <strong>Ticket Price:</strong> Rs. {selectedEvent.ticket_price}
          </p>

          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={(e) =>
              setForm({
                ...form,
                phone_number: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            type="text"
            placeholder="CNIC Number"
            value={form.cnic}
            onChange={(e) =>
              setForm({
                ...form,
                cnic: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            type="number"
            placeholder="Total Persons"
            value={form.total_persons}
            onChange={(e) =>
              setForm({
                ...form,
                total_persons: Number(e.target.value),
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <h3>
            Total Bill: Rs. {selectedEvent.ticket_price * form.total_persons}
          </h3>

          <button
            onClick={payNow}
            style={{
              marginRight: "10px",
            }}
          >
            Pay
          </button>

          <button onClick={() => setSelectedEvent(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Bookings;
