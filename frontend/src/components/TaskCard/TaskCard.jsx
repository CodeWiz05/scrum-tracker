
// import React from "react";          // <-- add this line


// export default function TaskCard({ task }) {
//   if (!task) return null;

//   const card = {
//     background: "grey",   // FULL grey card
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//     width: "100%",
//   };

//   const title = { 
//     margin: 0, 
//     fontSize: 16, 
//     fontWeight: 600, 
//     color: "white"        // visible on grey
//   };

//   return (
//     <div style={card}>
//       <p style={title}>{task.title}</p>

//       <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//         <button>To In Progress</button>
//         <button>To Done</button>
//       </div>
//     </div>
//   );
// }


import React from "react";

export default function TaskCard({ task, onMove }) {
  if (!task) return null;

  const card = {
  background: "grey",
  borderRadius: 8,
  padding: 16,
  marginBottom: 12,
  width: "100%",
  boxSizing: "border-box",     // ✅ fixes overflow
};


  const setStatus = (status) => onMove?.(task.id, status);

  return (
    <div style={card}>
      <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "white" }}>
        {task.title}
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={() => setStatus("todo")}>To Do</button>
        <button onClick={() => setStatus("inprogress")}>In Progress</button>
        <button onClick={() => setStatus("done")}>Done</button>
      </div>
    </div>
  );
}
