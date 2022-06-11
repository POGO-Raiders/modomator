import "./App.css";
import React from "react";
import { Layout } from "antd";
import ModForm from "./ModForm";
const logo = require('./assets/pgricon64.png');

const { Footer, Header } = Layout;

const App = (): JSX.Element => {
  return (
    <Layout style={{ background: "none" }}>
      <Header style={{ background: "none" }}>
        <h1 className="centered form-title">Modomator</h1>
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
