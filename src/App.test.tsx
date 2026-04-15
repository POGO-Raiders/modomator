import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.history.pushState({}, "", "/modomator/");
});

test("renders title and main form", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /modomator/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/discord id/i)).toBeInTheDocument();
});
