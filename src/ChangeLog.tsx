import { Timeline } from "antd";
import "./App.css";
import React from "react";
import styled from "styled-components";

const Version = styled.h1({
  lineHeight: 1,
  fontWeight: 700,
});

const DateCode = styled.code`
  margin: 0 1px;
  padding: .2em .4em;
  font-size: .9em;
  background: #f2f4f5;
  border: 1px solid rgba(0,0,0,.06);
  border-radius: 3px;
}`;

// Inspired by https://ant.design/changelog

export const ChangeLog = (): JSX.Element => {
  const changeToTimelineItem = (change: Change, i: number): JSX.Element => {
    return (
      <Timeline.Item key={i}>
        <Version>{change.version}</Version>
        <p>
          <DateCode>{change.date}</DateCode>
        </p>
        <ul>
          {change.description.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </Timeline.Item>
    );
  };

  return (
    <div className="form-container">
      <Timeline mode="left">{changes.map(changeToTimelineItem)}</Timeline>
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
    version: "1.2.1",
    date: "2022-11-26",
    description: ["Added \"Immediate Closing\" as a moderation reason", "Updated \"Troll Hosting\" to \"Fake Hosting\" and made it a warnable offense"]
  },
  {
    version: "1.2.0",
    date: "2022-09-25",
    description: ["Dark Mode added"]
  },
  {
    version: "1.1.0",
    date: "2022-09-16",
    description: ["Support prefilled Discord IDs"]
  },
  {
    version: "1.0.3",
    date: "2022-08-11",
    description: ["Restored the original ban appeal link"]
  },
  {
    version: "1.0.2",
    date: "2022-07-29",
    description: ["Updated the ban appeal link", "Added \"Inappropriate language\" moderation reason"]
  },
  {
    version: "1.0.1",
    date: "2022-07-23",
    description: ["Support IDs up to 19 digits long"]
  },
  {
    version: "1.0.0",
    date: "2022-06-30",
    description: ["Initial release"],
  },
];

export const latestVersion = changes.find((c) => c.version !== "Unreleased")?.version;
