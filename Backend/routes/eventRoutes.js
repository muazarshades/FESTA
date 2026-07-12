const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE EVENT
router.post("/create", (req, res) => {
  const {
    organizer_id,
    title,
    description,
    event_date,
    location,
    budget,
    total_seats,
    ticket_price,
  } = req.body;

  const sql = `
    INSERT INTO Events
    (
      organizer_id,
      title,
      description,
      event_date,
      location,
      budget,
      total_seats,
      booked_seats,
      ticket_price
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      organizer_id,
      title,
      description,
      event_date,
      location,
      budget,
      total_seats,
      0,
      ticket_price,
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.json({
        success: true,
        message: "Event created successfully",
      });
    },
  );
});

// GET ALL EVENTS
router.get("/all", (req, res) => {
  const sql = `
    SELECT *,
    (total_seats - booked_seats) AS available_seats
    FROM Events
    ORDER BY event_date ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json([]);
    }

    res.json(result);
  });
});

// GET UPCOMING EVENTS
router.get("/upcoming", (req, res) => {
  const sql = `
    SELECT *,
    (total_seats - booked_seats) AS available_seats
    FROM Events
    WHERE event_date >= CURDATE()
    ORDER BY event_date ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json([]);
    }

    res.json(result);
  });
});

// GET SINGLE EVENT
router.get("/:id", (req, res) => {
  const event_id = req.params.id;

  const sql = `
    SELECT *,
    (total_seats - booked_seats) AS available_seats
    FROM Events
    WHERE event_id = ?
  `;

  db.query(sql, [event_id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: "Database error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      });
    }

    res.json(result[0]);
  });
});

// UPDATE EVENT
router.put("/update/:id", (req, res) => {
  const event_id = req.params.id;

  const {
    title,
    description,
    event_date,
    location,
    budget,
    total_seats,
    ticket_price,
  } = req.body;

  const sql = `
    UPDATE Events
    SET
      title = ?,
      description = ?,
      event_date = ?,
      location = ?,
      budget = ?,
      total_seats = ?,
      ticket_price = ?
    WHERE event_id = ?
  `;

  db.query(
    sql,
    [
      title,
      description,
      event_date,
      location,
      budget,
      total_seats,
      ticket_price,
      event_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          error: "Update failed",
        });
      }

      res.json({
        success: true,
        message: "Event updated successfully",
      });
    },
  );
});

// DELETE EVENT
router.delete("/delete/:id", (req, res) => {
  const event_id = req.params.id;

  const sql = `
    DELETE FROM Events
    WHERE event_id = ?
  `;

  db.query(sql, [event_id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: "Delete failed",
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  });
});

// BOOK SEATS
router.put("/book/:id", (req, res) => {
  const event_id = req.params.id;
  const { total_persons } = req.body;

  const checkSql = `
    SELECT total_seats, booked_seats
    FROM Events
    WHERE event_id = ?
  `;

  db.query(checkSql, [event_id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: "Database error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      });
    }

    const totalSeats = result[0].total_seats;
    const bookedSeats = result[0].booked_seats;

    const availableSeats = totalSeats - bookedSeats;

    if (total_persons > availableSeats) {
      return res.status(400).json({
        success: false,
        error: "Not enough seats available",
      });
    }

    const updateSql = `
      UPDATE Events
      SET booked_seats = booked_seats + ?
      WHERE event_id = ?
    `;

    db.query(updateSql, [total_persons, event_id], (err, updateResult) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          error: "Failed to update seats",
        });
      }

      res.json({
        success: true,
        message: "Seats booked successfully",
      });
    });
  });
});

module.exports = router;
