import heatran from "./assets/heatran.png";

const NotFound = (): JSX.Element => {
  return (
    <div>
      <img src={heatran} alt="Heatran" className="centered-image" />
      <h2 className="centered">404: Page not found</h2>
    </div>
  );
};

export default NotFound;
