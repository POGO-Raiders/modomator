import { useLocalStorage } from "./hooks/useLocalStorage";
import { Col, Divider, Row, Switch } from "antd";
import { Link } from "react-router-dom";
import { version } from "../package.json";

export type SettingsMenuProps = {
  darkMode: boolean;
  onDarkModeChange: (dark: boolean) => void;
};

const SettingsMenu = ({ darkMode, onDarkModeChange }: SettingsMenuProps): JSX.Element => {
  const [openInDiscord, setOpenInDiscord] = useLocalStorage("openInDiscord", true);

  return (
    <div>
      <Row align="middle" gutter={[10, 0]}>
        <Col>Dark Mode</Col>
        <Col>
          <Switch checked={darkMode} onChange={onDarkModeChange} aria-label="Dark Mode" />
        </Col>
      </Row>
      <Divider style={{ margin: "10px 0" }} />
      <Row align="middle" gutter={[10, 0]}>
        <Col>Open in Discord</Col>
        <Col>
          <Switch checked={openInDiscord} onChange={setOpenInDiscord} />
        </Col>
      </Row>
      <Divider style={{ margin: "10px 0" }} />
      <Row justify="center">{`v${version}`}</Row>
      <Row justify="center">
        <Link to="/changelog">View changelog</Link>
      </Row>
    </div>
  );
};

export default SettingsMenu;
