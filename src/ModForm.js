import "./App.css";
import "antd/dist/antd.min.css";
import { notification, Radio, Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import ModerationMap from "./ModerationMap";

const ModForm = () => {
  const copyToClipboard = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject("The Clipboard API is not available.");
  };

  const openNotification = (type) => {
    notification.open({
      message: `${type} copied to clipboard.`,
      duration: 2,
    });
  };

  const [type, setType] = useState("");

  const onFinish = (values) => {
    const copyString = generateModerationString(type, values.id, values.reason, values.verified);
    copyToClipboard(copyString);
    openNotification(type);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="form-container">
      <Form
        name="modform"
        initialValues={{ verified: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="Discord ID"
          name="id"
          rules={[{ required: true, message: "Input the member's ID." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason"
          rules={[{ required: true, message: "Select a reason for moderation." }]}
        >
          <Radio.Group buttonStyle="solid">
            {Object.keys(ModerationMap).map((k, i) => (
              <Radio.Button value={k} key={i}>
                {k}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item name="verified" valuePropName="checked">
          <Checkbox>Verified Host</Checkbox>
        </Form.Item>

        <Form.Item style={{ float: "right" }}>
          <Button type="default" htmlType="submit" onClick={() => setType("Warn")}>
            Warn
          </Button>
          <Button type="primary" htmlType="submit" danger={true} onClick={() => setType("Ban")}>
            Ban
          </Button>
          <Button type="link" htmlType="reset">
            Clear
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModForm;

function generateModerationString(type, id, reason, verified) {
  if (type === "Ban") {
    return `?ban ${id} ${ModerationMap[reason]} If you wish to appeal this ban, go to https://www.pogoraiders.gg/appeal`;
  }

  if (type === "Warn") {
    const verifiedString = verified
      ? "Your Verified Host Status will be reviewed as a result of this warning."
      : "";
    return `?warn ${id} ${ModerationMap[reason]} ${verifiedString}`;
  }

  return "ERROR";
}
