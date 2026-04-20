import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("dark mode toggle changes background colour", async () => {
  const user = userEvent.setup();
  render(<App />);

  const settingsBtn = screen.getByRole("button", { name: /settings/i });
  await user.click(settingsBtn);

  const darkSwitch = await screen.findByRole("switch", { name: /dark mode/i });
  const before = document.body.style.backgroundColor;
  await user.click(darkSwitch);
  const after = document.body.style.backgroundColor;

  expect(before).not.toBe(after);
});
