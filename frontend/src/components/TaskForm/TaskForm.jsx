import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    await onAdd?.(t);   // <-- calls BoardPage handler (will POST)
    setTitle("");
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, marginTop: 12 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
