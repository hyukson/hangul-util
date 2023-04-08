# hangul-util

한글의 자모음의 분리,결합,검색 및 날짜와 숫자를 한글로 변환하는 등의 한글 기능 라이브러리입니다.

## Install

```bash
npm i hangul-util
```

```ts
// ts
import { divideHangul } from "hangul-util";

// js
const { divideHangul } = require('hangul-util');
```

## Functions

- 한글 분리 [ divide ]
- 한글 결합 [ combine ]
- 초성 검색 [ includesByCho ]
- 비슷한 단어 찾기 [ correctByDistance ]
- 문자 정렬 [ sortHangul ]
- 한영 변환 [ convertKey ]
- 한글 영어발음 변환 [ normalize ]
- 숫자 변환 [ formatNumber ]
- 날짜 포맷 [ formatDate ]
- 조사 [ josa ]
- 문자 암호화 [ encode, decode ]
- 사용된 언어 감지 [ getLocal ]
- 한글 판별 [ isHangul, isCho, isJung, isJong ] <br/><br/>

## 한글 분리

`divideHangul(word: string, isSplit: boolean = true)`

```ts
divideHangul("값싼");
// ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ', 'ㅆ', 'ㅏ', 'ㄴ']
```

문자를 초성, 중성, 종성으로 분리한 후 배열에 담아 반환해줍니다. <br/><br/>

```ts
divideHangul("값싼", false);
// ['ㄱ', 'ㅏ', 'ㅄ', 'ㅆ', 'ㅏ', 'ㄴ]
```

`isSplit` 타입이 `false`이면 중성, 종성 값이 분리되지 않습니다. <br/><br/>

```ts
divideHangulByGroups("값싼");
// [ ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ'], ['ㅆ', 'ㅏ', 'ㄴ'] ]

divideHangulByGroups("값싼", { isSplit: false });
// [ ['ㄱ', 'ㅏ', 'ㅄ'], ['ㅆ', 'ㅏ', 'ㄴ'] ]
```

`divideHangulByGroups`함수는 한글자별 분리된 글자가 배열에 묶여 반환됩니다. <br/><br/>

```ts
divideHangulByGroups("값싼", { resultType: "object" });
// [ {cho: 'ㄱ', jung: 'ㅏ', jong: 'ㅂㅅ'}, {cho: 'ㅆ', jung: 'ㅏ', jong: 'ㄴ'} ]
```

`resultType`으로는 `'object' | 'array' | 'string' | 'index'` 타입이 존재하며, 기본은 `'array'` 타입으로 반환됩니다. <br/><br/>

### 그 외

```ts
divideByJung("ㅝ");
// ㅜㅓ

divideByJong("ㄺ");
// ㄹㄱ
```

중성, 종성을 분리해줍니다. <br/><br/>

## 한글 결합

`combineHangul(word: string | (string | string[])[])`

```ts
combineHangul("ㅇㅏㄴㄴㅕㅇ");
// 안녕

combineHangul(["ㄱ", "ㅏ", "ㅂ", "ㅅ", "ㅆ", "ㅏ", "ㄴ"]);
// 값싼
```

문자를 한글로 결합하여 반환합니다.

```ts
combineHangul([["ㄱ", "ㅏ", "ㅂ"], "ㅅ", "ㅏ"]);
// 갑사
```

2차원 배열로 결합할 그룹을 지정할 수 있습니다.

### 그 외

```ts
combineByJung("ㅜㅔ");
// ㅝ

combineByJong("ㄹㄱ");
// ㄺ
```

중성, 종성을 결합해줍니다. <br/><br/>

## 초성검색

`includesByCho(search: string, word: string)`

```ts
includesByCho("ㅅㄱ", "사과");
// true

includesByCho("ㅅ고", "사과");
// false
```

문자를 초성검색 정규식으로 변환하여 비교한 결과를 반환합니다.

```ts
const regex = makeRegexByCho("ㅅㄱ");
// /([사-싷][가-깋])/

"사과수박".replace(regex, "<mark>$1</mark>");
// <mark>사과</mark>수박
```

문자를 초성 정규식으로 변환시켜 반환됩니다. (`초성 정규식`을 사용할 수 있습니다.) <br/><br/>

