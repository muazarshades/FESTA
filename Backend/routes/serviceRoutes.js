const express = require("express");

const router = express.Router();

const db = require("../db");

// ADD SERVICE
router.post("/create", (req, res) => {
  const {
    provider_id,
    category,
    name,
    description,
    price,
    availability,
    cost_per_hour,
    services_provided,
  } = req.body;

  if (!provider_id || !category || !name || !description || !price) {
    return res.json({
      success: false,
      error: "All required fields are required",
    });
  }

  const sql = `
INSERT INTO services
(
provider_id,
category,
name,
description,
price,
availability,
cost_per_hour,
services_provided
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

  db.query(
    sql,
    [
      provider_id,
      category,
      name,
      description,
      price,
      availability,
      cost_per_hour,
      services_provided,
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
        message: "Service added successfully",
      });
    },
  );
});

// GET ALL SERVICES
router.get("/all", (req, res) => {
  const sql = `
SELECT *
FROM services
ORDER BY service_id DESC
`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: "Failed to fetch services",
      });
    }

    res.json(result);
  });
});

// DELETE SERVICE
router.delete("/delete/:id", (req, res) => {
  const service_id = req.params.id;

  const sql = `
DELETE FROM services
WHERE service_id = ?
`;

  db.query(sql, [service_id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: "Delete failed",
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  });
});

module.exports = router;
