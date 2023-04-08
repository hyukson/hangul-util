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

export const JUNG_COMPLETE_HANGUL: Record<string, string> = {
  ㅘ: 'ㅗㅏ',
  ㅙ: 'ㅗㅐ',
  ㅚ: 'ㅗㅣ',
  ㅝ: 'ㅜㅓ',
  ㅞ: 'ㅜㅔ',
  ㅟ: 'ㅜㅣ',
  ㅢ: 'ㅡㅣ',
};

export const JONG_COMPLETE_HANGUL: Record<string, string> = {
  ㄳ: 'ㄱㅅ',
  ㄵ: 'ㄴㅈ',
  ㄶ: 'ㄴㅎ',
  ㄺ: 'ㄹㄱ',
  ㄻ: 'ㄹㅁ',
  ㄼ: 'ㄹㅂ',
  ㄽ: 'ㄹㅅ',
  ㄾ: 'ㄹㅌ',
  ㄿ: 'ㄹㅍ',
  ㅀ: 'ㄹㅎ',
  ㅄ: 'ㅂㅅ',
};

export const JUNG_START_CHARCODE = JUNG_HANGUL[0].charCodeAt(0);
export const JUNG_END_CHARCODE = JUNG_HANGUL[JUNG_HANGUL.length-1].charCodeAt(0);

export const JONG_START_CHARCODE = JONG_HANGUL[1].charCodeAt(0);
export const JONG_END_CHARCODE = JONG_HANGUL[JONG_HANGUL.length-1].charCodeAt(0);

export const HANGUL_START_CHARCODE = '가'.charCodeAt(0);
export const HANGUL_END_CHARCODE = '힣'.charCodeAt(0);

export const CHO_PERIOD = '까'.charCodeAt(0) - '가'.charCodeAt(0);
export const JONG_PERIOD = '개'.charCodeAt(0) - '가'.charCodeAt(0);

// use covertKey function
export const KEY_MAPS: Record<string, string> = {
  ㅂ: "q", ㅃ: "Q", ㅈ: "w", ㅉ: "W",
  ㄷ: "e", ㄸ: "E", ㄱ: "r", ㄲ: "R",
  ㅅ: "t", ㅆ: "T", ㅛ: "y", ㅕ: "u",
  ㅑ: "i", ㅐ: "o", ㅒ: "O", ㅔ: "p", 
  ㅖ: "P", ㅁ: "a", ㄴ: "s",ㅇ: "d",
  ㄹ: "f", ㅎ: "g", ㅗ: "h",ㅓ: "j",
  ㅏ: "k", ㅣ: "l", ㅋ: "z", ㅌ: "x",
  ㅊ: "c", ㅍ: "v", ㅠ: "b", ㅜ: "n",
  ㅡ: "m",
};

// use formatNumber function
export const numberUnits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];

export const tenUnits = ["", "십", "백", "천"];

export const thousandUnits = ["", "만", "억", "조", "경", "해"];

// use formatDate function
export const WEEK_DAY = ["일", "월", "화", "수", "목", "금", "토"];

// use josa function
export const JOSA_LIST: Record<string, string> = {
  이: "이/가",
  가: "이/가",
  을: "을/를",
  를: "을/를",
  은: "은/는",
  는: "은/는",
  으로: "으로/로",
  로: "으로/로",
  와: "와/과",
  과: "와/과",
  이나: "이나/나",
  나: "이나/나",
  이에: "이에/에",
  에: "이에/에",
  이란: "이란/란",
  란: "이란/란",
}

// use normalize function
export const NORMALIZE_CHO = [
  "g", "gg", "n", "d", "dd",
  "r", "m", "b", "bb", "s",
  "ss", "", "j", "jj", "c",
  "k", "t", "p", "h"
];

export const NORMALIZE_JUNG = [
 "a", "ae", "ya", "yae", "eo",
 "e", "yeo", "ye", "o", "wa",
 "wae", "oe", "yo", "u", "weo",
 "we", "wi", "yu", "eu", "eui",
 "i"
]
export const NORMALIZE_JONG = [
  "", "g", "gg", "gs", "n", "nj",
  "nh", "d", "r", "rk", "rm", 
  "rb", "rs", "rt", "rp", "rh", 
  "m", "b", "bs", "s", "ss", 
  "ng", "j", "c", "k", "t", 
  "p", "h"
]