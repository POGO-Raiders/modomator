import "./App.css";
import "antd/dist/antd.min.css";
import { Radio, Button, Checkbox, Form, Input, InputNumber, Tooltip, notification } from "antd";
import React, { useEffect } from "react";
import ModerationMap, { type ModerationReason } from "./ModerationMap";
import { ModerationAction } from "./Moderation";
import { copyModerationToClipboard } from "./moderationClipboard";
import { DISCORD_ID_PATTERN } from "./moderationPreview";
import { useModerationPreview } from "./useModerationPreview";
import { CopyOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const ClearContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ModForm = (): JSX.Element => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const id = Form.useWatch("id", form);
  const action = Form.useWatch("action", form);
  const reason = Form.useWatch("reason", form);
  const modifiers = Form.useWatch("modifiers", form);
  const muteHours = Form.useWatch("muteHours", form);

  const { moderationOutput, clipboardEnabled } = useModerationPreview({
    id: typeof id === "string" ? id : undefined,
    action: action as ModerationAction | undefined,
    reason: reason as ModerationReason | undefined,
    modifiers: Array.isArray(modifiers) ? modifiers : [],
    muteHours: typeof muteHours === "number" ? muteHours : undefined,
  });

  useEffect(() => {
    form.setFieldsValue({ id: searchParams.get("id") ?? "" });
  }, [searchParams, form]);

  useEffect(() => {
    form.setFieldsValue({
      textarea: moderationOutput?.moderationString ?? null,
    });
  }, [moderationOutput, form]);

  const actionSelected = action !== undefined && action !== null;

  return (
    <div className="form-container">
      <Form
        name="modform"
        initialValues={{ id: searchParams.get("id"), modifiers: [], muteHours: 1 }}
        autoComplete="off"
        requiredMark={false}
        form={form}
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
          <Input />
        </Form.Item>

        <Form.Item name="action" label="Action">
          <Radio.Group
            buttonStyle="solid"
            onChange={() => {
              form.resetFields(["reason", "modifiers", "muteHours"]);
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
          label={actionSelected ? "Reason" : undefined}
        >
          <Radio.Group buttonStyle="solid">
            {(action
              ? Object.keys(ModerationMap).filter((m) =>
                  ModerationMap[m as ModerationReason].categories.includes(action as ModerationAction)
                )
              : []
            ).map((k, i) => (
              <Radio.Button value={k} key={i}>
                {k}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        {action === ModerationAction.Warning || action === ModerationAction.Mute ? (
          <Form.Item name="modifiers">
            <Checkbox.Group options={["Verified Host"]} />
          </Form.Item>
        ) : null}

        {action === ModerationAction.Mute ? (
          <Form.Item
            name="muteHours"
            label="# of Hours"
            getValueFromEvent={(val: number | null) =>
              val == null || val < 1 ? 1 : val > 24 ? 24 : val
            }
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
          <Form.Item name="textarea" noStyle>
            <Input.TextArea
              autoSize={true}
              readOnly={true}
              style={{ width: "calc(100% - 40px)" }}
            />
          </Form.Item>
          <Tooltip title="Copy to clipboard">
            <Button
              htmlType="button"
              aria-label="Copy to clipboard"
              icon={<CopyOutlined />}
              style={{ float: "right" }}
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
                });
              }}
            />
          </Tooltip>
        </Form.Item>
      </Form>
      <ClearContainer>
        <Radio.Button type="link" onClick={() => form.resetFields()}>
          Clear
        </Radio.Button>
      </ClearContainer>
    </div>
  );
};

export default ModForm;
