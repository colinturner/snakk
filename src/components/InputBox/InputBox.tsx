import React from "react";
import styled from "styled-components";
import { VerbSolution } from "../../interfaces/interfaces";
import { theme } from "../../theme";
import {
  Category,
  ReducerAction,
  Validity,
} from "../pages/Verbs/VerbsTypingPage/VerbsTypingPage";

interface IInputBox {
  header: string;
  category: Category;
  validity: Validity;
  value: string;
  answer: string;
  dispatch: React.Dispatch<ReducerAction>;
}

interface IInput extends Pick<IInputBox, "validity"> {}

const InputBoxWrapper = styled.div`
  margin: 5px;
`;

const Header = styled.div`
  color: darkslateblue;
`;

const Input = styled.input<IInput>`
  border: ${(props) => setBorder(props.validity)};
  background-color: ${theme.colors.aliceblue};
  width: 180px;
  height: 32px;
  padding: 0px 16px;
  border-radius: 40px;
  outline: none;
  ${theme.shadow.insetDeep};
  transition: all 0.17s ease-in-out;

  &:focus {
    ${theme.shadow.insetShallow};
  }
`;

const Answer = styled.div``;

export default function InputBox(props: IInputBox) {
  const { header, validity, category, value, dispatch, answer } = props;
  return (
    <InputBoxWrapper>
      <Header>{header}</Header>
      <Input
        validity={validity}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: "set_value",
            payload: { category, value: e.target.value },
          });
        }}
      />
      {[Validity.incorrect, Validity.partially_correct].includes(validity) ? (
        <Answer id={`answer-${formatID(header)}`}>{answer}</Answer>
      ) : null}
    </InputBoxWrapper>
  );
}

function formatID(str: string): string {
  return str.replace(/ +/g, "_").toLowerCase();
}

function setBorder(validity: Validity) {
  switch (validity) {
    case Validity.incorrect:
      return "2px solid red";
    case Validity.partially_correct:
      return "2px dashed green";
    case Validity.correct:
      return "2px solid green";
    default:
      return "none";
  }
}
