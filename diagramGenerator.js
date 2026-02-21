function generateDiagram(project) {
  const nodes = [];
  const edges = [];

  nodes.push({ id: "home", label: "Home", type: "page" });

  if (project.features?.some((f) => f.key === "auth")) {
    nodes.push({ id: "login", label: "Login / Signup", type: "page" });
    edges.push({ from: "home", to: "login", label: "User Authentication" });
  }

  nodes.push({ id: "main", label: "Main Area", type: "page" });
  edges.push({ from: "home", to: "main", label: "Navigate" });

  if (project.features?.some((f) => f.key === "payments")) {
    nodes.push({ id: "checkout", label: "Checkout / Payments", type: "feature" });
    edges.push({ from: "main", to: "checkout", label: "Purchase Flow" });
  }

  if (project.features?.some((f) => f.key === "admin")) {
    nodes.push({ id: "admin", label: "Admin Panel", type: "feature" });
    edges.push({ from: "main", to: "admin", label: "Admin Access" });
  }

  return { nodes, edges };
}

module.exports = { generateDiagram };
