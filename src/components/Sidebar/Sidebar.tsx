import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import useMultiKeyPress from "../../tools/useMultiKeyPress";
import { theme } from "../../theme";
import {
  IInfinitive,
  ReducerAction,
} from "../pages/Verbs/VerbsTypingPage/VerbsTypingPage";

type ISelectVerb = { letter: string } | { selection: string };

interface ISidebar {
  setInfinitive: React.Dispatch<React.SetStateAction<IInfinitive>>;
  all_infinitives: IInfinitive[];
  dispatch?: React.Dispatch<ReducerAction>;
}

/**
 * Styled components
 */
const Container = styled.div`
  background-color: white;
  overflow-y: auto;
  border-radius: 20px;
  @media ${theme.device.mobile} {
    min-width: 120px;
    margin-right: 15px;
  }
  @media ${theme.device.tablet} {
    min-width: 145px;
    margin-right: 25px;
  }
`;

const Word = styled.div`
  cursor: pointer;
  @media ${theme.device.mobile} {
    padding: 0px 20px;
  }
  @media ${theme.device.tablet} {
    padding: 0px 40px;
  }
  &:hover {
    background-color: #17a2b8;
    color: white;
    font-weight: bold;
  }
`;

export default function Sidebar(props: ISidebar): ReactElement {
  const { setInfinitive, all_infinitives, dispatch } = props;

  function onClick(infinitive: IInfinitive): void {
    dispatch && dispatch({ type: "reset" });
    setInfinitive(infinitive);
  }

  return (
    <Container>
      {all_infinitives.map((infinitive) => (
        <Word key={`word_${infinitive}`} onClick={() => onClick(infinitive)}>
          {infinitive}
        </Word>
      ))}
    </Container>
  );
}
