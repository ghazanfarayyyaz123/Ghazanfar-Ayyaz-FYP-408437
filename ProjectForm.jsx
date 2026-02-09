import { useState } from "react";

const DEFAULT_FEATURES = [
  { key: "auth", label: "User Authentication", complexity: "medium" },
  { key: "payments", label: "Payment Gateway", complexity: "high" },
  { key: "admin", label: "Admin Panel", complexity: "medium" },
];

export default function ProjectForm({ onCreated }) {
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("simple_site");
  const [numPages, setNumPages] = useState(5);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleFeature = (feature) => {
    const exists = selectedFeatures.find((f) => f.key === feature.key);
    if (exists) {
      setSelectedFeatures(selectedFeatures.filter((f) => f.key !== feature.key));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      name,
      projectType,
      numPages: Number(numPages),
      features: selectedFeatures,
    };

    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        onCreated(data);
      } else {
        alert(data.message || "Error creating project");
      }
    } catch (err) {
      console.error(err);
      alert("Could not connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
      }}
    >
      <h2 style={{ marginBottom: 12 }}>Project Details</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Project Name</label>
        <input
          style={{ display: "block", width: "100%", marginTop: 4 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Project Type</label>
        <select
          style={{ display: "block", width: "100%", marginTop: 4 }}
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        >
          <option value="simple_site">Simple Website</option>
          <option value="ecommerce">E-commerce</option>
          <option value="enterprise">Enterprise App</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Number of Pages / Screens</label>
        <input
          type="number"
          min={1}
          style={{ display: "block", width: "100%", marginTop: 4 }}
          value={numPages}
          onChange={(e) => setNumPages(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Features</label>
        <div style={{ marginTop: 4 }}>
          {DEFAULT_FEATURES.map((f) => {
            const checked = !!selectedFeatures.find((sf) => sf.key === f.key);
            return (
              <label key={f.key} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleFeature(f)}
                />{" "}
                {f.label} ({f.complexity})
              </label>
            );
          })}
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Calculating..." : "Generate Plan & Cost"}
      </button>
    </form>
  );
}
