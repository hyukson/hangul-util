# hangul-util

한글 자모 분리/결합, 초성검색, 발음변환, 로마자변환, 조사처리, 숫자 한글변환, 타이핑 효과 등 **가장 많은 기능을 제공하는 종합 한글 유틸리티 라이브러리**입니다.

[![npm version](https://img.shields.io/npm/v/hangul-util.svg)](https://www.npmjs.com/package/hangul-util)
[![bundle size](https://img.shields.io/bundlephobia/minzip/hangul-util)](https://bundlephobia.com/package/hangul-util)
[![license](https://img.shields.io/npm/l/hangul-util.svg)](https://github.com/hyukson/hangul-util/blob/main/LICENSE)
[![test](https://img.shields.io/badge/tests-300%20passed-brightgreen)](https://github.com/hyukson/hangul-util)

[English README](./README.en.md)

## Features

| 카테고리 | 함수 | 설명 |
|---------|------|------|
| **한글 분리/결합** | `divideHangul`, `combineHangul` | 초성/중성/종성 분리 및 결합 |
| **초성 추출** | `getChoseong`, `getJungseong`, `getJongseong` | 초/중/종성만 추출 |
| **받침 확인** | `hasJongseong` | 마지막 글자 받침 유무 |
| **자모 교체** | `replaceChoseong`, `replaceJungseong`, `replaceJongseong`, `removeJongseong` | 초/중/종성 교체 및 제거 |
| **한글 판별** | `isHangul`, `isJamo`, `isConsonant`, `isVowel`, `isCompleteHangul`, `isDoubleConsonant` | 한글/자모/자음/모음/완성형/쌍자음 판별 |
| **한글 추출** | `extractHangul`, `containsHangul`, `removeHangul`, `hangulLength` | 한글 추출/포함확인/제거/길이 |
| **초성 검색** | `includesByCho`, `hangulIncludes`, `hangulStartsWith`, `hangulEndsWith`, `hangulFilter`, `hangulHighlight` | 초성검색, 필터링, 하이라이트 |
| **발음 변환** | `pronounce` | 표준 발음법 (연음/비음화/경음화/격음화/유음화/구개음화) |
| **로마자 변환** | `romanize`, `normalize` | 국립국어원 로마자 표기법 |
| **숫자 변환** | `formatNumber`, `formatNumberAll`, `hangulToNumber`, `sinoKoreanNumber` | 숫자↔한글 상호 변환 |
| **고유어 수사** | `nativeKoreanNumber`, `counter`, `ordinal` | 하나/둘/셋, 한 개/두 개, 첫째/둘째 |
| **날짜** | `formatDate`, `days`, `months` | 날짜 포맷, 하루/이틀/사흘, 유월/시월 |
| **조사** | `josa`, `formatJosa` | 은/는, 이/가, 을/를 자동 처리 |
| **고유어→숫자** | `nativeKoreanToNumber` | "스물다섯" → 25 역변환 |
| **존댓말/반말** | `toBanmal`, `toHonorific` | 존댓말↔반말 변환 |
| **존댓말 감지** | `detectSpeechLevel`, `isFormal`, `isInformal` | 합쇼체/해요체/해체/해라체 감지 |
| **타이핑 효과** | `disassembleForTyping` | 한글 타이핑 애니메이션용 분해 |
| **자모 슬라이스** | `hangulToJamo`, `hangulSlice`, `hangulJamoLength` | 자모 단위 분해/슬라이스/길이 |
| **빈도 분석** | `hangulFrequency`, `mostFrequentChoseong` | 자모 사용 빈도 분석 |
| **한영 변환** | `convertKey` | 키보드 한영 변환 |
| **비슷한 단어** | `correctByDistance`, `getDistance` | 레벤슈타인 거리 기반 유사 단어 |
| **문자 정렬** | `sortByASC`, `sortByDESC`, `sortByGroups` | 한글 정렬 |
| **언어 감지** | `getLocal`, `getLocalByGroups` | 한글/영문/숫자/특수문자 감지 |
| **암호화** | `encode`, `decode` | 문자열/배열/객체 인코딩 |

---

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

### 브라우저 (CDN)

```html
<script src="https://unpkg.com/hangul-util/dist/index.browser.js"></script>
<script>
  H.includesByCho("ㅅㄱ", "사과"); // true
</script>
```

---

## 한글 분리

`divideHangul(word: string, isSplit: boolean = true)`

```ts
divideHangul("값싼");
// ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ', 'ㅆ', 'ㅏ', 'ㄴ']

divideHangul("값싼", false);
// ['ㄱ', 'ㅏ', 'ㅄ', 'ㅆ', 'ㅏ', 'ㄴ']
```

`isSplit`이 `false`이면 복합 중성/종성이 분리되지 않습니다.

```ts
divideHangulByGroups("값싼");
// [ ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ'], ['ㅆ', 'ㅏ', 'ㄴ'] ]

divideHangulByGroups("값싼", { isSplit: false });
// [ ['ㄱ', 'ㅏ', 'ㅄ'], ['ㅆ', 'ㅏ', 'ㄴ'] ]

divideHangulByGroups("값싼", { resultType: "object" });
// [ {cho: 'ㄱ', jung: 'ㅏ', jong: 'ㅂㅅ'}, {cho: 'ㅆ', jung: 'ㅏ', jong: 'ㄴ'} ]
```

`resultType`으로 `'object' | 'array' | 'string' | 'index'` 지정 가능합니다.

```ts
divideByJung("ㅝ"); // "ㅜㅓ"
divideByJong("ㄺ"); // "ㄹㄱ"
```

---

## 한글 결합

`combineHangul(word: string | (string | string[])[])`

```ts
combineHangul("ㅇㅏㄴㄴㅕㅇ");
// "안녕"

combineHangul(["ㄱ", "ㅏ", "ㅂ", "ㅅ", "ㅆ", "ㅏ", "ㄴ"]);
// "값싼"

combineHangul([["ㄱ", "ㅏ", "ㅂ"], "ㅅ", "ㅏ"]);
// "갑사"
```

```ts
combineByJung("ㅜㅔ"); // "ㅝ"
combineByJong("ㄹㄱ"); // "ㄺ"
```

---

## 초성/중성/종성 추출

```ts
getChoseong("프로그래밍");  // "ㅍㄹㄱㄹㅁ"
getJungseong("한글");       // "ㅏㅡ"
getJongseong("한글");       // "ㄴㄹ"
```

---

## 받침(종성) 확인

```ts
hasJongseong("한");   // true
hasJongseong("하");   // false

hasJongseongByGroups("한글아");  // [true, true, false]
```

---

## 자모 교체/제거

```ts
removeJongseong("한글");  // "하그"

replaceChoseong("한글", () => "ㅁ");   // "만믈"
replaceJungseong("하하", () => "ㅗ");  // "호호"
replaceJongseong("한", () => "ㅁ");    // "함"
```

---

## 한글 판별

```ts
// 완성형 한글 (가~힣)
isHangul("사과");        // true
isCompleteHangul("가");  // true
isCompleteHangul("ㄱ");  // false

// 자모
isJamo("ㄱ");    // true
isJamo("가");    // false

// 자음/모음
isConsonant("ㄱ");  // true
isVowel("ㅏ");      // true

// 쌍자음
isDoubleConsonant("ㄲ");  // true
isDoubleConsonant("ㄱ");  // false

// 초성/중성/종성
isCho("ㅅㄱ");   // true
isJung("ㅏㅘ");  // true
isJong("ㄳ");    // true

// 그룹 판별
isHangulByGroups("사!");        // [true, false]
isCompleteHangulByGroups("한ㄱ");  // [true, false]
isJamoByGroups("ㄱ가");         // [true, false]
```

---

## 한글 추출

```ts
extractHangul("hello안녕world세계");  // "안녕세계"
containsHangul("hello안녕");          // true
removeHangul("hello안녕world");       // "helloworld"
hangulLength("hello안녕");            // 2
```

---

## 초성 검색

### 기본 초성 검색

```ts
includesByCho("ㅅㄱ", "사과");  // true

const regex = makeRegexByCho("ㅅㄱ");
"사과수박".replace(regex, "<mark>$1</mark>");
// "<mark>사과</mark>수박"
```

### 확장 검색

```ts
// 초성 + 일반 문자 혼합 검색
hangulIncludes("프로그래밍", "ㅍㄹㄱ");  // true
hangulIncludes("프로그래밍", "프로");     // true

// 시작/끝 확인
hangulStartsWith("프로그래밍", "ㅍㄹ");  // true
hangulEndsWith("프로그래밍", "래밍");     // true

// 배열 필터링
hangulFilter(["사과", "바나나", "수박"], "ㅅ");
// ["사과", "수박"]

// 하이라이트 정보
hangulHighlight("프로그래밍", "ㅍㄹ");
// { matched: true, ranges: [[0, 2]] }
```

---

## 발음 변환

`pronounce(text: string)`

표준 발음법에 따라 한글 발음을 변환합니다. 연음, 비음화, 경음화, 격음화, 유음화, 구개음화 등을 지원합니다.

```ts
// 연음법칙
pronounce("먹어");  // "머거"
pronounce("있어");  // "이써"

// 비음화
pronounce("국물");  // "궁물"
pronounce("학년");  // "항년"

// 경음화
pronounce("학교");  // "학꾜"

// 격음화
pronounce("좋다");  // "조타"
pronounce("입학");  // "이팍"

// 유음화
pronounce("신라");  // "실라"

// ㅎ탈락
pronounce("좋아");  // "조아"
```

---

## 로마자 변환

### romanize (국립국어원 표기법)

`romanize(text: string, options?: { capitalize?: boolean, separator?: string })`

```ts
romanize("한글");                         // "hangeul"
romanize("대한민국");                      // "daehanminguk"
romanize("서울", { capitalize: true });   // "Seoul"
romanize("부산", { capitalize: true });   // "Busan"
```

### normalize (발음 기반)

```ts
normalize("이탈리아");          // "i tar ri a"
normalize("이탈리아", false);   // "itarria"
```

---

## 숫자 변환

### 숫자 → 한글

```ts
formatNumber(123456789);
// "1억 2345만 6789"

formatNumberAll(123456789);
// "일억 이천삼백사십오만 육천칠백팔십구"

sinoKoreanNumber(123);
// "백이십삼"
```

### 한글 → 숫자

```ts
hangulToNumber("백이십삼");        // 123
hangulToNumber("삼만 오천");       // 35000
hangulToNumber("일억 이천삼백만");  // 123000000
```

---

## 고유어 수사

```ts
// 고유어 숫자 (1~99)
nativeKoreanNumber(1);   // "하나"
nativeKoreanNumber(25);  // "스물다섯"

// 수 관형사 + 단위명사
counter(3, "개");   // "세 개"
counter(1, "명");   // "한 명"
counter(20, "살");  // "스무 살"

// 서수사
ordinal(1);   // "첫째"
ordinal(3);   // "셋째"
ordinal(11);  // "열하나째"
```

---

## 날짜

### formatDate

`formatDate(date: string | Date, formatStyle: string)`

```ts
formatDate(new Date("2022-02-22 22:22:22"));
// "2022년02월22일 22시22분22초"

formatDate("2022-02-22", "YYYY년 MM월 DD일");
// "2022년 02월 22일"

/**
 * YY - 22, YYYY - 2022
 * M: 2, MM: 02
 * D: 2, DD: 02
 * d: 3, dd: '화'
 * H: 2, HH: 02
 * m: 2, mm: 02
 * s: 2, ss: 02
 */
```

### 고유어 날짜/월 이름

```ts
days(1);   // "하루"
days(3);   // "사흘"
days(15);  // "보름"
days(30);  // "그믐"

months(6);   // "유월"
months(10);  // "시월"
```

---

## 조사

`formatJosa(word: string)`

```ts
formatJosa("인생[이란/란]");  // "인생이란"
formatJosa("사과[을/를]");    // "사과를"
```

`josa(word: string, josa: string)`

```ts
josa("인생", "란");  // "이란"
josa("사과", "을");  // "를"
```

> 은/는, 이/가, 을/를, 와/과, 으로/로, 이나/나, 이에/에, 이란/란, 아/야, 이여/여, 이든/든, 이랑/랑, 이나마/나마, 이야말로/야말로, 이며/며, 이라도/라도, 이라면/라면, 이라고/라고 지원

---

## 존댓말/반말 변환

```ts
toBanmal("감사합니다.");   // "감사하다."
toHonorific("감사하다.");  // "감사합니다."
```

### 존댓말 레벨 감지

```ts
detectSpeechLevel("감사합니다");  // "formal"  (합쇼체)
detectSpeechLevel("감사해요");    // "polite"  (해요체)
detectSpeechLevel("고마워");      // "informal" (해체)
detectSpeechLevel("감사하다");    // "plain"   (해라체)

isFormal("감사합니다");   // true
isInformal("고마워");     // true
```

---

## 고유어 → 숫자 역변환

```ts
nativeKoreanToNumber("하나");      // 1
nativeKoreanToNumber("스물다섯");  // 25
nativeKoreanToNumber("아흔아홉");  // 99
nativeKoreanToNumber("세");        // 3 (수 관형사도 지원)
```

---

## 타이핑 효과

`disassembleForTyping(text: string)`

한글 타이핑 애니메이션을 위한 중간 단계를 생성합니다.

```ts
disassembleForTyping("한");
// ["ㅎ", "하", "한"]

disassembleForTyping("한글");
// ["ㅎ", "하", "한", "한ㄱ", "한그", "한글"]
```

---

## 자모 단위 슬라이스

```ts
// 한글을 자모로 분해
hangulToJamo("한글");  // ["ㅎ", "ㅏ", "ㄴ", "ㄱ", "ㅡ", "ㄹ"]
hangulToJamo("뷁");    // ["ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ"] (복합 모음/종성 분해)

// 자모 단위로 슬라이스 (타이핑 효과에 유용)
hangulSlice("한글", 0, 2);  // "하"  (ㅎ,ㅏ까지)
hangulSlice("한글", 0, 4);  // "한ㄱ" (ㅎ,ㅏ,ㄴ,ㄱ까지)
hangulSlice("한글", 0, 5);  // "한그"

// 자모 단위 길이
hangulJamoLength("한글");  // 6
```

---

## 빈도 분석

```ts
hangulFrequency("안녕하세요");
// { cho: { ㅇ: 2, ㄴ: 1, ㅎ: 1, ㅅ: 1 }, jung: { ... }, jong: { ... }, total: 5 }

mostFrequentChoseong("사과 수박 사탕");  // "ㅅ"
```

---

## 비슷한 단어 찾기

`correctByDistance(word: string, list: string[], option?)`

```ts
correctByDistance("사과", ["사자", "호랑이", "사고"]);
// ["사고", "사자"]

const option = { distance: 4, maxSlice: 1, isSplit: false };
correctByDistance("num", ["number", "string", "boolean"], option);
// ["number"]
```

---

## 문자 정렬

```ts
sortByASC(["사과", "귤", "바나나"]);
// ["귤", "바나나", "사과"]

sortByDESC(["사과", "귤", "바나나"]);
// ["사과", "바나나", "귤"]

// 객체 배열 정렬
sortByASC([{ name: "귤" }, { name: "사과" }], "name");

// 커스텀 기준 정렬
const groups = ["회장", "사장", "부장", "대리", "사원"];
sortByGroups(["대리", "사원", "사장", "회장", "부장"], groups);
// ["회장", "사장", "부장", "대리", "사원"]
```

---

## 한영 변환

`convertKey(word: string, toLanguage: 'ko' | 'en', isCombine?: boolean)`

```ts
convertKey("사과", "en");      // "tkrhk"
convertKey("tkrhk", "ko");     // "사과"
convertKey("tkrhk", "ko", false);  // "ㅅㅏㄱㅗㅏ"
```

---

## 언어 감지

```ts
getLocal("사과");     // "ko"
getLocal("apple");    // "en"
getLocal("123");      // "number"

getLocalByGroups("a1");  // ["en", "number"]

getLocalByGroups("안녕 Hello 123", true);
// { ko: 18.52, en: 37.04, number: 14.81, special: 29.63, etc: 0 }
```

---

## 문자 암호화

```ts
const encoded = encode("테스트123");
decode(encoded);  // "테스트123"

const encoded2 = encode(["바나나", "자두", "귤"]);
decode(encoded2);  // ["바나나", "자두", "귤"]
```

---

## 유틸리티

```ts
isNumber(0);       // true
isNumber(null);    // false

getNestedProperty("a.b", { a: { b: 2 } });  // 2
getNestedProperty("[0].a", [{ a: 4 }]);      // 4

chunkAtEnd("12345678", 4);  // ["5678", "1234"]
splitByKey("a[5]");         // ["a", "5"]
```

---

## License

MIT
