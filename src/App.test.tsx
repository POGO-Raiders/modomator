import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { latestVersion } from "./ChangeLog";

beforeEach(() => {
  window.history.pushState({}, "", "/modomator/");
});

test("renders title and main form", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /modomator/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/discord id/i)).toBeInTheDocument();
});

test("shows changelog at /modomator/changelog", () => {
  window.history.pushState({}, "", "/modomator/changelog");
  render(<App />);
  expect(screen.getByText(latestVersion)).toBeInTheDocument();
});

test("shows not found for unknown paths under basename", () => {
  window.history.pushState({}, "", "/modomator/no-such-page");
  render(<App />);
  expect(screen.getByRole("heading", { name: /404.*page not found/i })).toBeInTheDocument();
});
