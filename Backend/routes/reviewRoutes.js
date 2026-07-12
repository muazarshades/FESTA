const express = require("express");
const router = express.Router();
const db = require("../db");

// GET ALL REVIEWS
router.get("/all", (req, res) => {
  const sql = `
SELECT *
FROM reviews
ORDER BY review_id DESC
`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json([]);
    }

    res.json(result);
  });
});

// ADD REVIEW
router.post("/add", (req, res) => {
  const { booking_id, customer_name, event_name, review, rating } = req.body;

  if (!booking_id || !customer_name || !event_name || !review || !rating) {
    return res.json({
      success: false,
      error: "All fields required",
    });
  }

  const sql = `
INSERT INTO reviews
(
booking_id,
customer_name,
event_name,
review,
rating,
likes,
comments
)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;

  db.query(
    sql,
    [booking_id, customer_name, event_name, review, rating, 0, 0],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          error: "Failed to add review",
        });
      }

      res.json({
        success: true,
        message: "Review added successfully",
      });
    },
  );
});

module.exports = router;
