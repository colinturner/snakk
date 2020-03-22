import React, { ReactElement } from "react";
import checkmark from "../../../../assets/greenCheckmark.png";

export default function Checkmark(): ReactElement {
  return (
    <img
      id="checkmark"
      className="checkmark hidden"
      src={checkmark}
      alt="Green Checkmark"
    />
  );
}
