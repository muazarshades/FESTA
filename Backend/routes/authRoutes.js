const express = require("express");

const router = express.Router();

const db = require("../db");

// SIGNUP
router.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.json({
      success: false,
      error: "All fields required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.json({
      success: false,
      error: "Invalid email format",
    });
  }

  if (password.length < 6) {
    return res.json({
      success: false,
      error: "Password must be at least 6 characters",
    });
  }

  db.query(
    "CALL SignupUser(?, ?, ?, ?)",
    [name, email, password, role],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.json({
          success: false,
          error: "Signup failed",
        });
      }

      res.json({
        success: true,
        message: "Signup successful",
      });
    },
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      error: "All fields required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.json({
      success: false,
      error: "Invalid email format",
    });
  }

  db.query("CALL LoginUser(?, ?)", [email, password], (err, result) => {
    if (err) {
      console.log(err);

      return res.json({
        success: false,
        error: "Login failed",
      });
    }

    const users = result[0];

    if (users.length === 0) {
      return res.json({
        success: false,
        error: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: users[0],
    });
  });
});

module.exports = router;
