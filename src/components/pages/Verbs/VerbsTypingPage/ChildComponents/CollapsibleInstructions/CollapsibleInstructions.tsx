import React, { useState, ReactElement, ReactNode } from "react";
import { Collapse } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import "./CollapsibleInstructions.css";

const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 300;
  padding-top: 8px;
`;

const InstructionPoint = styled.li``;

/**
 * Component
 */
export default function CollapsibleInstructions(): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <InstructionsWrapper>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="instructions"
        aria-expanded={open}
        variant="info"
        id="instructions-button"
      >
        {open ? "Hide instructions" : "Show instructions"}
      </Button>
      <Collapse in={open}>
        <Instructions id="instructions">
          <InstructionPoint>
            Select a starting verb from the left-hand menu.
          </InstructionPoint>
          <InstructionPoint>Fill in the blanks.</InstructionPoint>
          <InstructionPoint>
            There are sometimes several accepted ways to conjugate the same
            verb.
          </InstructionPoint>
          <InstructionPoint>Use Tab to advance.</InstructionPoint>
          <InstructionPoint>
            Use Shift+Enter to submit (or click Submit button).
          </InstructionPoint>
        </Instructions>
      </Collapse>
    </InstructionsWrapper>
  );
}

// SUB-COMPONENTS
function InstructionsWrapper(props: { children: ReactNode }): ReactElement {
  return <div className="instructions-wrapper">{props.children}</div>;
}
