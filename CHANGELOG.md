# Changelog

## [Unreleased]

### New Features
- **유니코드 정규화** — `normalizeHangul`, `toCompatibilityJamo`, `toConjoiningJamo`, `hasConjoiningJamo`
  - 유니코드에는 한글 자모가 두 벌 있다: 호환 자모(`ㄱ` U+3131)와 조합형 자모(`ᄀ` U+1100).
    macOS 파일명 등에서 들어오는 NFD 문자열은 조합형 자모라 겉보기는 같지만 값이 달라
    `isHangul`은 `false`, `extractHangul`은 `""`를 반환하는 등 **모든 한글 함수가 조용히 실패**했다.
    이제 `normalizeHangul()`로 한 번 통과시키면 정상 동작한다.
- **바이트 길이** — `getByteLength`, `sliceByByte` (UTF-8 / EUC-KR)
  - SMS 90바이트 제한, DB `varchar` 크기 계산용. `sliceByByte`는 글자 중간에서 자르지 않는다.
- **전각/반각 변환** — `toHalfWidth`, `toFullWidth`

### Bug Fixes
- **hangulToNumber** — 큰 수 단위 "구"(10^32)를 숫자 9와 혼동해 `hangulToNumber("구십")`이 90이 아닌 `1e32`를 반환하던 문제 수정. 숫자 낱자와 겹치는 단위는 숫자로 읽는다.
- **josa** — ㄹ 받침 뒤 `으로/로` 예외 처리 추가 (`josa("서울", "으로")` → `"로"`). 한글이 아닌 입력에도 안전하며, 숫자는 읽는 소리로 받침을 판단한다 (`josa("1", "은")` → `"은"`).
- **includesByCho / hangulSearch** — 검색어에 정규식 메타문자가 있으면 `Invalid regular expression` 예외로 죽던 문제 수정. 이제 메타문자를 문자 그대로 찾는다.
- **hangulHighlight** — 빈 문자열에 매칭될 때 무한 루프에 빠지던 문제 수정.
- **sortByASC / sortByDESC** — 원본 배열을 제자리 정렬하던 문제 수정. 이제 새 배열을 반환한다. (**동작 변경**)
- **reverseByArray** — 입력 배열을 변경하던 문제 수정.
- **makePercentByObject / getLocalByGroups** — 합이 0일 때 `NaN`을 반환하던 문제 수정 (0으로 나누기).
- **getLocal** — 문자 클래스 안의 `|`를 구분자로 착각해 파이프 문자를 한글/영어로 분류하던 정규식 수정.
- **formatDate** — 잘못된 날짜에 `"NaN년NaN월..."`을 반환하던 문제 수정. 이제 빈 문자열을 반환한다.
- **sinoKoreanNumber** — `Number.MAX_SAFE_INTEGER` 초과 값에서 지수 표기(`"1e+21"`)로 자릿수 계산이 깨지던 문제 수정. JSDoc의 잘못된 예시(`10000` → `"만"`)를 실제 동작(`"일만"`)에 맞게 정정.
- **getDistance** — 메모이제이션 캐시에 상한이 없어 장시간 실행 시 메모리가 계속 늘어나던 문제 수정 (상한 5000, 오래된 항목부터 제거).
- **normalize** — `undefined` 산술로 만들어진 `NaN`의 falsy 여부에 기대던 구현을 명시적인 한글 판별로 교체.

### Improvements
- **romanize** — `usePronunciation` 옵션 추가. 표기법이 정한 대로 표준 발음법을 먼저 적용한다 (`"신라"` → `"silla"`). ㄹㄹ을 `"ll"`로 적는 규칙도 반영.
- **타입** — `divide`, `getLocalByGroups`에 오버로드 추가로 반환 타입 유니온 제거. `DividedIndex`, `DividedJamo`, `DividedResult`, `RomanizeOptions`, `Syllable` 타입 export.
- **export 추가** — `divide`, `combine`, `combineByCode`, `isHangulByCode`, `isChoByChar`, `isJungByCode`, `isJongByCode`, `decomposeCode`, `composeCode`, `getChoIndex`, `getJungIndex`, `getJongIndex`
- **중복 제거** — 8개 파일에 흩어져 있던 음절 분해 로직을 `src/syllable.ts`로 통합. 자모 코드 범위 상수와 복합 자모 역매핑도 한 곳으로 모음.
- **성능** — `makeRegexByCho`가 호출마다 `RegExp` 19개를 만들던 것을 미리 계산한 표로 교체. 초성 검사에 `Set` 사용.
- **정리** — `formatNumber`의 사용되지 않는 반복문 제거, `banmal`의 잘못된 타입 선언(`string[]` → `[RegExp, string][]`) 수정.

