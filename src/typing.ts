import { combineHangul } from "./combine";
import { divideHangul } from "./divide";
import { TypingOptionTypes } from "./types";

export function typing($target: HTMLElement, option: TypingOptionTypes) {
  const { content, speed } = option;

  const interval = Math.max(!isFinite(speed ?? 0) || !speed ? 100 : speed, 100);

  const text = divideHangul(content ?? $target.textContent ?? "");

  let index = 0;
  let handleId: NodeJS.Timeout;

  reset();

  function start() {
    stop();

    if (!text[index]) {
      return;
    }

    $target.textContent = combineHangul(text.slice(0, ++index));

    handleId = setTimeout(start, interval);
  }

  function stop() {
    clearTimeout(handleId);
  }

  function reset() {
    stop();

    index = 0;
    $target.textContent = "";
  }

  return { start, stop, reset };
}
