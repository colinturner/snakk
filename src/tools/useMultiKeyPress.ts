import { useState, useEffect } from "react";

export default function useMultiKeyPress(
  necessary_keys: string[],
  callback: Function
) {
  const [keys_pressed, setKeysPressed] = useState(new Set());

  function downHandler({ key }: { key: string }): void {
    setKeysPressed(keys_pressed.add(key));
    if (
      keys_pressed.size === necessary_keys.length &&
      necessary_keys.every(necessary_key => keys_pressed.has(necessary_key))
    ) {
      callback();
    }
  }

  function upHandler({ key }: { key: string }): void {
    key === "Meta" ? keys_pressed.clear() : keys_pressed.delete(key);
    setKeysPressed(keys_pressed);
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keys_pressed;
}
