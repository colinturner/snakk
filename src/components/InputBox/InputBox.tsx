import React, { Component } from "react";

interface Props {
  header: string;
}

export default function InputBox(props: Props) {
  const { header } = props;
  return (
    <div style={{ margin: "5px" }}>
      <div style={{ color: "darkblue" }}>{header}</div>
      <input style={{ maxWidth: "180px" }} id={`attempt-${formatID(header)}`} />
      <div style={{ color: "darkred" }} id={`answer-${formatID(header)}`} />
    </div>
  );
}

function formatID(str: string): string {
  return str.replace(/ +/g, "-").toLowerCase();
}
