import "./App.css";
import React, { useEffect } from "react";
import { Button, ConfigProvider, Layout, Popover, theme } from "antd";
import ModForm from "./ModForm";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SettingsMenu from "./SettingsMenu";
import { SettingOutlined } from "@ant-design/icons";
import NotFound from "./NotFound";
import { ChangeLog } from "./ChangeLog";
import { useLocalStorage } from "./hooks/useLocalStorage";

import logo from "./assets/pgricon64.png";
import { getAntdTheme } from "./theme/antTheme";

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
    <Layout style={{ minHeight: "100dvh" }}>
      <Header style={{ background: "none" }}>
        <h1 className="centered form-title">Modomator</h1>
        <Popover
          content={<SettingsMenu darkMode={isDark} onDarkModeChange={setDarkMode} />}
          trigger="click"
          placement="bottomRight"
        >
          <Button
            shape="circle"
            icon={<SettingOutlined />}
            aria-label="Settings"
            style={{ position: "absolute", right: 18, top: 18 }}
          />
        </Popover>
      </Header>

      <Routes>
        <Route path="/" element={<ModForm />} />
        <Route path="/changelog" element={<ChangeLog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer style={{ textAlign: "center", background: "none" }}>
        <img width={32} src={logo} alt="Pokémon Go Raiders logo" style={{ marginRight: 8 }} />
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
