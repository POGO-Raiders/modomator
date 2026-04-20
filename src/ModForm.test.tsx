import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ModForm from "./ModForm";
import { notification } from "antd";
import * as moderationClipboard from "./moderation/moderationClipboard";

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

/** Clicks the hidden input for a Radio.Button `value` (reliable with antd v5 + RTL). */
function clickRadioValue(value: string) {
  const input = document.querySelector<HTMLInputElement>(
    `input.ant-radio-button-input[value="${CSS.escape(value)}"]`
  );
  if (!input) {
    throw new Error(`Radio value not found: ${value}`);
  }
  fireEvent.click(input);
}

async function selectWarningHarassment() {
  clickRadioValue("Warning");
  await waitFor(() =>
    expect(document.querySelector(`input.ant-radio-button-input[value="Harassment"]`)).toBeTruthy()
  );
  clickRadioValue("Harassment");
}

async function selectMuteFakeHosting() {
  clickRadioValue("Mute");
  await waitFor(() =>
    expect(
      document.querySelector(`input.ant-radio-button-input[value="Fake hosting"]`)
    ).toBeTruthy()
  );
  clickRadioValue("Fake hosting");
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
  vi.spyOn(notification, "open").mockImplementation(() => void 0);
  vi.spyOn(moderationClipboard, "copyModerationToClipboard").mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.removeItem("openInDiscord");
});

test("prefills id from query string and shows warning preview when action and reason selected", async () => {
  renderModForm(`?id=${validId}`);

  expect(screen.getByLabelText(/discord id/i)).toHaveValue(validId);

  await selectWarningHarassment();

  const preview = screen.getByRole("textbox", {
    name: /moderation preview/i,
  }) as HTMLTextAreaElement;
  await waitFor(() => {
    expect(preview.value).toMatch(/^\?warn /);
  });
});

test("Cmd/Ctrl+Enter keyboard shortcut triggers copy when clipboard is enabled", async () => {
  renderModForm(`?id=${validId}`);

  await selectWarningHarassment();

  await waitFor(() => {
    expect(
      (
        screen.getByRole("textbox", {
          name: /moderation preview/i,
        }) as HTMLTextAreaElement
      ).value
    ).toMatch(/^\?warn /);
  });

  fireEvent.keyDown(document.querySelector(".form-container")!, {
    key: "Enter",
    ctrlKey: true,
  });

  await waitFor(() => {
    expect(moderationClipboard.copyModerationToClipboard).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringMatching(/^\?warn /),
      })
    );
  });
});

test("Discord ID field shows error on invalid input and clears on valid input", async () => {
  const user = userEvent.setup();
  renderModForm("");

  const idInput = screen.getByLabelText(/discord id/i);
  await user.type(idInput, "abc");
  await user.tab();

  await waitFor(() => {
    expect(screen.getByText(/not a valid discord id/i)).toBeInTheDocument();
  });

  await user.clear(idInput);
  await user.type(idInput, "123456789012345678");
  await user.tab();

  await waitFor(() => {
    expect(screen.queryByText(/not a valid discord id/i)).not.toBeInTheDocument();
  });
});

test("Clear button is a real button element", () => {
  renderModForm("");
  expect(screen.getByRole("button", { name: /^clear$/i })).toBeInTheDocument();
});

test("Clear resets choices but keeps Discord ID from the current URL", async () => {
  const user = userEvent.setup();
  renderModForm(`?id=${validId}`);

  await selectWarningHarassment();

  const preview = screen.getByRole("textbox", {
    name: /moderation preview/i,
  }) as HTMLTextAreaElement;
  await waitFor(() => {
    expect(preview.value).toMatch(/^\?warn /);
  });

  await user.click(screen.getByText(/^Clear$/));

  expect(screen.getByLabelText(/discord id/i)).toHaveValue(validId);
  await waitFor(() => {
    expect(preview.value).toBe("");
  });
});

test("copies preview to clipboard and notifies", async () => {
  const { container } = renderModForm(`?id=${validId}`);

  await selectWarningHarassment();

  const preview = screen.getByRole("textbox", {
    name: /moderation preview/i,
  }) as HTMLTextAreaElement;
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

test("mute action shows hours field and mute text in preview", async () => {
  const user = userEvent.setup();
  renderModForm(`?id=${validId}`);

  await selectMuteFakeHosting();

  expect(screen.getByLabelText(/#\s*of\s*hours/i)).toBeInTheDocument();

  const preview = screen.getByRole("textbox", {
    name: /moderation preview/i,
  }) as HTMLTextAreaElement;
  await waitFor(() => {
    expect(preview.value).toMatch(/^\?mute /);
    expect(preview.value).toMatch(/1h/);
  });

  const hoursInput = screen.getByRole("spinbutton");
  await user.clear(hoursInput);
  await user.type(hoursInput, "5");

  await waitFor(() => {
    expect(preview.value).toMatch(/5h/);
  });
});

test("copy passes shouldOpenDiscord when localStorage is enabled", async () => {
  localStorage.setItem("openInDiscord", JSON.stringify(true));
  const { container } = renderModForm(`?id=${validId}`);

  await selectWarningHarassment();

  await waitFor(() => {
    expect(
      (
        screen.getByRole("textbox", {
          name: /moderation preview/i,
        }) as HTMLTextAreaElement
      ).value
    ).toMatch(/^\?warn /);
  });

  fireEvent.click(getCopyButton(container));

  await waitFor(() => {
    expect(moderationClipboard.copyModerationToClipboard).toHaveBeenCalledWith(
      expect.objectContaining({
        shouldOpenDiscord: true,
      })
    );
  });
});

test("copy logs error when clipboard helper rejects", async () => {
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => void 0);
  vi.spyOn(moderationClipboard, "copyModerationToClipboard").mockRejectedValueOnce(
    new Error("clipboard failed")
  );

  const { container } = renderModForm(`?id=${validId}`);

  await selectWarningHarassment();

  await waitFor(() => {
    expect(
      (
        screen.getByRole("textbox", {
          name: /moderation preview/i,
        }) as HTMLTextAreaElement
      ).value
    ).toMatch(/^\?warn /);
  });

  fireEvent.click(getCopyButton(container));

  await waitFor(() => {
    expect(errorSpy).toHaveBeenCalledWith("Copy to clipboard failed", expect.any(Error));
  });

  errorSpy.mockRestore();
});
