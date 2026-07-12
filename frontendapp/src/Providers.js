import { useEffect, useState } from "react";
import axios from "axios";

function Providers() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/providers/all");

      console.log(res.data);

      setProviders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Service Providers</h1>

      <button
        onClick={() => (window.location.href = "/add-service")}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Add Service
      </button>

      {providers.length === 0 ? (
        <p>No services available</p>
      ) : (
        providers.map((provider) => (
          <div
            key={provider.service_id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>{provider.provider_name}</h2>

            <p>
              <strong>Service Name:</strong> {provider.name}
            </p>

            <p>
              <strong>Description:</strong> {provider.description}
            </p>

            <p>
              <strong>Cost Per Hour:</strong> Rs. {provider.cost_per_hour}
            </p>

            <p>
              <strong>Services Provided:</strong> {provider.services_provided}
            </p>

            <button
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                cursor: "pointer",
              }}
              onClick={() => {
                alert("Organizer can contact/book this provider for events");
              }}
            >
              Book Provider
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Providers;
