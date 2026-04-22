import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useLocalStorage } from "./hooks/useLocalStorage";
import SettingsMenu from "./SettingsMenu";
import { latestVersion } from "./ChangeLog";
import { getAntdTheme } from "./theme/antTheme";

function SettingsMenuHarness(): JSX.Element {
  const [isDark, setDarkMode] = useLocalStorage("darkMode", true);
  return (
    <ConfigProvider theme={getAntdTheme(isDark)}>
      <SettingsMenu darkMode={isDark} onDarkModeChange={setDarkMode} />
    </ConfigProvider>
  );
}

function renderSettingsMenu() {
  return render(
    <MemoryRouter basename="/modomator" initialEntries={["/modomator/"]}>
      <SettingsMenuHarness />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
});

test("shows version label and link to changelog", () => {
  renderSettingsMenu();
  expect(screen.getByText(`v${latestVersion}`)).toBeInTheDocument();
  const changelogLink = screen.getByRole("link", { name: /view changelog/i });
  expect(changelogLink.getAttribute("href")).toMatch(/changelog$/);
});

function getAntSwitches(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(".ant-switch"));
}

test("dark mode switch updates localStorage", async () => {
  const user = userEvent.setup();
  const { container } = renderSettingsMenu();

  const switches = getAntSwitches(container);
  expect(switches).toHaveLength(2);

  await user.click(switches[0]);
  expect(localStorage.getItem("darkMode")).toBe("false");

  await user.click(switches[0]);
  expect(localStorage.getItem("darkMode")).toBe("true");
});

test("Open in Discord switch updates localStorage", async () => {
  const user = userEvent.setup();
  const { container } = renderSettingsMenu();

  const switches = getAntSwitches(container);
  await user.click(switches[1]);
  expect(localStorage.getItem("openInDiscord")).toBe("false");

  await user.click(switches[1]);
  expect(localStorage.getItem("openInDiscord")).toBe("true");
});
