import React from "react";
import heatran from "./assets/heatran.png";

const NotFound = (): JSX.Element => {
  return (
    <div>
      <img src={heatran} alt="Heatran" className="centered-image" />
      <h1 className="centered">404: Page not found</h1>
    </div>
  );
};

export default NotFound;
