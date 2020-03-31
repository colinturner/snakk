import React, { ReactElement, useState } from "react";
import data from "../../constants/data";
import styled from "styled-components";
import { device } from "../../constants/variables";
import useMultiKeyPress from "../../tools/useMultiKeyPress";
import { alphabet_letters } from "../../constants/variables";

interface SidebarProps {
  selectVerb: Function;
}

export default function Sidebar(props: SidebarProps): ReactElement {
  const { selectVerb } = props;
  useMultiKeyPress(["Shift", "A"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "B"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "D"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "E"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "F"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "G"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "H"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "I"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "J"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "K"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "L"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "M"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "N"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "P"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "R"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "S"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "T"], selectVerbBeginningWithLetter);
  useMultiKeyPress(["Shift", "V"], selectVerbBeginningWithLetter);

  function selectVerbBeginningWithLetter({
    pressed_keys
  }: {
    pressed_keys: string[];
  }) {
    console.log("triggered");
    selectVerb({
      letter:
        Array.from(pressed_keys).find(letter => letter.length === 1) || "a"
    });
  }

  return (
    <Container>
      {data.map(verb => (
        <Word
          key={`${verb.infinitive} --> ${verb.english}`}
          onClick={() => selectVerb({ selection: verb.infinitive })}
        >
          {verb.infinitive}
        </Word>
      ))}
    </Container>
  );
}

// styles
const Container = styled.div`
  overflow-y: auto;
  background-color: aliceblue;
  border-radius: 20px;
  @media ${device.mobileS} {
    padding: 0px 20px;
    min-width: 120px;
    margin-right: 15px;
  }
  @media ${device.tablet} {
    padding: 0px 40px;
    min-width: 145px;
    margin-right: 25px;
  }
`;

const Word = styled.div`
  cursor: pointer;
`;