## 숫자를 한글로

`formatNumber(format: number | string | null)`

```ts
formatNumber(123456789);
// 1억 2345만 6789

formatNumberAll(123456789);
// 일억 이천삼백사십오만 육천칠백팔십구
```

숫자를 한글로 변환 시켜 주는 함수입니다. <br/><br/>

## 날짜 포맷

`formatDate(date: string | Date, formatStyle: string)`

```ts
formatDate(new Date("2022-02-22 22:22:22"));
// 2022년02월22일 22시22분22초

formatDate("2022-02-22", "YYYY년 MM월 DD일");
// 2022년 02월 22일
```

날짜를 주어진 `formatStyle` 형식에 맞춰서 변환시켜줍니다. <br/><br/>

## 비슷한 단어 찾기

`correctByDistance(word: string, list: string[], option)`

```ts
correctByDistance("사과", ["사자", "호랑이", "사고"]);
// [ '사고', '사자' ]
```

레벤슈타인 거리 알고리즘을 이용하여 `단어 근접수치`를 비교해 반환해줍니다. <br/><br/>

### 옵션지정

`option: { distance: number = 2, maxSlice: number = 10, isSplit: boolean = true }`;

```ts
const option = { distance: 4, maxSlice: 1, isSplit: false };

correctByDistance("num", ["number", "string", "boolean"], option);
// [ 'number' ]
```

옵션을 지정하여 필터되는 수치를 조절하거나, 한글분해 작업을 해제할 수 있습니다. <br/><br/>

## 문자 정렬

`sortByASC(array: any[], compare: string[] | string)`

```ts
sortByASC(["사과", "귤", "바나나"]);
// [ "귤", "바나나", "사과" ]

sortByDESC(["사과", "귤", "바나나"]);
// [ "사과", "바나나", "귤" ]
```

문자(한글,영어)를 `ASC(오름차순), DESC(내림차순)` 정렬시켜줍니다.

```ts
const array = [
  { name: ["귤"], age: 72 },
  { name: ["사과"], age: 25 },
  { name: ["귤"], age: 45 },
];

sortByASC(array, ["name[0]", "age"]);
/*
  const array = [
    { name: ["귤"], age: 25 },
    { name: ["귤"], age: 72 },
    { name: ["사과"], age: 45 },
  ];
*/
```

`compare`의 값으로 객체의 값을 특정할 수 있습니다. `(배열 - 다중조건)` <br/><br/>

### 별도의 조건 지정하기

`sortByGroups(array: any[], groups: (number | string)[], orderASC: boolean, compare: string)`

```ts
const groups = ["회장", "사장", "부장", "대리", "사원"];

sortByGroups(["대리", "사원", "사장", "회장", "부장"], groups);
// [ '회장', '사장', '부장', '대리', '사원' ]
```

`특정 배열`을 기준으로 정렬을 시켜줄 수 있습니다.

> 기존 정렬 로직상 '회장'은 '사원'보다 뒤에 위치해야하지만, `기준배열`으로 인해서 앞에 위치합니다.

<br/>

## 한영 변환

`convertKey(word: string, toLanguage: 'ko' | 'en', isCombine: boolean = true)`

```ts
convertKey("사과", "en");
// tkrhk

convertKey("tkrhk", "ko");
// 사과
```

`toLanguage` 타입 **키보드 키** 에 맞게 문자를 변환시켜줍니다.

```ts
convertKey("tkrhk", "ko", false);
// ㅅㅏㄱㅗㅏ
```

`isCombine` 속성을 비활성화 할 시, 한글이 결합되지 않습니다. <br/><br/>

## 한글 발음 파싱

`normalize(text: string, isSpace: boolean)`

```ts
normalize("이탈리아");
// 'i tar ri a'

normalize("이탈리아", false);
// 'itarria'
```

한글 발음을 영어로 변환하여줍니다. <br/><br/>

## 조사

`formatJosa(word: string)`

```ts
formatJosa("인생[이란/란]");
// "인생이란"

formatJosa("인생[란/테스트]");
// "인생이란"
```

