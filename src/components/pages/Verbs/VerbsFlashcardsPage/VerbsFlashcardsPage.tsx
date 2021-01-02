import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../../../Sidebar/Sidebar";
import SnakkNavbar from "../../../SnakkNavbar/SnakkNavbar";
import { data_json as verbs } from "../../../../constants/data";
import { IInfinitive } from "../VerbsTypingPage/VerbsTypingPage";
import { theme } from "../../../../theme";
import { Button } from "react-bootstrap";

/**
 * Interfaces
 */

interface ISwitch {
  onChange: () => void;
  answers_mode: boolean;
}

const MainSection = styled.div`
  padding-top: 80px;
  width: 100%;
`;

const Card = styled.div<{ answers_mode: boolean }>`
  margin: 0px 16px;
  width: 100%;
  cursor: ${({ answers_mode }): string =>
    answers_mode ? "default" : "pointer"};
  display: flex;
  border-radius: 8px;
  background-color: ${theme.colors.white};
  ${theme.shadow.topLeft};
  max-width: 400px;
  min-height: 150px;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const FrontSide = styled.div`
  margin: 0 auto;
  align-self: center;
`;

const FrontInfinitive = styled.div`
  height: auto;
  font-size: 32px;
  font-weight: 600;
  height: 100%;
  align-self: center;
  margin: 0 auto;
`;

const BackSide = styled.div`
  margin: 0 auto;
  align-self: center;
`;

const BackInfinitive = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const BackItem = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
`;

const CardsAndButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardAndButtons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 70%;
`;

const SwitchLabel = styled.label`
  font-weight: 300;
`;

const BackPresent = styled(BackItem)``;
const BackPast = styled(BackItem)``;
const BackPresentPerfect = styled(BackItem)``;
const BackEnglish = styled(BackItem)``;

const NextCardButton = styled(Button)`
  width: 70px;
`;

const NavigationButton = styled(Button)`
  min-width: 90px;
`;

const ReverseButton = styled(NavigationButton)``;
const ForwardButton = styled(NavigationButton)``;

export default function VerbsFlashcardsPage(): ReactElement {
  /**
   * State
   */
  const all_infinitives = (Object.keys(verbs) as IInfinitive[]).sort();
  const [infinitive, setInfinitive] = useState(all_infinitives[0]);
  const [verb, setVerb] = useState(verbs[infinitive]);
  const [show_front, setShowFront] = useState(true);
  const [answers_mode, setAnswersMode] = useState(false);

  /**
   * useEffect
   */
  useEffect((): void => {
    setVerb(verbs[infinitive]);
  }, [infinitive]);

  function previousCard(): void {
    const current_index = all_infinitives.indexOf(infinitive);
    const next_index = all_infinitives[current_index - 1]
      ? current_index - 1
      : all_infinitives.length - 1;
    setShowFront(true);
    setInfinitive(all_infinitives[next_index]);
  }

  function nextCard(): void {
    const current_index = all_infinitives.indexOf(infinitive);
    const next_index = all_infinitives[current_index + 1]
      ? current_index + 1
      : 0;
    setShowFront(true);
    setInfinitive(all_infinitives[next_index]);
  }

  /**
   * Render
   */
  return (
    <>
      <SnakkNavbar />
      <BodyWrapper>
        <Sidebar
          setInfinitive={setInfinitive}
          all_infinitives={all_infinitives}
        />
        <MainSection>
          <SwitchWrapper>
            <Switch
              answers_mode={answers_mode}
              onChange={(): void => {
                setAnswersMode(!answers_mode);
              }}
            />
          </SwitchWrapper>
          <CardsAndButtonsWrapper>
            <CardAndButtons>
              <ReverseButton variant="outline-primary" onClick={previousCard}>
                Previous
              </ReverseButton>
              <Card
                answers_mode={answers_mode}
                onClick={(): void => {
                  setShowFront(!show_front);
                }}
              >
                {show_front && !answers_mode ? (
                  <FrontSide>
                    <FrontInfinitive>{infinitive}</FrontInfinitive>
                  </FrontSide>
                ) : (
                  <BackSide>
                    <BackInfinitive>{verb.infinitive}</BackInfinitive>
                    <BackPresent>{verb.present}</BackPresent>
                    <BackPast>{verb.past}</BackPast>
                    <BackPresentPerfect>
                      {verb.present_perfect}
                    </BackPresentPerfect>
                    <BackEnglish>🇬🇧 {verb.english}</BackEnglish>
                  </BackSide>
                )}
              </Card>
              <ForwardButton variant="outline-primary" onClick={nextCard}>
                Next
              </ForwardButton>
            </CardAndButtons>
          </CardsAndButtonsWrapper>
        </MainSection>
      </BodyWrapper>
    </>
  );
}

function Switch(props: ISwitch) {
  const { onChange, answers_mode } = props;
  return (
    <div className="custom-control custom-switch" onChange={onChange}>
      <input
        type="checkbox"
        className="custom-control-input"
        id="customSwitch1"
      />
      <SwitchLabel className="custom-control-label" htmlFor="customSwitch1">
        {answers_mode ? "Cram mode" : "Quiz mode"}
      </SwitchLabel>
    </div>
  );
}
