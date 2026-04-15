import { Timeline, theme } from "antd";
import type { GlobalToken } from "antd";
import "./App.css";
import React from "react";
import styled from "styled-components";

const Version = styled.h1({
  lineHeight: 1,
  fontWeight: 700,
});

const dateCodeStyle = (t: GlobalToken): React.CSSProperties => ({
  margin: "0 1px",
  padding: "0.2em 0.4em",
  fontSize: "0.9em",
  background: t.colorFillAlter,
  border: `1px solid ${t.colorBorderSecondary}`,
  borderRadius: 3,
  color: t.colorText,
});

// Inspired by https://ant.design/changelog

export const ChangeLog = (): JSX.Element => {
  const { token } = theme.useToken();
  return (
    <div className="form-container">
      <Timeline
        mode="left"
        items={changes.map((change, i) => ({
          key: i,
          children: (
            <>
              <Version style={{ color: token.colorTextHeading }}>{change.version}</Version>
              <p>
                <code style={dateCodeStyle(token)}>{change.date}</code>
              </p>
              <ul>
                {change.description.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </>
          ),
        }))}
      />
    </div>
  );
};

// Static data

type Change = {
  readonly version: string;
  readonly date: string;
  readonly description: string[];
};

const changes: Change[] = [
  {
    version: "1.3.0",
    date: "2026-04-14",
    description: [
      "Migrated app theming to Ant Design ConfigProvider tokens and algorithms, replacing runtime theme CSS switching",
      "Refreshed ModForm layout and mobile responsiveness with cleaner control grouping, improved output area, and consistent chip styling",
      "Improved dark mode contrast and readability across app surfaces and controls",
    ],
  },
  {
    version: "1.2.3",
    date: "2026-04-14",
    description: [
      "Fixed spacing between the mod text preview and the Clear button in light mode",
      "Reliability and maintenance improvements, including smoother rollout of future updates",
    ],
  },
  {
    version: "1.2.2",
    date: "2026-03-23",
    description: [
      'Added moderation reasons "No mega evolution" and "Hosting invalid Pokemon"',
      "Aligned moderation reason titles on consistent sentence-style casing",
      "Code cleanup and package updates",
    ],
  },
  {
    version: "1.2.1",
    date: "2022-11-26",
    description: [
      'Added "Immediate Closing" as a moderation reason',
      'Updated "Troll Hosting" to "Fake Hosting" and made it a warnable offense',
    ],
  },
  {
    version: "1.2.0",
    date: "2022-09-25",
    description: ["Dark Mode added"],
  },
  {
    version: "1.1.0",
    date: "2022-09-16",
    description: ["Support prefilled Discord IDs"],
  },
  {
    version: "1.0.3",
    date: "2022-08-11",
    description: ["Restored the original ban appeal link"],
  },
  {
    version: "1.0.2",
    date: "2022-07-29",
    description: [
      "Updated the ban appeal link",
      'Added "Inappropriate language" moderation reason',
    ],
  },
  {
    version: "1.0.1",
    date: "2022-07-23",
    description: ["Support IDs up to 19 digits long"],
  },
  {
    version: "1.0.0",
    date: "2022-06-30",
    description: ["Initial release"],
  },
];

export const latestVersion = changes[0]?.version;
