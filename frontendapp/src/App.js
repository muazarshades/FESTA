import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Events from "./Events";
import Providers from "./Providers";
import Bookings from "./Bookings";
import Reviews from "./Reviews";
import Forum from "./Forum";
import Resources from "./Resources";
import Services from "./Services";
import AddService from "./AddService";
import Venues from "./Venues";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/services" element={<Services />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/venues" element={<Venues />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
