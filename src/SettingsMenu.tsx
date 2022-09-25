import useLocalStorage from "use-local-storage";
import { Col, Divider, Row, Switch } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { latestVersion } from "./ChangeLog";
import { useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useCookies } from 'react-cookie';

const SettingsDivider = styled(Divider)({
  margin: "10px 0",
});

const SettingsMenu = (): JSX.Element => {

  const { switcher, themes } = useThemeSwitcher();
  const [cookies, setCookie] = useCookies(['currentTheme']);
  var currentTheme = cookies.currentTheme;

  function toggleTheme(isChecked: boolean) {
      currentTheme = isChecked? 'dark' : 'light';
      setCookie('currentTheme', currentTheme, { path: '/' });
      switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  const [openInDiscord, setOpenInDiscord] = useLocalStorage("openInDiscord", true);
  return (
    <div>
      <Row align="middle" gutter={[10, 0]}>
        <Col>Dark Mode</Col>
        <Col>
          <Switch checked={currentTheme == 'dark' || cookies.currentTheme == null ? true : false} onChange={toggleTheme} />
        </Col>
      </Row>
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
