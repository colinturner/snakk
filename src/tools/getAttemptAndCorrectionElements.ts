import { VerbSolution } from "../interfaces/interfaces";

/** Returns attempt and correction elements for a given category */
export default function getAttemptAndCorrectionElements({
  category
}: {
  category: keyof VerbSolution;
}) {
  const attempt = document.getElementById(
    `attempt-${category}`
  ) as HTMLInputElement;
  const correction = document.getElementById(
    `answer-${category}`
  ) as HTMLInputElement;

  return { attempt, correction };
}
