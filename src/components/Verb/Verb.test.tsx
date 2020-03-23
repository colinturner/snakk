import { checkMultiplePossibleSolutions } from "./Verb";
import {
  COMPLETE_SOLUTION,
  PARTIAL_SOLUTION,
  INCORRECT_SOLUTION
} from "../../constants/variables";

const ANSWER = "think, intend";

describe("checkMultiplePossibleSolutions", () => {
  it("returns 'complete solution' for a complete solution", () => {
    const attempt = "think, intend";
    const answer = ANSWER;
    const expected_result = COMPLETE_SOLUTION;
    const actual_result = checkMultiplePossibleSolutions({ attempt, answer });
    expect(actual_result).toBe(expected_result);
  });

  it("returns 'complete solution' for a complete solution", () => {
    const attempt = "intend, think";
    const answer = ANSWER;
    const expected_result = COMPLETE_SOLUTION;
    const actual_result = checkMultiplePossibleSolutions({ attempt, answer });
    expect(actual_result).toBe(expected_result);
  });

  it("returns 'partial solution' for a partial solution", () => {
    const attempt = "intend";
    const answer = ANSWER;
    const expected_result = PARTIAL_SOLUTION;
    const actual_result = checkMultiplePossibleSolutions({ attempt, answer });
    expect(actual_result).toBe(expected_result);
  });

  it("returns 'partial solution' for a partial solution", () => {
    const attempt = "intend, intend";
    const answer = ANSWER;
    const expected_result = PARTIAL_SOLUTION;
    const actual_result = checkMultiplePossibleSolutions({ attempt, answer });
    expect(actual_result).toBe(expected_result);
  });

  it("returns 'incorrect solution' for an incorrect solution", () => {
    const attempt = "intend, think, walk";
    const answer = ANSWER;
    const expected_result = INCORRECT_SOLUTION;
    const actual_result = checkMultiplePossibleSolutions({ attempt, answer });
    expect(actual_result).toBe(expected_result);
  });

  it("returns 'incorrect solution' for an incorrect solution", () => {
    const attempt = "walk";
    const answer = ANSWER;
    const expected_result = INCORRECT_SOLUTION;
    const actual_result = checkMultiplePossibleSolutions({ attempt, answer });
    expect(actual_result).toBe(expected_result);
  });
});
