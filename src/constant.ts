export const CHO_HANGUL = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
  'ㄹ', 'ㅁ', 'ㅂ','ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
  'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];
export const JUNG_HANGUL = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 
  'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 
  'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 
  'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
];
export const JONG_HANGUL = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 
  'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 
  'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 
  'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ','ㅎ',
];

export const CHO_START_CHARCODE = CHO_HANGUL[0].charCodeAt(0);
export const CHO_END_CHARCODE = CHO_HANGUL[CHO_HANGUL.length-1].charCodeAt(0);

export const JUNG_START_CHARCODE = JUNG_HANGUL[0].charCodeAt(0);
export const JUNG_END_CHARCODE = JUNG_HANGUL[JUNG_HANGUL.length-1].charCodeAt(0);

export const HANGUL_START_CHARCODE = '가'.charCodeAt(0);
export const HANGUL_END_CHARCODE = '힣'.charCodeAt(0);

export const CHO_PERIOD = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0));
export const JUNG_PERIOD = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0));

export const KEY_MAPS = {
  'ㄱ': 'r',
  'ㄲ': 'R',
  'ㄴ': 's',
  'ㄷ': 'e',
  'ㄸ': 'E',
  'ㄹ': 'f',
  'ㅁ': 'a',
  'ㅂ': 'q',
  'ㅃ': 'Q',
  'ㅅ': 't',
  'ㅆ': 'T',
  'ㅇ': 'd',
  'ㅈ': 'w',
  'ㅉ': 'W',
  'ㅊ': 'c',
  'ㅋ': 'z',
  'ㅌ': 'x',
  'ㅍ': 'v',
  'ㅎ': 'g',
  'ㅏ': 'k',
  'ㅐ': 'o',
  'ㅑ': 'i',
  'ㅒ': 'O',
  'ㅓ': 'j',
  'ㅔ': 'p',
  'ㅕ': 'u',
  'ㅖ': 'P',
  'ㅗ': 'h',
  'ㅛ': 'y',
  'ㅜ': 'n',
  'ㅠ': 'b',
  'ㅡ': 'm',
  'ㅣ': 'l',
};