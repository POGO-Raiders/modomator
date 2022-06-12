import useLocalStorage from "use-local-storage";
import { Col, Row, Switch } from "antd";
import React from "react";

const SettingsMenu = ({ className }: { className: string }): JSX.Element => {
  const [openInDiscord, setOpenInDiscord] = useLocalStorage("openInDiscord", true);

  return (
    <div className={className}>
      <Row align="middle" gutter={[10, 0]}>
        <Col>Open in Discord</Col>
        <Col>
          <Switch defaultChecked={openInDiscord} onChange={setOpenInDiscord} />
        </Col>
      </Row>
    </div>
  );
};

export default SettingsMenu;
