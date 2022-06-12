import "./App.css";
import "antd/dist/antd.min.css";
import { notification, Radio, Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import ModerationMap from "./ModerationMap";
import { ModerationFactory, ModerationType } from "./Moderation";

const ModForm = (): JSX.Element => {
  const copyToClipboard = (str: string) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject("The Clipboard API is not available.");
  };

  const openNotification = (type: string) => {
    notification.open({
      message: `${type} copied to clipboard.`,
      duration: 2,
    });
  };

  const [moderationType, setModerationType] = useState<ModerationType>();

  const onFinish = (formData: any) => {
    console.log(formData);
    // TODO: Handle error case better
    if (!moderationType) return;
    const moderation = ModerationFactory.create(moderationType, formData);
    const copyString = moderation.moderationString;
    copyToClipboard(copyString);
    openNotification(moderationType);
    window.open(moderation.discordChannelURL);
  };

  const onFinishFailed = (errorInfo: any) => {
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
          <Button
            type="default"
            htmlType="submit"
            onClick={() => setModerationType(ModerationType.Warning)}
          >
            Warn
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            danger={true}
            onClick={() => setModerationType(ModerationType.Ban)}
          >
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
