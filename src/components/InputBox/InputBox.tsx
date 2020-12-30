import React from "react";
import styled from "styled-components";
import { theme } from "../../theme";

const InputBoxWrapper = styled.div`
  margin: 5px;
`;

const Header = styled.div`
  color: darkslateblue;
`;

const Input = styled.input`
  width: 180px;

  height: 32px;
  padding: 0px 16px;
  border-radius: 40px;
  outline: none;
  border: none;
  ${theme.shadow.insetDeep};
  transition: all 0.17s ease-in-out;

  &:focus {
    ${theme.shadow.insetShallow};
  }
`;

interface Props {
  header: string;
}

export default function InputBox(props: Props) {
  const { header } = props;
  return (
    <InputBoxWrapper>
      <Header>{header}</Header>
      <Input id={`attempt-${formatID(header)}`} />
      <div id={`answer-${formatID(header)}`} />
    </InputBoxWrapper>
  );
}

function formatID(str: string): string {
  return str.replace(/ +/g, "-").toLowerCase();
}
