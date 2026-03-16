# Contributing to hangul-util

hangul-util에 기여해주셔서 감사합니다! 아래 가이드를 참고해주세요.

## 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/hyukson/hangul-util.git
cd hangul-util

# 의존성 설치
npm install

# 테스트 실행
npm test

# 빌드
npm run build
```

## 프로젝트 구조

```
src/
├── index.ts          # 메인 export
├── constant.ts       # 한글 상수 (자모, 유니코드 등)
├── types.ts          # TypeScript 타입 정의
├── divide.ts         # 한글 분리
├── combine.ts        # 한글 결합
├── choseong.ts       # 초성/중성/종성 추출
├── pronounce.ts      # 발음 변환
├── romanize.ts       # 로마자 변환
├── ...               # 기타 모듈
test/
├── *.spec.ts         # 각 모듈별 테스트
```

## 기여 방법

### 1. Issue 확인

작업 전에 관련 Issue가 있는지 확인하고, 없으면 새로 생성해주세요.

### 2. 브랜치 생성

```bash
git checkout -b feature/기능이름
# 또는
git checkout -b fix/버그이름
```

### 3. 개발

- **TypeScript**로 작성해주세요
- 기존 코드 스타일을 따라주세요
- 새 함수는 반드시 `src/index.ts`에 export 추가
- JSDoc 주석으로 `@example` 포함 권장

### 4. 테스트 작성

- 모든 새 기능에는 테스트가 필요합니다
- `test/` 폴더에 `모듈명.spec.ts` 파일 생성
- 정상 케이스, 엣지 케이스, 빈 문자열 등 포함

```bash
npm test
```

### 5. Pull Request

- PR 제목은 간결하게 작성
- 변경 내용을 설명에 포함
- 모든 테스트가 통과해야 merge 가능

## 커밋 메시지 규칙

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
refactor: 리팩토링
test: 테스트 추가/수정
chore: 빌드, 설정 등
```

## 코드 스타일

- 들여쓰기: 2 spaces
- 세미콜론 사용
- 쌍따옴표(`"`) 사용
- 한글 함수/변수명 사용하지 않음 (주석은 한글 OK)

## 라이선스

기여하신 코드는 [MIT 라이선스](./LICENSE)에 따라 배포됩니다.
