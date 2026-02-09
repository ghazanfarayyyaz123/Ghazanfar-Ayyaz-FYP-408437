import { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import DiagramView from "../components/DiagramView";

export default function NewProject() {
  const [project, setProject] = useState(null);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>
        Automated Requirement & Cost Estimator
      </h1>
      <p style={{ marginBottom: 24 }}>
        Fill in your project details to generate a basic plan, flow diagram and
        cost estimation.
      </p>

      <ProjectForm onCreated={setProject} />

      {project && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div
            style={{
              border: "1px solid #ccc",
              padding: 16,
              borderRadius: 8,
            }}
          >
            <h3>Cost Summary</h3>
            <p>
              Estimated Cost:{" "}
              <strong>£{project.estimatedCost}</strong>
            </p>
            <p>
              Project Type: <strong>{project.projectType}</strong>
            </p>
            <p>
              Number of Pages: <strong>{project.numPages}</strong>
            </p>
            <p>
              Features Selected: <strong>{project.features.length}</strong>
            </p>
          </div>

          <DiagramView diagram={project.diagram} />
        </div>
      )}
    </div>
  );
}
