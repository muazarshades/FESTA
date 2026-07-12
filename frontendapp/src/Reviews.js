import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

function Reviews() {
  const [bookingId, setBookingId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [eventName, setEventName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews/all");

      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const addReview = async () => {
    if (!bookingId || !customerName || !eventName || !review || !rating) {
      alert("All fields required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/reviews/add", {
        booking_id: bookingId,
        customer_name: customerName,
        event_name: eventName,
        review: review,
        rating: rating,
      });

      if (res.data.success) {
        alert("Review added successfully");

        setBookingId("");
        setCustomerName("");
        setEventName("");
        setReview("");
        setRating("");

        loadReviews();
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add review");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Event Reviews</h1>

      <input
        type="number"
        placeholder="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
      />

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />

      <textarea
        placeholder="Write Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <button onClick={addReview}>Add Review</button>

      <h2>All Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        reviews.map((item) => (
          <div className="card" key={item.review_id}>
            <h3>{item.event_name}</h3>

            <p>
              <strong>Customer:</strong> {item.customer_name}
            </p>

            <p>
              <strong>Review:</strong> {item.review}
            </p>

            <p>
              <strong>Rating:</strong> {item.rating}/10
            </p>

            <p>
              <strong>Likes:</strong> {item.likes}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Reviews;
