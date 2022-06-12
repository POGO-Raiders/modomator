import "./App.css";
import React from "react";
import { Button, Layout, Popover } from "antd";
import ModForm from "./ModForm";
import SettingsMenu from "./SettingsMenu";
import { SettingOutlined } from "@ant-design/icons";
const logo = require("./assets/pgricon64.png");

const { Footer, Header } = Layout;

const App = (): JSX.Element => {
  return (
    <Layout style={{ background: "none" }}>
      <Header style={{ background: "none" }}>
        <h1 className="centered form-title">Modomator</h1>
        <Popover content={<SettingsMenu />} trigger="click" placement="bottomRight">
          <Button
            shape="circle"
            icon={<SettingOutlined />}
            style={{ position: "absolute", right: 18, top: 18 }}
          />
        </Popover>
      </Header>
      <ModForm />
      <Footer style={{ textAlign: "center", background: "none" }}>
        <img width={32} src={logo} alt="Pokémon Go Raiders logo" style={{ marginRight: 8 }} />
        Pokémon GO Raiders
      </Footer>
    </Layout>
  );
};

export default App;
