import React from "react";
import styled from "styled-components";
import { VerbSolution } from "../../interfaces/interfaces";
import { theme } from "../../theme";
import { Category, InputsReducerAction, Validity } from "../Verb/Verb";

interface IInputBox {
  header: string;
  category: Category;
  validity: Validity;
  value: string;
  dispatchInputs: React.Dispatch<InputsReducerAction>;
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
  const { header, validity, category, value, dispatchInputs } = props;
  console.log("input box validity!!! ", validity);
  return (
    <InputBoxWrapper>
      <Header>{header}</Header>
      <Input
        validity={validity}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatchInputs({
            type: "set_value",
            payload: { category, value: e.target.value },
          });
        }}
      />
      <Answer id={`answer-${formatID(header)}`} />
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
