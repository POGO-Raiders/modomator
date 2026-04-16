import "./App.css";
import "antd/dist/reset.css";
import { Card, Radio, Button, Checkbox, Form, Input, InputNumber, notification, Flex, Typography } from "antd";
import React, { useEffect } from "react";
import { ModerationAction, MODERATION_ACTION_ORDER } from "./moderation/moderationAction";
import { copyModerationToClipboard } from "./moderation/moderationClipboard";
import {
  moderationReasonsForAction,
  normalizeMuteHoursInput,
} from "./moderation/moderationFormHelpers";
import { DISCORD_ID_PATTERN } from "./moderation/moderationPreview";
import { useModerationFormPreview } from "./hooks/useModerationFormPreview";
import { useModFormClear } from "./hooks/useModFormClear";
import { CopyOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

const ModForm = (): JSX.Element => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const clearForm = useModFormClear(form, searchParams);

  const action = Form.useWatch("action", form);

  const { moderationOutput, clipboardEnabled } = useModerationFormPreview(form);

  useEffect(() => {
    form.setFieldsValue({ id: searchParams.get("id") ?? "" });
  }, [searchParams, form]);

  useEffect(() => {
    form.setFieldsValue({
      textarea: moderationOutput?.moderationString ?? null,
    });
  }, [moderationOutput, form]);

  const actionSelected = action !== undefined && action !== null;
  const reasonsForAction =
    action != null
      ? moderationReasonsForAction(action as ModerationAction)
      : [];

  return (
    <div className="form-container">
      <Card className="mod-form-card" variant="borderless">
        <Form
          name="modform"
          className="mod-form"
          initialValues={{ id: searchParams.get("id"), modifiers: [], muteHours: 1 }}
          autoComplete="off"
          requiredMark={false}
          form={form}
          layout="vertical"
          size="middle"
        >
          <Form.Item
            label="Discord ID"
            name="id"
            rules={[
              {
                pattern: DISCORD_ID_PATTERN,
                message: "Not a valid Discord ID.",
              },
            ]}
          >
            <Input allowClear placeholder="Discord user ID" inputMode="numeric" autoComplete="off" />
          </Form.Item>

        <Form.Item name="action" label="Action">
          <Radio.Group
            className="mod-form-radio-grid mod-form-radio-grid--action"
            buttonStyle="solid"
            onChange={() => {
              form.resetFields(["reason", "modifiers", "muteHours"]);
            }}
          >
            {MODERATION_ACTION_ORDER.map((a) => (
              <Radio.Button value={a} key={a}>
                {a}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item name="reason" label={actionSelected ? "Reason" : undefined}>
          <Radio.Group className="mod-form-radio-grid mod-form-radio-grid--reason" buttonStyle="solid">
            {reasonsForAction.map((k) => (
              <Radio.Button value={k} key={k}>
                {k}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        {action === ModerationAction.Warning || action === ModerationAction.Mute ? (
          <Form.Item name="modifiers" label="Options" className="mod-form-modifiers">
            <Checkbox.Group options={["Verified Host"]} />
          </Form.Item>
        ) : null}

        {action === ModerationAction.Mute ? (
          <Form.Item
            name="muteHours"
            label="# of Hours"
            getValueFromEvent={(val: number | null) => normalizeMuteHoursInput(val)}
            rules={[
              {
                required: true,
                message: "How long should the mute last?",
              },
            ]}
          >
            <InputNumber min={1} max={24} />
          </Form.Item>
        ) : null}

        <Form.Item style={{ marginBottom: 0 }}>
          <Flex align="center" justify="space-between" style={{ marginBottom: 8 }}>
            <Typography.Text strong>Moderation text</Typography.Text>
            <Button
              htmlType="button"
              aria-label="Copy moderation text"
              icon={<CopyOutlined />}
              size="middle"
              type="default"
              disabled={!clipboardEnabled}
              onClick={() => {
                const text = moderationOutput?.moderationString;
                if (!text) return;
                copyModerationToClipboard({
                  text,
                  actionLabel: action?.toString() ?? "UNKNOWN",
                  notify: (message, durationSeconds = 2) => {
                    notification.open({ message, duration: durationSeconds });
                  },
                  shouldOpenDiscord: localStorage.getItem("openInDiscord") === "true",
                  discordChannelURL: moderationOutput.discordChannelURL,
                }).catch((err: unknown) => {
                  console.error("Copy to clipboard failed", err);
                  notification.error({ message: "Could not copy text on this device." });
                });
              }}
            >
              Copy
            </Button>
          </Flex>
          <Form.Item name="textarea" noStyle>
            <Input.TextArea
              autoSize={{ minRows: 3, maxRows: 12 }}
              readOnly={true}
              className="mod-form-output"
              placeholder="Select action and reason to generate text"
            />
          </Form.Item>
        </Form.Item>
      </Form>
      </Card>
      <Flex justify="center" align="center" style={{ marginTop: 10 }}>
        <Radio.Button type="link" onClick={clearForm}>
          Clear
        </Radio.Button>
      </Flex>
    </div>
  );
};

export default ModForm;
