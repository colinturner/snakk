import React from "react";
import "./InputBox.css";

interface Props {
  header: string;
}

export default function InputBox(props: Props) {
  const { header } = props;
  return (
    <div className="input-box-wrapper">
      <div className="header">{header}</div>
      <input id={`attempt-${formatID(header)}`} />
      <div id={`answer-${formatID(header)}`} />
    </div>
  );
}

function formatID(str: string): string {
  return str.replace(/ +/g, "-").toLowerCase();
}
