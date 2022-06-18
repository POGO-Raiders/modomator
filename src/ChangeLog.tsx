import { Timeline } from "antd";
import React from "react";

const ChangeLog = (): JSX.Element => {
  return (
      <Timeline mode='left'>
        <Timeline.Item>Test</Timeline.Item>
        <Timeline.Item>Test</Timeline.Item>
        <Timeline.Item>Test</Timeline.Item>
      </Timeline>
  );
};

export default ChangeLog;
