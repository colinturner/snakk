import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import Sidebar from "../../../Sidebar/Sidebar";
import SnakkNavbar from "../../../SnakkNavbar/SnakkNavbar";
import { data_json } from "../../../../constants/data";

const MainSection = styled.div`
  padding: 80px;
  width: 100%;
`;

const Card = styled.div`
  margin: 0 auto;
  border-radius: 8px;
  background-color: red;
  max-width: 400px;
  min-height: 150px;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function VerbsFlashcardsPage(): ReactElement {
  /**
   * State
   */
  const [verb, setVerb] = useState(data_json["angre"]);

  function selectVerb() {
    console.log("jello");
  }

  /**
   * Render
   */
  return (
    <>
      <SnakkNavbar />
      <BodyWrapper>
        <Sidebar selectVerb={selectVerb} />
        <MainSection>
          <Card>{verb.infinitive}</Card>
        </MainSection>
      </BodyWrapper>
    </>
  );
}
