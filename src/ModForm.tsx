import "./App.css";
import "antd/dist/antd.min.css";
import { Radio, Button, Checkbox, Form, Input, InputNumber, Tooltip, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ModerationMap from "./ModerationMap";
import { ModerationFactory, ModerationAction, Moderation } from "./Moderation";
import { CopyOutlined } from "@ant-design/icons";

const ModForm = (): JSX.Element => {
  const [form] = Form.useForm();

  const copyToClipboard = (str: string) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(str);
    }
    return Promise.reject("The Clipboard API is not available.");
  };

  const openNotification = (type: string) => {
    notification.open({
      message: `${type} copied to clipboard.`,
      duration: 2,
    });
  };

  const [id, setId] = useState<string>();
  const [action, setAction] = useState<ModerationAction>();
  const [reason, setReason] = useState<string>();
  const [modifiers, setModifiers] = useState<string[]>([]);
  const [muteHours, setMuteHours] = useState<number>(1);
  const [clipboardEnabled, setClipboardEnabled] = useState<boolean>(false);
  const moderation = useRef<Moderation>();

  useEffect(() => {
    form.setFieldsValue({ textarea: null });
    setClipboardEnabled(false);
    form
      .validateFields()
      .then(() => {
        if (!action || !reason || !id) return;
        moderation.current = ModerationFactory.create(action, {
          id,
          reason,
          modifiers,
          muteHours,
        });
        form.setFieldsValue({ textarea: moderation.current?.moderationString });
        setClipboardEnabled(true);
      })
      .catch(() => {});
  }, [id, form, action, reason, modifiers, muteHours, moderation]);

  return (
    <div className="form-container">
      <Form
        name="modform"
        initialValues={{ modifiers: [], mutehours: 1 }}
        autoComplete="off"
        requiredMark={false}
        form={form}
      >
        <Form.Item
          label="Discord ID"
          name="id"
          rules={[
            {
              pattern: /^\d{18}$/,
              message: "Not a valid Discord ID.",
            },
          ]}
        >
          <Input onChange={(e) => setId(e.target.value)} />
        </Form.Item>

        <Form.Item name="action" label="Action">
          <Radio.Group
            buttonStyle="solid"
            onChange={(e) => {
              setAction(ModerationAction[e.target.value as keyof typeof ModerationAction]);
              form.resetFields(["reason", "modifiers", "mutehours"]);
            }}
          >
            {Object.keys(ModerationAction).map((k, i) => (
              <Radio.Button value={k} key={i}>
                {k}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="reason"
          label={action !== undefined ? "Reason" : undefined}
          onReset={() => setReason(undefined)}
        >
          <Radio.Group buttonStyle="solid" onChange={(e) => setReason(e.target.value)}>
            {Object.keys(ModerationMap)
              .filter((m) => ModerationMap[m].categories.includes(action!))
              .map((k, i) => (
                <Radio.Button value={k} key={i}>
                  {k}
                </Radio.Button>
              ))}
          </Radio.Group>
        </Form.Item>

        {action === ModerationAction.Warning ? (
          <Form.Item name="modifiers" valuePropName="checked" onReset={() => setModifiers([])}>
            <Checkbox.Group
              options={["Verified Host"]}
              onChange={(v) => setModifiers(v as string[])}
            />
          </Form.Item>
        ) : null}

        {action === ModerationAction.Mute ? (
          <Form.Item
            name="mutehours"
            label="# of Hours"
            onReset={() => setMuteHours(1)}
            rules={[
              {
                required: true,
                message: "How long should the mute last?",
              },
            ]}
          >
            <InputNumber min={1} max={24} onChange={setMuteHours} />
          </Form.Item>
        ) : null}

        <Form.Item>
          <Form.Item name="textarea" noStyle>
            <Input.TextArea autoSize={true} readOnly={true} style={{ width: "calc(100% - 40px)" }} />
          </Form.Item>
          <Tooltip title="Copy to clipboard">
            <Button
              icon={<CopyOutlined />}
              style={{ float: "right" }}
              disabled={!clipboardEnabled}
              onClick={() => {
                copyToClipboard(form.getFieldValue("textarea")).then(() => {
                  openNotification(action?.toString() ?? "UNKNOWN");
                  if (localStorage.getItem("openInDiscord") === "true")
                    window.open(moderation.current?.discordChannelURL);
                });
              }}
            />
          </Tooltip>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModForm;
