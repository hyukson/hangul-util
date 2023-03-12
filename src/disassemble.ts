import {
  CHO_HANGUL,
  CHO_PERIOD,
  HANGUL_START_CHARCODE,
  JONG_HANGUL,
  JUNG_HANGUL,
  JUNG_PERIOD,
} from "./constant";
import { isCho } from "./isCho";
import { isHangul } from "./isHangul";
import { isJong } from "./isJong";
import { isJung } from "./isJung";

export function disassemble(word: string) {
  const hangul = {
    cho: '',
    jung: '',
    jong: '',
  };

  const wordCode = word.charCodeAt(0);

  if (!isHangul(wordCode)) {
    if (isCho(word)) {
      hangul.cho = word;
    }

    if (isJung(word)) {
      hangul.jung = word;
    }

    if (!hangul.cho && isJong(word)) {
      hangul.jong = word;
    }

    return hangul;
  }

  const charCode = wordCode - HANGUL_START_CHARCODE;

  const choIndex = Math.floor(charCode / CHO_PERIOD);
  const jungIndex = Math.floor((charCode % CHO_PERIOD) / JUNG_PERIOD);
  const jongIndex = charCode % JUNG_PERIOD;

  return {
    cho: CHO_HANGUL[choIndex],
    jung: JUNG_HANGUL[jungIndex],
    jong: JONG_HANGUL[jongIndex],
  };
}

export function disassembleHangul(word: string) {
  const result = [];
  let index = 0;

  while (word.length > index) {
    const hangul = disassemble(word[index++]);
    
    if (hangul.cho) { 
      result.push(Object.values(hangul));
    }
  }

  return result;
}