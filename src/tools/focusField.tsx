import { TAB_KEY } from "../constants/variables";

export function focusFirstInputField(e: any): void {
  const first_input =
    e.keyCode === TAB_KEY
      ? document.getElementById("instructions-button")
      : document.getElementById("attempt-present");
  first_input && first_input.focus();
}

export function focusFirstErrorInputField(e: any): void {
  const first_error_input = document.getElementsByClassName(
    "incorrect_attempt"
  )[0] as HTMLElement;
  first_error_input && first_error_input.focus();
}