`단어[조사1/조사2]` 형식의 텍스트를 `단어[조사]`로 알맞게 변환됩니다.

> '은/는', '이/가'와 같은 많이 알려진 조사는 자동으로 포맷됩니다. `[란/테스트] -> [이란/란]`

### 그 외

`josa(word: string, josa: string)`

```ts
josa("인생", "란");
// '이란'
```

단어에 따른 `조사` 정보만을 반환 받습니다. <br/><br/>

## 문자 암호화

`encode(input: any), decode(input: any)`

```ts
encode("테스트123");
// 5RVpsUUtCalNWcEVWb1ZWU0Zsa1FLUlRUVXBFVkprWE42S...

encode(["바나나", "자두", "귤"]);
// 2SjNKVFZESXlKVGxVSkZKVFZCa3dKVUlVTTNKVVZGRTBRaVV...
```

문자를 암호화 시켜주며 `객체와 배열` 데이터도 암호화 대상입니다.

```ts
const encode1 = encode("테스트123");
decode(encode1);
// 테스트123

const encode2 = encode(["바나나", "자두", "귤"]);
decode(encode2);
// ['바나나', '자두', '귤']
```

`encode`로 변환된 암호문자를 `decode` 함수로 복호화 시킬 수 있습니다. <br/><br/>

## 언어 구별

`getLocalByGroups(word: string, isPercent: boolean)`

```ts
getLocalByGroups("a1");
// ['en', 'number'];
```

각 문자에 대한 언어를 배열에 담아서 반환해줍니다.

```ts
getLocalByGroups("안녕하세요! Hello, world! 1234 #", true);
/*
  {
    ko: 18.52,
    en: 37.04,
    number: 14.81,
    special: 29.63,
    etc: 0,
  }
*/
```

`isPercent` 값을 통해서, 언어가 사용된 퍼센트를 나타내는 객체를 반환 받을 수 있습니다. <br/><br/>

## isHangul, isCho, isJung, isJong

`isHangul(word: string), isHangulGroups(word: string)`

```ts
isHangul("사과");
// true

isCho("ㅅㄱ");
// true

isJung("ㅏㅘ");
// true

isJong("ㄳ");
// true
```

입력된 문자가 한글, 초성, 중성, 종성인지 판별합니다.

```ts
isHangulByGroups("사!");
// [true, false]

isChoByGroups("ㅅㅏ");
// [true, false]

isJungByGroups("ㅅㅘ");
// [false, true]

isJongByGroups("ㄳㅏㅅ");
// [true, false, true]
```

입력된 모든 문자의 한글, 초성, 중성, 종성 여부를 판별하여 배열에 담아 반환됩니다. <br/><br/>

## 기타 함수(utils)

### isNumber

`isNumber(input: any)`

```ts
isNumber(null);
// false

isNumber(0);
// true
```

입력값의 숫자 여부를 판별합니다.

### reverseByObject

`reverseByObject(object: any)`

```ts
reverseByObject({ a: 1, b: 2, c: 3 });
// { 1: 'a', 2: 'b', 3: 'c' }
```

객체의 `Key, Value` 값을 서로 바꿔 재구성한 데이터를 반환해줍니다.

### getNestedProperty

`getNestedProperty(key: string[] | string, object: any)`

```ts
const object = { a: { b: 2 } };

object["a.b"];
// undefined

getNestedProperty("a.b", object);
// 2

getNestedProperty("[0].a", [{ a: 4 }, {}]);
// 4
```

`object.a.b` 접근을 문자열로 가능하도록 만들어주는 함수입니다.

### chunkAtEnd

`chunkAtEnd(value: string, n: number)`

```ts
chunkAtEnd("12345678", 4);
// [ '5678', '1234' ]

chunkAtEnd("12345678", 1).join("");
// '87654321'
```

문자를 **뒤에서부터** n개씩 자른 아이템을 배열에 담아 반환해줍니다.

### splitByKey

`splitByKey(key: string)`

```ts
splitByKey("a.b");
// ['a', 'b'];

splitByKey("a[5]");
// ['a', 5];
```

Key를 차례대로 구분한 값을 배열에 담아 반환해줍니다.
