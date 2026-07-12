const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE BOOKING
router.post("/create", (req, res) => {
  const { customer_id, event_id, total_persons, total_amount } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: "Transaction failed",
      });
    }

    const bookingSql = `
INSERT INTO Bookings
(
customer_id,
event_id,
total_persons,
total_amount
)
VALUES (?, ?, ?, ?)
`;

    db.query(
      bookingSql,
      [customer_id, event_id, total_persons, total_amount],
      (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.log(err);

            res.status(500).json({
              success: false,
              error: "Booking failed",
            });
          });
        }

        const updateSql = `
UPDATE Events
SET booked_seats = booked_seats + ?
WHERE event_id = ?
`;

        db.query(updateSql, [total_persons, event_id], (err, updateResult) => {
          if (err) {
            return db.rollback(() => {
              console.log(err);

              res.status(500).json({
                success: false,
                error: "Seat update failed",
              });
            });
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                console.log(err);

                res.status(500).json({
                  success: false,
                  error: "Commit failed",
                });
              });
            }

            res.json({
              success: true,
              message: "Booking successful",
            });
          });
        });
      },
    );
  });
});
// GET ALL BOOKINGS
router.get("/all", (req, res) => {
  const sql = `
    SELECT *
    FROM Bookings
    ORDER BY booking_date DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json([]);
    }

    res.json(result);
  });
});

module.exports = router;
