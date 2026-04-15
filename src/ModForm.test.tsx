import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ModForm from "./ModForm";
import { notification } from "antd";
import * as moderationClipboard from "./moderationClipboard";

const validId = "123456789012345678";

function renderModForm(query: string) {
  return render(
    <MemoryRouter initialEntries={[`/modomator/${query}`]}>
      <Routes>
        <Route path="/modomator" element={<ModForm />} />
      </Routes>
    </MemoryRouter>
  );
}

function getCopyButton(container: HTMLElement): HTMLButtonElement {
  const icon = container.querySelector(".anticon-copy");
  const btn = icon?.closest("button");
  if (!btn) {
    throw new Error("Copy button not found");
  }
  return btn as HTMLButtonElement;
}

beforeEach(() => {
  jest.spyOn(notification, "open").mockImplementation(() => void 0);
  jest
    .spyOn(moderationClipboard, "copyModerationToClipboard")
    .mockResolvedValue(undefined);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("prefills id from query string and shows warning preview when action and reason selected", async () => {
  const user = userEvent.setup();
  renderModForm(`?id=${validId}`);

  expect(screen.getByLabelText(/discord id/i)).toHaveValue(validId);

  await user.click(screen.getByRole("radio", { name: /^Warning$/i }));
  await user.click(screen.getByRole("radio", { name: /^Harassment$/i }));

  const preview = document.getElementById("modform_textarea") as HTMLTextAreaElement;
  await waitFor(() => {
    expect(preview.value).toMatch(/^\?warn /);
  });
});

test("copies preview to clipboard and notifies", async () => {
  const user = userEvent.setup();
  const { container } = renderModForm(`?id=${validId}`);

  await user.click(screen.getByRole("radio", { name: /^Warning$/i }));
  await user.click(screen.getByRole("radio", { name: /^Harassment$/i }));

  const preview = document.getElementById("modform_textarea") as HTMLTextAreaElement;
  await waitFor(() => {
    expect(preview.value).toMatch(/^\?warn /);
  });

  const copyBtn = getCopyButton(container);
  expect(copyBtn).not.toBeDisabled();
  fireEvent.click(copyBtn);

  await waitFor(() => {
    expect(moderationClipboard.copyModerationToClipboard).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringMatching(/^\?warn /),
        actionLabel: "Warning",
      })
    );
  });
});
