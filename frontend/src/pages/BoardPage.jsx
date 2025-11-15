// import { useState } from "react";
// import TaskBoard from "../components/TaskBoard/TaskBoard";
// import TaskForm from "../components/TaskForm/TaskForm";

// export default function BoardPage() {

//   // fake data for now
//   const [tasks, setTasks] = useState([
//     { id: 1, title: "Learn Jenkins", status: "todo" },
//     { id: 2, title: "Setup Backend API", status: "inprogress" },
//     { id: 3, title: "Write Unit Test", status: "done" },
//   ]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Scrum Task Board</h1>

//       <TaskForm />

//       <TaskBoard tasks={tasks} />
//     </div>
//   );
// }


// import { useState } from "react";
// import TaskBoard from "../components/TaskBoard/TaskBoard";
// import TaskForm from "../components/TaskForm/TaskForm";
// import Header from "../components/Header/Header";

// export default function BoardPage() {

//   // fake data for now
//   const [tasks, setTasks] = useState([
//     { id: 1, title: "Learn Jenkins", status: "todo" },
//     { id: 2, title: "Setup Backend API", status: "inprogress" },
//     { id: 3, title: "Write Unit Test", status: "done" },
//   ]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <Header />

//       <TaskForm />

//       <TaskBoard tasks={tasks} />
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import TaskBoard from "../components/TaskBoard/TaskBoard";
// import TaskForm from "../components/TaskForm/TaskForm";
// import Header from "../components/Header/Header"; // keep if you have it
// import { getTasks, createTask, updateTask } from "../api/tasks";


// export default function BoardPage() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // load from backend once on mount
//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const data = await getTasks();
//         setTasks(Array.isArray(data) ? data : []);
//       } catch (e) {
//         setError(e.message || "Failed to load tasks");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // create task -> POST -> append to state
//   const handleAdd = async (title) => {
//     try {
//       const created = await createTask(title.trim());
//       setTasks((prev) => [...prev, created]);
//     } catch (e) {
//       alert(e.message || "Failed to create task");
//     }
//   };

//   // move task -> PUT -> replace in state
//   const handleMove = async (id, nextStatus) => {
//     try {
//       const updated = await updateTask(id, nextStatus); // expects {id,title,status}
//       setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
//     } catch (e) {
//       alert(e.message || "Failed to update task");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       {/* Optional header */}
//       {Header ? <Header /> : <h1>Scrum Task Board</h1>}

//       {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}
//       {loading ? (
//         <div style={{ marginTop: 12 }}>Loading…</div>
//       ) : (
//         <>
//           <TaskForm onAdd={handleAdd} />
//           <TaskBoard tasks={tasks} onMove={handleMove} />
//         </>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import TaskBoard from "../components/TaskBoard/TaskBoard";
import TaskForm from "../components/TaskForm/TaskForm";
import Header from "../components/Header/Header"; // keep if you have it
import { getTasks, createTask, updateTask } from "../api/tasks";

// Demo data used only if backend isn't reachable
const DEMO = [
  { id: 1, title: "Learn Jenkins", status: "todo" },
  { id: 2, title: "Setup Backend API", status: "inprogress" },
  { id: 3, title: "Write Unit Test", status: "done" },
];

export default function BoardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load tasks: try backend, else show demo
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getTasks();
        setTasks(Array.isArray(data) ? data : []);
      } catch (e) {
        console.warn("GET /api/tasks failed, using demo data:", e?.message || e);
        setTasks(DEMO);
        setError("Backend not reachable — showing demo data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Create task: try POST, else append locally
  const handleAdd = async (title) => {
    const t = title?.trim();
    if (!t) return;
    try {
      const created = await createTask(t); // expects { id, title, status: "todo" }
      setTasks((prev) => [...prev, created]);
    } catch (e) {
      console.warn("POST /api/tasks failed, adding locally:", e?.message || e);
      const created = { id: Date.now(), title: t, status: "todo" };
      setTasks((prev) => [...prev, created]);
    }
  };

  // Move task: try PUT, else update locally
   const handleMove = async (id, nextStatus) => {
    try {
      const updated = await updateTask(id, nextStatus); 
      setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch {
      // fallback (local update so card moves even without backend)
      setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, status: nextStatus } : t))
      );
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {Header ? <Header /> : <h1>Scrum Task Board</h1>}

      {error && (
        <div style={{ color: "crimson", marginTop: 8, marginBottom: 8 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ marginTop: 12 }}>Loading…</div>
      ) : (
        <>
          <TaskForm onAdd={handleAdd} />
          <TaskBoard tasks={tasks} onMove={handleMove} />
        </>
      )}
    </div>
  );
}
