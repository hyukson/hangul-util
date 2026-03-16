# hangul-util

The most comprehensive Korean Hangul utility library — Jamo decomposition/composition, Choseong search, pronunciation conversion, romanization, particle (Josa) handling, number-to-Hangul conversion, typing effects, and more.

[![npm version](https://img.shields.io/npm/v/hangul-util.svg)](https://www.npmjs.com/package/hangul-util)
[![license](https://img.shields.io/npm/l/hangul-util.svg)](https://github.com/hyukson/hangul-util/blob/main/LICENSE)

[한국어 README](./README.md)

## Features

| Category | Functions | Description |
|----------|-----------|-------------|
| **Decompose / Compose** | `divideHangul`, `combineHangul` | Split/merge Hangul into Choseong/Jungseong/Jongseong |
| **Extract Jamo** | `getChoseong`, `getJungseong`, `getJongseong` | Extract initial/medial/final consonants |
| **Jongseong Check** | `hasJongseong` | Check if last character has a final consonant |
| **Replace Jamo** | `replaceChoseong`, `replaceJungseong`, `replaceJongseong`, `removeJongseong` | Replace or remove Jamo components |
| **Hangul Detection** | `isHangul`, `isJamo`, `isConsonant`, `isVowel`, `isCompleteHangul`, `isDoubleConsonant` | Detect Hangul characters, Jamo, consonants, vowels |
| **Extract Hangul** | `extractHangul`, `containsHangul`, `removeHangul`, `hangulLength` | Extract/detect/remove Hangul from mixed strings |
| **Choseong Search** | `includesByCho`, `hangulIncludes`, `hangulStartsWith`, `hangulEndsWith`, `hangulFilter`, `hangulHighlight` | Search by initial consonants with filtering and highlighting |
| **Pronunciation** | `pronounce` | Korean standard pronunciation rules (liaison, nasalization, fortition, aspiration, etc.) |
| **Romanization** | `romanize`, `normalize` | Revised Romanization of Korean |
| **Number Conversion** | `formatNumber`, `formatNumberAll`, `hangulToNumber`, `sinoKoreanNumber` | Number ↔ Hangul conversion |
| **Native Korean Numbers** | `nativeKoreanNumber`, `counter`, `ordinal` | 하나/둘/셋, 한 개/두 개, 첫째/둘째 |
| **Dates** | `formatDate`, `days`, `months` | Date formatting, native Korean day/month names |
| **Particles (Josa)** | `josa`, `formatJosa` | Auto-select 은/는, 이/가, 을/를 based on final consonant |
| **Speech Level** | `toBanmal`, `toHonorific` | Convert between formal/informal speech |
| **Typing Effect** | `disassembleForTyping` | Generate intermediate steps for Hangul typing animation |
| **Keyboard Conversion** | `convertKey` | Convert between Korean/English keyboard layout |
| **Fuzzy Match** | `correctByDistance`, `getDistance` | Levenshtein distance-based word similarity |
| **Sorting** | `sortByASC`, `sortByDESC`, `sortByGroups` | Korean-aware sorting |
| **Language Detection** | `getLocal`, `getLocalByGroups` | Detect Korean/English/number/special characters |
| **Encoding** | `encode`, `decode` | String/array/object encoding |

## Install

```bash
npm i hangul-util
```

```ts
// ESM (Tree-shakeable)
import { divideHangul, pronounce, romanize } from "hangul-util";

// CommonJS
const { divideHangul, pronounce, romanize } = require("hangul-util");
```

### Browser (CDN)

```html
<script src="https://unpkg.com/hangul-util/dist/index.browser.js"></script>
<script>
  H.includesByCho("ㅅㄱ", "사과"); // true
</script>
```

---

## Decompose / Compose

```ts
divideHangul("값싼");
// ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ', 'ㅆ', 'ㅏ', 'ㄴ']

combineHangul("ㅇㅏㄴㄴㅕㅇ");
// "안녕"
```

## Extract Jamo

```ts
getChoseong("프로그래밍");  // "ㅍㄹㄱㄹㅁ"
getJungseong("한글");       // "ㅏㅡ"
getJongseong("한글");       // "ㄴㄹ"
```

## Jongseong Check

```ts
hasJongseong("한");  // true  (has final consonant ㄴ)
hasJongseong("하");  // false (no final consonant)
```

## Replace Jamo

```ts
removeJongseong("한글");                   // "하그"
replaceChoseong("한글", () => "ㅁ");       // "만믈"
replaceJungseong("하하", () => "ㅗ");      // "호호"
```

## Choseong Search

```ts
hangulIncludes("프로그래밍", "ㅍㄹㄱ");  // true
hangulFilter(["사과", "바나나", "수박"], "ㅅ");  // ["사과", "수박"]
hangulHighlight("프로그래밍", "ㅍㄹ");
// { matched: true, ranges: [[0, 2]] }
```

## Pronunciation

Applies Korean standard pronunciation rules:

```ts
pronounce("먹어");  // "머거" (liaison)
pronounce("국물");  // "궁물" (nasalization)
pronounce("학교");  // "학꾜" (fortition)
pronounce("좋다");  // "조타" (aspiration)
pronounce("신라");  // "실라" (liquidization)
pronounce("좋아");  // "조아" (ㅎ-deletion)
```

## Romanization

```ts
romanize("한글");                        // "hangeul"
romanize("서울", { capitalize: true });  // "Seoul"
romanize("부산", { capitalize: true });  // "Busan"
```

## Number Conversion

```ts
formatNumber(123456789);          // "1억 2345만 6789"
formatNumberAll(123456789);       // "일억 이천삼백사십오만 육천칠백팔십구"
hangulToNumber("백이십삼");        // 123
sinoKoreanNumber(123);            // "백이십삼"
```

## Native Korean Numbers

```ts
nativeKoreanNumber(25);   // "스물다섯"
counter(3, "개");          // "세 개"
ordinal(1);               // "첫째"
```

## Native Korean Days

```ts
days(1);    // "하루"
days(15);   // "보름"
months(6);  // "유월"
months(10); // "시월"
```

## Particles (Josa)

```ts
formatJosa("사과[을/를] 먹다");  // "사과를 먹다"
josa("사과", "을");              // "를"
```

## Typing Effect

```ts
disassembleForTyping("한글");
// ["ㅎ", "하", "한", "한ㄱ", "한그", "한글"]
```

## Speech Level Conversion

```ts
toBanmal("감사합니다.");   // "감사하다."
toHonorific("감사하다.");  // "감사합니다."
```

---

For full documentation and more examples, see the [한국어 README](./README.md).

## License

MIT
