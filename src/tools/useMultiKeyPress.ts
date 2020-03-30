import { useState, useEffect } from "react";

export default function useMultiKeyPress(
  necessary_keys: string[],
  callback: Function
) {
  const [pressed_keys, setPressedKeys] = useState(new Set());

  function downHandler({ key }: { key: string }): void {
    setPressedKeys(pressed_keys.add(key));
    if (
      pressed_keys.size === necessary_keys.length &&
      necessary_keys.every(necessary_key => pressed_keys.has(necessary_key))
    ) {
      callback({ necessary_keys, pressed_keys });
    }
  }

  function upHandler({ key }: { key: string }): void {
    key === "Meta" ? pressed_keys.clear() : pressed_keys.delete(key);
    setPressedKeys(pressed_keys);
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return pressed_keys;
}