### Build System
- 죽은 설정 파일 제거 — `webpack.config.js`, `.babelrc` (webpack/babel은 이미 의존성에서 빠져 있어 동작하지 않는 상태였음)
- `prepare` 스크립트 제거 — `npm install`마다 전체 테스트가 돌던 문제. 대신 `prepublishOnly`로 빌드만 보장한다.
- `typecheck` 스크립트 추가 + CI/publish 워크플로에 타입 검사 단계 추가
- `tsconfig` 강화 — `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns` 등 추가, `target` es2015 → es2020, 테스트 코드도 타입 검사 대상에 포함
- `package.json` — `engines`(node >= 18), `publishConfig`, `unpkg`/`jsdelivr` 필드 추가

### Tests
- 회귀 테스트 및 신규 기능 테스트 추가 — 34개 → **37개** 스위트, 304개 → **351개** 테스트

---

## [1.0.0] - 2026-03-16

### Build System
- webpack + babel + tsc 빌드를 **tsup**으로 전면 교체
- **ESM + CJS 듀얼 빌드** 지원 (tree-shaking 가능)
- 브라우저 번들 IIFE 형식 자동 생성 (`dist/index.browser.js`)
- `package.json`에 `exports`, `module`, `sideEffects` 필드 추가
- TypeScript 4.x → **5.x** 업그레이드
- 불필요한 devDependency 제거 (babel, webpack, ts-loader)

### New Features
- **초성/중성/종성 추출** — `getChoseong`, `getJungseong`, `getJongseong`
- **받침 확인** — `hasJongseong`, `hasJongseongByGroups`
- **자모 판별** — `isJamo`, `isConsonant`, `isVowel`, `isCompleteHangul`, `isDoubleConsonant` + ByGroups 변형
- **한글 추출** — `extractHangul`, `containsHangul`, `removeHangul`, `hangulLength`
- **자모 교체/제거** — `removeJongseong`, `replaceChoseong`, `replaceJungseong`, `replaceJongseong`
- **한글→숫자 변환** — `hangulToNumber` ("백이십삼" → 123)
- **고유어 수사** — `nativeKoreanNumber`, `counter`, `ordinal`, `sinoKoreanNumber`
- **고유어 날짜/월** — `days`, `months` (하루/이틀/사흘, 유월/시월)
- **발음 변환** — `pronounce` (연음, 비음화, 경음화, 격음화, 유음화, 구개음화)
- **로마자 변환** — `romanize` (국립국어원 표기법, capitalize 옵션)
- **타이핑 효과** — `disassembleForTyping` (한글 타이핑 애니메이션용)
- **확장 검색** — `hangulIncludes`, `hangulStartsWith`, `hangulEndsWith`, `hangulFilter`, `hangulHighlight`
- **고유어→숫자 역변환** — `nativeKoreanToNumber` ("스물다섯" → 25)
- **존댓말 레벨 감지** — `detectSpeechLevel`, `isFormal`, `isInformal`
- **자모 슬라이스** — `hangulToJamo`, `hangulSlice`, `hangulJamoLength`
- **빈도 분석** — `hangulFrequency`, `mostFrequentChoseong`
- **추가 조사 패턴** — 아/야, 이여/여, 이든/든, 이랑/랑, 이라고/라고 등 10개 패턴 추가

### Tests
- 18개 → **34개** 테스트 스위트, 209개 → **300개** 테스트

### Docs
- README 전면 리뉴얼 (기능 요약 테이블, 전 섹션 예시 코드)
- 영문 README 추가
- CONTRIBUTING.md 추가
- CHANGELOG 추가

---

## [0.1.6] - 2023

- `zeroPad` 성능 최적화
- `formatNumber` 콤마, 소수점 구현

## [0.1.5] - 2023

- `formatDate` 추가
- `formatNumber`, `formatNumberAll` 추가
- `toBanmal`, `toHonorific` 추가

## [0.1.0] - 2023

- 초기 릴리즈
- `divideHangul`, `combineHangul` 한글 분리/결합
- `includesByCho`, `makeRegexByCho` 초성 검색
- `correctByDistance`, `getDistance` 유사 단어 매칭
- `sortByASC`, `sortByDESC`, `sortByGroups` 정렬
- `convertKey` 한영 키보드 변환
- `normalize` 발음 영문 변환
- `josa`, `formatJosa` 조사 처리
- `encode`, `decode` 문자 암호화
- `getLocal`, `getLocalByGroups` 언어 감지
- `isHangul`, `isCho`, `isJung`, `isJong` 한글 판별
