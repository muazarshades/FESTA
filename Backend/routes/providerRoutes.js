const express = require("express");
const router = express.Router();
const db = require("../db");

// GET ALL SERVICES / PROVIDERS

router.get("/all", (req, res) => {
  const sql = `
    SELECT *
    FROM Services
    ORDER BY service_id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json([]);
    }

    res.json(result);
  });
});

// ADD NEW SERVICE

router.post("/create", (req, res) => {
  const {
    provider_name,
    category,
    description,
    cost_per_hour,
    services_provided,
  } = req.body;

  const sql = `
    INSERT INTO Services
    (
      provider_name,
      category,
      description,
      cost_per_hour,
      services_provided
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [provider_name, category, description, cost_per_hour, services_provided],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
        });
      }

      res.json({
        success: true,
        message: "Service added successfully",
      });
    },
  );
});

module.exports = router;
