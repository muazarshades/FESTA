import { useEffect, useState } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [costPerHour, setCostPerHour] = useState("");
  const [servicesProvided, setServicesProvided] = useState("");

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services/all");

      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addService = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");

      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/services/create",
        {
          provider_id: user.user_id,
          category: category,
          name: name,
          description: description,
          price: price,
          availability: availability,
          cost_per_hour: costPerHour,
          services_provided: servicesProvided,
        },
      );

      if (res.data.success) {
        alert("Service added successfully");

        setCategory("");
        setName("");
        setDescription("");
        setPrice("");
        setAvailability("");
        setCostPerHour("");
        setServicesProvided("");

        fetchServices();
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.log(err);

      alert("Service creation failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Services</h1>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Service Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Availability"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Cost Per Hour"
        value={costPerHour}
        onChange={(e) => setCostPerHour(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Services Provided"
        value={servicesProvided}
        onChange={(e) => setServicesProvided(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addService}>Add Service</button>

      <hr />

      <h2>All Services</h2>

      {services.map((service) => (
        <div
          key={service.service_id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{service.name}</h3>

          <p>
            <b>Category:</b> {service.category}
          </p>

          <p>
            <b>Description:</b> {service.description}
          </p>

          <p>
            <b>Price:</b> {service.price}
          </p>

          <p>
            <b>Availability:</b> {service.availability}
          </p>

          <p>
            <b>Cost Per Hour:</b> {service.cost_per_hour}
          </p>

          <p>
            <b>Services Provided:</b> {service.services_provided}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Services;
