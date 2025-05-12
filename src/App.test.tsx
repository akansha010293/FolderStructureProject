import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { TreeProvider } from "./hooks/useTreeContext";

test("renders page header", () => {
  render(
    <TreeProvider>
      <App />
    </TreeProvider>
  );
  const header = screen.getByText(/Folder Structure Maker/i);
  expect(header).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(
    <TreeProvider>
      <App />
    </TreeProvider>
  );
  const addButton = screen.getByRole("button", {
    name: /Add root folder/i,
  });
  expect(addButton).toBeInTheDocument();
});
