import { theme } from "antd";
import heatran from "./assets/heatran.png";

const NotFound = (): JSX.Element => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        gap: 16,
        color: token.colorTextHeading,
      }}
    >
      <img
        src={heatran}
        alt="Heatran"
        style={{ width: 220, maxWidth: "100%", display: "block" }}
      />
      <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700, color: token.colorTextHeading }}>
        404: Page not found
      </h2>
    </div>
  );
};

export default NotFound;
