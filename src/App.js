import "./App.css";
import React from "react";
import { Layout } from "antd";
import ModForm from "./ModForm";

const { Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <ModForm />
      <Footer style={{ textAlign: "center" }}>Pokémon GO Raiders</Footer>
    </Layout>
  );
};

export default App;
