// import { render, screen } from "@testing-library/react";
// import { expect, test } from "vitest";           // <-- add this line
// globalThis.expect = expect;                 // <-- make expect global for jest-dom

// import "@testing-library/jest-dom";
// import TaskCard from "./TaskCard";

// test("renders task title", () => {
//   const task = { id: 1, title: "Hello", status: "todo" };
//   render(<TaskCard task={task} />);
//   expect(screen.getByText("Hello")).toBeInTheDocument();
// });


import React from "react";                    // <-- add this line
import { render, screen } from "@testing-library/react";
import TaskCard from "./TaskCard";

test("renders task title", () => {
  render(<TaskCard task={{ id: 1, title: "Hello", status: "todo" }} />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});

