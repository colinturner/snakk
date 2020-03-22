import React, { useState, ReactElement } from "react";
import { Collapse } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function CollapsibleInstructions(): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="instructions"
        aria-expanded={open}
        variant="info"
      >
        {open ? "Hide instructions" : "Show instructions"}
      </Button>
      <Collapse in={open}>
        <div id="instructions">
          Fill in the blanks to conjugate the verb. Note that because of
          Norway’s varied dialects, there are sometimes several accepted ways to
          conjugate the same verb.
        </div>
      </Collapse>
    </>
  );
}
