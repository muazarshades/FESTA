const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const providerRoutes = require("./routes/providerRoutes");
const forumRoutes = require("./routes/forumRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const venueRoutes = require("./routes/venueRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/venues", venueRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
