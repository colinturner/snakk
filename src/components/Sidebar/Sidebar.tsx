import React, { ReactElement } from "react";
import data from "../../constants/data";
import styled from "styled-components";
import { device } from "../../constants/variables";

interface SidebarProps {
  selectVerb: (selection: string) => void;
}

export default function Sidebar(props: SidebarProps): ReactElement {
  const { selectVerb } = props;
  return (
    <Container>
      {data.map(verb => (
        <Word
          key={`${verb.infinitive} --> ${verb.english}`}
          onClick={() => selectVerb(verb.infinitive)}
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
