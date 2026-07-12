const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/all", (req, res) => {
  db.query("SELECT * FROM Resources", (err, result) => {
    if (err) {
      console.log(err);
      return res.json([]);
    }

    res.json(result);
  });
});

module.exports = router;
