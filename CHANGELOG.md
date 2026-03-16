# Changelog

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
