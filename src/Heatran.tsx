import React from "react";
const heatran = require("./assets/heatran.png");

const Heatran = (): JSX.Element => {
  return (
    <div>
      <img src={heatran} alt="Heatran" className="centered-image" />
      <h1 className="centered">404: Page not found</h1>
    </div>
  );
};

export default Heatran;
