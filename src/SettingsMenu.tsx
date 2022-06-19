import useLocalStorage from "use-local-storage";
import { Col, Divider, Row, Switch } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { latestVersion } from "./ChangeLog";

const SettingsDivider = styled(Divider)({
  margin: "10px 0",
});

const SettingsMenu = (): JSX.Element => {
  const [openInDiscord, setOpenInDiscord] = useLocalStorage("openInDiscord", true);

  return (
    <div>
      <Row align="middle" gutter={[10, 0]}>
        <Col>Open in Discord</Col>
        <Col>
          <Switch defaultChecked={openInDiscord} onChange={setOpenInDiscord} />
        </Col>
      </Row>
      <SettingsDivider />
      <Row justify="center">{`v${latestVersion}`}</Row>
      <Row justify="center">
        <Link to="modomator/changelog">View changelog</Link>
      </Row>
    </div>
  );
};

export default SettingsMenu;
