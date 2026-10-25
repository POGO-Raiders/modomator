import "./App.css";
import { Suspense, lazy, useEffect, type JSX } from "react";
import { Button, ConfigProvider, Layout, Popover, Spin, theme } from "antd";
import ModForm from "./ModForm";
import { Route, Routes, BrowserRouter as Router } from "react-router";
import { SettingOutlined } from "@ant-design/icons";
import { useLocalStorage } from "./hooks/useLocalStorage";

import logo from "./assets/pgricon64.png";
import { getAntdTheme } from "./theme/antTheme";

const ChangeLog = lazy(async () => import("./ChangeLog").then((m) => ({ default: m.ChangeLog })));
const NotFound = lazy(() => import("./NotFound"));
const SettingsMenu = lazy(() => import("./SettingsMenu"));

const { Footer, Header } = Layout;

/** Renders inside `ConfigProvider` so `useToken()` matches the active theme — page canvas without touching `document`. */
function AppThemedShell({
  isDark,
  setDarkMode,
}: {
  isDark: boolean;
  setDarkMode: (value: boolean) => void;
}): JSX.Element {
  const { token } = theme.useToken();
  useEffect(() => {
    document.documentElement.style.backgroundColor = token.colorBgLayout;
    document.body.style.backgroundColor = token.colorBgLayout;

    const themeColorMeta = document.querySelector<HTMLMetaElement>("meta[name='theme-color']");
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", token.colorBgLayout);
    }
  }, [token.colorBgLayout]);

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <h1 className="centered form-title">Modomator</h1>
        <Popover
          content={
            <Suspense fallback={<Spin size="small" />}>
              <SettingsMenu darkMode={isDark} onDarkModeChange={setDarkMode} />
            </Suspense>
          }
          trigger="click"
          placement="bottomRight"
        >
          <Button
            className="app-settings-btn"
            shape="circle"
            icon={<SettingOutlined />}
            aria-label="Settings"
          />
        </Popover>
      </Header>

      <Suspense
        fallback={
          <div className="form-container centered">
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<ModForm />} />
          <Route path="/changelog" element={<ChangeLog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer className="centered">
        <img className="app-footer-logo" width={32} src={logo} alt="Pokémon Go Raiders logo" />
        Pokémon GO Raiders
      </Footer>
    </Layout>
  );
}

const App = (): JSX.Element => {
  const [isDark, setDarkMode] = useLocalStorage("darkMode", true);

  return (
    <Router basename="/modomator">
      <ConfigProvider theme={getAntdTheme(isDark)}>
        <AppThemedShell isDark={isDark} setDarkMode={setDarkMode} />
      </ConfigProvider>
    </Router>
  );
};

export default App;
