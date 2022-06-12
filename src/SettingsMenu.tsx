import { SettingOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import React from "react";

const SettingsMenu = ({ className }: { className: string }): JSX.Element => {

  const openInDiscordChanged = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className={className}>
      <Switch
        checkedChildren={<SettingOutlined />}
        unCheckedChildren={<SettingOutlined />}
        defaultChecked
        onChange={openInDiscordChanged}
      />
    </div>
  );
};

export default SettingsMenu;
