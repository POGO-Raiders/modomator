import "./App.css";
import "antd/dist/antd.min.css";
import { Radio, Button, Checkbox, Form, Input, InputNumber, Tooltip, notification } from "antd";
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
            {MODERATION_ACTION_ORDER.map((a) => (
              <Radio.Button value={a} key={a}>
                {a}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item name="reason" label={actionSelected ? "Reason" : undefined}>
          <Radio.Group buttonStyle="solid">
            {reasonsForAction.map((k) => (
              <Radio.Button value={k} key={k}>
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
        <Radio.Button type="link" onClick={clearForm}>
          Clear
        </Radio.Button>
      </ClearContainer>
    </div>
  );
};

export default ModForm;
