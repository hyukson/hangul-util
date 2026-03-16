import {
  hangulIncludes,
  hangulStartsWith,
  hangulEndsWith,
  hangulFilter,
  hangulHighlight,
} from "../src/hangulSearch";

describe("hangulIncludes", () => {
  test("일반 검색", () => {
    expect(hangulIncludes("프로그래밍", "프로")).toBe(true);
    expect(hangulIncludes("프로그래밍", "자바")).toBe(false);
  });

  test("초성 검색", () => {
    expect(hangulIncludes("프로그래밍", "ㅍㄹㄱ")).toBe(true);
    expect(hangulIncludes("프로그래밍", "ㅈㅂ")).toBe(false);
  });

  test("빈 문자열", () => {
    expect(hangulIncludes("", "ㄱ")).toBe(false);
    expect(hangulIncludes("가", "")).toBe(false);
  });
});

describe("hangulStartsWith", () => {
  test("초성으로 시작 확인", () => {
    expect(hangulStartsWith("프로그래밍", "ㅍㄹ")).toBe(true);
    expect(hangulStartsWith("프로그래밍", "ㄹㅁ")).toBe(false);
  });

  test("일반 시작 확인", () => {
    expect(hangulStartsWith("프로그래밍", "프로")).toBe(true);
  });
});

describe("hangulEndsWith", () => {
  test("일반 끝 확인", () => {
    expect(hangulEndsWith("프로그래밍", "래밍")).toBe(true);
    expect(hangulEndsWith("프로그래밍", "프로")).toBe(false);
  });
});

describe("hangulFilter", () => {
  test("초성으로 필터링", () => {
    const fruits = ["사과", "바나나", "수박", "딸기"];
    expect(hangulFilter(fruits, "ㅅ")).toEqual(["사과", "수박"]);
    expect(hangulFilter(fruits, "ㅂㄴㄴ")).toEqual(["바나나"]);
  });
});

describe("hangulHighlight", () => {
  test("일치 범위 반환", () => {
    const result = hangulHighlight("프로그래밍", "ㅍㄹ");
    expect(result.matched).toBe(true);
    expect(result.ranges.length).toBeGreaterThan(0);
  });

  test("불일치", () => {
    const result = hangulHighlight("프로그래밍", "ㅈㅂ");
    expect(result.matched).toBe(false);
    expect(result.ranges).toEqual([]);
  });
});
