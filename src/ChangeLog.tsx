import { Timeline, theme } from "antd";
import type { GlobalToken } from "antd";
import "./App.css";
import React from "react";

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
        items={changes.map((change) => ({
          key: change.version,
          children: (
            <>
              <h1 style={{ lineHeight: 1, fontWeight: 700, color: token.colorTextHeading }}>
                {change.version}
              </h1>
              <p>
                <code style={dateCodeStyle(token)}>{change.date}</code>
              </p>
              <ul>
                {change.description.map((d, j) => (
                  <li key={`${change.version}-${j}`}>{d}</li>
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
    version: "1.3.1",
    date: "2026-04-15",
    description: [
      "Visual bug fixes and UI polish across mobile and desktop layouts",
      "Improved moderation text copy flow with better cross-browser support",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-04-14",
    description: [
      "Fresh coat of paint: updated look and layout so the tool is easier to use on phone and desktop",
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
