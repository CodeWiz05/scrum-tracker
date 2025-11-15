import TaskCard from "../TaskCard/TaskCard";

export default function Column({ title, tasks = [], onMove }) {
  const columnStyle = {
    background: "#f5f5f5",
    borderRadius: 16,
    padding: 20,
    minHeight: 200,
    border: "1px solid #ddd",
  };

  const headerStyle = {
    margin: "0 0 16px 0",
    fontSize: 18,
    fontWeight: 600,
    color: "#1f2937",
  };

  return (
    <div style={columnStyle}>
      <h3 style={headerStyle}>
        {title} <span style={{ opacity: 0.6 }}>({tasks.length})</span>
      </h3>

      {tasks.length === 0 && (
        <div style={{ opacity: 0.6, fontSize: 14 }}>No tasks</div>
      )}

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onMove={onMove}   // ✅ pass onMove to TaskCard
        />
      ))}
    </div>
  );
}
