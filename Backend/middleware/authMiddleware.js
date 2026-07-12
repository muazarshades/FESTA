const jwt = require("jsonwebtoken");

// Verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided. Please log in.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key",
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Check if user has specific role
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

// Only Organizer
const isOrganizer = checkRole(["Organizer"]);

// Only Customer
const isCustomer = checkRole(["Customer"]);

// Organizer or Admin
const isOrganizerOrAdmin = checkRole(["Organizer", "Admin"]);

// Customer or Admin
const isCustomerOrAdmin = checkRole(["Customer", "Admin"]);

// Any authenticated user
const isAuthenticated = verifyToken;

module.exports = {
  verifyToken,
  checkRole,
  isOrganizer,
  isCustomer,
  isOrganizerOrAdmin,
  isCustomerOrAdmin,
  isAuthenticated,
};
