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

interface IBackItemGroup {
  text: string;
}

const MainSection = styled.div`
  padding-top: 24px;
  width: 100%;
`;

const Card = styled.div<{ answers_mode: boolean }>`
  margin: 0px 16px;
  @media ${theme.device.mobile} {
    margin: 24px 0px;
  }
  @media ${theme.device.tablet} {
    margin: 0px 16px;
  }
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
  height: 85vh;
`;

const FrontSide = styled.div`
  margin: 0 auto;
  align-self: center;
  padding: 8px;
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
  padding: 8px;
`;

const BackInfinitive = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 12px;
`;

const BackItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackItem = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const ItemDivider = styled.div`
  width: 22px;
  border: 2px solid ${theme.colors.aliceblue};
  border-radius: 18px;
  align-self: auto;
  margin: 2px 0px 8px 0px;
`;

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media ${theme.device.mobile} {
    padding-bottom: 56px;
  }
  @media ${theme.device.tablet} {
    padding-bottom: 80px;
  }
`;

const CardsAndButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardAndButtons = styled.div`
  display: flex;
  margin: 0 auto;
  width: 70%;
  @media ${theme.device.mobile} {
    flex-direction: column;
  }
  @media ${theme.device.tablet} {
    flex-direction: row;
  }
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
                    <BackItemGroup text={verb.present} />
                    <BackItemGroup text={verb.past} />
                    <BackItemGroup text={verb.present_perfect} />
                    <BackItemGroup text={`🇬🇧 ${verb.english}`} />
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

function BackItemGroup(props: IBackItemGroup): ReactElement {
  const { text } = props;
  return (
    <BackItemWrapper>
      <BackItem>{text}</BackItem>
      <ItemDivider />
    </BackItemWrapper>
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
