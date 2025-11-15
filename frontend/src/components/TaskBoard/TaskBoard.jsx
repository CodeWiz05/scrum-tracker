// import TaskCard from "../TaskCard/TaskCard";

// export default function TaskBoard({ tasks = [] }) {
//   const columns = [
//     { key: "todo", title: "To Do" },
//     { key: "inprogress", title: "In Progress" },
//     { key: "done", title: "Done" },
//   ];

//   const wrapper = {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr 1fr",
//     gap: "16px",
//     marginTop: "16px",
//   };

//   const columnStyle = {
//     border: "1px solid #ddd",
//     borderRadius: 8,
//     padding: 12,
//     minHeight: 200,
//   };

//   const columnTitle = { margin: 0, marginBottom: 8, fontSize: 18 };

//   return (
//     <div style={wrapper}>
//       {columns.map((col) => {
//         const items = tasks.filter((t) => t.status === col.key);
//         return (
//           <div key={col.key} style={columnStyle}>
//             <h3 style={columnTitle}>{col.title}</h3>
//             {items.map((t) => (
//               <TaskCard key={t.id} task={t} />
//             ))}
//             {items.length === 0 && <div style={{ opacity: 0.6 }}>No tasks</div>}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// import Column from "../TaskBoard/Column";

// export default function TaskBoard({ tasks = [] }) {
//   const columns = [
//     { key: "todo", title: "To Do" },
//     { key: "inprogress", title: "In Progress" },
//     { key: "done", title: "Done" },
//   ];

//   const wrapper = {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr 1fr",
//     gap: "16px",
//     marginTop: "16px",
//   };

//   return (
//     <div style={wrapper}>
//       {columns.map((col) => {
//         const items = tasks.filter((t) => t.status === col.key);
//         return (
//           <Column key={col.key} title={col.title} tasks={items} />
//         );
//       })}
//     </div>
//   );
// }


import Column from "../TaskBoard/Column";

export default function TaskBoard({ tasks = [], onMove }) {
  const columns = [
    { key: "todo",       title: "To Do" },
    { key: "inprogress", title: "In Progress" },
    { key: "done",       title: "Done" },
  ];

  const wrapper = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
    marginTop: "16px",
  };

  return (
    <div style={wrapper}>
      {columns.map((col) => {
        const items = tasks.filter((t) => t.status === col.key);
        return (
          <Column
            key={col.key}
            title={col.title}
            tasks={items}
            onMove={onMove}   // <-- forward it
          />
        );
      })}
    </div>
  );
}
