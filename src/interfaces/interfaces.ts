import {
  COMPLETE_SOLUTION,
  PARTIAL_SOLUTION,
  INCORRECT_SOLUTION,
} from "../constants/variables";

// Interfaces
export interface VerbSolution {
  infinitive: string;
  present: string;
  past: string;
  present_perfect: string;
  english: string;
}

// Types
export type MarkedSolution =
  | typeof COMPLETE_SOLUTION
  | typeof PARTIAL_SOLUTION
  | typeof INCORRECT_SOLUTION;
