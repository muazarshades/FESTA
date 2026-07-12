const express = require("express");
const router = express.Router();
const db = require("../db");

// GET ALL VENUES
router.get("/all", (req, res) => {
  const sql = `
SELECT *
FROM venues
ORDER BY venue_id DESC
`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json([]);
    }

    res.json(result);
  });
});

// ADD VENUE
router.post("/add", (req, res) => {
  const { name, location, capacity, verified } = req.body;

  if (!name || !location || !capacity) {
    return res.json({
      success: false,
      error: "All fields required",
    });
  }

  const sql = `
INSERT INTO venues
(
name,
location,
capacity,
verified
)
VALUES (?, ?, ?, ?)
`;

  db.query(
    sql,
    [name, location, capacity, verified || "Yes"],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          error: "Failed to add venue",
        });
      }

      res.json({
        success: true,
        message: "Venue added successfully",
      });
    },
  );
});

module.exports = router;
