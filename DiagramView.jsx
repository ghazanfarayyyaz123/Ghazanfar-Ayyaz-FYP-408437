export default function DiagramView({ diagram }) {
  if (!diagram) return null;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        borderRadius: 8,
        height: "100%",
      }}
    >
      <h3 style={{ marginBottom: 8 }}>Generated Flow (Text View)</h3>

      <h4>Nodes</h4>
      <ul>
        {diagram.nodes.map((n) => (
          <li key={n.id}>
            [{n.type}] {n.label} (id: {n.id})
          </li>
        ))}
      </ul>

      <h4>Connections</h4>
      <ul>
        {diagram.edges.map((e, idx) => (
          <li key={idx}>
            {e.from} → {e.to} ({e.label})
          </li>
        ))}
      </ul>
    </div>
  );
}
